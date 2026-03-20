import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, Loading, MainLayout } from './ui';
import exerciseService from '../services/ExerciseService';
import { Mic, Square, Volume2, CheckCircle, XCircle, Trophy, ArrowLeft, LogOut, LayoutDashboard, AlertCircle, Loader2 } from 'lucide-react';
import authService from '../services/AuthService';
import { useLessonStore } from '../store/lessonStore';
import confetti from 'canvas-confetti';

/**
 * Premium Liquid Glass Lesson Player
 * High-end interactive learning experience
 */
const LessonPlayer = ({ lessonId }) => {
  const {
    exercises,
    currentExerciseIndex,
    totalExercises,
    totalScore,
    addScore,
    setExercises,
    nextExercise: incCurrentExerciseIndex,
    setCurrentExerciseIndex,
    clearLesson
  } = useLessonStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef('');
  const timerRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'th-TH';
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
          else interimTranscript += event.results[i][0].transcript;
        }
        const currentText = finalTranscript || interimTranscript;
        setTranscript(currentText);
        transcriptRef.current = currentText;
      };
      
      recognition.onerror = (event) => {
        if (event.error !== 'aborted') setError(`Speech Recognition Error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
    } else {
      setError('Browser not supported for speech recognition.');
    }
  }, []);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  useEffect(() => {
    if (lessonId) loadExercises();
  }, [lessonId]);

  const loadExercises = async () => {
    setLoading(true);
    setError('');
    try {
      const exercisesData = await exerciseService.findByLesson(lessonId);
      setExercises(exercisesData);
    } catch (err) {
      setError(err.message || 'Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  const startRecording = () => {
    if (!recognitionRef.current) return;
    setTranscript('');
    transcriptRef.current = '';
    setError('');
    setShowResult(false);
    try {
      recognitionRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } catch (err) {}
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      evaluateLocalSpeech(transcriptRef.current);
    }
  };

  useEffect(() => {
    if (isRecording && transcript && currentExercise?.type === 'SPEAKING') {
      const normalize = (str) => (str || '').replace(/[\s.,!?]+/g, '').toLowerCase();
      const normTranscript = normalize(transcript);
      const normOriginal = normalize(currentExercise.answer);
      if (normOriginal.length > 0 && normTranscript.includes(normOriginal)) stopRecording();
    }
  }, [transcript, isRecording, currentExercise]);

  const playSuccessEffects = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch(e) {}
    
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    function fire(particleRatio, opts) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const evaluateLocalSpeech = (text) => {
    if (showResult || result?.completed) return;
    const normalize = (str) => (str || '').replace(/[\s.,!?]+/g, '').toLowerCase();
    const normTranscript = normalize(text);
    const normOriginal = normalize(currentExercise?.answer);
    const passed = normOriginal.length > 0 && normTranscript.includes(normOriginal);
    
    setResult({
      passed,
      score: passed ? 100 : 0,
      message: passed ? 'Excellent! That is correct.' : `Try again! (I heard: ${text || 'nothing'})`
    });
    
    setShowResult(true);
    if (passed) {
      setCompletedCount(prev => prev + 1);
      addScore(100);
      playSuccessEffects();
      setTimeout(() => nextExercise(), 2000);
    }
  };

  const handleAnswer = (answer) => {
    if (showResult || result?.completed) return;
    if (answer.toLowerCase() === currentExercise.answer.toLowerCase()) {
      setResult({ passed: true, score: 100, message: 'Perfect Answer!' });
      setCompletedCount(prev => prev + 1);
      addScore(100);
      playSuccessEffects();
      setShowResult(true);
      setTimeout(() => nextExercise(), 2000);
    } else {
      setResult({ passed: false, score: 0, message: `Incorrect. The right word is: ${currentExercise.answer}` });
      setShowResult(true);
    }
  };

  const nextExercise = () => {
    setShowResult(false);
    setResult(null);
    setTranscript('');
    if (currentExerciseIndex < exercises.length - 1) incCurrentExerciseIndex();
    else handleLessonComplete();
  };

  const handleLessonComplete = async () => {
    const accuracy = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
    try {
      const token = authService.getToken();
      if (token && lessonId) {
        await fetch(`/api/lessons/${lessonId}/finish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            totalScore: useLessonStore.getState().totalScore || (completedCount * 100),
            completedCount,
            totalExercises
          })
        });
      }
    } catch (err) {
      console.error('Failed to save progress', err);
    }
    setResult({
      completed: true,
      score: Math.round(accuracy),
      completedCount,
      totalExercises,
      message: accuracy >= 70 ? 'Amazing Work! You have mastered this lesson.' : 'Keep practicing to achieve perfection!'
    });
  };

  const renderExercise = () => {
    if (!currentExercise) return null;
    switch (currentExercise.type) {
      case 'SPEAKING':
        return (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Pronounce this:</h3>
            <div className="text-6xl font-black text-gray-900 tracking-tighter filter drop-shadow-[0_0_15px_rgba(59,130,246,0.1)]">{currentExercise.question}</div>
            {currentExercise.vocabulary?.audioUrl && (
              <div className="flex justify-center">
                <button onClick={() => { const audio = new Audio(currentExercise.vocabulary.audioUrl); audio.play(); }} 
                  className="flex items-center space-x-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-blue-400 hover:bg-white/10 transition-all group">
                  <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-sm">Listen to pronunciation</span>
                </button>
              </div>
            )}
            <div className="flex flex-col items-center py-8">
              {!isRecording ? (
                <button onClick={startRecording} className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-110 transition-all active:scale-95 group relative">
                  <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                  <Mic className="w-10 h-10 text-gray-900 group-hover:rotate-12 transition-transform" />
                </button>
              ) : (
                <button onClick={stopRecording} className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-110 transition-all active:scale-95 group relative">
                  <Square className="w-8 h-8 text-gray-900 fill-gray-900" />
                  <div className="absolute -bottom-10 text-xs font-black text-red-400 uppercase tracking-widest animate-pulse">Recording... {recordingTime}s</div>
                </button>
              )}
            </div>
            <div className={`mt-6 p-6 rounded-[32px] min-h-[100px] transition-all duration-500 ${transcript ? 'bg-white/60 border border-white/80 backdrop-blur-md scale-100 opacity-100 shadow-sm' : 'bg-transparent border-transparent scale-95 opacity-0'}`}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Live Transcript</p>
              <p className="text-2xl font-black text-gray-900 tracking-tight">{transcript}</p>
            </div>
          </div>
        );
      case 'TRANSLATION':
        return (
          <div className="text-center space-y-10 animate-in fade-in zoom-in duration-500">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Translate this:</h3>
            <div className="text-6xl font-black text-gray-900 tracking-tighter filter drop-shadow-[0_0_20px_rgba(147,51,234,0.1)]">{currentExercise.question}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {(currentExercise.choices || []).map((answer, index) => (
                <button key={index} onClick={() => handleAnswer(answer)} className="p-6 rounded-3xl bg-white/60 border border-white/80 text-gray-900 font-bold text-lg hover:bg-white/80 hover:border-white shadow-sm hover:scale-[1.02] transition-all active:scale-[0.98] text-center backdrop-blur-md">{answer}</button>
              ))}
            </div>
          </div>
        );
      case 'LISTENING':
        return (
          <div className="text-center space-y-10 animate-in fade-in zoom-in duration-500">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Listen & Choose:</h3>
            <div className="flex justify-center py-6">
              <button onClick={() => { const utterance = new SpeechSynthesisUtterance(currentExercise.answer); utterance.lang = 'th-TH'; utterance.rate = 0.8; window.speechSynthesis.speak(utterance); }} 
                className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.3)] hover:scale-110 hover:rotate-3 transition-all active:scale-95 group">
                <Volume2 className="w-14 h-14 text-white group-hover:scale-110 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {(currentExercise.choices || []).map((answer, index) => (
                <button key={index} onClick={() => handleAnswer(answer)} className="p-6 rounded-3xl bg-white/60 border border-white/80 text-gray-900 font-bold text-lg hover:bg-teal-500/10 hover:border-teal-500/30 hover:scale-[1.02] transition-all active:scale-[0.98] text-center backdrop-blur-md">{answer}</button>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{currentExercise.question}</h3>
            <div className="max-w-md mx-auto">
              <input className="w-full px-8 py-5 rounded-3xl bg-white/5 border border-white/10 text-gray-900 font-bold text-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all text-center"
                placeholder="Type your answer..." autoFocus onKeyPress={(e) => { if (e.key === 'Enter') handleAnswer(e.target.value); }} />
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8 animate-in fade-in duration-1000">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/10 border-t-blue-500/40 animate-spin"></div>
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-2xl font-black text-gray-900 tracking-widest uppercase mb-1">ThaiLearner</h3>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Architecting Lesson...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto mt-24 bg-red-500/5 border border-red-500/10 p-12 rounded-[40px] backdrop-blur-3xl text-center animate-in zoom-in-95 duration-700">
            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20"><AlertCircle className="w-10 h-10 text-red-500" /></div>
            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Synchronicity Error</h3>
            <p className="text-gray-400 font-medium leading-relaxed mb-10">{error}</p>
            <Button size="lg" className="rounded-2xl px-12" onClick={loadExercises}>Try Again</Button>
        </div>
      </MainLayout>
    );
  }

  if (exercises.length === 0) {
    return (
      <MainLayout>
        <div className="text-center py-24 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/5 max-w-2xl mx-auto mt-24 animate-in fade-in duration-1000">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8"><LayoutDashboard className="w-10 h-10 text-gray-400 opacity-30" /></div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Course Content Pending</h2>
          <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium">This educational module is currently being finalized by our language experts.</p>
          <Button variant="outline" size="lg" className="rounded-2xl" onClick={() => window.location.href = '/dashboard'}>Return to Dashboard</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Premium Bright Liquid Glass Morphism Background - CSS Animated */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-gray-50/50">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-blue-50/30 opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-6">
        <div className="mb-14 animate-in fade-in slide-in-from-top duration-1000">
          <div className="flex justify-between items-end mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1.5 ml-1">Lesson Mastery</span>
              <span className="text-2xl font-black text-gray-900 tracking-tighter">{completedCount} <span className="text-gray-400 text-sm font-medium tracking-normal ml-1">/ {totalExercises} Completed</span></span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tighter">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="w-full bg-white/40 rounded-full h-3.5 backdrop-blur-3xl border border-white/60 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_4px_12px_rgba(37,99,235,0.2)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="glass-card mb-12 shadow-[0_40px_100px_rgba(0,0,0,0.05)] rounded-[48px] border-white/80 bg-white/40 backdrop-blur-3xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <CardBody className="p-12 md:p-20">
            {!result?.completed && currentExercise && (
              <div className="flex justify-between items-center mb-16 pb-10 border-b border-gray-100">
                <div className="flex items-center space-x-6">
                  <div className={`px-5 py-2 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg ${
                    currentExercise.type === 'SPEAKING' ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20' :
                    currentExercise.type === 'TRANSLATION' ? 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20' :
                    currentExercise.type === 'LISTENING' ? 'bg-teal-500/10 text-teal-600 border border-teal-500/20' : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>{currentExercise.type} Module</div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Challenge {currentExerciseIndex + 1} <span className="text-gray-300 ml-1">/ {exercises.length}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] animate-pulse"></div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Engine Active</span>
                </div>
              </div>
            )}

            {!showResult ? (currentExercise ? renderExercise() : <Loading size="lg" />) : (
              <div className="text-center">
                {result?.completed ? (
                  <div className="animate-in zoom-in-95 duration-1000 py-4">
                    <div className="flex justify-center mb-12">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400/20 blur-[60px] rounded-full animate-pulse"></div>
                        <div className="relative p-10 rounded-[48px] bg-gradient-to-br from-yellow-400/20 via-orange-500/10 to-transparent border border-yellow-500/30 shadow-2xl backdrop-blur-2xl">
                          <Trophy className="w-24 h-24 text-yellow-400 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-bounce" />
                        </div>
                      </div>
                    </div>
                    <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Module Mastery Achieved!</h2>
                    <div className="text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-indigo-400 to-teal-400 mb-10 tracking-tighter">{result.score}%</div>
                    <p className="text-2xl text-gray-400 mb-14 font-medium max-w-lg mx-auto leading-relaxed">{result.message}</p>
                    <div className="grid grid-cols-2 gap-6 mb-16 max-w-sm mx-auto">
                      <div className="p-6 rounded-[32px] bg-white/5 border border-white/5 backdrop-blur-md">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Accuracy Rate</div>
                        <div className="text-3xl font-black text-gray-900 tracking-tighter">{result.score}%</div>
                      </div>
                      <div className="p-6 rounded-[32px] bg-white/5 border border-white/5 backdrop-blur-md">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">XP Earned</div>
                        <div className="text-3xl font-black text-teal-400 tracking-tighter">+{result.completedCount * 10}</div>
                      </div>
                    </div>
                    <Button size="lg" onClick={() => window.location.href = '/dashboard'} className="px-16 py-6 rounded-[24px] bg-blue-600 hover:bg-blue-700 text-white font-black tracking-[0.2em] uppercase text-sm shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all">
                      <span className="flex items-center space-x-3"><CheckCircle className="w-5 h-5" /><span>Return to Dashboard</span></span></Button>
                  </div>
                ) : (
                  <div className="animate-in zoom-in-95 duration-700 py-6">
                    <div className={`flex justify-center mb-10 ${result.passed ? 'text-blue-400' : 'text-red-400'}`}>
                      {result.passed ? (
                        <div className="relative"><div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full animate-pulse"></div>
                           <div className="relative p-8 rounded-full bg-blue-500/10 border-2 border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)] bg-neutral-900/40">
                             <CheckCircle className="w-24 h-24 transition-transform duration-700 scale-110" />
                           </div></div>
                      ) : (
                        <div className="p-8 rounded-full bg-red-500/10 border-2 border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.2)] bg-neutral-900/40"><XCircle className="w-24 h-24" /></div>
                      )}
                    </div>
                    <h3 className={`text-5xl font-black mb-4 tracking-tighter uppercase ${result.passed ? 'text-blue-400' : 'text-red-400'}`}>{result.passed ? 'Brilliant!' : 'Not Quite'}</h3>
                    <p className="text-xl text-gray-400 font-medium mb-12 max-w-sm mx-auto leading-relaxed">{result.message}</p>
                    {currentExercise?.vocabulary && (
                      <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[40px] p-8 mb-14 max-w-md mx-auto transition-all group shadow-sm">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Vocabulary Insight</div>
                        <div className="flex items-center justify-center space-x-6">
                          <span className="text-4xl font-black text-gray-900 leading-none tracking-tight group-hover:scale-110 transition-transform">{currentExercise.vocabulary.thaiWord}</span>
                          <div className="w-px h-8 bg-white/10"></div>
                          <span className="text-2xl font-bold text-gray-500 leading-none tracking-tight">{currentExercise.vocabulary.englishWord}</span>
                        </div>
                      </div>
                    )}
                    <Button size="lg" onClick={nextExercise} className={`px-14 py-5 rounded-[22px] font-black tracking-[0.2em] uppercase text-xs shadow-2xl transition-all flex items-center mx-auto space-x-3 ${result.passed ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/50' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-black/40'}`}>
                      <span>{(currentExerciseIndex < exercises.length - 1) ? 'Next Challenge' : 'Finish Mastery'}</span></Button>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </div>

        {!showResult && (
          <div className="flex justify-between items-center px-8 py-6 rounded-[32px] bg-white/5 border border-white/5 backdrop-blur-md animate-in fade-in duration-1000 delay-500">
            <button disabled={currentExerciseIndex === 0} onClick={() => setCurrentExerciseIndex(prev => prev - 1)} className="px-6 py-2 rounded-xl flex items-center space-x-3 text-gray-500 font-black text-[10px] uppercase tracking-widest disabled:opacity-10 disabled:grayscale hover:text-white transition-all group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /><span>Back</span></button>
            <button onClick={() => window.location.href = '/dashboard'} className="px-6 py-2 rounded-xl flex items-center space-x-3 text-red-500/60 font-black text-[10px] uppercase tracking-widest hover:text-red-400 hover:bg-red-500/5 transition-all group">
              <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" /><span>Exit Course</span></button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LessonPlayer;
