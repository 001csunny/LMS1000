/**
 * Utility class following OOP principles for randomly distributing multiple choices
 */
export class ChoiceGenerator {
  /**
   * Generates a shuffled array of choices including the correct answer and distractors.
   * @param {string} correctAnswer - The correct answer to include
   * @param {Array<string>} pool - The pool of possible distractor answers
   * @param {number} count - Total number of choices to return (default: 4)
   * @returns {Array<string>} Shuffled array of choices
   */
  static generateChoices(correctAnswer, pool, count = 4) {
    const distractors = pool.filter(item => item !== correctAnswer);
    const selectedDistractors = [];
    
    // Randomly select distractors 
    while (selectedDistractors.length < count - 1 && distractors.length > 0) {
      const randomIndex = Math.floor(Math.random() * distractors.length);
      selectedDistractors.push(distractors.splice(randomIndex, 1)[0]);
    }
    
    const choices = [correctAnswer, ...selectedDistractors];
    
    // Shuffle using Fisher-Yates
    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }
    
    return choices;
  }
}

/**
 * Concrete implementation of the Repository Pattern for serving Mock Exercises
 */
export class MockExerciseRepository {
  constructor() {
    this.thaiVocabPool = [
      'สวัสดี', 'ขอบคุณ', 'ลาก่อน', 'ขอโทษ', 'ใช่', 'ไม่ใช่', 'สวย', 'อร่อย', 'รัก', 'ดื่มน้ำ', 'เพื่อน', 'ครู'
    ];
    
    this.mockData = [
      {
        id: 101,
        lessonId: 1,
        type: 'SPEAKING',
        question: 'พูดคำว่า: สวัสดี',
        answer: 'สวัสดี',
        vocabulary: { thaiWord: 'สวัสดี', englishWord: 'Hello', audioUrl: null }
      },
      {
        id: 102,
        lessonId: 1,
        type: 'TRANSLATION',
        question: 'คำว่า "Thank you" ในภาษาไทยคือ?',
        answer: 'ขอบคุณ',
        vocabulary: { thaiWord: 'ขอบคุณ', englishWord: 'Thank you' },
        choices: ChoiceGenerator.generateChoices('ขอบคุณ', this.thaiVocabPool)
      },
      {
        id: 103,
        lessonId: 1,
        type: 'LISTENING',
        question: 'ฟังแล้วเลือกคำให้ถูกต้อง',
        answer: 'ลาก่อน',
        audioUrl: null, // Mock audio fallback is handled in UI normally
        vocabulary: { thaiWord: 'ลาก่อน', englishWord: 'Goodbye' },
        choices: ChoiceGenerator.generateChoices('ลาก่อน', this.thaiVocabPool)
      },
      {
        id: 104,
        lessonId: 1,
        type: 'SPEAKING',
        question: 'พูดคำว่า: อร่อย',
        answer: 'อร่อย',
        vocabulary: { thaiWord: 'อร่อย', englishWord: 'Delicious' }
      },
      {
        id: 105,
        lessonId: 1,
        type: 'TRANSLATION',
        question: 'คำว่า "Beautiful" ในภาษาไทยคือ?',
        answer: 'สวย',
        vocabulary: { thaiWord: 'สวย', englishWord: 'Beautiful' },
        choices: ChoiceGenerator.generateChoices('สวย', this.thaiVocabPool)
      }
    ];
  }

  /**
   * Fetch Exercises safely mimicking an asynchronous API operation
   */
  async getExercisesByLesson(lessonId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.mockData]);
      }, 500); 
    });
  }
}

export const mockExerciseService = new MockExerciseRepository();
export default mockExerciseService;
