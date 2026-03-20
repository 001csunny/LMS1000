import BaseService from './BaseService';
import { User, ApiResponse } from '../types';

/**
 * Authentication Service - Handles login, logout, and token management
 */
class AuthService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/auth';
  }

  /**
   * User login
   */
  async login(email, password) {
    try {
      const response = await this.post('/auth/login', {
        email,
        password
      });

      if (response.access_token && response.user) {
        // Store token and user info
        sessionStorage.setItem('auth.jwt', response.access_token);
        sessionStorage.setItem('userRole', response.user.role);
        sessionStorage.setItem('userInfo', JSON.stringify(response.user));

        // Update axios default headers
        this.client.defaults.headers.common['Authorization'] = `Bearer ${response.access_token}`;

        return ApiResponse.success({
          token: response.access_token,
          user: new User(response.user)
        });
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      return ApiResponse.error(error.message || 'Login failed');
    }
  }

  /**
   * User logout
   */
  async logout() {
    try {
      // Clear session storage
      sessionStorage.removeItem('auth.jwt');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('userInfo');

      // Clear axios headers
      delete this.client.defaults.headers.common['Authorization'];

      return ApiResponse.success(null, 'Logged out successfully');
    } catch (error) {
      return ApiResponse.error(error.message || 'Logout failed');
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser() {
    try {
      const token = sessionStorage.getItem('auth.jwt');
      if (!token) {
        return null;
      }

      const data = await this.get('/users/me');
      return new User(data);
    } catch (error) {
      // Token might be expired, clear it
      this.logout();
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!sessionStorage.getItem('auth.jwt');
  }

  /**
   * Get current user role
   */
  getCurrentRole() {
    return sessionStorage.getItem('userRole') || 'USER';
  }

  /**
   * Get current user info from session storage
   */
  getCurrentUserInfo() {
    const userInfo = sessionStorage.getItem('userInfo');
    return userInfo ? new User(JSON.parse(userInfo)) : null;
  }

  /**
   * Check if user has specific role
   */
  hasRole(requiredRoles) {
    const currentRole = this.getCurrentRole();
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(currentRole);
    }
    return currentRole === requiredRoles;
  }

  /**
   * Check if user is admin
   */
  isAdmin() {
    return this.getCurrentRole() === 'ADMIN';
  }

  /**
   * Refresh token (if implemented)
   */
  async refreshToken() {
    try {
      // This would depend on backend implementation
      // For now, return current token validation
      return await this.getCurrentUser();
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }
}

// Singleton instance
const authService = new AuthService();
export default authService;
