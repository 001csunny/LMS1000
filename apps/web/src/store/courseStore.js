import { create } from 'zustand';

/**
 * Global Course Store - Orchestrates course state across the platform
 * Adheres to Clean Code principles and provides reactive updates
 */
export const useCourseStore = create((set) => ({
  courses: [],
  isLoading: false,
  error: null,

  // Set all courses (e.g., after initial fetch)
  setCourses: (courses) => set({ courses, isLoading: false, error: null }),

  // Add a newly created course to the top of the list
  addCourse: (course) => set((state) => ({ 
    courses: [course, ...state.courses] 
  })),

  // Update an existing course in the list immediately
  updateCourse: (updatedCourse) => set((state) => ({
    courses: state.courses.map((course) => 
      course.id === updatedCourse.id ? updatedCourse : course
    )
  })),

  // Remove a course from the list
  deleteCourse: (courseId) => set((state) => ({
    courses: state.courses.filter((course) => course.id !== courseId)
  })),

  // Global loading and error management
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  // Reset store state
  clearStore: () => set({ courses: [], isLoading: false, error: null })
}));
