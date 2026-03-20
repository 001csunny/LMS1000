import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Loading, MainLayout } from '../components/ui';
import { User, Course, Lesson, CreateUserRequest, CreateCourseRequest, CreateLessonRequest } from '../types';
import CourseForm from '../components/CourseForm';
import LessonForm from '../components/LessonForm';
import VocabularyForm from '../components/VocabularyForm';
import ExerciseForm from '../components/ExerciseForm';
import userService from '../services/UserService';
import courseService from '../services/CourseService';
import lessonService from '../services/LessonService';
import vocabularyService from '../services/VocabularyService';
import exerciseService from '../services/ExerciseService';
import { useCourseStore } from '../store/courseStore';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Languages, 
  Activity, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowLeft,
  LayoutDashboard,
  ShieldCheck,
  Search,
  Trophy,
  Layers
} from 'lucide-react';

/**
 * Bright Liquid Glass Admin Dashboard
 * High-end administrative control center
 */
const AdminDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const { courses, setCourses, addCourse, updateCourse, deleteCourse } = useCourseStore();
  const [lessons, setLessons] = useState([]);
  const [vocabularies, setVocabularies] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Modal states
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showVocabularyModal, setShowVocabularyModal] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  
  // Form states
  const [userForm, setUserForm] = useState(new CreateUserRequest());
  const [lessonForm, setLessonForm] = useState(new CreateLessonRequest());
  const [vocabularyForm, setVocabularyForm] = useState({
    lessonId: '',
    thaiWord: '',
    englishWord: '',
    audioUrl: '',
    imageUrl: '',
    difficulty: 'BEGINNER'
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
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
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await userService.deleteUser(userId);
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const handleCourseSaved = async (courseData) => {
    // If it's an update, the course object will have an ID
    if (editingCourse) {
      updateCourse(courseData);
    } else {
      addCourse(courseData);
    }
    setEditingCourse(null);
    setShowCourseModal(false);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCourseModal(true);
  };

  const handleManageCourse = async (course) => {
    setSelectedCourse(course);
    setActiveTab('lessons');
    setLoading(true);
    try {
      const lessonsData = await lessonService.findByCourse(course.id);
      setLessons(lessonsData);
    } catch (err) {
      setError('Failed to load lessons for this course');
    } finally {
      setLoading(false);
    }
  };

  const handleManageLesson = async (lesson, type) => {
    setSelectedLesson(lesson);
    setActiveTab(type); // 'vocabularies' or 'exercises'
    setLoading(true);
    try {
      if (type === 'vocabularies') {
        const vocabData = await vocabularyService.findByLesson(lesson.id);
        setVocabularies(vocabData);
      } else {
        const exerciseData = await exerciseService.findByLesson(lesson.id);
        setExercises(exerciseData);
      }
    } catch (err) {
      setError(`Failed to load ${type} for this lesson`);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonSaved = async (lessonData) => {
    if (editingLesson) {
      setLessons(ps => ps.map(l => l.id === lessonData.id ? lessonData : l));
    } else {
      setLessons(ps => [lessonData, ...ps]);
    }
    setEditingLesson(null);
    setShowLessonModal(false);
  };

  const handleVocabularySaved = async (vocabData) => {
    if (editingVocabulary) {
      setVocabularies(ps => ps.map(v => v.id === vocabData.id ? vocabData : v));
    } else {
      setVocabularies(ps => [vocabData, ...ps]);
    }
    setEditingVocabulary(null);
    setShowVocabularyModal(false);
  };

  const handleExerciseSaved = async (exerciseData) => {
    if (editingExercise) {
      setExercises(ps => ps.map(e => e.id === exerciseData.id ? exerciseData : e));
    } else {
      setExercises(ps => [exerciseData, ...ps]);
    }
    setEditingExercise(null);
    setShowExerciseModal(false);
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseService.deleteCourse(courseId);
      await loadData();
    } catch (err) {
      setError(err.message || 'Failed to delete course');
    }
  };

  if (loading && users.length === 0 && courses.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" />
        </div>
      </MainLayout>
    );
  }

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'lessons', label: 'Lessons', icon: GraduationCap },
    { id: 'vocabularies', label: 'Vocabulary', icon: Languages },
    { id: 'exercises', label: 'Exercises', icon: Activity },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              Control <span className="text-blue-600">Center</span>
            </h1>
            <p className="text-gray-400 font-medium max-w-lg">
              Manage users, architect courses, and curate educational content with precision and ease.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="lg" onClick={() => window.location.href = '/'} className="rounded-2xl">
              <ArrowLeft className="w-4 h-4 mr-2" /> View Site
            </Button>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Quick search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 py-3 bg-white/50 border-white/80 rounded-2xl w-64"
              />
            </div>
          </div>
        </header>

        {/* glass-card for Content */}
        <div className="glass-card rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/5 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {/* Tab Navigation */}
          <div className="flex p-2 bg-blue-50/50 border-b border-white/60">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-3xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab.id 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-white/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <CardBody className="p-10">
            {/* Error Alert */}
            {error && (
              <div className="mb-10 p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-center justify-between animate-in shake duration-500">
                <span className="text-xs font-black text-red-600 uppercase tracking-widest">{error}</span>
                <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">✕</button>
              </div>
            )}

            {/* Breadcrumbs / Context Header */}
            {(selectedCourse || selectedLesson) && (
              <div className="mb-8 flex items-center space-x-4 animate-in fade-in slide-in-from-left-4">
                <button 
                  onClick={() => {
                    if (selectedLesson) {
                      setSelectedLesson(null);
                      setActiveTab('lessons');
                    } else {
                      setSelectedCourse(null);
                      setActiveTab('users');
                    }
                  }}
                  className="p-2 rounded-xl bg-white/40 border border-white hover:bg-white/60 transition-all text-gray-500"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className={!selectedLesson ? 'text-blue-600' : ''}>{selectedCourse?.name || 'Dashboard'}</span>
                  {selectedLesson && (
                    <>
                      <span className="mx-1 opacity-30">/</span>
                      <span className="text-blue-600">{selectedLesson.name}</span>
                    </>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="space-y-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
                    {activeTab === 'users' ? 'User Directory' : selectedCourse ? `${selectedCourse.name} Curriculum` : 'Course Library'}
                  </h2>
                  <div className="flex space-x-4">
                    {activeTab === 'users' ? (
                      <Button onClick={() => setShowUserModal(true)} size="lg" className="rounded-2xl">
                        <Plus className="w-5 h-5 mr-2" /> New User
                      </Button>
                    ) : (
                      <Button onClick={() => {
                        if (activeTab === 'courses') { setEditingCourse(null); setShowCourseModal(true); }
                        else if (activeTab === 'lessons') { setEditingLesson(null); setShowLessonModal(true); }
                        else if (activeTab === 'vocabularies') { setEditingVocabulary(null); setShowVocabularyModal(true); }
                        else if (activeTab === 'exercises') { setEditingExercise(null); setShowExerciseModal(true); }
                      }} size="lg" className="rounded-2xl bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-5 h-5 mr-2" /> 
                        {activeTab === 'courses' ? 'New Course' : activeTab === 'lessons' ? 'New Lesson' : activeTab === 'vocabularies' ? 'Add Word' : 'Add Exercise'}
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {users.map((user) => (
                    <Card key={user.id} hover className="p-6 bg-white/40 border-white/80 rounded-[32px] space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                          <span className="text-xl font-black text-blue-600">{user.username?.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-black text-gray-900 truncate">{user.username}</h3>
                          <p className="text-xs font-medium text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                          user.isAdmin() ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'
                        }`}>
                          {user.role}
                        </span>
                        <div className="flex space-x-2">
                          <button className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-gray-50">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2.5 bg-white rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">Course Library</h2>
                  <Button onClick={() => { setEditingCourse(null); setShowCourseModal(true); }} size="lg" className="rounded-2xl">
                    <Plus className="w-5 h-5 mr-2" /> New Course
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <Card key={course.id} hover className="p-8 bg-white/40 border-white/80 rounded-[32px] flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                            course.isPublic ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {course.isPublic ? 'Public' : 'Private'}
                          </span>
                          <BookOpen className="w-6 h-6 text-blue-600/20" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">{course.name}</h3>
                        <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed">{course.description}</p>
                      </div>
                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {course.getStudentCount?.() || 0} Students
                        </span>
                         <div className="flex space-x-2">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => handleManageCourse(course)}
                            className="rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 border-none hover:bg-blue-100"
                          >
                            Manage Content
                          </Button>
                          <button 
                            onClick={() => handleEditCourse(course)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Lessons Tab */}
            {activeTab === 'lessons' && selectedCourse && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lessons.map(lesson => (
                  <Card key={lesson.id} hover className="p-6 bg-white/40 border-white/80 rounded-[24px]">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-gray-900 tracking-tight">{lesson.name}</h4>
                        <p className="text-xs text-gray-400 font-medium line-clamp-1">{lesson.description}</p>
                      </div>
                      <div className="flex space-x-1">
                        <button onClick={() => { setEditingLesson(lesson); setShowLessonModal(true); }} className="p-2 text-gray-400 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="flex space-x-3 mt-6">
                      <Button onClick={() => handleManageLesson(lesson, 'vocabularies')} size="sm" variant="outline" className="flex-1 rounded-xl text-[10px] uppercase font-black tracking-widest border-gray-100">
                        Vocab
                      </Button>
                      <Button onClick={() => handleManageLesson(lesson, 'exercises')} size="sm" variant="outline" className="flex-1 rounded-xl text-[10px] uppercase font-black tracking-widest border-gray-100">
                        Exercises
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Vocabularies Tab */}
            {activeTab === 'vocabularies' && selectedLesson && (
              <div className="space-y-4">
                {vocabularies.map(vocab => (
                  <Card key={vocab.id} className="p-4 bg-white/40 border-white/80 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black">
                        {vocab.thaiWord[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900">{vocab.thaiWord}</p>
                        <p className="text-xs font-medium text-gray-400">{vocab.englishWord}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => { setEditingVocabulary(vocab); setShowVocabularyModal(true); }} className="p-2 text-gray-400 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Exercises Tab */}
            {activeTab === 'exercises' && selectedLesson && (
              <div className="space-y-4">
                {exercises.map(exercise => (
                  <Card key={exercise.id} className="p-4 bg-white/40 border-white/80 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 tracking-tight">{exercise.type}</p>
                        <p className="text-xs font-medium text-gray-400 line-clamp-1">{exercise.question}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                       <button onClick={() => { setEditingExercise(exercise); setShowExerciseModal(true); }} className="p-2 text-gray-400 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardBody>
        </div>
      </div>

      {/* Modern Glass Modals */}
      <Modal 
        isOpen={showUserModal} 
        onClose={() => setShowUserModal(false)}
        size="md"
        className="glass-card border-white shadow-2xl"
      >
        <ModalHeader className="p-8 border-b border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight">Create New User</h3>
        </ModalHeader>
        <ModalBody className="p-8 space-y-6">
          <Input
            label="Email Address"
            type="email"
            value={userForm.email}
            onChange={(e) => setUserForm({...userForm, email: e.target.value})}
            placeholder="alex@example.com"
          />
          <Input
            label="Display Name"
            value={userForm.username}
            onChange={(e) => setUserForm({...userForm, username: e.target.value})}
            placeholder="Alex Thai"
          />
          <Input
            label="Initial Password"
            type="password"
            value={userForm.password}
            onChange={(e) => setUserForm({...userForm, password: e.target.value})}
            placeholder="••••••••"
          />
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">System Role</label>
            <select
              value={userForm.role}
              onChange={(e) => setUserForm({...userForm, role: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-100 text-sm font-bold text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter className="p-8 bg-gray-50/50 flex justify-end space-x-4">
          <Button variant="ghost" onClick={() => setShowUserModal(false)} className="font-black uppercase tracking-widest text-gray-400">Cancel</Button>
          <Button onClick={handleCreateUser} className="rounded-2xl px-8">Confirm Creation</Button>
        </ModalFooter>
      </Modal>

      <Modal 
        isOpen={showCourseModal} 
        onClose={() => setShowCourseModal(false)}
        size="md"
      >
        <ModalHeader className="p-8 border-b border-gray-100/50">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Architect New Course</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5">Define learning objectives</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="p-8">
          <CourseForm 
            initialData={editingCourse || {}}
            onSuccess={handleCourseSaved} 
            onCancel={() => { setShowCourseModal(false); setEditingCourse(null); }} 
          />
        </ModalBody>
      </Modal>

      <Modal 
        isOpen={showLessonModal} 
        onClose={() => setShowLessonModal(false)}
        size="md"
      >
        <ModalHeader className="p-8 border-b border-gray-100/50">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                {editingLesson ? 'Edit Lesson' : 'New Lesson'}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5">Architect curriculum branch</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="p-8">
          <LessonForm 
            initialData={editingLesson ? { ...editingLesson, courseId: selectedCourse?.id } : { courseId: selectedCourse?.id }}
            onSuccess={handleLessonSaved} 
            onCancel={() => { setShowLessonModal(false); setEditingLesson(null); }} 
          />
        </ModalBody>
      </Modal>

      <Modal 
        isOpen={showVocabularyModal} 
        onClose={() => setShowVocabularyModal(false)}
        size="md"
      >
        <ModalHeader className="p-8 border-b border-gray-100/50">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
              <Languages className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                {editingVocabulary ? 'Edit Word' : 'Add Word'}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5">Vocabulary expansion</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="p-8">
          <VocabularyForm 
            initialData={editingVocabulary ? { ...editingVocabulary, lessonId: selectedLesson?.id } : { lessonId: selectedLesson?.id }}
            onSuccess={handleVocabularySaved} 
            onCancel={() => { setShowVocabularyModal(false); setEditingVocabulary(null); }} 
          />
        </ModalBody>
      </Modal>

      <Modal 
        isOpen={showExerciseModal} 
        onClose={() => setShowExerciseModal(false)}
        size="md"
      >
        <ModalHeader className="p-8 border-b border-gray-100/50">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm border border-blue-100">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none">
                {editingExercise ? 'Edit Challenge' : 'New Challenge'}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1.5">Interactive deployment</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="p-8">
          <ExerciseForm 
            initialData={editingExercise ? { ...editingExercise, lessonId: selectedLesson?.id } : { lessonId: selectedLesson?.id }}
            onSuccess={handleExerciseSaved} 
            onCancel={() => { setShowExerciseModal(false); setEditingExercise(null); }} 
          />
        </ModalBody>
      </Modal>

    </MainLayout>
  );
};

export default AdminDashboard;
