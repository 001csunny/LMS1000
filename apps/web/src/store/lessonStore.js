import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLessonStore = create(
  persist(
    (set, get) => ({
      hearts: 5,
      xp: 0,
      
      exercises: [],
      currentExerciseIndex: 0,
      totalExercises: 0,
      totalScore: 0,

      setExercises: (exercises) => set({ 
        exercises, 
        totalExercises: exercises.length, 
        currentExerciseIndex: 0 
      }),

      nextExercise: () => set((state) => ({ 
        currentExerciseIndex: state.currentExerciseIndex + 1 
      })),

      setCurrentExerciseIndex: (updater) => set((state) => ({
        currentExerciseIndex: typeof updater === 'function' ? updater(state.currentExerciseIndex) : updater
      })),

      resetHearts: () => set({ hearts: 5 }),
      
      loseHeart: () => set((state) => ({ 
        hearts: Math.max(0, state.hearts - 1) 
      })),
      
      addXp: (amount) => set((state) => ({ 
        xp: state.xp + amount 
      })),
      
      hasLives: () => get().hearts > 0,
      
      addScore: (amount) => set((state) => ({ 
        totalScore: state.totalScore + amount 
      })),

      clearLesson: () => set({ exercises: [], currentExerciseIndex: 0, totalExercises: 0, totalScore: 0 })
    }),
    {
      name: 'lms-lesson-storage',
    }
  )
);
