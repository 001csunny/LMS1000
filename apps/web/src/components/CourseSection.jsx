import React, { useMemo } from 'react';
import { BookOpen, Star, Milestone } from 'lucide-react';
import LessonCard from './LessonCard';
import { Card, CardBody } from './ui';

/**
 * CourseSection Component
 * Displays course header with overall progress and its lessons
 */
const CourseSection = ({ course, onLessonPlay }) => {
  const stats = useMemo(() => {
    const total = course.lessons?.length || 0;
    const completed = course.lessons?.filter(l => l.userProgress?.[0]?.status === 'COMPLETED').length || 0;
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return { total, completed, percentage };
  }, [course.lessons]);

  return (
    <div className="space-y-12">
      {/* Course Header with Overall Progress */}
      <div className="glass-card p-10 rounded-[40px] relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <BookOpen className="w-48 h-48 text-blue-600 rotate-12" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              <Milestone className="w-3 h-3" />
              <span>Learning Path</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              {course.name}
            </h2>
            <p className="text-gray-400 text-lg font-medium max-w-xl leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Progress Card */}
          <Card className="w-full lg:w-80 bg-white/40 backdrop-blur-xl border border-white/80 p-6 rounded-[32px] shadow-sm">
            <div className="flex justify-between items-end mb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Completion</span>
                <span className="text-3xl font-black text-gray-900 leading-none">{stats.percentage.toFixed(0)}%</span>
              </div>
              <div className="p-2.5 bg-green-50 rounded-2xl">
                <Star className="w-6 h-6 text-green-500 fill-green-500/20" />
              </div>
            </div>
            
            <div className="w-full bg-blue-100/30 rounded-full h-4 overflow-hidden border border-white/40 p-1">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="text-gray-400">{stats.completed} Finished</span>
              <span className="text-blue-600">{stats.total - stats.completed} To Go</span>
            </div>
          </Card>
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
