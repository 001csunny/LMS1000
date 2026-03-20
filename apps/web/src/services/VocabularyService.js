import BaseService from './BaseService';

/**
 * Vocabulary Service for managing vocabulary words
 * Extends BaseService for common API operations
 */
class VocabularyService extends BaseService {
  constructor() {
    super();
    this.basePath = '/vocabulary';
  }

  /**
   * Get all vocabularies for a lesson
   */
  async getVocabulariesByLesson(lessonId) {
    return this.get(`/lesson/${lessonId}`);
  }

  /**
   * Create new vocabulary
   */
  async createVocabulary(vocabularyData) {
    return this.post('', vocabularyData);
  }

  /**
   * Update vocabulary
   */
  async updateVocabulary(id, vocabularyData) {
    return this.patch(`/${id}`, vocabularyData);
  }

  /**
   * Delete vocabulary
   */
  async deleteVocabulary(id) {
    return this.delete(`/${id}`);
  }

  /**
   * Get single vocabulary
   */
  async getVocabulary(id) {
    return this.get(`/${id}`);
  }

  /**
   * Search vocabularies
   */
  async searchVocabularies(query, lessonId = null) {
    const params = new URLSearchParams({ q: query });
    if (lessonId) {
      params.append('lessonId', lessonId);
    }
    return this.get(`/search?${params}`);
  }

  /**
   * Get all vocabularies (admin only)
   */
  async getAllVocabularies() {
    return this.get('');
  }
}

const vocabularyService = new VocabularyService();
export default vocabularyService;
