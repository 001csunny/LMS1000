import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, CardBody, Loading, MainLayout } from './ui';
import mockExerciseService from '../services/MockExerciseService';
import { Mic, Square, Volume2, CheckCircle, XCircle, Trophy, ArrowLeft, LogOut } from 'lucide-react';
import authService from '../services/AuthService';
import { useLessonStore } from '../store/lessonStore';
import confetti from 'canvas-confetti';

/**
 * Duolingo-Style Lesson Player Component
 * Provides interactive learning experience with voice recording
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

  // Initialize SpeechRecognition on mount
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
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        const currentText = finalTranscript || interimTranscript;
        setTranscript(currentText);
        transcriptRef.current = currentText;
      };
      
      recognition.onerror = (event) => {
        if (event.error !== 'aborted') {
          setError(`ไม่สามารถรับเสียงได้: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      setError('เบราว์เซอร์ของคุณไม่รองรับการจดจำเสียง (กรุณาใช้ Chrome)');
    }
  }, []);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  useEffect(() => {
    if (lessonId) {
      loadExercises();
    }
  }, [lessonId]);

  const loadExercises = async () => {
    setLoading(true);
    setError('');
    
    try {
      const exercisesData = await mockExerciseService.getExercisesByLesson(lessonId);
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
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      // It might already be started
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      evaluateLocalSpeech(transcriptRef.current);
    }
  };

  // Auto-evaluate when speaking (Real-time Feedback)
  useEffect(() => {
    if (isRecording && transcript && currentExercise?.type === 'SPEAKING') {
      const normalize = (str) => (str || '').replace(/[\s.,!?]+/g, '').toLowerCase();
      const normTranscript = normalize(transcript);
      const normOriginal = normalize(currentExercise.answer);

      if (normOriginal.length > 0 && normTranscript.includes(normOriginal)) {
        stopRecording();
      }
    }
  }, [transcript, isRecording, currentExercise]);

  const playSuccessEffects = () => {
    try {
      const audio = new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3');
      audio.play().catch(() => {});
    } catch(e) {}
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
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
      message: passed ? 'ถูกต้อง!' : `พยายามอีกครั้ง! (คุณพูดว่า: ${text || 'ไม่ได้ยิน'})`
    });
    
    setShowResult(true);
    if (passed) {
      setCompletedCount(prev => prev + 1);
      addScore(100);
      playSuccessEffects();
      setTimeout(() => {
        nextExercise();
      }, 1500);
    }
  };

  const handleAnswer = (answer) => {
    if (showResult || result?.completed) return;

    if (answer.toLowerCase() === currentExercise.answer.toLowerCase()) {
      setResult({
        passed: true,
        score: 100,
        message: 'ถูกต้อง!'
      });
      setCompletedCount(prev => prev + 1);
      addScore(100);
      playSuccessEffects();
      setShowResult(true);
      setTimeout(() => {
        nextExercise();
      }, 1500);
    } else {
      setResult({
        passed: false,
        score: 0,
        message: `ผิด! คำตอบที่ถูกต้องคือ: ${currentExercise.answer}`
      });
      setShowResult(true);
    }
  };

  const nextExercise = () => {
    setShowResult(false);
    setResult(null);
    setTranscript('');
    
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Lesson completed
      handleLessonComplete();
    }
  };

  const handleLessonComplete = async () => {
    const accuracy = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;
    
    try {
      const token = authService.getToken();
      if (token && lessonId) {
        await fetch(`/api/lessons/${lessonId}/finish`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
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
      message: accuracy >= 70 ? 'ยอดเยี่ยม! คุณผ่านบทเรียนนี้แล้ว!' : 'ลองอีกครั้งเพื่อคะแนนที่ดีขึ้น!'
    });
  };

  const renderExercise = () => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case 'SPEAKING':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              พูดคำนี้:
            </h3>
            <div className="text-4xl font-bold text-blue-600 mb-8">
              {currentExercise.question}
            </div>
            
            {currentExercise.vocabulary?.audioUrl && (
              <div className="mb-6">
                <Button variant="outline" onClick={() => {
                  const audio = new Audio(currentExercise.vocabulary.audioUrl);
                  audio.play();
                }} className="flex items-center mx-auto space-x-2">
                  <Volume2 className="w-5 h-5" />
                  <span>ฟังตัวอย่าง</span>
                </Button>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={startRecording}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Mic className="w-5 h-5" />
                  <span>กดค้างเพื่อพูด</span>
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={stopRecording}
                  className="bg-gray-500 hover:bg-gray-600 text-white flex items-center space-x-2"
                >
                  <Square className="w-5 h-5" fill="currentColor" />
                  <span>หยุดอัด ({recordingTime}s)</span>
                </Button>
              )}
            </div>
            
            {transcript && (
              <div className="mt-6 text-xl text-gray-700 bg-gray-50 p-4 rounded-lg min-h-[60px]">
                {transcript}
              </div>
            )}
          </div>
        );
        
      case 'TRANSLATION':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              แปลคำนี้:
            </h3>
            <div className="text-4xl font-bold text-blue-600 mb-8">
              {currentExercise.question}
            </div>
            
            <div className="flex justify-center flex-wrap gap-4 max-w-2xl mx-auto">
              {(currentExercise.choices || []).map((answer, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswer(answer)}
                  className="min-w-[120px]"
                >
                  {answer}
                </Button>
              ))}
            </div>
          </div>
        );
        
      case 'LISTENING':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ฟังและเลือกคำที่ถูกต้อง:
            </h3>
            
            {currentExercise.audioUrl ? (
              <div className="mb-8">
                <audio controls src={currentExercise.audioUrl} className="mx-auto" />
              </div>
            ) : (
              <div className="mb-8 flex justify-center">
                <Button variant="outline" size="lg" onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(currentExercise.answer);
                  utterance.lang = 'th-TH';
                  window.speechSynthesis.speak(utterance);
                }} className="flex items-center space-x-2 border-2 border-blue-200 hover:bg-blue-50">
                  <Volume2 className="w-6 h-6 text-blue-600" />
                  <span className="text-blue-700 font-semibold">ฟังเสียง</span>
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {(currentExercise.choices || []).map((answer, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(answer)}
                >
                  {answer}
                </Button>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {currentExercise.question}
            </h3>
            <Input
              placeholder="พิมพ์คำตอบของคุณ"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer(e.target.value);
                }
              }}
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loading size="lg" />
          <p className="text-gray-400 font-bold animate-pulse">Syncing Lessons...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto mt-12 bg-red-500/10 border border-red-500/20 p-8 rounded-3xl backdrop-blur-md text-center">
            <h3 className="text-red-400 font-black mb-2 uppercase tracking-widest">Error Loading Lesson</h3>
            <p className="text-gray-400">{error}</p>
            <Button className="mt-6" onClick={loadExercises}>Try Again</Button>
        </div>
      </MainLayout>
    );
  }

  if (exercises.length === 0) {
    return (
      <MainLayout>
        <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-black text-white mb-4">No Exercises Found</h2>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">This lesson doesn't have any exercises yet. Please check back later or contact an administrator.</p>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>Return to Dashboard</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Premium Liquid Glass Morphism Background - CSS Animated */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-[#0a0a0c]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-teal-500/5 rounded-full blur-[80px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0c] via-transparent to-[#111827] opacity-80"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-8 px-4">
        {/* Progress Bar Container */}
        <div className="mb-10 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex justify-between items-end mb-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">
                Lesson Progress
              </span>
              <span className="text-xl font-black text-white">
                {completedCount} <span className="text-gray-500 text-sm font-medium">/ {totalExercises}</span>
              </span>
            </div>
            <span className="text-2xl font-black text-blue-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-3 backdrop-blur-md border border-white/5 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-600 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <Card className="mb-10 backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[40px] overflow-hidden transition-all duration-500 hover:shadow-blue-900/10">
          <CardBody className="p-10 md:p-14">
            {/* Header Guard: Only show if lesson isn't completed and current exercise is valid */}
            {!result?.completed && currentExercise && (
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center space-x-4">
                  <div className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest ${
                    currentExercise.type === 'SPEAKING' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    currentExercise.type === 'TRANSLATION' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    currentExercise.type === 'LISTENING' ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' :
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                    {currentExercise.type}
                  </div>
                  <span className="text-sm font-bold text-gray-500">
                    Question {currentExerciseIndex + 1} of {exercises.length}
                  </span>
                </div>
              </div>
            )}

            {/* Exercise Content with Guard Clause */}
            {!showResult ? (
              currentExercise ? renderExercise() : (
                <div className="text-center py-20 flex flex-col items-center">
                  <Loading size="lg" text="Preparing next challenge..." />
                </div>
              )
            ) : (
              <div className="text-center py-6">
                {result?.completed ? (
                  /* Lesson Complete Screen */
                  <div className="animate-in zoom-in-95 duration-700">
                    <div className="flex justify-center mb-8">
                      <div className="p-8 rounded-[40px] bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 shadow-2xl backdrop-blur-md">
                        <Trophy className="w-20 h-20 text-yellow-400 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                      </div>
                    </div>
                    
                    <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">
                      Lesson Successful!
                    </h2>
                    
                    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-teal-400 mb-8 tracking-tighter shadow-blue-500/20">
                      {result.score}%
                    </div>
                    
                    <p className="text-xl text-gray-400 mb-10 font-medium max-w-md mx-auto leading-relaxed">
                      {result.message}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-12 max-w-xs mx-auto">
                      <div className="p-4 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Correct</div>
                        <div className="text-2xl font-black text-white">{result.completedCount}</div>
                      </div>
                      <div className="p-4 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total</div>
                        <div className="text-2xl font-black text-white">{result.totalExercises}</div>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      onClick={() => window.location.href = '/dashboard'}
                      className="px-12 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black tracking-widest uppercase text-sm shadow-xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95"
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                ) : (
                  /* Individual Question Result Screen */
                  <div className="animate-in zoom-in-95 duration-500">
                    <div className={`flex justify-center mb-8 ${
                      result.passed ? 'text-blue-500' : 'text-red-500'
                    }`}>
                      {result.passed ? (
                        <div className="p-6 rounded-full bg-blue-500/10 border-2 border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                          <CheckCircle className="w-20 h-20 animate-bounce" />
                        </div>
                      ) : (
                        <div className="p-6 rounded-full bg-red-500/10 border-2 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                          <XCircle className="w-20 h-20 text-red-400" />
                        </div>
                      )}
                    </div>

                    <h3 className={`text-4xl font-black mb-4 tracking-tighter ${
                      result.passed ? 'text-blue-400' : 'text-red-400'
                    }`}>
                      {result.passed ? 'Perfect!' : 'Not' + ' Quite...'}
                    </h3>
                    
                    <p className="text-lg text-gray-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                      {result.message}
                    </p>

                    {/* Guard: Access currentExercise vocabulary safely */}
                    {currentExercise?.vocabulary && (
                      <div className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-[30px] p-6 mb-10 max-w-md mx-auto transition-all hover:bg-white/10">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">Learn the word</div>
                        <div className="flex items-center justify-center space-x-4">
                          <span className="text-2xl font-black text-white leading-none">{currentExercise.vocabulary.thaiWord}</span>
                          <div className="w-px h-6 bg-white/20"></div>
                          <span className="text-lg font-bold text-gray-400 leading-none">{currentExercise.vocabulary.englishWord}</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      size="lg" 
                      onClick={nextExercise}
                      className={`px-10 py-4 rounded-2xl font-black tracking-widest uppercase text-sm shadow-xl transition-all hover:scale-105 active:scale-95 ${
                        result.passed 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/40' 
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-black/20'
                      }`}
                    >
                      {(currentExerciseIndex < exercises.length - 1) ? 'Next Challenge' : 'Finish Lesson'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Global Navigation - Only show if not on result screens */}
        {!showResult && (
          <div className="flex justify-between items-center px-4 animate-in fade-in duration-1000">
            <button
              disabled={currentExerciseIndex === 0}
              onClick={() => setCurrentExerciseIndex(prev => prev - 1)}
              className="px-6 py-2 rounded-xl flex items-center space-x-2 text-gray-500 font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-2 rounded-xl flex items-center space-x-2 text-red-500/80 font-bold text-sm hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Lesson</span>
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default LessonPlayer;
