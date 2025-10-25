// API service
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data),
  logout: () => api.get('/auth/logout'),
};

// Resources API
export const resourcesAPI = {
  getResources: (params = {}) => api.get('/resources', { params }),
  getResource: (id) => api.get(`/resources/${id}`),
  createResource: (data) => api.post('/resources', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateResource: (id, data) => api.put(`/resources/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteResource: (id) => api.delete(`/resources/${id}`),
  rateResource: (id, rating) => api.post(`/resources/${id}/rate`, { rating }),
  downloadResource: (id) => api.get(`/resources/${id}/download`),
};

// Analytics API
export const analyticsAPI = {
  getAnalytics: () => api.get('/analytics'),
};

// Users API
export const usersAPI = {
  getUsers: (params = {}) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
};

// Sessions API
export const sessionsAPI = {
  getSessions: () => api.get('/sessions'),
  createSession: (data) => api.post('/sessions', data),
  updateSession: (id, data) => api.put(`/sessions/${id}`, data),
  cancelSession: (id, reason) => api.put(`/sessions/${id}/cancel`, { reason }),
};

export default api;