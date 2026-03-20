import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { exerciseSchema } from '../schemas/lessonSchema';
import { Button, Input, Card } from './ui';
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Activity, 
  List, 
  Type, 
  Volume2, 
  ImageIcon 
} from 'lucide-react';
import exerciseService from '../services/ExerciseService';
import vocabularyService from '../services/VocabularyService';

/**
 * ExerciseForm - Dynamic Challenge Architect
 * Adheres to Bright Liquid Glass Morphism and Clean Code
 */
const ExerciseForm = ({ initialData = {}, onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [vocabularies, setVocabularies] = useState([]);
  const [hints, setHints] = useState(initialData.hints || []);
  const [choices, setChoices] = useState(initialData.choices || []);
  const [newHint, setNewHint] = useState('');
  const [newChoice, setNewChoice] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      type: initialData.type || 'TRANSLATION',
      question: initialData.question || '',
      answer: initialData.answer || '',
      audioUrl: initialData.audioUrl || '',
      imageUrl: initialData.imageUrl || '',
      vocabularyId: initialData.vocabularyId || '',
      orderIndex: initialData.orderIndex || 0,
    },
  });

  const selectedType = watch('type');
  const isEditMode = !!initialData.id;

  useEffect(() => {
    const fetchVocab = async () => {
      if (initialData.lessonId) {
        const data = await vocabularyService.findByLesson(initialData.lessonId);
        setVocabularies(data || []);
      }
    };
    fetchVocab();
  }, [initialData.lessonId]);

  const addHint = () => {
    if (newHint.trim()) {
      const updated = [...hints, newHint.trim()];
      setHints(updated);
      setValue('hints', updated);
      setNewHint('');
    }
  };

  const removeHint = (index) => {
    const updated = hints.filter((_, i) => i !== index);
    setHints(updated);
    setValue('hints', updated);
  };

  const addChoice = () => {
    if (newChoice.trim()) {
      const updated = [...choices, newChoice.trim()];
      setChoices(updated);
      setValue('choices', updated);
      setNewChoice('');
    }
  };

  const removeChoice = (index) => {
    const updated = choices.filter((_, i) => i !== index);
    setChoices(updated);
    setValue('choices', updated);
  };

  const onFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setGlobalError('');

      const payload = {
        ...data,
        lessonId: initialData.lessonId,
        vocabularyId: parseInt(data.vocabularyId),
        hints,
        choices,
      };

      const response = isEditMode
        ? await exerciseService.update(initialData.id, payload)
        : await exerciseService.create(payload);

      if (response.success || response.id) {
        setShowSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess(response);
        }, 1500);
      } else {
        setGlobalError(response.message || 'Failed to save exercise');
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
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            {isEditMode ? 'Modify Challenge' : 'Architect Challenge'}
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {isEditMode ? `ID: #${initialData.id}` : 'Exercise Deployment'}
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
            {isEditMode ? 'Challenge Synchronized' : 'Challenge Active'}
          </p>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Exercise Type</label>
            <select
              {...register('type')}
              className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="TRANSLATION">TRANSLATION</option>
              <option value="SPEAKING">SPEAKING</option>
              <option value="LISTENING">LISTENING</option>
              <option value="READING">READING</option>
              <option value="MATCHING">MATCHING</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Target Vocabulary</label>
            <select
              {...register('vocabularyId')}
              className="w-full h-12 px-4 rounded-2xl border border-gray-100 bg-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="">Select Word...</option>
              {vocabularies.map(v => (
                <option key={v.id} value={v.id}>{v.thaiWord} ({v.englishWord})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Question Content</label>
              <Input
                {...register('question')}
                placeholder="The prompt for the student"
                className={`rounded-2xl border-gray-100 ${errors.question ? 'border-red-500' : ''}`}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Expected Answer</label>
              <Input
                {...register('answer')}
                placeholder="The correct response"
                className={`rounded-2xl border-gray-100 ${errors.answer ? 'border-red-500' : ''}`}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Hints (Instructional Scaffolding)</label>
              <div className="flex space-x-2">
                <Input
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  placeholder="Add a subtle tip..."
                  className="rounded-2xl border-gray-100"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHint())}
                />
                <Button type="button" onClick={addHint} size="sm" className="rounded-xl px-4">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {hints.map((hint, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-500 flex items-center space-x-1">
                    <span>{hint}</span>
                    <button type="button" onClick={() => removeHint(i)} className="hover:text-red-500 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {selectedType === 'MATCHING' && (
          <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-[32px] space-y-4 animate-in slide-in-from-bottom-2">
            <div className="flex items-center space-x-2">
              <List className="w-4 h-4 text-blue-600" />
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Matching Options (Distractors)</p>
            </div>
            <div className="flex space-x-2">
              <Input
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
                placeholder="Enter an incorrect option..."
                className="rounded-2xl border-gray-100 bg-white"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChoice())}
              />
              <Button type="button" onClick={addChoice} size="sm" className="rounded-xl px-4">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {choices.map((choice, i) => (
                <span key={i} className="px-4 py-1.5 bg-white border border-blue-100 rounded-full text-xs font-bold text-blue-600 flex items-center space-x-2 shadow-sm">
                  <span>{choice}</span>
                  <button type="button" onClick={() => removeChoice(i)} className="hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
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
              <span>Deploying...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>{isEditMode ? 'Update Challenge' : 'Launch Challenge'}</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ExerciseForm;
