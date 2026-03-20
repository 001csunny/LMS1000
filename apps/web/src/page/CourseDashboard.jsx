import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/useProgressStore';
import CourseSection from '../components/CourseSection';
import { MainLayout, Loading } from '../components/ui';
import { Sparkles } from 'lucide-react';

const CourseDashboard = () => {
  const navigate = useNavigate();
  const { catalog, fetchDashboardData, isLoading } = useProgressStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleLessonPlay = (lessonId) => {
    navigate(`/lesson/${lessonId}/play`);
  };

  if (isLoading) {
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
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Learning Journey</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-none">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Thai</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Beautifully crafted lessons designed to take you from <br className="hidden md:block" /> absolute beginner to fluent speaker.
          </p>
        </header>

        <div className="space-y-32">
          {catalog.map((course) => (
            <CourseSection key={course.id} course={course} onLessonPlay={handleLessonPlay} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CourseDashboard;
