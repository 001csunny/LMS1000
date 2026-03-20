import BaseService from './BaseService';

/**
 * Exercise Service for managing learning exercises
 * Extends BaseService for common API operations
 */
class ExerciseService extends BaseService {
  constructor() {
    super();
    this.basePath = '/exercises';
  }

  /**
   * Get all exercises for a lesson
   */
  async getExercisesByLesson(lessonId) {
    return this.get(`/exercises/lesson/${lessonId}`);
  }

  /**
   * Get exercises by type
   */
  async getExercisesByType(type, lessonId = null) {
    const params = new URLSearchParams({ type });
    if (lessonId) {
      params.append('lessonId', lessonId);
    }
    return this.get(`/exercises/type?${params}`);
  }

  /**
   * Create new exercise
   */
  async createExercise(exerciseData) {
    return this.post('/exercises', exerciseData);
  }

  /**
   * Update exercise
   */
  async updateExercise(id, exerciseData) {
    return this.patch(`/exercises/${id}`, exerciseData);
  }

  /**
   * Delete exercise
   */
  async deleteExercise(id) {
    return this.delete(`/exercises/${id}`);
  }

  /**
   * Get single exercise
   */
  async getExercise(id) {
    return this.get(`/exercises/${id}`);
  }

  /**
   * Get next exercise in lesson
   */
  async getNextExercise(currentExerciseId) {
    return this.get(`/exercises/next/${currentExerciseId}`);
  }

  /**
   * Get exercise count for lesson
   */
  async getExerciseCount(lessonId) {
    return this.get(`/exercises/count/${lessonId}`);
  }

  /**
   * Get all exercises (admin only)
   */
  async getAllExercises() {
    return this.get('/exercises');
  }
}

const exerciseService = new ExerciseService();
export default exerciseService;
