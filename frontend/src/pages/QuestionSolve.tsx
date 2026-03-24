import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Menu, ArrowLeft, CheckCircle2, XCircle, Lightbulb, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getSubjectById, getChapterById } from '../data/jeeChapters';
import { getQuestionsForChapter, saveQuestionProgress, getQuestionProgress } from '../data/questions';
import type { Question } from '../data/questions';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function QuestionSolve() {
  const navigate = useNavigate();
  const { subjectId, chapterId, questionId } = useParams<{ 
    subjectId: string; 
    chapterId: string; 
    questionId: string;
  }>();
  
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/signin');
      return;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (subjectId && chapterId && questionId) {
      const allQuestions = getQuestionsForChapter(subjectId, chapterId);
      setQuestions(allQuestions);
      
      const question = allQuestions.find(q => q.id === parseInt(questionId));
      setCurrentQuestion(question || null);

      const progress = getQuestionProgress(subjectId, chapterId);
      const savedAnswer = progress[parseInt(questionId)];
      
      if (savedAnswer) {
        setSelectedAnswer(savedAnswer.selectedAnswer);
        setShowResult(true);
      } else {
        setSelectedAnswer(null);
        setShowResult(false);
        setShowSolution(false);
      }
    }
  }, [subjectId, chapterId, questionId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion || !subjectId || !chapterId) return;
    
    saveQuestionProgress(subjectId, chapterId, currentQuestion.id, selectedAnswer);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (!questionId || !subjectId || !chapterId) return;
    
    const currentId = parseInt(questionId);
    const nextQuestion = questions.find(q => q.id === currentId + 1);
    
    if (nextQuestion) {
      navigate(`/dashboard/practice/${subjectId}/${chapterId}/${nextQuestion.id}`);
    }
  };

  const handlePreviousQuestion = () => {
    if (!questionId || !subjectId || !chapterId) return;
    
    const currentId = parseInt(questionId);
    const prevQuestion = questions.find(q => q.id === currentId - 1);
    
    if (prevQuestion) {
      navigate(`/dashboard/practice/${subjectId}/${chapterId}/${prevQuestion.id}`);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f6f8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#393f5b]/20 border-t-[#393f5b] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#070a05]/60">Loading...</p>
        </div>
      </div>
    );
  }

  const subject = subjectId ? getSubjectById(subjectId) : null;
  const chapter = subjectId && chapterId ? getChapterById(subjectId, chapterId) : null;

  if (!subject || !chapter || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f6f8]">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#070a05] mb-4">Question not found</h1>
          <Link to="/dashboard/practice" className="text-[#393f5b] hover:underline">
            Go back to Practice
          </Link>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const currentQuestionNumber = parseInt(questionId || '1');
  const hasPrevious = currentQuestionNumber > 1;
  const hasNext = currentQuestionNumber < questions.length;

  return (
    <section className="relative w-full min-h-screen bg-[#f3f6f8] text-[#070a05] overflow-hidden">
      <Sidebar 
        user={user} 
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCollapseChange={setSidebarCollapsed}
      />

      <div className={`relative min-h-screen z-[2] transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      }`}>
        {/* Top Bar */}
        <div className="bg-white/60 backdrop-blur-sm border-b border-dotted border-[#393f5b]/15 h-[72px] flex items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-[#393f5b]/5 transition-colors"
            >
              <Menu size={24} className="text-[#393f5b]" />
            </button>
            <Link 
              to={`/dashboard/practice/${subjectId}/${chapterId}`}
              className="p-2 rounded-md hover:bg-[#393f5b]/5 transition-colors"
            >
              <ArrowLeft size={20} className="text-[#393f5b]" />
            </Link>
            <div>
              <h1 
                className="font-light leading-tight tracking-tight"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw + 0.3rem, 1.75rem)',
                }}
              >
                Question {currentQuestion.id}
              </h1>
              <p className="text-xs sm:text-sm text-[#070a05]/60 mt-0.5">
                {subject.name} • {chapter.name}
              </p>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-4 sm:p-6 md:p-12 max-w-4xl mx-auto">
          {/* Question Card */}
          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 md:p-8 shadow-md mb-6">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${subject.color}`}>
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#070a05]">
                    Question {currentQuestion.id} of {questions.length}
                  </div>
                  <div className={`text-xs px-2 py-0.5 rounded inline-block mt-1 ${getDifficultyColor(currentQuestion.difficulty)}`}>
                    {currentQuestion.difficulty}
                  </div>
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <p className="text-lg text-[#070a05] leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOption = index === currentQuestion.correctAnswer;
                
                let optionClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
                
                if (showResult) {
                  if (isCorrectOption) {
                    optionClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                  } else if (isSelected && !isCorrectOption) {
                    optionClass += "border-red-500 bg-red-50 text-red-900";
                  } else {
                    optionClass += "border-[#393f5b]/10 bg-gray-50 text-[#070a05]/50";
                  }
                } else {
                  if (isSelected) {
                    optionClass += "border-[#393f5b] bg-[#393f5b]/5 text-[#070a05]";
                  } else {
                    optionClass += "border-[#393f5b]/20 hover:border-[#393f5b]/40 hover:bg-[#393f5b]/5 text-[#070a05]";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={optionClass}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium ${
                        showResult
                          ? isCorrectOption
                            ? 'bg-emerald-500 text-white'
                            : isSelected && !isCorrectOption
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                          : isSelected
                          ? 'bg-[#393f5b] text-white'
                          : 'bg-[#393f5b]/10 text-[#393f5b]'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrectOption && (
                        <CheckCircle2 className="text-emerald-600 flex-shrink-0" size={20} />
                      )}
                      {showResult && isSelected && !isCorrectOption && (
                        <XCircle className="text-red-600 flex-shrink-0" size={20} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!showResult && (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full bg-[#393f5b] hover:bg-[#2f3450] disabled:bg-[#393f5b]/30 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
              >
                Submit Answer
              </button>
            )}

            {/* Result Message */}
            {showResult && (
              <div className={`p-4 rounded-lg mb-4 ${
                isCorrect 
                  ? 'bg-emerald-50 border-2 border-emerald-500' 
                  : 'bg-red-50 border-2 border-red-500'
              }`}>
                <div className="flex items-center gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="text-emerald-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                  <div>
                    <div className={`font-medium ${isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    <div className={`text-sm ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isCorrect 
                        ? 'Great job! You got it right.' 
                        : `The correct answer is Option ${String.fromCharCode(65 + currentQuestion.correctAnswer)}`
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Solution Section */}
            {showResult && (
              <div>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-[#393f5b]/20 hover:border-[#393f5b]/40 bg-white transition-colors mb-4"
                >
                  <div className="flex items-center gap-3">
                    <Lightbulb className="text-[#393f5b]" size={20} />
                    <span className="font-medium text-[#070a05]">
                      {showSolution ? 'Hide Solution' : 'View Solution'}
                    </span>
                  </div>
                  <ChevronRight 
                    className={`text-[#393f5b] transition-transform ${showSolution ? 'rotate-90' : ''}`} 
                    size={20} 
                  />
                </button>

                {showSolution && (
                  <div className="p-6 rounded-lg bg-[#393f5b]/5 border border-[#393f5b]/10">
                    <h3 className="font-medium text-[#070a05] mb-3 flex items-center gap-2">
                      <Lightbulb className="text-[#393f5b]" size={18} />
                      Solution
                    </h3>
                    <p className="text-[#070a05]/80 leading-relaxed">
                      {currentQuestion.solution}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={!hasPrevious}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#393f5b]/20 hover:border-[#393f5b]/40 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white"
            >
              <ChevronLeft size={20} className="text-[#393f5b]" />
              <span className="font-medium text-[#070a05]">Previous</span>
            </button>

            <Link
              to={`/dashboard/practice/${subjectId}/${chapterId}`}
              className="px-6 py-3 rounded-lg border-2 border-[#393f5b]/20 hover:border-[#393f5b]/40 hover:bg-white transition-colors bg-white font-medium text-[#070a05]"
            >
              Back to Questions
            </Link>

            <button
              onClick={handleNextQuestion}
              disabled={!hasNext}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#393f5b]/20 hover:border-[#393f5b]/40 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white"
            >
              <span className="font-medium text-[#070a05]">Next</span>
              <ChevronRight size={20} className="text-[#393f5b]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
