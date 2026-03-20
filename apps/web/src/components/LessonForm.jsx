import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { lessonSchema } from '../schemas/lessonSchema';
import { Button, Input, Textarea, Card } from './ui';
import { 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  BookOpen, 
  Layers, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import lessonService from '../services/LessonService';

/**
 * LessonForm - Standardized Architect for Lesson Management
 * Adheres to Bright Liquid Glass Morphism and Clean Code
 */
const LessonForm = ({ initialData = {}, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: initialData.name || '',
      description: initialData.description || '',
      difficulty: initialData.difficulty || 'BEGINNER',
      isPublic: initialData.isPublic ?? false,
      orderIndex: initialData.orderIndex || 0,
    },
  });

  const isEditMode = !!initialData.id;

  const onFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setGlobalError('');

      const payload = {
        ...data,
        courseId: initialData.courseId,
      };

      const response = isEditMode
        ? await lessonService.update(initialData.id, payload)
        : await lessonService.create(payload);

      if (response.success || response.id) {
        setShowSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess(response);
        }, 1500);
      } else {
        setGlobalError(response.message || 'Failed to save lesson');
      }
    } catch (err) {
      setGlobalError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center space-x-4 mb-2">
        <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shadow-sm">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            {isEditMode ? 'Modify Lesson' : 'Architect New Lesson'}
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {isEditMode ? `ID: #${initialData.id}` : 'Curriculum Expansion'}
          </p>
        </div>
      </div>

      {globalError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center space-x-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm font-bold text-red-700">{globalError}</p>
        </div>
      )}

      {showSuccess && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center space-x-3 animate-in zoom-in duration-300">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <p className="text-sm font-black text-blue-700 uppercase tracking-widest">
            {isEditMode ? 'Lesson Synchronized' : 'Lesson Deployed Successfully'}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Lesson Title</label>
          <Input
            {...register('name')}
            placeholder="e.g., การทักทายขั้นพื้นฐาน"
            className={`rounded-2xl border-gray-100 focus:border-blue-500 transition-all ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 font-bold flex items-center ml-1">
              <AlertCircle className="w-3 h-3 mr-1" /> {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Learning Objectives</label>
          <Textarea
            {...register('description')}
            placeholder="What will the students master in this lesson?"
            rows={4}
            className="rounded-2xl border-gray-100 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Complexity</label>
            <select
              {...register('difficulty')}
              className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Display Index</label>
            <Input
              type="number"
              {...register('orderIndex', { valueAsNumber: true })}
              className="rounded-2xl border-gray-100"
            />
          </div>
        </div>

        <Card className="p-4 bg-gray-50/50 border-gray-100 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${errors.isPublic ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black text-gray-900 uppercase tracking-tight">Public Visibility</p>
              <p className="text-[10px] font-bold text-gray-400">Making this lesson accessible to all students</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" {...register('isPublic')} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </Card>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="rounded-2xl px-6 text-gray-400 hover:text-gray-600 font-bold uppercase tracking-widest text-xs"
        >
          Abort Mission
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-2xl px-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/20 min-w-[160px]"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{isEditMode ? 'Syncing...' : 'Deploying...'}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>{isEditMode ? 'Update Lesson' : 'Launch Lesson'}</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default LessonForm;
