import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  FileText, 
  Clock, 
  BookOpen, 
  Target, 
  CheckCircle, 
  Play,
  Award,
  TrendingUp
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { mockTests } from '../data/mockTests';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MockTestResult {
  testId: string;
  completed: boolean;
  score?: number;
  totalQuestions: number;
  attempted?: number;
  percentage?: number;
  timeTaken?: number;
  completedAt?: string;
}

export default function MockTests() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const getMockTestResults = (): Map<string, MockTestResult> => {
    const stored = localStorage.getItem('mockTestResults');
    if (stored) {
      const data = JSON.parse(stored);
      return new Map(Object.entries(data));
    }
    return new Map();
  };

  const mockTestResults = getMockTestResults();

  const handleStartTest = (testId: string) => {
    const result = mockTestResults.get(testId);
    if (result?.completed) {
      navigate(`/dashboard/mock-test/${testId}`);
    } else {
      navigate(`/dashboard/mock-test/${testId}`);
    }
  };

  const getTestStats = () => {
    const completed = Array.from(mockTestResults.values()).filter(r => r.completed).length;
    const total = mockTests.length;
    const avgScore = completed > 0 
      ? Array.from(mockTestResults.values())
          .filter(r => r.completed && r.score !== undefined)
          .reduce((sum, r) => sum + (r.percentage || 0), 0) / completed
      : 0;
    
    return { completed, total, avgScore };
  };

  const { completed, total, avgScore } = getTestStats();

  if (!user) {
    return null;
  }

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
        <div className="bg-white/60 backdrop-blur-sm border-b border-dotted border-[#393f5b]/15 h-[72px] flex items-center justify-between px-6 md:px-12">
          <div className="flex-1">
            <h1 
              className="font-light leading-tight tracking-tight text-[#393f5b]"
              style={{
                fontSize: 'clamp(1.25rem, 2vw + 0.3rem, 1.75rem)',
              }}
            >
              Mock Tests
            </h1>
            <p className="text-xs sm:text-sm text-[#070a05]/60 mt-0.5">
              Full-length tests simulating actual JEE Main exam conditions
            </p>
          </div>
          
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-[#393f5b]/5 transition-colors"
          >
            <Menu size={24} className="text-[#393f5b]" />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#393f5b]/10 rounded-lg">
                    <Target className="text-[#393f5b]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-[#070a05]/60 mb-1">Tests Completed</p>
                    <p className="text-2xl font-light text-[#070a05]">
                      {completed} <span className="text-lg text-[#070a05]/60">/ {total}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <TrendingUp className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-[#070a05]/60 mb-1">Average Score</p>
                    <p className="text-2xl font-light text-[#070a05]">
                      {avgScore.toFixed(1)}<span className="text-lg text-[#070a05]/60">%</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Award className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-[#070a05]/60 mb-1">Total Questions</p>
                    <p className="text-2xl font-light text-[#070a05]">
                      {mockTests.reduce((sum, test) => sum + test.totalQuestions, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Cards */}
            <div className="grid grid-cols-1 gap-6">
              {mockTests.map((test) => {
                const result = mockTestResults.get(test.id);
                const isCompleted = result?.completed || false;

                return (
                  <div 
                    key={test.id}
                    className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-[#393f5b]/10 rounded-lg flex-shrink-0">
                            <FileText className="text-[#393f5b]" size={28} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-light tracking-tight text-[#070a05]">
                                {test.title}
                              </h3>
                              {isCompleted && (
                                <span className="flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                  <CheckCircle size={12} />
                                  Completed
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-[#070a05]/70 mb-4">
                              {test.description}
                            </p>

                            {isCompleted && result?.score !== undefined && (
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg mb-4">
                                <Award className="text-emerald-600" size={16} />
                                <span className="text-sm font-medium text-emerald-700">
                                  Score: {result.score}/{result.totalQuestions} ({result.percentage?.toFixed(1)}%)
                                </span>
                              </div>
                            )}

                            <div className="flex flex-wrap items-center gap-6 text-sm text-[#070a05]/70">
                              <div className="flex items-center gap-2">
                                <Clock size={16} className="text-[#393f5b]" />
                                <span>{test.duration} minutes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <BookOpen size={16} className="text-[#393f5b]" />
                                <span>{test.totalQuestions} Questions</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Target size={16} className="text-[#393f5b]" />
                                <span>
                                  P: {test.physicsQuestions} • C: {test.chemistryQuestions} • M: {test.mathsQuestions}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 lg:flex-shrink-0">
                        <button
                          onClick={() => handleStartTest(test.id)}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#393f5b] hover:bg-[#2f3450] text-white rounded-lg transition-colors font-medium"
                        >
                          <Play size={18} />
                          {isCompleted ? 'Review Test' : 'Start Test'}
                        </button>
                        {isCompleted && (
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to retake this test? Your previous result will be overwritten.')) {
                                localStorage.removeItem(`mock-test-result-${test.id}`);
                                localStorage.removeItem(`mock-test-progress-${test.id}`);
                                const results = getMockTestResults();
                                results.delete(test.id);
                                localStorage.setItem('mockTestResults', JSON.stringify(Object.fromEntries(results)));
                                window.location.reload();
                              }
                            }}
                            className="px-6 py-2 border border-[#393f5b]/20 hover:border-[#393f5b] hover:bg-[#393f5b]/5 text-[#393f5b] rounded-lg transition-colors text-sm font-medium"
                          >
                            Retake Test
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-lg">
              <h3 className="text-lg font-light tracking-tight text-[#070a05] mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-[#393f5b]" />
                Test Instructions
              </h3>
              <ul className="space-y-2 text-sm text-[#070a05]/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#393f5b] mt-1">•</span>
                  <span>Each mock test contains 75 questions (25 from each subject: Physics, Chemistry, Maths)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#393f5b] mt-1">•</span>
                  <span>Total duration: 3 hours (180 minutes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#393f5b] mt-1">•</span>
                  <span>Marking Scheme: +4 for correct answer, 0 for unanswered, -1 for incorrect answer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#393f5b] mt-1">•</span>
                  <span>You can mark questions for review and navigate between questions freely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#393f5b] mt-1">•</span>
                  <span>The test will auto-submit when time runs out</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#393f5b] mt-1">•</span>
                  <span>After completion, you can review your answers and see detailed solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
