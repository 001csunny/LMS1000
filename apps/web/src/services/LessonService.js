import BaseService from './BaseService';
import { Lesson, CreateLessonRequest, ApiResponse } from '../types';

/**
 * Lesson Service - Handles all lesson-related operations
 */
class LessonService extends BaseService {
  constructor() {
    super();
    this.endpoint = '/lessons';
  }

  /**
   * Get lesson by ID
   */
  async getLessonById(lessonId) {
    try {
      const data = await this.get(`/lessons/${lessonId}`);
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
   * Get public lesson by ID (no authentication required)
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
   * Create new lesson (Admin only)
   */
  async createLesson(createLessonRequest) {
    try {
      const validation = createLessonRequest.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      const data = await this.post('/lessons', {
        name: createLessonRequest.name,
        description: createLessonRequest.description,
        courseId: createLessonRequest.courseId,
        isPublic: createLessonRequest.isPublic
      });
      
      return ApiResponse.success(new Lesson(data));
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Update lesson (Admin only)
   */
  async updateLesson(lessonId, updateData) {
    try {
      const data = await this.put(`/lessons/${lessonId}`, updateData);
      return ApiResponse.success(new Lesson(data));
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Delete lesson (Admin only)
   */
  async deleteLesson(lessonId) {
    try {
      await this.delete(`/lessons/${lessonId}`);
      return ApiResponse.success(null, 'Lesson deleted successfully');
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Save lesson progress
   */
  async saveProgress(lessonId, xpEarned = 0) {
    try {
      const data = await this.post(`/lessons/${lessonId}/progress`, { xpEarned });
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Create challenge for lesson (Admin only)
   */
  async createChallenge(lessonId, name, wordIds = []) {
    try {
      const data = await this.post('/lessons/challenges', {
        name,
        lessonId,
        wordIds
      });
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Create test for lesson (Admin only)
   */
  async createTest(lessonId, name, wordIds = []) {
    try {
      const data = await this.post('/lessons/tests', {
        name,
        lessonId,
        wordIds
      });
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Create exam for lesson (Admin only)
   */
  async createExam(lessonId, name, wordIds = []) {
    try {
      const data = await this.post('/lessons/exams', {
        name,
        lessonId,
        wordIds
      });
      return ApiResponse.success(data);
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Delete challenge (Admin only)
   */
  async deleteChallenge(challengeId) {
    try {
      await this.delete(`/lessons/challenges/${challengeId}`);
      return ApiResponse.success(null, 'Challenge deleted successfully');
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Delete test (Admin only)
   */
  async deleteTest(testId) {
    try {
      await this.delete(`/lessons/tests/${testId}`);
      return ApiResponse.success(null, 'Test deleted successfully');
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }

  /**
   * Delete exam (Admin only)
   */
  async deleteExam(examId) {
    try {
      await this.delete(`/lessons/exams/${examId}`);
      return ApiResponse.success(null, 'Exam deleted successfully');
    } catch (error) {
      return ApiResponse.error(error.message);
    }
  }
}

// Singleton instance
const lessonService = new LessonService();
export default lessonService;
