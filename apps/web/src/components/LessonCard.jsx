import React from 'react';
import { CheckCircle, PlayCircle, Trophy, Lock } from 'lucide-react';

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
    <div
      onClick={() => onPlay(lesson.id)}
      className={`
        relative group overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 
        backdrop-blur-xl border-2 shadow-2xl p-6 flex flex-col justify-between h-full
        ${isCompleted ? 'bg-white/90 border-green-400 hover:shadow-green-500/30' : 
          isUnattempted ? 'bg-white/30 border-white/10 hover:bg-white/50 grayscale hover:grayscale-0' : 
          'bg-white/80 border-blue-400 hover:shadow-blue-500/30'}
        hover:-translate-y-2
      `}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-bold ${isUnattempted ? 'text-gray-500' : 'text-gray-900'} leading-tight`}>
          {lesson.name}
        </h3>
        {isCompleted ? (
          <CheckCircle className="w-7 h-7 text-green-500 shrink-0 drop-shadow-sm" />
        ) : isUnattempted ? (
          <Lock className="w-5 h-5 text-gray-400 shrink-0" />
        ) : (
          <PlayCircle className="w-7 h-7 text-blue-500 shrink-0 drop-shadow-sm animate-pulse" />
        )}
      </div>

      <p className="text-sm text-gray-600 mb-8 flex-grow">
        {lesson.description}
      </p>

      {/* Progress section: visible only if started/completed */}
      {showProgress && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5" /> <span>{score.toFixed(0)} XP</span>
            </span>
            <span>{completion.toFixed(0)}% Complete</span>
          </div>

          <div className="w-full bg-gray-200/40 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Footer Button for Unattempted or In-progress */}
      {!isCompleted && (
        <div className={`mt-6 w-full py-3 rounded-2xl font-bold text-center text-sm transition-all duration-300 ${
            isUnattempted 
              ? 'bg-white/20 text-gray-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/40' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
          }`}
        >
          {isUnattempted ? 'Start' : 'Continue'}
        </div>
      )}
    </div>
  );
};

export default LessonCard;
