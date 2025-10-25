// Auth context
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  // Load user
  const loadUser = async () => {
    if (token) {
      try {
        const response = await authAPI.getMe();
        if (response.data.success) {
          setUser(response.data.data);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error loading user:', error);
        logout();
      }
    }
    setLoading(false);
  };

  // Register user
  const register = async (formData) => {
    try {
      const response = await authAPI.register(formData);
      
      if (response.data.success) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        toast.success('Registration successful! Welcome to OpenLearn.');
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const response = await authAPI.login(formData);
      
      if (response.data.success) {
        setAuthToken(response.data.token);
        setUser(response.data.user);
        toast.success(`Welcome back, ${response.data.user.name}!`);
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Logout
  const logout = () => {
    setAuthToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      
      if (response.data.success) {
        setUser(response.data.data);
        toast.success('Profile updated successfully');
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const response = await authAPI.changePassword(passwordData);
      
      if (response.data.success) {
        toast.success('Password changed successfully');
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Password change failed';
      toast.error(message);
      return { success: false, message };
    }
  };

  useEffect(() => {
    loadUser();
  }, [token]);

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!user,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};export default AuthContext;