import BaseService from './BaseService';
import { Lesson, ApiResponse } from '../types';

/**
 * Lesson Service - Handles all lesson-related operations
 */
class LessonService extends BaseService {
  constructor() {
    super();
    this.basePath = '/lessons';
  }

  /**
   * Get lessons by course ID
   */
  async findByCourse(courseId) {
    try {
      const data = await this.get(`/courses/${courseId}/lessons`);
      return this.transformResponse(data, Lesson);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get lesson by ID
   */
  async findOne(id) {
    try {
      const data = await this.get(`/lessons/${id}`);
      return new Lesson(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new lesson
   */
  async create(data) {
    try {
      const response = await this.post('/lessons', data);
      return new Lesson(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update lesson
   */
  async update(id, data) {
    try {
      const response = await this.patch(`/lessons/${id}`, data);
      return new Lesson(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete lesson
   */
  async remove(id) {
    try {
      await this.delete(`/lessons/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Legacy method for backward compatibility
   */
  async getLessonById(lessonId) {
    return this.findOne(lessonId);
  }

  /**
   * Get public lesson by ID (Legacy Alias)
   */
  async getPublicLessonById(lessonId) {
    try {
      const data = await this.get(`/public/lessons/${lessonId}`);
      return new Lesson(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get public lessons (no authentication required)
   */
  async getPublicLessons() {
    try {
      const data = await this.get('/public/lessons');
      return this.transformResponse(data, Lesson);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Save lesson progress
   */
  async saveProgress(lessonId, xpEarned = 0) {
    try {
      // Backend: @Post(':id/progress') in LessonsController
      const data = await this.post(`/lessons/${lessonId}/progress`, { xpEarned });
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }
}

const lessonService = new LessonService();
export default lessonService;
