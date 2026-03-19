import BaseService from './BaseService';
import { Course, CreateCourseRequest, ApiResponse } from '../types';

/**
 * Course Service - Handles all course-related operations
 */
class CourseService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/courses';
  }

  /**
   * Get all courses
   */
  async getAllCourses() {
    try {
      const data = await this.get('/courses');
      return this.transformResponse(data, Course);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get public courses (no authentication required)
   */
  async getPublicCourses() {
    try {
      const data = await this.get('/public/courses');
      return this.transformResponse(data, Course);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get course by ID
   */
  async getCourseById(courseId) {
    try {
      const data = await this.get(`/courses/${courseId}`);
      return new Course(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get public course by ID (no authentication required)
   */
  async getPublicCourseById(courseId) {
    try {
      const data = await this.get(`/public/courses/${courseId}`);
      return new Course(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user's courses based on role
   */
  async getMyCourses(role = 'USER', userId = null) {
    try {
      const params = role ? { role } : {};
      const data = await this.get('/courses/mine', params);
      return this.transformResponse(data, Course);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new course (Admin only)
   */
  async createCourse(createCourseRequest) {
    try {
      const validation = createCourseRequest.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const data = await this.post('/courses', {
        name: createCourseRequest.name,
        description: createCourseRequest.description,
        isPublic: createCourseRequest.isPublic
      });
      
      return ApiResponse.success(new Course(data));
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Update course (Admin only)
   */
  async updateCourse(courseId, updateData) {
    try {
      const data = await this.put(`/courses/${courseId}`, updateData);
      return ApiResponse.success(new Course(data));
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Delete course (Admin only)
   */
  async deleteCourse(courseId) {
    try {
      await this.delete(`/courses/${courseId}`);
      return ApiResponse.success(null, 'Course deleted successfully');
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Enroll student in course (Admin only)
   */
  async enrollStudent(courseId, studentId) {
    try {
      const data = await this.post(`/courses/${courseId}/enroll/${studentId}`);
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Remove student from course (Admin only)
   */
  async removeStudent(courseId, studentId) {
    try {
      const data = await this.delete(`/courses/${courseId}/enroll/${studentId}`);
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Get course statistics
   */
  async getCourseStats(courseId) {
    try {
      const data = await this.get(`/courses/${courseId}/stats`);
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }
}

// Singleton instance
const courseService = new CourseService();
export default courseService;
