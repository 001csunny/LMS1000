import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/useProgressStore';
import CourseSection from '../components/CourseSection';

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-white font-bold tracking-widest text-sm animate-pulse uppercase">Syncing Progress</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0c] font-sans text-gray-800 antialiased">
      {/* Dynamic Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[1000px] h-[1000px] -top-[300px] -left-[100px] bg-blue-600/10 rounded-full blur-[160px] animate-pulse duration-[10s]"></div>
        <div className="absolute w-[800px] h-[800px] top-[40%] -right-[200px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse duration-[8s] delay-700"></div>
        <div className="absolute w-[600px] h-[600px] -bottom-[100px] left-[20%] bg-teal-500/10 rounded-full blur-[120px] animate-pulse duration-[12s] delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24 max-w-7xl">
        <header className="mb-20 space-y-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <span className="px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase">
              Dashboard
            </span>
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 select-none">
              Learn Thai
            </h1>
            <p className="text-xl text-gray-400 tracking-wide max-w-2xl mx-auto font-medium leading-relaxed">
              Track your journey through the levels of fluency with our <br className="hidden md:block" /> interactive glass dashboard.
            </p>
          </div>
        </header>

        <div className="space-y-32">
          {catalog.map((course) => (
            <CourseSection key={course.id} course={course} onLessonPlay={handleLessonPlay} />
          ))}
        </div>
      </div>

      {/* Subtle UI Accents */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0c] to-transparent pointer-events-none z-20"></div>
    </div>
  );
};

export default CourseDashboard;
