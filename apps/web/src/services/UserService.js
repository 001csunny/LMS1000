import BaseService from './BaseService';
import { User, CreateUserRequest, ApiResponse } from '../types';

/**
 * User Service - Handles all user-related operations
 */
class UserService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/users';
  }

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    try {
      const data = await this.get('/users/me');
      return new User(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update current user profile
   */
  async updateCurrentUser(userData) {
    try {
      const data = await this.put('/users/me', userData);
      return new User(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new user (Admin only)
   */
  async createUser(createUserRequest) {
    try {
      const validation = createUserRequest.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const data = await this.post('/users', {
        email: createUserRequest.email,
        username: createUserRequest.username,
        password: createUserRequest.password,
        role: createUserRequest.role
      });
      
      return ApiResponse.success(new User(data));
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Get all users (Admin only)
   */
  async getAllUsers() {
    try {
      const data = await this.get('/users');
      return this.transformResponse(data, User);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by ID (Admin only)
   */
  async getUserById(userId) {
    try {
      const data = await this.get(`/users/${userId}`);
      return new User(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update user password
   */
  async updatePassword(currentPassword, newPassword) {
    try {
      const data = await this.patch('/users/me/password', {
        currentPassword,
        newPassword
      });
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Add XP to user
   */
  async addXp(amount) {
    try {
      const data = await this.patch('/users/me/xp', { amount });
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Increment user streak
   */
  async incrementStreak() {
    try {
      const data = await this.patch('/users/me/streak');
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Get leaderboard
   */
  async getLeaderboard() {
    try {
      const data = await this.get('/users/leaderboard');
      return this.transformResponse(data, User);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete user (Admin only)
   */
  async deleteUser(userId) {
    try {
      await this.delete(`/users/${userId}`);
      return ApiResponse.success(null, 'User deleted successfully');
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }
}

// Singleton instance
const userService = new UserService();
export default userService;
