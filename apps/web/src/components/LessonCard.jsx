import React from 'react';
import { CheckCircle, PlayCircle, Trophy, Lock, Zap } from 'lucide-react';
import { Card } from './ui';

/**
 * LessonCard Component
 * Displays individual lesson details and progress status
 */
const LessonCard = ({ lesson, onPlay }) => {
  const userProgress = lesson.userProgress?.[0];
  const status = userProgress?.status || 'UNATTEMPTED';
  const completion = userProgress?.completionPercentage || 0;
  const score = userProgress?.highestScore || 0;

  const isCompleted = status === 'COMPLETED';
  const isInProgress = status === 'IN_PROGRESS';
  const isUnattempted = status === 'UNATTEMPTED';

  // Only show progress if the user has actually started it
  const showProgress = isCompleted || isInProgress;

  return (
    <Card
      onClick={() => onPlay(lesson.id)}
      hover
      className={`
        relative overflow-hidden flex flex-col justify-between h-full p-8 rounded-[32px]
        ${isCompleted ? 'border-green-200/50 bg-green-50/20' : 
          isUnattempted ? 'opacity-70 grayscale hover:grayscale-0 hover:opacity-100' : 
          'border-blue-200/50 bg-blue-50/20'}
      `}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            {isCompleted ? (
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Mastered</span>
            ) : isInProgress ? (
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">In Progress</span>
            ) : (
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">New Lesson</span>
            )}
          </div>
          <h3 className="text-2xl font-black text-gray-900 leading-tight">
            {lesson.name}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl ${
          isCompleted ? 'bg-green-100 text-green-600' : 
          isUnattempted ? 'bg-gray-100 text-gray-400' : 
          'bg-blue-100 text-blue-600'
        }`}>
          {isCompleted ? <CheckCircle className="w-6 h-6" /> : 
           isUnattempted ? <Lock className="w-5 h-5" /> : 
           <Zap className="w-6 h-6 animate-pulse" />}
        </div>
      </div>

      <p className="text-gray-500 font-medium text-sm mb-10 flex-grow leading-relaxed">
        {lesson.description}
      </p>

      {/* Progress section */}
      <div className="space-y-4">
        {showProgress ? (
          <>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
              <span className="flex items-center text-blue-600">
                <Trophy className="w-3.5 h-3.5 mr-1.5" /> {score.toFixed(0)} XP
              </span>
              <span className="text-gray-400">{completion.toFixed(0)}% Done</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden border border-white/60">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]'}`}
                style={{ width: `${completion}%` }}
              ></div>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <PlayCircle className="w-4 h-4" />
            <span>Ready to start</span>
          </div>
        )}
        
        {!isCompleted && (
          <div className={`mt-2 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-center transition-all duration-300 ${
              isUnattempted 
                ? 'bg-white text-gray-400 border border-gray-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm hover:shadow-blue-500/25' 
                : 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:scale-[1.02]'
            }`}
          >
            {isUnattempted ? 'Start Lesson' : 'Continue Learning'}
          </div>
        )}
      </div>
    </Card>
  );
};

export default LessonCard;
