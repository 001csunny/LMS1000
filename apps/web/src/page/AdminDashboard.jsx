import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Loading, MainLayout } from '../components/ui';
import { User, Course, Lesson, CreateUserRequest, CreateCourseRequest, CreateLessonRequest } from '../types';
import userService from '../services/UserService';
import courseService from '../services/CourseService';
import lessonService from '../services/LessonService';
import vocabularyService from '../services/VocabularyService';
import exerciseService from '../services/ExerciseService';

/**
 * Admin Dashboard Component
 * Provides comprehensive admin functionality for user and content management
 */
const AdminDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [vocabularies, setVocabularies] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showVocabularyModal, setShowVocabularyModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  
  // Form states
  const [userForm, setUserForm] = useState(new CreateUserRequest());
  const [courseForm, setCourseForm] = useState(new CreateCourseRequest());
  const [lessonForm, setLessonForm] = useState(new CreateLessonRequest());
  const [vocabularyForm, setVocabularyForm] = useState({
    lessonId: '',
    thaiWord: '',
    englishWord: '',
    audioUrl: '',
    imageUrl: '',
    difficulty: 'BEGINNER'
  });
  const [exerciseForm, setExerciseForm] = useState({
    lessonId: '',
    vocabularyId: '',
    type: 'TRANSLATION',
    question: '',
    answer: '',
    audioUrl: '',
    imageUrl: '',
    hints: [],
    orderIndex: 0
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [usersData, coursesData] = await Promise.all([
        userService.getAllUsers(),
        courseService.getAllCourses()
      ]);
      
      setUsers(usersData);
      setCourses(coursesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // Load lesson-specific data
  const loadLessonData = async (lessonId) => {
    try {
      const [vocabData, exerciseData] = await Promise.all([
        vocabularyService.getVocabulariesByLesson(lessonId),
        exerciseService.getExercisesByLesson(lessonId)
      ]);
      setVocabularies(vocabData);
      setExercises(exerciseData);
    } catch (err) {
      setError(err.message || 'Failed to load lesson data');
    }
  };

  // User management functions
  const handleCreateUser = async () => {
    try {
      const validation = userForm.validate();
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return;
      }

      await userService.createUser(userForm);
      setShowUserModal(false);
      setUserForm(new CreateUserRequest());
      await loadData(); // Refresh user list
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('คุณแน่ใจว่าจะลบผู้ใช้นี้?')) return;
    
    try {
      await userService.deleteUser(userId);
      await loadData(); // Refresh user list
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  // Course management functions
  const handleCreateCourse = async () => {
    try {
      const validation = courseForm.validate();
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return;
      }

      await courseService.createCourse(courseForm);
      setShowCourseModal(false);
      setCourseForm(new CreateCourseRequest());
      await loadData(); // Refresh course list
    } catch (err) {
      setError(err.message || 'Failed to create course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('คุณแน่ใจว่าจะลบคอร์สนี้?')) return;
    
    try {
      await courseService.deleteCourse(courseId);
      await loadData(); // Refresh course list
    } catch (err) {
      setError(err.message || 'Failed to delete course');
    }
  };

  // Lesson management functions
  const handleCreateLesson = async () => {
    try {
      const validation = lessonForm.validate();
      if (!validation.isValid) {
        setError(validation.errors.join(', '));
        return;
      }

      await lessonService.createLesson(lessonForm);
      setShowLessonModal(false);
      setLessonForm(new CreateLessonRequest());
    } catch (err) {
      setError(err.message || 'Failed to create lesson');
    }
  };

  // Vocabulary management functions
  const handleCreateVocabulary = async () => {
    try {
      if (!vocabularyForm.lessonId || !vocabularyForm.thaiWord || !vocabularyForm.englishWord) {
        setError('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }

      await vocabularyService.createVocabulary(vocabularyForm);
      setShowVocabularyModal(false);
      setVocabularyForm({
        lessonId: '',
        thaiWord: '',
        englishWord: '',
        audioUrl: '',
        imageUrl: '',
        difficulty: 'BEGINNER'
      });
      if (vocabularyForm.lessonId) {
        await loadLessonData(vocabularyForm.lessonId);
      }
    } catch (err) {
      setError(err.message || 'Failed to create vocabulary');
    }
  };

  // Exercise management functions
  const handleCreateExercise = async () => {
    try {
      if (!exerciseForm.lessonId || !exerciseForm.vocabularyId || !exerciseForm.type || !exerciseForm.question || !exerciseForm.answer) {
        setError('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }

      await exerciseService.createExercise(exerciseForm);
      setShowExerciseModal(false);
      setExerciseForm({
        lessonId: '',
        vocabularyId: '',
        type: 'TRANSLATION',
        question: '',
        answer: '',
        audioUrl: '',
        imageUrl: '',
        hints: [],
        orderIndex: 0
      });
      if (exerciseForm.lessonId) {
        await loadLessonData(exerciseForm.lessonId);
      }
    } catch (err) {
      setError(err.message || 'Failed to create exercise');
    }
  };

  if (loading && users.length === 0 && courses.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" text="กำลังโหลดข้อมูล..." />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ดผู้ดูแล</h1>
            <Button 
              variant="secondary" 
              onClick={() => window.location.href = '/'}
            >
              กลับสู่หน้าหลัก
            </Button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <Card variant="error">
            <CardBody className="text-red-700">
              {error}
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2"
                onClick={() => setError('')}
              >
                ✕
              </Button>
            </CardBody>
          </Card>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['users', 'courses', 'lessons', 'vocabularies', 'exercises'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'users' && 'จัดการผู้ใช้'}
                {tab === 'courses' && 'จัดการคอร์ส'}
                {tab === 'lessons' && 'จัดการบทเรียน'}
                {tab === 'vocabularies' && 'จัดการคำศัพท์'}
                {tab === 'exercises' && 'จัดการแบบฝึกหัด'}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">จัดการผู้ใช้</h2>
              <Button onClick={() => setShowUserModal(true)}>
                + เพิ่มผู้ใช้ใหม่
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card key={user.id} hover className="relative">
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{user.getDisplayName()}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isAdmin() ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          แก้ไข
                        </Button>
                        <Button 
                          size="sm" 
                          variant="danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          ลบ
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">จัดการคอร์ส</h2>
              <Button onClick={() => setShowCourseModal(true)}>
                + เพิ่มคอร์สใหม่
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} hover>
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-sm text-gray-500">
                            นักเรียน: {course.getStudentCount?.() || 0}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            course.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {course.isPublic ? 'สาธารณะ' : 'ส่วนตัว'}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          แก้ไข
                        </Button>
                        <Button 
                          size="sm" 
                          variant="danger"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          ลบ
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">จัดการบทเรียน</h2>
              <Button onClick={() => setShowLessonModal(true)}>
                + เพิ่มบทเรียนใหม่
              </Button>
            </div>
            
            <div className="text-center py-12 text-gray-500">
              บทเรียนจะแสดงที่นี่ พร้อมตัวเลือกคอร์ส
            </div>
          </div>
        )}

        {/* Vocabularies Tab */}
        {activeTab === 'vocabularies' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">จัดการคำศัพท์</h2>
              <Button onClick={() => setShowVocabularyModal(true)}>
                + เพิ่มคำศัพท์ใหม่
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vocabularies.map((vocab) => (
                <Card key={vocab.id} hover>
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{vocab.thaiWord}</h3>
                        <p className="text-sm text-gray-500">{vocab.englishWord}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          vocab.difficulty === 'BEGINNER' ? 'bg-green-100 text-green-800' :
                          vocab.difficulty === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {vocab.difficulty}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          แก้ไข
                        </Button>
                        <Button size="sm" variant="danger">
                          ลบ
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Exercises Tab */}
        {activeTab === 'exercises' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">จัดการแบบฝึกหัด</h2>
              <Button onClick={() => setShowExerciseModal(true)}>
                + เพิ่มแบบฝึกหัดใหม่
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <Card key={exercise.id} hover>
                  <CardBody>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{exercise.question}</h3>
                        <p className="text-sm text-gray-500">{exercise.answer}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          exercise.type === 'TRANSLATION' ? 'bg-blue-100 text-blue-800' :
                          exercise.type === 'SPEAKING' ? 'bg-purple-100 text-purple-800' :
                          exercise.type === 'LISTENING' ? 'bg-green-100 text-green-800' :
                          exercise.type === 'READING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {exercise.type}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          แก้ไข
                        </Button>
                        <Button size="sm" variant="danger">
                          ลบ
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Creation Modal */}
      <Modal 
        isOpen={showUserModal} 
        onClose={() => setShowUserModal(false)}
        size="md"
      >
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">เพิ่มผู้ใช้ใหม่</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="อีเมล"
              type="email"
              value={userForm.email}
              onChange={(e) => setUserForm({...userForm, email: e.target.value})}
              placeholder="user@example.com"
              required
            />
            <Input
              label="ชื่อผู้ใช้"
              value={userForm.username}
              onChange={(e) => setUserForm({...userForm, username: e.target.value})}
              placeholder="ชื่อผู้ใช้"
              required
            />
            <Input
              label="รหัสผ่าน"
              type="password"
              value={userForm.password}
              onChange={(e) => setUserForm({...userForm, password: e.target.value})}
              placeholder="รหัสผ่าน"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">บทบาท</label>
              <select
                value={userForm.role}
                onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="USER">ผู้ใช้ทั่วไป</option>
                <option value="ADMIN">ผู้ดูแล</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowUserModal(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleCreateUser}>
              สร้างผู้ใช้
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Course Creation Modal */}
      <Modal 
        isOpen={showCourseModal} 
        onClose={() => setShowCourseModal(false)}
        size="md"
      >
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">เพิ่มคอร์สใหม่</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="ชื่อคอร์ส"
              value={courseForm.name}
              onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
              placeholder="ชื่อคอร์ส"
              required
            />
            <Textarea
              label="คำอธิบาย"
              value={courseForm.description}
              onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
              placeholder="คำอธิบายคอร์ส"
              rows={3}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublic"
                checked={courseForm.isPublic}
                onChange={(e) => setCourseForm({...courseForm, isPublic: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
                ทำให้เป็นสาธารณะ (ผู้ใช้ทั่วไปสามารถเข้าถึงได้)
              </label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleCreateCourse}>
              สร้างคอร์ส
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Lesson Creation Modal */}
      <Modal 
        isOpen={showLessonModal} 
        onClose={() => setShowLessonModal(false)}
        size="md"
      >
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">เพิ่มบทเรียนใหม่</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="ชื่อบทเรียน"
              value={lessonForm.name}
              onChange={(e) => setLessonForm({...lessonForm, name: e.target.value})}
              placeholder="ชื่อบทเรียน"
              required
            />
            <Textarea
              label="คำอธิบาย"
              value={lessonForm.description}
              onChange={(e) => setLessonForm({...lessonForm, description: e.target.value})}
              placeholder="คำอธิบายบทเรียน"
              rows={3}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">คอร์ส</label>
              <select
                value={lessonForm.courseId}
                onChange={(e) => setLessonForm({...lessonForm, courseId: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">เลือกคอร์ส</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowLessonModal(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleCreateLesson}>
              สร้างบทเรียน
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Vocabulary Creation Modal */}
      <Modal 
        isOpen={showVocabularyModal} 
        onClose={() => setShowVocabularyModal(false)}
        size="md"
      >
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">เพิ่มคำศัพท์ใหม่</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">บทเรียน</label>
              <select
                value={vocabularyForm.lessonId}
                onChange={(e) => setVocabularyForm({...vocabularyForm, lessonId: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">เลือกบทเรียน</option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>{lesson.name}</option>
                ))}
              </select>
            </div>
            <Input
              label="คำภาษาไทย"
              value={vocabularyForm.thaiWord}
              onChange={(e) => setVocabularyForm({...vocabularyForm, thaiWord: e.target.value})}
              placeholder="คำภาษาไทย"
              required
            />
            <Input
              label="คำภาษาอังกฤษ"
              value={vocabularyForm.englishWord}
              onChange={(e) => setVocabularyForm({...vocabularyForm, englishWord: e.target.value})}
              placeholder="คำภาษาอังกฤษ"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ระดับความยาก</label>
              <select
                value={vocabularyForm.difficulty}
                onChange={(e) => setVocabularyForm({...vocabularyForm, difficulty: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="BEGINNER">เริ่มต้น</option>
                <option value="INTERMEDIATE">กลาง</option>
                <option value="ADVANCED">ขั้นสูง</option>
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowVocabularyModal(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleCreateVocabulary}>
              สร้างคำศัพท์
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* Exercise Creation Modal */}
      <Modal 
        isOpen={showExerciseModal} 
        onClose={() => setShowExerciseModal(false)}
        size="md"
      >
        <ModalHeader>
          <h3 className="text-lg font-medium text-gray-900">เพิ่มแบบฝึกหัดใหม่</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">บทเรียน</label>
              <select
                value={exerciseForm.lessonId}
                onChange={(e) => setExerciseForm({...exerciseForm, lessonId: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">เลือกบทเรียน</option>
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>{lesson.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">คำศัพท์</label>
              <select
                value={exerciseForm.vocabularyId}
                onChange={(e) => setExerciseForm({...exerciseForm, vocabularyId: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">เลือกคำศัพท์</option>
                {vocabularies.map((vocab) => (
                  <option key={vocab.id} value={vocab.id}>{vocab.thaiWord} - {vocab.englishWord}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ประเภทแบบฝึกหัด</label>
              <select
                value={exerciseForm.type}
                onChange={(e) => setExerciseForm({...exerciseForm, type: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="TRANSLATION">แปลภาษา</option>
                <option value="SPEAKING">พูด</option>
                <option value="LISTENING">ฟัง</option>
                <option value="READING">อ่าน</option>
                <option value="MATCHING">จับคู่</option>
              </select>
            </div>
            <Input
              label="คำถาม"
              value={exerciseForm.question}
              onChange={(e) => setExerciseForm({...exerciseForm, question: e.target.value})}
              placeholder="คำถาม"
              required
            />
            <Input
              label="คำตอบ"
              value={exerciseForm.answer}
              onChange={(e) => setExerciseForm({...exerciseForm, answer: e.target.value})}
              placeholder="คำตอบ"
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setShowExerciseModal(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleCreateExercise}>
              สร้างแบบฝึกหัด
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </MainLayout>
  );
};

export default AdminDashboard;
