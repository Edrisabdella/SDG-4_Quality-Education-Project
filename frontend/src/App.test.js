import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the components that might cause issues
jest.mock('./components/layout/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock('./components/layout/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

jest.mock('./pages/Home', () => {
  return function MockHome() {
    return <div data-testid="mock-home">Home Page</div>;
  };
});

// Mock the AuthContext
jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    user: null,
    loading: false,
    isAuthenticated: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  }),
}));

test('renders OpenLearn app without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  expect(screen.getByTestId('mock-home')).toBeInTheDocument();
  expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
});

test('renders app with correct structure', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  const appElement = screen.getByText('Home Page');
  expect(appElement).toBeInTheDocument();
});