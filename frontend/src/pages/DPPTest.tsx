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
  XCircle,
  ChevronDown,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  DASHBOARD_SECTION_CLASS,
  dashboardMainClass,
  DASHBOARD_TOPBAR_CLASS,
  DASHBOARD_CONTENT_CLASS,
  dashboardTitleStyle,
} from '../lib/dashboardLayout';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Question {
  id: number;
  subject: 'Physics' | 'Chemistry' | 'Maths';
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuestionStatus {
  answered: boolean;
  selectedOption: number | null;
  marked: boolean;
}

const TOTAL_TIME = 60 * 60;
const WARNING_TIME = 5 * 60;

export default function DPPTest() {
  const navigate = useNavigate();
  const { date } = useParams<{ date: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_TIME);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [viewingResults, setViewingResults] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const warningShownRef = useRef(false);

  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    Array(30).fill(null).map(() => ({
      answered: false,
      selectedOption: null,
      marked: false,
    }))
  );

  const [questions] = useState<Question[]>(generateDPPQuestions());

  // Prevent browser navigation/refresh during test
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    setUser(JSON.parse(userData));
    
    // Check if DPP is already completed
    const dppDataStr = localStorage.getItem('dppData');
    if (dppDataStr) {
      const dppData = JSON.parse(dppDataStr);
      if (dppData[date!]?.completed) {
        // Load previous results for viewing only
        setTestSubmitted(true);
        setViewingResults(true);
        setScore(dppData[date!].score);
        
        // Load the saved answers if available
        const savedData = localStorage.getItem(`dpp-result-${date}`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setQuestionStatuses(parsed.questionStatuses || questionStatuses);
        }
        return;
      }
    }
    
    // Load in-progress test
    const savedData = localStorage.getItem(`dpp-progress-${date}`);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setCurrentQuestion(parsed.currentQuestion || 0);
      setQuestionStatuses(parsed.questionStatuses || questionStatuses);
      setTimeRemaining(parsed.timeRemaining || TOTAL_TIME);
    }
  }, [navigate, date]);

  useEffect(() => {
    if (testSubmitted || timeRemaining <= 0 || viewingResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit(true);
          return 0;
        }
        
        // Show warning when 5 minutes are left
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
    if (!testSubmitted && !viewingResults) {
      localStorage.setItem(`dpp-progress-${date}`, JSON.stringify({
        currentQuestion,
        questionStatuses,
        timeRemaining,
      }));
    }
  }, [currentQuestion, questionStatuses, timeRemaining, date, testSubmitted, viewingResults]);

  function generateDPPQuestions(): Question[] {
    const questions: Question[] = [
      // Physics Questions (1-10)
      {
        id: 1,
        subject: 'Physics',
        question: 'A body is thrown vertically upward with velocity u. The distance traveled by it in the 5th and 6th seconds are equal. The velocity u is equal to (g = 10 m/s²)',
        options: ['45 m/s', '50 m/s', '55 m/s', '60 m/s'],
        correctAnswer: 2,
      },
      {
        id: 2,
        subject: 'Physics',
        question: 'A particle moves in a straight line with constant acceleration. If it covers 10m in first 2 seconds and 25m in next 2 seconds, what is its acceleration?',
        options: ['3.75 m/s²', '2.5 m/s²', '5 m/s²', '7.5 m/s²'],
        correctAnswer: 0,
      },
      {
        id: 3,
        subject: 'Physics',
        question: 'Two forces of magnitude 3N and 4N act on a body. The resultant force can be:',
        options: ['0N', '1N', '5N', '10N'],
        correctAnswer: 2,
      },
      {
        id: 4,
        subject: 'Physics',
        question: 'A body of mass 5 kg is acted upon by a force of 20N. What is the acceleration produced?',
        options: ['2 m/s²', '4 m/s²', '5 m/s²', '10 m/s²'],
        correctAnswer: 1,
      },
      {
        id: 5,
        subject: 'Physics',
        question: 'The dimensional formula for impulse is:',
        options: ['[MLT⁻¹]', '[MLT⁻²]', '[ML²T⁻¹]', '[ML²T⁻²]'],
        correctAnswer: 0,
      },
      {
        id: 6,
        subject: 'Physics',
        question: 'A ball is dropped from height h. The time taken to cover the first half distance is:',
        options: ['t/√2', 't/2', 't√2', 't/4'],
        correctAnswer: 0,
      },
      {
        id: 7,
        subject: 'Physics',
        question: 'The work done by a force F = (2î + 3ĵ) N in displacing an object by s = (3î + 4ĵ) m is:',
        options: ['6 J', '12 J', '18 J', '24 J'],
        correctAnswer: 2,
      },
      {
        id: 8,
        subject: 'Physics',
        question: 'A spring of force constant k is cut into two equal parts. The force constant of each part will be:',
        options: ['k', 'k/2', '2k', '4k'],
        correctAnswer: 2,
      },
      {
        id: 9,
        subject: 'Physics',
        question: 'The escape velocity from Earth\'s surface is approximately:',
        options: ['7.2 km/s', '9.8 km/s', '11.2 km/s', '15 km/s'],
        correctAnswer: 2,
      },
      {
        id: 10,
        subject: 'Physics',
        question: 'Two bodies of masses m₁ and m₂ have equal kinetic energies. The ratio of their momenta is:',
        options: ['m₁:m₂', '√(m₁):√(m₂)', 'm₁²:m₂²', '1:1'],
        correctAnswer: 1,
      },
      // Chemistry Questions (11-20)
      {
        id: 11,
        subject: 'Chemistry',
        question: 'Which of the following has maximum number of atoms?',
        options: ['18g of H₂O', '18g of O₂', '18g of CO₂', '18g of CH₄'],
        correctAnswer: 3,
      },
      {
        id: 12,
        subject: 'Chemistry',
        question: 'The oxidation state of Cr in K₂Cr₂O₇ is:',
        options: ['+3', '+4', '+6', '+7'],
        correctAnswer: 2,
      },
      {
        id: 13,
        subject: 'Chemistry',
        question: 'Which of the following is an example of extensive property?',
        options: ['Temperature', 'Pressure', 'Volume', 'Density'],
        correctAnswer: 2,
      },
      {
        id: 14,
        subject: 'Chemistry',
        question: 'The number of orbitals in n=3 shell is:',
        options: ['3', '6', '9', '12'],
        correctAnswer: 2,
      },
      {
        id: 15,
        subject: 'Chemistry',
        question: 'Which quantum number determines the shape of the orbital?',
        options: ['Principal quantum number (n)', 'Azimuthal quantum number (l)', 'Magnetic quantum number (m)', 'Spin quantum number (s)'],
        correctAnswer: 1,
      },
      {
        id: 16,
        subject: 'Chemistry',
        question: 'The electronic configuration of Cu (Z=29) is:',
        options: ['[Ar] 3d⁹ 4s²', '[Ar] 3d¹⁰ 4s¹', '[Ar] 3d⁸ 4s²', '[Ar] 3d¹⁰ 4s²'],
        correctAnswer: 1,
      },
      {
        id: 17,
        subject: 'Chemistry',
        question: 'The bond order of O₂⁺ is:',
        options: ['1.5', '2.0', '2.5', '3.0'],
        correctAnswer: 2,
      },
      {
        id: 18,
        subject: 'Chemistry',
        question: 'Which of the following is the most ionic compound?',
        options: ['NaCl', 'KCl', 'CsCl', 'LiCl'],
        correctAnswer: 2,
      },
      {
        id: 19,
        subject: 'Chemistry',
        question: 'According to VSEPR theory, the shape of CH₄ is:',
        options: ['Linear', 'Trigonal planar', 'Tetrahedral', 'Octahedral'],
        correctAnswer: 2,
      },
      {
        id: 20,
        subject: 'Chemistry',
        question: 'What is the hybridization of carbon in CO₂?',
        options: ['sp', 'sp²', 'sp³', 'sp³d'],
        correctAnswer: 0,
      },
      // Maths Questions (21-30)
      {
        id: 21,
        subject: 'Maths',
        question: 'If sin θ + cos θ = √2, then tan θ + cot θ is equal to:',
        options: ['1', '2', '√2', '2√2'],
        correctAnswer: 1,
      },
      {
        id: 22,
        subject: 'Maths',
        question: 'The value of sin 15° is:',
        options: ['(√3-1)/(2√2)', '(√3+1)/(2√2)', '(√3-1)/2', '(√3+1)/2'],
        correctAnswer: 0,
      },
      {
        id: 23,
        subject: 'Maths',
        question: 'If ⁿPᵣ = 720 and ⁿCᵣ = 120, then r is equal to:',
        options: ['2', '3', '4', '5'],
        correctAnswer: 1,
      },
      {
        id: 24,
        subject: 'Maths',
        question: 'The number of ways to arrange the letters of the word "MATHEMATICS" is:',
        options: ['11!/(2!×2!×2!)', '11!/2!', '11!/(2!×2!)', '11!'],
        correctAnswer: 0,
      },
      {
        id: 25,
        subject: 'Maths',
        question: 'If (1+x)ⁿ = C₀ + C₁x + C₂x² + ... + Cₙxⁿ, then C₀ + C₁ + C₂ + ... + Cₙ equals:',
        options: ['2ⁿ⁻¹', '2ⁿ', '2ⁿ⁺¹', 'n!'],
        correctAnswer: 1,
      },
      {
        id: 26,
        subject: 'Maths',
        question: 'The derivative of sin²x with respect to x is:',
        options: ['2sin x', 'sin 2x', '2cos x', 'cos 2x'],
        correctAnswer: 1,
      },
      {
        id: 27,
        subject: 'Maths',
        question: 'If f(x) = x³ - 3x² + 4x + 5, then f\'(1) equals:',
        options: ['1', '2', '3', '4'],
        correctAnswer: 0,
      },
      {
        id: 28,
        subject: 'Maths',
        question: 'The slope of the tangent to the curve y = x² at the point (1,1) is:',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
      },
      {
        id: 29,
        subject: 'Maths',
        question: 'The equation of the line passing through (2,3) and perpendicular to the line 3x + 4y = 5 is:',
        options: ['4x - 3y + 1 = 0', '4x - 3y - 1 = 0', '3x - 4y + 1 = 0', '3x + 4y - 1 = 0'],
        correctAnswer: 1,
      },
      {
        id: 30,
        subject: 'Maths',
        question: 'If the sum of first n terms of an A.P. is 3n² + 5n, then its common difference is:',
        options: ['3', '6', '8', '10'],
        correctAnswer: 1,
      },
    ];

    return questions;
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
    questionStatuses.forEach((status, index) => {
      if (status.selectedOption === questions[index].correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setTestSubmitted(true);
    setViewingResults(true);
    setShowSubmitDialog(false);

    const dppDataStr = localStorage.getItem('dppData');
    const dppData = dppDataStr ? JSON.parse(dppDataStr) : {};
    dppData[date!] = {
      date: date,
      completed: true,
      score: calculatedScore,
      totalQuestions: 30,
      attempted: questionStatuses.filter(s => s.answered).length,
    };
    localStorage.setItem('dppData', JSON.stringify(dppData));
    
    // Save results with answers for future viewing
    localStorage.setItem(`dpp-result-${date}`, JSON.stringify({
      questionStatuses,
      score: calculatedScore,
    }));
    
    // Remove progress data
    localStorage.removeItem(`dpp-progress-${date}`);
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
  const notVisitedCount = 30 - answeredCount - markedCount;

  if (!user) {
    return null;
  }

  if (testSubmitted) {
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
              <h1 className="font-light leading-tight tracking-tight text-[#393f5b] min-w-0 flex-1 break-words" style={dashboardTitleStyle}>
                DPP Result - {date}
              </h1>
            </div>
          </div>

          <div className={DASHBOARD_CONTENT_CLASS}>
            <div className="max-w-7xl mx-auto w-full min-w-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Summary Card */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/50 p-5 sm:p-8 shadow-lg text-center static lg:sticky lg:top-6">
                    <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-6">
                      <CheckCircle className="text-emerald-600" size={48} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#070a05] mb-3 sm:mb-4">
                      Test Completed!
                    </h2>
                    <p className="text-[#070a05]/70 mb-6 text-sm">
                      {viewingResults && 'Viewing your previous attempt'}
                    </p>

                    <div className="bg-[#393f5b]/5 rounded-xl p-4 sm:p-6 mb-5 sm:mb-6">
                      <div className="text-4xl sm:text-5xl font-light text-[#393f5b] mb-2 tabular-nums">
                        {score} / 30
                      </div>
                      <p className="text-[#070a05]/60">Your Score</p>
                      <div className="mt-4 pt-4 border-t border-dotted border-[#393f5b]/20">
                        <p className="text-sm text-[#070a05]/70">
                          Percentage: <span className="font-medium text-[#393f5b]">{((score / 30) * 100).toFixed(1)}%</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-2xl font-light text-emerald-600 mb-1">{score}</div>
                        <p className="text-xs text-[#070a05]/60">Correct</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="text-2xl font-light text-red-600 mb-1">{answeredCount - score}</div>
                        <p className="text-xs text-[#070a05]/60">Incorrect</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-2xl font-light text-[#070a05]/60 mb-1">{30 - answeredCount}</div>
                        <p className="text-xs text-[#070a05]/60">Skipped</p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/dashboard/daily-practice')}
                      className="w-full bg-[#393f5b] hover:bg-[#2f3450] text-white py-3 rounded-lg transition-colors font-medium"
                    >
                      Back to Calendar
                    </button>
                  </div>
                </div>

                {/* Questions Review */}
                <div className="lg:col-span-2 space-y-3 sm:space-y-4 order-1 lg:order-2 min-w-0">
                  {questions.map((q, index) => {
                    const status = questionStatuses[index];
                    const isCorrect = status.selectedOption === q.correctAnswer;
                    const wasAnswered = status.answered;

                    return (
                      <div key={index} className="bg-white/95 backdrop-blur-md rounded-xl border border-white/50 p-4 sm:p-6 shadow-lg min-w-0">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4">
                          <div className="flex flex-wrap items-center gap-2">
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
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] sm:text-xs font-medium shrink-0 ${
                              isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />}
                              {isCorrect ? 'Correct' : 'Wrong'}
                            </div>
                          )}
                          {!wasAnswered && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] sm:text-xs font-medium bg-gray-100 text-gray-700 shrink-0">
                              <Circle size={14} />
                              Skipped
                            </div>
                          )}
                        </div>

                        <p className="text-[#070a05] text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 break-words">{q.question}</p>

                        <div className="space-y-2">
                          {q.options.map((option, optIndex) => {
                            const isSelected = status.selectedOption === optIndex;
                            const isCorrectOption = optIndex === q.correctAnswer;

                            return (
                              <div
                                key={optIndex}
                                className={`p-2.5 sm:p-3 rounded-lg border-2 text-sm sm:text-base ${
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
              <h1 className="font-light leading-tight tracking-tight text-[#393f5b]" style={dashboardTitleStyle}>
                Daily Practice - {date}
              </h1>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-[#070a05]/60 mt-0.5">
                30 Questions • Physics, Chemistry, Maths
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
          <div className="max-w-7xl mx-auto w-full min-w-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 min-w-0 order-1">
                <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/50 p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                    <span className="text-xs sm:text-sm font-medium text-[#070a05]/60 tabular-nums">
                      Q{currentQuestion + 1}/30
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[0.65rem] sm:text-xs font-medium ${
                      currentQ.subject === 'Physics' ? 'bg-blue-100 text-blue-700' :
                      currentQ.subject === 'Chemistry' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {currentQ.subject}
                    </span>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <p className="text-sm sm:text-base md:text-lg text-[#070a05] leading-relaxed break-words">
                      {currentQ.question}
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleOptionSelect(index)}
                        className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation min-h-[3rem] sm:min-h-0 ${
                          currentStatus.selectedOption === index
                            ? 'border-[#393f5b] bg-[#393f5b]/5'
                            : 'border-[#393f5b]/20 hover:border-[#393f5b]/40 bg-white active:bg-[#393f5b]/5'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            currentStatus.selectedOption === index
                              ? 'border-[#393f5b] bg-[#393f5b]'
                              : 'border-[#393f5b]/30'
                          }`}>
                            {currentStatus.selectedOption === index && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="text-[#070a05] flex-1 text-sm sm:text-base leading-snug">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-dotted border-[#393f5b]/15">
                    <div className="flex gap-2 w-full">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-xl border border-[#393f5b]/20 hover:border-[#393f5b] hover:bg-[#393f5b]/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-sm font-medium"
                      >
                        <ChevronLeft size={18} />
                        Prev
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentQuestion === questions.length - 1}
                        className="flex flex-1 sm:flex-none sm:ml-auto items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-xl bg-[#393f5b] text-white hover:bg-[#2f3450] transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation text-sm font-medium"
                      >
                        Next
                        <ChevronRight size={18} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleMarkForReview}
                      disabled={viewingResults}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-2 rounded-xl border transition-colors touch-manipulation text-sm font-medium ${
                        currentStatus.marked
                          ? 'border-amber-300 bg-amber-50 text-amber-700'
                          : 'border-[#393f5b]/20 hover:border-[#393f5b] hover:bg-[#393f5b]/5'
                      } ${viewingResults ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Flag size={18} />
                      {currentStatus.marked ? 'Unmark review' : 'Mark for review'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 min-w-0 order-2">
                <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/50 p-4 sm:p-6 shadow-lg lg:sticky lg:top-6">
                  <h3 className="text-base sm:text-lg font-light tracking-tight text-[#070a05] mb-3 sm:mb-4">
                    Question palette
                  </h3>

                  <button
                    type="button"
                    onClick={() => setPaletteOpen((o) => !o)}
                    className="lg:hidden w-full flex items-center justify-between gap-2 px-3 py-2.5 mb-3 rounded-lg border border-[#393f5b]/15 bg-[#393f5b]/[0.04] text-left text-sm font-medium text-[#070a05] touch-manipulation"
                    aria-expanded={paletteOpen}
                  >
                    <span className="tabular-nums">
                      <span className="text-[#393f5b]">{answeredCount}</span>/30 answered · tap to {paletteOpen ? 'hide' : 'show'} grid
                    </span>
                    <ChevronDown size={18} className={`text-[#393f5b] shrink-0 transition-transform ${paletteOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div
                    className={`${paletteOpen ? 'block' : 'hidden'} lg:block mb-4 sm:mb-6`}
                  >
                    <div className="grid grid-cols-6 sm:grid-cols-5 gap-1.5 sm:gap-2 max-h-[38vh] lg:max-h-none overflow-y-auto overscroll-contain -mx-0.5 px-0.5 pb-1">
                      {questions.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            handleQuestionNavigate(index);
                            setPaletteOpen(false);
                          }}
                          className={`min-h-9 min-w-0 aspect-square rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 relative text-xs sm:text-sm font-semibold touch-manipulation ${getQuestionStatusColor(index)}`}
                        >
                          <span className="tabular-nums">{index + 1}</span>
                          <div className="absolute -top-0.5 -right-0.5 scale-90 sm:scale-100 origin-top-right">
                            {getQuestionStatusIcon(index)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-dotted border-[#393f5b]/15 text-xs sm:text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                        <span className="text-[#070a05]/70 truncate">Answered</span>
                      </div>
                      <span className="font-medium text-[#070a05] tabular-nums">{answeredCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <Flag size={14} className="text-amber-600 shrink-0" />
                        <span className="text-[#070a05]/70 truncate">Marked</span>
                      </div>
                      <span className="font-medium text-[#070a05] tabular-nums">{markedCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <Circle size={14} className="text-[#070a05]/30 shrink-0" />
                        <span className="text-[#070a05]/70 truncate">Not visited</span>
                      </div>
                      <span className="font-medium text-[#070a05] tabular-nums">{notVisitedCount}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSubmit(false)}
                    disabled={viewingResults}
                    className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 sm:py-3 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 touch-manipulation text-sm ${
                      viewingResults ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <CheckCircle size={18} />
                    {viewingResults ? 'Already submitted' : 'Submit test'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSubmitDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pb-[env(safe-area-inset-bottom,0px)]">
          <div className="bg-white rounded-t-2xl sm:rounded-lg shadow-xl max-w-md w-full p-5 sm:p-6 max-h-[min(90dvh,560px)] overflow-y-auto">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-100 rounded-full">
                <AlertCircle className="text-amber-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-light tracking-tight text-[#070a05] mb-2">
                  Submit Test?
                </h3>
                <p className="text-sm text-[#070a05]/70">
                  Are you sure you want to submit? You have answered {answeredCount} out of 30 questions.
                </p>
              </div>
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} className="text-[#070a05]/60" />
              </button>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitDialog(false)}
                className="flex-1 px-4 py-3 sm:py-2 border border-[#393f5b]/20 rounded-xl sm:rounded-lg hover:bg-[#393f5b]/5 transition-colors font-medium touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => submitTest()}
                className="flex-1 px-4 py-3 sm:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-lg transition-colors font-medium touch-manipulation"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pb-[env(safe-area-inset-bottom,0px)]">
          <div className="bg-white rounded-t-2xl sm:rounded-lg shadow-xl max-w-md w-full p-5 sm:p-6 max-h-[min(85dvh,480px)] overflow-y-auto">
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
              type="button"
              onClick={() => setShowWarning(false)}
              className="w-full px-4 py-3 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl sm:rounded-lg transition-colors font-medium touch-manipulation"
            >
              Continue test
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
