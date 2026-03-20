import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookOpen, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button, Input, Textarea } from './ui';
import { courseSchema } from '../schemas/courseSchema';
import courseService from '../services/CourseService';

/**
 * TypeScript Type Definition (Conceptual)
 * 
 * export type CreateCourseInput = {
 *   title: string;
 *   description?: string;
 *   difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
 * }
 */

/**
 * Premium Liquid Glass Course Form
 * Implements strict Zod validation with React Hook Form
 */
const CourseForm = ({ onSuccess, onCancel, initialData = {} }) => {
  const [globalError, setGlobalError] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: initialData.name || '',
      description: initialData.description || '',
      difficulty: initialData.difficulty || 'BEGINNER',
      isPublic: initialData.isPublic ?? true,
    },
  });

  const isEditMode = !!initialData.id;

  const onFormSubmit = async (data) => {
    try {
      setGlobalError('');
      
      const payload = {
        name: data.title,
        description: data.description,
        difficulty: data.difficulty,
        isPublic: data.isPublic,
      };

      const response = isEditMode 
        ? await courseService.updateCourse(initialData.id, payload)
        : await courseService.createCourse(payload);

      if (response.success) {
        setShowSuccess(true);
        // Delay for success animation before closing/refreshing
        setTimeout(() => {
          if (onSuccess) onSuccess(response.data);
        }, 1500);
      } else {
        // Handle validation errors from NestJS
        if (Array.isArray(response.message)) {
          response.message.forEach(msg => {
            if (msg.includes('title')) setError('title', { message: msg });
            else if (msg.includes('description')) setError('description', { message: msg });
            else if (msg.includes('difficulty')) setError('difficulty', { message: msg });
          });
        }
        setGlobalError(typeof response.message === 'string' ? response.message : 'Validation failed. Please check your input.');
      }
    } catch (err) {
      setGlobalError(err.message || 'An unexpected connection error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {globalError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start space-x-3 animate-in shake duration-300">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm font-bold text-red-600 leading-tight">{globalError}</p>
        </div>
      )}

      {showSuccess && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center space-x-3 animate-in zoom-in duration-300">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <p className="text-sm font-black text-blue-700 uppercase tracking-widest">
            {isEditMode ? 'Course Synchronized' : 'Course Architected Successfully'}
          </p>
        </div>
      )}

      <div className={`space-y-4 transition-all duration-500 ${showSuccess ? 'opacity-20 pointer-events-none blur-sm scale-95' : 'opacity-100'}`}>
        {/* Title Input */}
        <div className="relative">
          <Input
            label="Course Title"
            {...register('title')}
            error={errors.title?.message}
            placeholder="e.g., Basic Thai Greetings"
            required
            disabled={isSubmitting || showSuccess}
            className="bg-white/40 backdrop-blur-xl border-white/60 focus:bg-white/60"
          />
        </div>

        {/* Description Textarea */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Curriculum Summary</label>
          <Textarea
            {...register('description')}
            error={errors.description?.message}
            placeholder="Provide a comprehensive overview of the course objectives..."
            rows={4}
            disabled={isSubmitting || showSuccess}
            className="w-full px-5 py-4 rounded-2xl bg-white/40 backdrop-blur-xl border-white/60 text-sm font-medium text-gray-700 resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 focus:bg-white/60 transition-all"
          />
        </div>

        {/* Difficulty Select */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Complexity Level</label>
          <div className="relative">
            <select
              {...register('difficulty')}
              disabled={isSubmitting || showSuccess}
              className={`w-full px-5 py-4 rounded-2xl bg-white/40 backdrop-blur-xl border ${errors.difficulty ? 'border-red-400 focus:ring-red-500/10' : 'border-white/60 focus:ring-blue-500/10'} text-sm font-bold text-gray-700 focus:outline-none transition-all appearance-none cursor-pointer`}
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          {errors.difficulty && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.difficulty.message}
            </p>
          )}
        </div>

        {/* Visibility Toggle */}
        <div className="p-4 rounded-2xl bg-blue-50/30 border border-blue-100/50 flex items-center justify-between group hover:bg-white/60 transition-all duration-300">
          <div className="space-y-0.5">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Visibility Status</p>
            <p className="text-xs font-bold text-gray-400">Make this course discoverable in the public catalog</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" {...register('isPublic')} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end items-center space-x-4 pt-6 border-t border-gray-100/50">
        {!showSuccess && (
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
              className="font-black uppercase tracking-widest text-gray-400 hover:text-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl px-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/20 min-w-[160px]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isEditMode ? 'Syncing...' : 'Launching...'}</span>
                </div>
              ) : (isEditMode ? 'Update Course' : 'Launch Course')}
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default CourseForm;
