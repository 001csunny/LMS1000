import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLessonStore = create(
  persist(
    (set, get) => ({
      hearts: 5,
      xp: 0,
      
      resetHearts: () => set({ hearts: 5 }),
      
      loseHeart: () => set((state) => ({ 
        hearts: Math.max(0, state.hearts - 1) 
      })),
      
      addXp: (amount) => set((state) => ({ 
        xp: state.xp + amount 
      })),
      
      hasLives: () => get().hearts > 0,
      
      resetXp: () => set({ xp: 0 })
    }),
    {
      name: 'lms-lesson-storage',
    }
  )
);
