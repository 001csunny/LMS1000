import { create } from 'zustand';
import ax from '../conf/ax';

export const useProgressStore = create((set, get) => ({
  catalog: [],
  myProgress: [],
  isLoading: false,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [catalogRes, progressRes] = await Promise.all([
        ax.get('/courses/catalog'),
        ax.get('/courses/my-progress')
      ]);
      
      set({ 
        catalog: catalogRes.data,
        myProgress: progressRes.data,
        isLoading: false 
      });
    } catch (err) {
      set({ 
        error: err.response?.data?.message || err.message,
        isLoading: false 
      });
    }
  },
  
  getProgressForLesson: (lessonId) => {
    return get().myProgress.find(p => p.lessonId === lessonId) || null;
  }
}));
