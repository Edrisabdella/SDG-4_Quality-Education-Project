// Header component
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <Link to="/" className="logo-text">OpenLearn</Link>
          </div>

          {/* Desktop Navigation */}
          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li>
              <a 
                href="#problem" 
                className={isActiveRoute('/') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                Problem
              </a>
            </li>
            <li>
              <a 
                href="#solution" 
                onClick={closeMobileMenu}
              >
                Solution
              </a>
            </li>
            <li>
              <a 
                href="#features" 
                onClick={closeMobileMenu}
              >
                Features
              </a>
            </li>
            <li>
              <Link 
                to="/resources" 
                className={isActiveRoute('/resources') ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                Resources
              </Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={isActiveRoute('/dashboard') ? 'active' : ''}
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/sessions" 
                    className={isActiveRoute('/sessions') ? 'active' : ''}
                    onClick={closeMobileMenu}
                  >
                    Sessions
                  </Link>
                </li>
                
                {/* User Menu */}
                <li className="user-menu-container">
                  <button 
                    className="user-menu-btn"
                    onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                  >
                    <User size={20} />
                    <span>{user?.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="user-menu">
                      <Link 
                        to="/profile" 
                        className="user-menu-item"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={16} />
                        Profile & Settings
                      </Link>
                      <button 
                        className="user-menu-item logout-btn"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <div className="auth-buttons">
                <li>
                  <Link 
                    to="/login" 
                    className="btn btn-outline"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="btn btn-primary"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </li>
              </div>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;