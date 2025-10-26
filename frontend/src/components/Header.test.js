import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../layout/Header';

// Create a simple mock for the AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    logout: jest.fn(),
    isAuthenticated: false,
  }),
}));

describe('Header Component', () => {
  test('renders logo and navigation links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('OpenLearn')).toBeInTheDocument();
    expect(screen.getByText('Problem')).toBeInTheDocument();
    expect(screen.getByText('Solution')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  test('shows login and register buttons when not authenticated', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('mobile menu button exists', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const mobileButton = screen.getByRole('button', { name: /menu/i });
    expect(mobileButton).toBeInTheDocument();
  });
});