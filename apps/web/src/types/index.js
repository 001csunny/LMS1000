// User Types
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

// API Response Types
export class ApiResponse {
  constructor(data = null, message = '', success = true, statusCode = 200) {
    this.data = data;
    this.message = message;
    this.success = success;
    this.statusCode = statusCode;
  }

  static success(data, message = 'Success') {
    return new ApiResponse(data, message, true, 200);
  }

  static error(message, statusCode = 400, data = null) {
    return new ApiResponse(data, message, false, statusCode);
  }
}

// User Interface
export class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.email = data.email || '';
    this.username = data.username || '';
    this.role = data.role || USER_ROLES.USER;
    this.xp = data.xp || 0;
    this.streak = data.streak || 0;
    this.speechToken = data.speechToken || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }

  isAdmin() {
    return this.role === USER_ROLES.ADMIN;
  }

  isRegularUser() {
    return this.role === USER_ROLES.USER;
  }

  getDisplayName() {
    return this.username || this.email;
  }
}

// Course Interface
export class Course {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.isPublic = data.isPublic || false;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.lessons = data.lessons || [];
    this.teachers = data.teachers || [];
    this.students = data.students || [];
  }

  getStudentCount() {
    return Array.isArray(this.students) ? this.students.length : 0;
  }

  getLessonCount() {
    return Array.isArray(this.lessons) ? this.lessons.length : 0;
  }

  getPublicLessons() {
    return this.lessons.filter(lesson => lesson.isPublic);
  }
}

// Lesson Interface
export class Lesson {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.courseId = data.courseId || null;
    this.isPublic = data.isPublic || false;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.course = data.course || null;
    this.challenges = data.challenges || [];
    this.tests = data.tests || [];
    this.exams = data.exams || [];
    this.progress = data.progress || [];
  }

  hasContent() {
    return this.challenges.length > 0 || this.tests.length > 0 || this.exams.length > 0;
  }

  getTotalActivities() {
    return this.challenges.length + this.tests.length + this.exams.length;
  }
}

// Challenge/Test/Exam Base Class
export class Activity {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.lessonId = data.lessonId || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
    this.words = data.words || [];
  }

  getWordCount() {
    return this.words.length;
  }
}

export class Challenge extends Activity {
  constructor(data = {}) {
    super(data);
    this.type = 'challenge';
  }
}

export class Test extends Activity {
  constructor(data = {}) {
    super(data);
    this.type = 'test';
  }
}

export class Exam extends Activity {
  constructor(data = {}) {
    super(data);
    this.type = 'exam';
  }
}

// Word Interface
export class Word {
  constructor(data = {}) {
    this.id = data.id || null;
    this.word = data.word || '';
    this.audioUrl = data.audioUrl || null;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}

// Progress Interface
export class Progress {
  constructor(data = {}) {
    this.id = data.id || null;
    this.userId = data.userId || null;
    this.lessonId = data.lessonId || null;
    this.completed = data.completed || false;
    this.xpEarned = data.xpEarned || 0;
    this.createdAt = data.createdAt || null;
    this.updatedAt = data.updatedAt || null;
  }
}

// Form Types
export class CreateUserRequest {
  constructor(data = {}) {
    this.email = data.email || '';
    this.username = data.username || '';
    this.password = data.password || '';
    this.role = data.role || USER_ROLES.USER;
  }

  validate() {
    const errors = [];
    
    if (!this.email) errors.push('Email is required');
    if (!this.username) errors.push('Username is required');
    if (!this.password) errors.push('Password is required');
    if (this.password.length < 6) errors.push('Password must be at least 6 characters');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class CreateCourseRequest {
  constructor(data = {}) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.isPublic = data.isPublic || false;
  }

  validate() {
    const errors = [];
    
    if (!this.name) errors.push('Course name is required');
    if (this.name.length < 3) errors.push('Course name must be at least 3 characters');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export class CreateLessonRequest {
  constructor(data = {}) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.courseId = data.courseId || null;
    this.isPublic = data.isPublic || false;
  }

  validate() {
    const errors = [];
    
    if (!this.name) errors.push('Lesson name is required');
    if (!this.courseId) errors.push('Course ID is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
