import axios from 'axios';
import conf from '../conf/main';
import { ApiResponse } from '../types';

/**
 * Base Service Class implementing OOP principles
 * Provides common CRUD operations and error handling
 */
class BaseService {
  constructor() {
    this.client = this.createAxiosInstance();
    this.baseURL = conf.urlPrefix;
  }

  /**
   * Create configured axios instance
   */
  createAxiosInstance() {
    const instance = axios.create({
      baseURL: conf.urlPrefix,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for authentication
    instance.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem(conf.jwtSessionStorageKey);
        if (token && !config.url.includes('/auth/login')) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleApiError(error);
        return Promise.reject(error);
      }
    );

    return instance;
  }

  /**
   * Handle API errors globally
   */
  handleApiError(error) {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          this.handleUnauthorized();
          break;
        case 403:
          this.handleForbidden();
          break;
        case 404:
          console.warn('Resource not found:', data?.message || 'Not found');
          break;
        case 500:
          console.error('Server error:', data?.message || 'Internal server error');
          break;
        default:
          console.error('API error:', data?.message || error.message);
      }
    } else if (error.request) {
      console.error('Network error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
  }

  /**
   * Handle unauthorized access
   */
  handleUnauthorized() {
    sessionStorage.removeItem(conf.jwtSessionStorageKey);
    sessionStorage.removeItem('userRole');
    window.location.href = '/Login';
  }

  /**
   * Handle forbidden access
   */
  handleForbidden() {
    window.location.href = '/403';
  }

  /**
   * Generic GET request
   */
  async get(endpoint, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  /**
   * Generic POST request
   */
  async post(endpoint, data = {}) {
    try {
      const response = await this.client.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  /**
   * Generic PUT request
   */
  async put(endpoint, data = {}) {
    try {
      const response = await this.client.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  /**
   * Generic PATCH request
   */
  async patch(endpoint, data = {}) {
    try {
      const response = await this.client.patch(endpoint, data);
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  /**
   * Generic DELETE request
   */
  async delete(endpoint) {
    try {
      const response = await this.client.delete(endpoint);
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  /**
   * Format error for consistent error handling
   */
  formatError(error) {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    return error;
  }

  /**
   * Build query string from parameters
   */
  buildQueryString(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query.append(key, value);
      }
    });
    return query.toString();
  }

  /**
   * Transform API response to domain objects
   */
  transformResponse(data, ModelClass) {
    if (Array.isArray(data)) {
      return data.map(item => new ModelClass(item));
    }
    return new ModelClass(data);
  }
}

export default BaseService;
