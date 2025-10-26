import axios from 'axios';
import { authAPI, resourcesAPI } from '../api';

// Mock axios
jest.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Auth API', () => {
    test('register makes correct API call', async () => {
      const mockData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      const mockResponse = { data: { success: true, token: 'abc123', user: mockData } };

      axios.post.mockResolvedValue(mockResponse);

      const result = await authAPI.register(mockData);

      expect(axios.post).toHaveBeenCalledWith('/auth/register', mockData);
      expect(result).toEqual(mockResponse);
    });

    test('login makes correct API call', async () => {
      const mockData = {
        email: 'test@example.com',
        password: 'password123'
      };
      const mockResponse = { data: { success: true, token: 'abc123', user: mockData } };

      axios.post.mockResolvedValue(mockResponse);

      const result = await authAPI.login(mockData);

      expect(axios.post).toHaveBeenCalledWith('/auth/login', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Resources API', () => {
    test('getResources makes correct API call', async () => {
      const mockResponse = { data: { success: true, data: [] } };
      axios.get.mockResolvedValue(mockResponse);

      const result = await resourcesAPI.getResources();

      expect(axios.get).toHaveBeenCalledWith('/resources', { params: {} });
      expect(result).toEqual(mockResponse);
    });

    test('getResource makes correct API call with ID', async () => {
      const mockResponse = { data: { success: true, data: {} } };
      axios.get.mockResolvedValue(mockResponse);

      const result = await resourcesAPI.getResource('123');

      expect(axios.get).toHaveBeenCalledWith('/resources/123');
      expect(result).toEqual(mockResponse);
    });
  });
});