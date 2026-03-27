import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Menu, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flag,
  CheckCircle,
  Circle,
  AlertCircle,
  X,
  XCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  DASHBOARD_SECTION_CLASS,
  dashboardMainClass,
  DASHBOARD_TOPBAR_CLASS,
  DASHBOARD_CONTENT_CLASS,
  dashboardTitleStyle,
} from '../lib/dashboardLayout';
import { generateMockTestQuestions, mockTests, type MockTestQuestion } from '../data/mockTests';
import { playAnswerFeedbackSound } from '../lib/preferences';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface QuestionStatus {
  answered: boolean;
  selectedOption: number | null;
  marked: boolean;
}

const WARNING_TIME = 5 * 60;

export default function MockTestInterface() {
  const navigate = useNavigate();
  const { testId } = useParams<{ testId: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [viewingResults, setViewingResults] = useState(false);
  const warningShownRef = useRef(false);

  const mockTest = mockTests.find(t => t.id === testId);
  const [questions] = useState<MockTestQuestion[]>(() => generateMockTestQuestions(testId || ''));
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    Array(questions.length).fill(null).map(() => ({
      answered: false,
      selectedOption: null,
      marked: false,
    }))
  );

  useEffect(() => {
    if (!mockTest) {
      navigate('/dashboard/mock-tests');
      return;
    }

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    setUser(JSON.parse(userData));
    
    const resultsStr = localStorage.getItem('mockTestResults');
    if (resultsStr) {
      const results = JSON.parse(resultsStr);
      if (results[testId!]?.completed) {
        setTestSubmitted(true);
        setViewingResults(true);
        setScore(results[testId!].score);
        
        const savedData = localStorage.getItem(`mock-test-result-${testId}`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setQuestionStatuses(parsed.questionStatuses || questionStatuses);
        }
        return;
      }
    }
    
    const savedData = localStorage.getItem(`mock-test-progress-${testId}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCurrentQuestion(parsed.currentQuestion || 0);
      setQuestionStatuses(parsed.questionStatuses || questionStatuses);
      setTimeRemaining(parsed.timeRemaining || (mockTest.duration * 60));
    } else {
      setTimeRemaining(mockTest.duration * 60);
    }
  }, [navigate, testId]);

  useEffect(() => {
    if (testSubmitted || timeRemaining <= 0 || viewingResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit(true);
          return 0;
        }
        
        if (prev === WARNING_TIME && !warningShownRef.current) {
          setShowWarning(true);
          warningShownRef.current = true;
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testSubmitted, timeRemaining, viewingResults]);

  useEffect(() => {
    if (!testSubmitted && !viewingResults && mockTest) {
      localStorage.setItem(`mock-test-progress-${testId}`, JSON.stringify({
        currentQuestion,
        questionStatuses,
        timeRemaining,
      }));
    }
  }, [currentQuestion, questionStatuses, timeRemaining, testId, testSubmitted, viewingResults, mockTest]);

  useEffect(() => {
    if (testSubmitted || viewingResults) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [testSubmitted, viewingResults]);

  if (!mockTest) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (testSubmitted || viewingResults) return;

    const newStatuses = [...questionStatuses];
    newStatuses[currentQuestion] = {
      ...newStatuses[currentQuestion],
      answered: true,
      selectedOption: optionIndex,
    };
    setQuestionStatuses(newStatuses);
    playAnswerFeedbackSound();
  };

  const handleMarkForReview = () => {
    if (testSubmitted || viewingResults) return;

    const newStatuses = [...questionStatuses];
    newStatuses[currentQuestion] = {
      ...newStatuses[currentQuestion],
      marked: !newStatuses[currentQuestion].marked,
    };
    setQuestionStatuses(newStatuses);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionNavigate = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = (autoSubmit = false) => {
    if (autoSubmit) {
      submitTest();
    } else {
      setShowSubmitDialog(true);
    }
  };

  const submitTest = () => {
    let calculatedScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    
    questionStatuses.forEach((status, index) => {
      if (status.selectedOption !== null) {
        if (status.selectedOption === questions[index].correctAnswer) {
          calculatedScore += 4;
          correctCount++;
        } else {
          calculatedScore -= 1;
          incorrectCount++;
        }
      }
    });

    const attemptedCount = questionStatuses.filter(s => s.answered).length;
    const percentage = ((correctCount / questions.length) * 100);
    const timeTaken = (mockTest.duration * 60) - timeRemaining;

    setScore(correctCount);
    setTestSubmitted(true);
    setViewingResults(true);
    setShowSubmitDialog(false);

    const resultsStr = localStorage.getItem('mockTestResults');
    const results = resultsStr ? JSON.parse(resultsStr) : {};
    results[testId!] = {
      testId: testId,
      completed: true,
      score: correctCount,
      totalQuestions: questions.length,
      attempted: attemptedCount,
      percentage: percentage,
      timeTaken: timeTaken,
      completedAt: new Date().toISOString(),
      marks: calculatedScore,
    };
    localStorage.setItem('mockTestResults', JSON.stringify(results));
    
    localStorage.setItem(`mock-test-result-${testId}`, JSON.stringify({
      questionStatuses,
      score: correctCount,
      marks: calculatedScore,
      correctCount,
      incorrectCount,
      timeTaken,
    }));
    
    localStorage.removeItem(`mock-test-progress-${testId}`);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatusIcon = (index: number) => {
    const status = questionStatuses[index];
    if (status.answered && status.marked) {
      return <Flag size={14} className="text-amber-600" fill="currentColor" />;
    }
    if (status.answered) {
      return <CheckCircle size={14} className="text-emerald-600" />;
    }
    if (status.marked) {
      return <Flag size={14} className="text-amber-600" />;
    }
    return <Circle size={14} className="text-[#070a05]/30" />;
  };

  const getQuestionStatusColor = (index: number) => {
    const status = questionStatuses[index];
    if (currentQuestion === index) {
      return 'bg-[#393f5b] text-white border-[#393f5b]';
    }
    if (status.answered && status.marked) {
      return 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100';
    }
    if (status.answered) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100';
    }
    if (status.marked) {
      return 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100';
    }
    return 'bg-white text-[#070a05]/70 border-[#393f5b]/20 hover:bg-[#393f5b]/5';
  };

  const answeredCount = questionStatuses.filter(s => s.answered).length;
  const markedCount = questionStatuses.filter(s => s.marked && !s.answered).length;
  const notVisitedCount = questions.length - answeredCount - markedCount;

  if (!user) {
    return null;
  }

  if (testSubmitted) {
    const savedResult = localStorage.getItem(`mock-test-result-${testId}`);
    const resultData = savedResult ? JSON.parse(savedResult) : {};
    const correctCount = resultData.correctCount || score;
    const incorrectCount = resultData.incorrectCount || 0;
    const totalMarks = resultData.marks || 0;

    return (
      <section className={DASHBOARD_SECTION_CLASS}>
        <Sidebar 
          user={user} 
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onCollapseChange={setSidebarCollapsed}
          disableNavigation={!viewingResults}
        />

        <div className={dashboardMainClass(sidebarCollapsed)}>
          <div className={`${DASHBOARD_TOPBAR_CLASS} w-full`}>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 w-full">
              <button type="button" onClick={() => setSidebarOpen(true)} className="lg:hidden p-2.5 min-h-11 min-w-11 rounded-md hover:bg-[#393f5b]/5 transition-colors touch-manipulation inline-flex items-center justify-center shrink-0 -ml-1" aria-label="Open menu">
                <Menu size={22} className="text-[#393f5b]" />
              </button>
              <h1 className="font-light leading-tight tracking-tight text-[#393f5b] min-w-0 flex-1 line-clamp-2 sm:line-clamp-none" style={dashboardTitleStyle}>
                {mockTest.title} - Results
              </h1>
            </div>
          </div>

          <div className={DASHBOARD_CONTENT_CLASS}>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-8 shadow-lg text-center sticky top-6">
                    <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-6">
                      <CheckCircle className="text-emerald-600" size={48} />
                    </div>
                    <h2 className="text-3xl font-light tracking-tight text-[#070a05] mb-4">
                      Test Completed!
                    </h2>
                    <p className="text-[#070a05]/70 mb-6 text-sm">
                      {viewingResults && 'Viewing your previous attempt'}
                    </p>

                    <div className="bg-[#393f5b]/5 rounded-lg p-6 mb-6">
                      <div className="text-5xl font-light text-[#393f5b] mb-2">
                        {correctCount} / {questions.length}
                      </div>
                      <p className="text-[#070a05]/60 mb-4">Correct Answers</p>
                      
                      <div className="pt-4 border-t border-dotted border-[#393f5b]/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#070a05]/70">Total Marks:</span>
                          <span className="font-medium text-[#393f5b]">{totalMarks} / {questions.length * 4}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#070a05]/70">Percentage:</span>
                          <span className="font-medium text-[#393f5b]">{((correctCount / questions.length) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#070a05]/70">Time Taken:</span>
                          <span className="font-medium text-[#393f5b]">{formatTime((mockTest.duration * 60) - timeRemaining)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-2xl font-light text-emerald-600 mb-1">{correctCount}</div>
                        <p className="text-xs text-[#070a05]/60">Correct</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="text-2xl font-light text-red-600 mb-1">{incorrectCount}</div>
                        <p className="text-xs text-[#070a05]/60">Incorrect</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-2xl font-light text-[#070a05]/60 mb-1">{questions.length - answeredCount}</div>
                        <p className="text-xs text-[#070a05]/60">Skipped</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/dashboard/mock-tests')}
                      className="w-full bg-[#393f5b] hover:bg-[#2f3450] text-white py-3 rounded-lg transition-colors font-medium"
                    >
                      Back to Mock Tests
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                  {questions.map((q, index) => {
                    const status = questionStatuses[index];
                    const isCorrect = status.selectedOption === q.correctAnswer;
                    const wasAnswered = status.answered;

                    return (
                      <div key={index} className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-[#070a05]/60">Question {index + 1}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              q.subject === 'Physics' ? 'bg-blue-100 text-blue-700' :
                              q.subject === 'Chemistry' ? 'bg-purple-100 text-purple-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {q.subject}
                            </span>
                          </div>
                          {wasAnswered && (
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                              isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />}
                              {isCorrect ? 'Correct (+4)' : 'Incorrect (-1)'}
                            </div>
                          )}
                          {!wasAnswered && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                              <Circle size={14} />
                              Not Attempted (0)
                            </div>
                          )}
                        </div>

                        <p className="text-[#070a05] mb-4">{q.question}</p>

                        <div className="space-y-2">
                          {q.options.map((option, optIndex) => {
                            const isSelected = status.selectedOption === optIndex;
                            const isCorrectOption = optIndex === q.correctAnswer;

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectOption
                                    ? 'border-emerald-500 bg-emerald-50'
                                    : isSelected && !isCorrect
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-200 bg-white'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    isCorrectOption
                                      ? 'border-emerald-500 bg-emerald-500'
                                      : isSelected && !isCorrect
                                      ? 'border-red-500 bg-red-500'
                                      : 'border-gray-300'
                                  }`}>
                                    {(isCorrectOption || (isSelected && !isCorrect)) && (
                                      <div className="w-2 h-2 bg-white rounded-full" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <span className={`${
                                      isCorrectOption ? 'text-emerald-700 font-medium' :
                                      isSelected && !isCorrect ? 'text-red-700' :
                                      'text-[#070a05]'
                                    }`}>
                                      {option}
                                    </span>
                                    {isCorrectOption && (
                                      <span className="ml-2 text-xs text-emerald-600 font-medium">
                                        (Correct Answer)
                                      </span>
                                    )}
                                    {isSelected && !isCorrect && (
                                      <span className="ml-2 text-xs text-red-600 font-medium">
                                        (Your Answer)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = questions[currentQuestion];
  const currentStatus = questionStatuses[currentQuestion];

  return (
    <section className={DASHBOARD_SECTION_CLASS}>
      <Sidebar 
        user={user} 
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCollapseChange={setSidebarCollapsed}
        disableNavigation={!viewingResults}
      />

      <div className={dashboardMainClass(sidebarCollapsed)}>
        <div className={`${DASHBOARD_TOPBAR_CLASS} flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2 sm:gap-3`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 w-full">
            <button type="button" onClick={() => setSidebarOpen(true)} className="lg:hidden p-2.5 min-h-11 min-w-11 rounded-md hover:bg-[#393f5b]/5 transition-colors touch-manipulation inline-flex items-center justify-center shrink-0 -ml-1" aria-label="Open menu">
              <Menu size={22} className="text-[#393f5b]" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="font-light leading-tight tracking-tight text-[#393f5b] line-clamp-2 sm:line-clamp-none" style={dashboardTitleStyle}>
                {mockTest.title}
              </h1>
              <p className="text-[0.6rem] sm:text-xs md:text-sm text-[#070a05]/60 mt-0.5 leading-snug">
                {mockTest.totalQuestions} Questions • P: {mockTest.physicsQuestions} • C: {mockTest.chemistryQuestions} • M: {mockTest.mathsQuestions}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-2 w-full sm:w-auto shrink-0">
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg touch-manipulation ${
              timeRemaining < 600 ? 'bg-red-100 text-red-600' : 'bg-[#393f5b]/10 text-[#393f5b]'
            }`}>
              <Clock size={18} />
              <span className="font-medium text-xs sm:text-sm tabular-nums">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className={DASHBOARD_CONTENT_CLASS}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 md:p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#070a05]/60">Question {currentQuestion + 1} of {questions.length}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        currentQ.subject === 'Physics' ? 'bg-blue-100 text-blue-700' :
                        currentQ.subject === 'Chemistry' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {currentQ.subject}
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-lg text-[#070a05] leading-relaxed">
                      {currentQ.question}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                          currentStatus.selectedOption === index
                            ? 'border-[#393f5b] bg-[#393f5b]/5'
                            : 'border-[#393f5b]/20 hover:border-[#393f5b]/40 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            currentStatus.selectedOption === index
                              ? 'border-[#393f5b] bg-[#393f5b]'
                              : 'border-[#393f5b]/30'
                          }`}>
                            {currentStatus.selectedOption === index && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-[#070a05] flex-1">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-dotted border-[#393f5b]/15">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#393f5b]/20 hover:border-[#393f5b] hover:bg-[#393f5b]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                      <span className="text-sm font-medium">Previous</span>
                    </button>

                    <button
                      onClick={handleMarkForReview}
                      disabled={viewingResults}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        currentStatus.marked
                          ? 'border-amber-300 bg-amber-50 text-amber-700'
                          : 'border-[#393f5b]/20 hover:border-[#393f5b] hover:bg-[#393f5b]/5'
                      } ${viewingResults ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Flag size={18} />
                      <span className="text-sm font-medium">
                        {currentStatus.marked ? 'Unmark' : 'Mark for Review'}
                      </span>
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={currentQuestion === questions.length - 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#393f5b] text-white hover:bg-[#2f3450] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                    >
                      <span className="text-sm font-medium">Next</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-lg sticky top-6">
                  <h3 className="text-lg font-light tracking-tight text-[#070a05] mb-4">
                    Question Palette
                  </h3>

                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {questions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionNavigate(index)}
                        className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 relative ${
                          getQuestionStatusColor(index)
                        }`}
                      >
                        <span className="text-sm font-medium">{index + 1}</span>
                        <div className="absolute -top-1 -right-1">
                          {getQuestionStatusIcon(index)}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-dotted border-[#393f5b]/15">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-emerald-600" />
                        <span className="text-[#070a05]/70">Answered</span>
                      </div>
                      <span className="font-medium text-[#070a05]">{answeredCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Flag size={14} className="text-amber-600" />
                        <span className="text-[#070a05]/70">Marked</span>
                      </div>
                      <span className="font-medium text-[#070a05]">{markedCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Circle size={14} className="text-[#070a05]/30" />
                        <span className="text-[#070a05]/70">Not Visited</span>
                      </div>
                      <span className="font-medium text-[#070a05]">{notVisitedCount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSubmit(false)}
                    disabled={viewingResults}
                    className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
                      viewingResults ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <CheckCircle size={18} />
                    {viewingResults ? 'Test Already Submitted' : 'Submit Test'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-full">
                <AlertCircle className="text-amber-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light tracking-tight text-[#070a05] mb-2">
                  Submit Test?
                </h3>
                <p className="text-sm text-[#070a05]/70 mb-2">
                  Are you sure you want to submit? You have answered {answeredCount} out of {questions.length} questions.
                </p>
                <p className="text-xs text-[#070a05]/60">
                  Time remaining: {formatTime(timeRemaining)}
                </p>
              </div>
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} className="text-[#070a05]/60" />
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="flex-1 px-4 py-2 border border-[#393f5b]/20 rounded-lg hover:bg-[#393f5b]/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => submitTest()}
                className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-100 rounded-full">
                <Clock className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light tracking-tight text-[#070a05] mb-2">
                  Time Warning!
                </h3>
                <p className="text-sm text-[#070a05]/70">
                  Only 5 minutes remaining! Your test will be auto-submitted when time runs out.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowWarning(false)}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
            >
              Continue Test
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
