import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vocabularySchema } from '../schemas/lessonSchema';
import { Button, Input, Card } from './ui';
import { 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Languages, 
  Volume2, 
  Image as ImageIcon 
} from 'lucide-react';
import vocabularyService from '../services/VocabularyService';

/**
 * VocabularyForm - Precise Word Architect
 * Adheres to Bright Liquid Glass Morphism and Clean Code
 */
const VocabularyForm = ({ initialData = {}, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vocabularySchema),
    defaultValues: {
      thaiWord: initialData.thaiWord || '',
      englishWord: initialData.englishWord || '',
      audioUrl: initialData.audioUrl || '',
      imageUrl: initialData.imageUrl || '',
      difficulty: initialData.difficulty || 'BEGINNER',
    },
  });

  const isEditMode = !!initialData.id;

  const onFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setGlobalError('');

      const payload = {
        ...data,
        lessonId: initialData.lessonId,
      };

      const response = isEditMode
        ? await vocabularyService.update(initialData.id, payload)
        : await vocabularyService.create(payload);

      if (response.success || response.id) {
        setShowSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess(response);
        }, 1500);
      } else {
        setGlobalError(response.message || 'Failed to save vocabulary');
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
          <Languages className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            {isEditMode ? 'Edit Vocabulary' : 'Add Vocabulary'}
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {isEditMode ? `ID: #${initialData.id}` : 'Vocabulary Expansion'}
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
            {isEditMode ? 'Entry Synchronized' : 'Entry Saved Successfully'}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Thai Word</label>
            <Input
              {...register('thaiWord')}
              placeholder="e.g., สวัสดี"
              className={`rounded-2xl border-gray-100 ${errors.thaiWord ? 'border-red-500' : ''}`}
            />
            {errors.thaiWord && (
              <p className="mt-1 text-sm text-red-600 font-bold ml-1">{errors.thaiWord.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">English Translation</label>
            <Input
              {...register('englishWord')}
              placeholder="e.g., Hello"
              className={`rounded-2xl border-gray-100 ${errors.englishWord ? 'border-red-500' : ''}`}
            />
            {errors.englishWord && (
              <p className="mt-1 text-sm text-red-600 font-bold ml-1">{errors.englishWord.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2 ml-1">
              <Volume2 className="w-3.5 h-3.5 text-gray-400" />
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Audio Resource (URL)</label>
            </div>
            <Input
              {...register('audioUrl')}
              placeholder="https://storage.googleapis.com/..."
              className="rounded-2xl border-gray-100"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2 ml-1">
              <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Visual Asset (URL)</label>
            </div>
            <Input
              {...register('imageUrl')}
              placeholder="https://images.unsplash.com/..."
              className="rounded-2xl border-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Word Difficulty</label>
          <select
            {...register('difficulty')}
            className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="BEGINNER">BEGINNER</option>
            <option value="INTERMEDIATE">INTERMEDIATE</option>
            <option value="ADVANCED">ADVANCED</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="rounded-2xl px-6 text-gray-400 hover:text-gray-600 font-bold uppercase tracking-widest text-xs"
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
              <span>Saving...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>{isEditMode ? 'Update Entry' : 'Add Entry'}</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default VocabularyForm;
