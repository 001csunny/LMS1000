import BaseService from './BaseService';

/**
 * Vocabulary Service for managing vocabulary words
 */
class VocabularyService extends BaseService {
  constructor() {
    super();
    this.basePath = '/vocabulary';
  }

  /**
   * Get all vocabularies for a lesson
   */
  async findByLesson(lessonId) {
    return this.get(`/vocabulary/lesson/${lessonId}`);
  }

  /**
   * Get single vocabulary
   */
  async findOne(id) {
    return this.get(`/vocabulary/${id}`);
  }

  /**
   * Create new vocabulary
   */
  async create(data) {
    return this.post('/vocabulary', data);
  }

  /**
   * Update vocabulary
   */
  async update(id, data) {
    return this.patch(`/vocabulary/${id}`, data);
  }

  /**
   * Delete vocabulary
   */
  async remove(id) {
    return this.delete(`/vocabulary/${id}`);
  }

  /**
   * Search vocabularies
   */
  async search(query, lessonId = null) {
    const params = new URLSearchParams({ q: query });
    if (lessonId) {
      params.append('lessonId', lessonId);
    }
    return this.get(`/search?${params}`);
  }

  /**
   * Get all vocabularies (admin only)
   */
  async getAll() {
    return this.get('');
  }
}

const vocabularyService = new VocabularyService();
export default vocabularyService;
