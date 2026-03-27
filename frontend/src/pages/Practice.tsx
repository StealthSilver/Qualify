import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, BookOpen, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  DASHBOARD_SECTION_CLASS,
  dashboardMainClass,
  DASHBOARD_TOPBAR_CLASS,
  DASHBOARD_CONTENT_CLASS,
  DASHBOARD_TITLE_CLASS,
  dashboardTitleStyle,
} from '../lib/dashboardLayout';
import { jeeSubjects, getCompletedQuestionsCount } from '../data/jeeChapters';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Practice() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 min-h-11 min-w-11 rounded-md hover:bg-[#393f5b]/5 transition-colors touch-manipulation inline-flex items-center justify-center shrink-0 -ml-1"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-[#393f5b]" />
            </button>
            <div className="min-w-0">
              <h1 className={DASHBOARD_TITLE_CLASS} style={dashboardTitleStyle}>
                Practice
              </h1>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-[#070a05]/60 mt-0.5 leading-snug">
                Choose a subject to start practicing
              </p>
            </div>
          </div>
        </div>

        <div className={DASHBOARD_CONTENT_CLASS}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {jeeSubjects.map((subject) => {
              const totalQuestions = subject.chapters.reduce((sum, ch) => sum + ch.totalQuestions, 0);
              const completedQuestions = subject.chapters.reduce((sum, ch) => 
                sum + getCompletedQuestionsCount(subject.id, ch.id), 0
              );
              const completionPercentage = Math.round((completedQuestions / totalQuestions) * 100);

              return (
                <Link
                  key={subject.id}
                  to={`/dashboard/practice/${subject.id}`}
                  className="group bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-5 sm:p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-0"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${subject.color} rounded-lg flex items-center justify-center mb-4 sm:mb-5 md:mb-6`}>
                    <BookOpen className="text-white" size={26} />
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[#070a05] mb-1 sm:mb-2">
                    {subject.name}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-[#070a05]/60 mb-3 sm:mb-4">
                    {subject.chapters.length} chapters • {totalQuestions} questions
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-[#070a05]/60 mb-2">
                      <span>Progress</span>
                      <span>{completionPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#393f5b]/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${subject.color} transition-all duration-500`}
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#393f5b] group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Start Practicing</span>
                    <ChevronRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
