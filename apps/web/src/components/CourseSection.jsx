import React, { useMemo } from 'react';
import { BookOpen, Star } from 'lucide-react';
import LessonCard from './LessonCard';

/**
 * CourseSection Component
 * Displays course header with overall progress and its lessons
 */
const CourseSection = ({ course, onLessonPlay }) => {
  // Calculate course overall progress (based on lesson completion)
  const stats = useMemo(() => {
    const total = course.lessons?.length || 0;
    const completed = course.lessons?.filter(l => l.userProgress?.[0]?.status === 'COMPLETED').length || 0;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, percentage };
  }, [course.lessons]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
      {/* Course Header with Overall Progress */}
      <div className="p-8 rounded-[40px] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 transform group-hover:scale-110 transition-transform duration-700 opacity-20">
          <Star className="w-32 h-32 text-blue-400 rotate-12" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="p-5 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-3xl backdrop-blur-md shadow-2xl border border-white/20">
              <BookOpen className="w-10 h-10 text-blue-100" />
            </div>
            <div>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-2 block">
                Recommended Course
              </span>
              <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-3">
                {course.name}
              </h2>
              <p className="text-gray-400 text-lg max-w-xl font-medium leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* Overall Course Progress Bar Card */}
          <div className="w-full md:w-72 bg-white/10 rounded-3xl p-5 border border-white/10 shadow-inner backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Course Progress</span>
              <span className="text-xl font-black text-blue-400">{stats.percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-900/40 rounded-full h-3 overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
            <div className="mt-3 text-[10px] font-bold text-gray-500 flex justify-between">
              <span>{stats.completed} Lessons Finished</span>
              <span>{stats.total - stats.completed} Remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {course.lessons?.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} onPlay={onLessonPlay} />
        ))}
      </div>
    </div>
  );
};

export default CourseSection;
