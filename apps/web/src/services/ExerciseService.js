import BaseService from './BaseService';

/**
 * Exercise Service for managing lesson exercises
 */
class ExerciseService extends BaseService {
  constructor() {
    super();
    this.basePath = '/exercises';
  }

  /**
   * Get all exercises for a lesson
   */
  async findByLesson(lessonId) {
    return this.get(`/exercises/lesson/${lessonId}`);
  }

  /**
   * Get single exercise
   */
  async findOne(id) {
    return this.get(`/exercises/${id}`);
  }

  /**
   * Create new exercise
   */
  async create(data) {
    return this.post('/exercises', data);
  }

  /**
   * Update exercise
   */
  async update(id, data) {
    return this.patch(`/exercises/${id}`, data);
  }

  /**
   * Delete exercise
   */
  async remove(id) {
    return this.delete(`/exercises/${id}`);
  }

  /**
   * Get sequence of exercises for a lesson
   */
  async getSequence(lessonId) {
    return this.get(`/exercises/lesson/${lessonId}/sequence`);
  }
}

const exerciseService = new ExerciseService();
export default exerciseService;
