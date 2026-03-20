import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, Loading, Input, MainLayout } from '../components/ui';
import { Course, Lesson } from '../types';
import courseService from '../services/CourseService';
import lessonService from '../services/LessonService';
import { Sparkles, Search, Book, GraduationCap, ArrowRight, LayoutDashboard, LogIn, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Bright Liquid Glass Public Courses
 * Discoverable content with premium aesthetic
 */
const PublicCourses = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('courses');

  useEffect(() => {
    loadPublicContent();
  }, []);

  const loadPublicContent = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [coursesData, lessonsData] = await Promise.all([
        courseService.getPublicCourses(),
        lessonService.getPublicLessons()
      ]);
      
      setCourses(coursesData);
      setLessons(lessonsData);
    } catch (err) {
      setError(err.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLessons = lessons.filter(lesson =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 space-y-24">
        {/* Glass Hero Section */}
        <section className="text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Open Learning</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none max-w-4xl mx-auto">
            Explore Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Thai</span> Lessons
          </h1>
          
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Start your language journey today with our curated collection of <br className="hidden md:block" /> free courses and interactive lessons.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            {user ? (
              <Link to="/dashboard">
                <Button size="xl" className="shadow-2xl shadow-blue-500/30">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  My Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/Login">
                <Button size="xl" className="shadow-2xl shadow-blue-500/30">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In to Start
                </Button>
              </Link>
            )}
            <Button variant="outline" size="xl" className="bg-white/50 border-white/80">
              Browse Below <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Search and Filters */}
        <div className="glass-card p-6 md:p-8 rounded-[40px] shadow-xl shadow-blue-900/5">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="What do you want to learn today?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 py-4 text-lg border-white/60 focus:bg-white"
              />
            </div>
            <div className="flex p-1.5 bg-blue-50 rounded-[28px] w-full lg:w-auto">
              <button
                onClick={() => setActiveView('courses')}
                className={`flex-1 lg:flex-none px-8 py-3 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeView === 'courses' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Courses ({filteredCourses.length})
              </button>
              <button
                onClick={() => setActiveView('lessons')}
                className={`flex-1 lg:flex-none px-8 py-3 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeView === 'lessons' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Lessons ({filteredLessons.length})
              </button>
            </div>
          </div>
        </div>

        {/* Grid Display */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          {activeView === 'courses' ? (
            <div className="space-y-10">
              <div className="flex items-center space-x-3">
                <Book className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Public Courses</h2>
              </div>
              
              {filteredCourses.length === 0 ? (
                <Card className="py-20 text-center space-y-4 bg-white/40 border-dashed border-2 border-gray-200">
                  <p className="text-gray-400 font-medium">No courses found matching your search.</p>
                  <Button variant="ghost" size="sm" onClick={() => setSearchTerm('')}>Clear Search</Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} hover className="p-8 flex flex-col justify-between h-full bg-white/40 border-white/80">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">Free</span>
                          <GraduationCap className="w-6 h-6 text-blue-600/20" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </h3>
                        <p className="text-gray-500 font-medium text-sm line-clamp-3 leading-relaxed">
                          {course.description || 'Dive into basic Thai greetings and essential navigation skills.'}
                        </p>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {course.getLessonCount?.() || 2} Lessons
                        </span>
                        <Link to={`/public/courses/${course.id}`}>
                          <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600">
                            View Details <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Public Lessons</h2>
              </div>
              
              {filteredLessons.length === 0 ? (
                <Card className="py-20 text-center space-y-4 bg-white/40 border-dashed border-2 border-gray-200">
                  <p className="text-gray-400 font-medium">No individual lessons found matching your search.</p>
                  <Button variant="ghost" size="sm" onClick={() => setSearchTerm('')}>Clear Search</Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredLessons.map((lesson) => (
                    <Card key={lesson.id} hover className="p-8 flex flex-col justify-between h-full bg-white/40 border-white/80">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full leading-none h-6 flex items-center justify-center">Public</span>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">
                          {lesson.name}
                        </h3>
                        {lesson.course && (
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                            Part of {lesson.course.name}
                          </p>
                        )}
                        <p className="text-gray-500 font-medium text-sm line-clamp-3 leading-relaxed">
                          {lesson.description || 'Master essential phrases and pronunciation through interactive exercises.'}
                        </p>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <Link to={`/public/lessons/${lesson.id}`} className="w-full block">
                          <Button size="lg" className="w-full">
                            Try Lesson <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA Footer Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-20 text-center space-y-8 rounded-[60px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Trophy className="w-64 h-64 text-white rotate-12" />
          </div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Unlock the Full Experience
            </h2>
            <p className="text-xl text-blue-100 font-medium max-w-2xl mx-auto">
              Join thousands of learners tracking their daily streak, <br className="hidden md:block" /> earning XP, and achieving true fluency.
            </p>
            <div className="pt-8">
              <Link to="/Login">
                <Button size="xl" className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl shadow-black/20">
                  Create Free Account Now
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default PublicCourses;
