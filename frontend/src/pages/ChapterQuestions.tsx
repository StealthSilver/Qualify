import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Menu, ArrowLeft, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  DASHBOARD_SECTION_CLASS,
  dashboardMainClass,
  DASHBOARD_TOPBAR_CLASS,
  DASHBOARD_CONTENT_CLASS,
  DASHBOARD_TITLE_CLASS,
  dashboardTitleStyle,
} from '../lib/dashboardLayout';
import { getSubjectById, getChapterById } from '../data/jeeChapters';
import { getQuestionsForChapter, getQuestionProgress } from '../data/questions';
import type { Question } from '../data/questions';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Chapter() {
  const navigate = useNavigate();
  const { subjectId, chapterId } = useParams<{ subjectId: string; chapterId: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<Record<number, { selectedAnswer: number; timestamp: string }>>({});
  const [loading, setLoading] = useState(true);

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
    if (subjectId && chapterId) {
      const chapterQuestions = getQuestionsForChapter(subjectId, chapterId);
      setQuestions(chapterQuestions);
      const questionProgress = getQuestionProgress(subjectId, chapterId);
      setProgress(questionProgress);
    }
  }, [subjectId, chapterId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
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

  if (!subject || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f6f8]">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#070a05] mb-4">Chapter not found</h1>
          <Link to="/dashboard/practice" className="text-[#393f5b] hover:underline">
            Go back to Practice
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-600 bg-emerald-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getQuestionStatus = (questionId: number, correctAnswer: number) => {
    const userProgress = progress[questionId];
    if (!userProgress) return 'unanswered';
    return userProgress.selectedAnswer === correctAnswer ? 'correct' : 'incorrect';
  };

  const completedCount = Object.keys(progress).length;
  const completionPercentage = Math.round((completedCount / questions.length) * 100);

  return (
    <section className={DASHBOARD_SECTION_CLASS}>
      <Sidebar 
        user={user} 
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCollapseChange={setSidebarCollapsed}
      />

      <div className={dashboardMainClass(sidebarCollapsed)}>
        <div className={`${DASHBOARD_TOPBAR_CLASS} w-full`}>
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 min-h-11 min-w-11 rounded-md hover:bg-[#393f5b]/5 transition-colors touch-manipulation inline-flex items-center justify-center shrink-0 -ml-1"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-[#393f5b]" />
            </button>
            <Link 
              to={`/dashboard/practice/${subjectId}`}
              className="p-2 min-h-11 min-w-11 rounded-md hover:bg-[#393f5b]/5 transition-colors inline-flex items-center justify-center shrink-0 touch-manipulation"
              aria-label="Back to chapters"
            >
              <ArrowLeft size={20} className="text-[#393f5b]" />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className={`${DASHBOARD_TITLE_CLASS} line-clamp-2`} style={dashboardTitleStyle}>
                {chapter.name}
              </h1>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-[#070a05]/60 mt-0.5">
                {subject.name} • {completedCount}/{questions.length} completed
              </p>
            </div>
          </div>
        </div>

        {/* Progress Banner */}
        <div className="bg-white border-b border-dotted border-[#393f5b]/15 px-3 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-4 w-full max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-xs sm:text-sm font-medium text-[#070a05]">Chapter Progress</span>
            <span className="text-xs sm:text-sm font-medium text-[#393f5b]">{completionPercentage}%</span>
          </div>
          <div className="w-full h-2 bg-[#393f5b]/10 rounded-full overflow-hidden">
            <div 
              className={`h-full ${subject.color} transition-all duration-500`}
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Questions Grid */}
        <div className={DASHBOARD_CONTENT_CLASS}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {questions.map((question) => {
              const status = getQuestionStatus(question.id, question.correctAnswer);
              
              return (
                <Link
                  key={question.id}
                  to={`/dashboard/practice/${subjectId}/${chapterId}/${question.id}`}
                  className={`relative group bg-white/95 backdrop-blur-md rounded-lg border p-2.5 sm:p-3 md:p-4 shadow-sm hover:shadow-md transition-all duration-300 min-h-[5.5rem] sm:min-h-0 touch-manipulation ${
                    status === 'correct' 
                      ? 'border-emerald-300 bg-emerald-50/50' 
                      : status === 'incorrect'
                      ? 'border-red-300 bg-red-50/50'
                      : 'border-white/50 hover:border-[#393f5b]/30'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                      {status === 'correct' ? (
                        <CheckCircle2 className="text-emerald-600" size={24} />
                      ) : status === 'incorrect' ? (
                        <AlertCircle className="text-red-600" size={24} />
                      ) : (
                        <Circle className="text-[#393f5b]/30" size={24} />
                      )}
                    </div>
                    
                    <div className="text-lg font-medium text-[#070a05] mb-2">
                      Q{question.id}
                    </div>
                    
                    <div className={`text-xs px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </div>
                  </div>

                  {status === 'unanswered' && (
                    <div className="absolute inset-0 bg-[#393f5b]/0 group-hover:bg-[#393f5b]/5 rounded-lg transition-colors" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
