import React from 'react';
import { useParams } from 'react-router-dom';
import LessonPlayer from '../components/LessonPlayer';

/**
 * Lesson Player Page
 * Wrapper component for the Duolingo-style lesson player
 */
const LessonPlayerPage = () => {
  const { id } = useParams();

  return <LessonPlayer lessonId={parseInt(id)} />;
};

export default LessonPlayerPage;
