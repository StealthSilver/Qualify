import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Menu, ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { getSubjectById, getCompletedQuestionsCount } from '../data/jeeChapters';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Subject() {
  const navigate = useNavigate();
  const { subjectId } = useParams<{ subjectId: string }>();
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

  const subject = subjectId ? getSubjectById(subjectId) : null;

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f6f8]">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#070a05] mb-4">Subject not found</h1>
          <Link to="/dashboard/practice" className="text-[#393f5b] hover:underline">
            Go back to Practice
          </Link>
        </div>
      </div>
    );
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
              to="/dashboard/practice"
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
                {subject.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#070a05]/60 mt-0.5">
                Select a chapter to practice
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {subject.chapters.map((chapter) => {
              const completedQuestions = getCompletedQuestionsCount(subject.id, chapter.id);
              const completionPercentage = Math.round((completedQuestions / chapter.totalQuestions) * 100);

              return (
                <Link
                  key={chapter.id}
                  to={`/dashboard/practice/${subjectId}/${chapter.id}`}
                  className="group bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${subject.color}`}>
                      <BookOpen className="text-white" size={20} />
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-light ${completionPercentage > 0 ? 'text-[#393f5b]' : 'text-[#070a05]/30'}`}>
                        {completionPercentage}%
                      </div>
                      <div className="text-xs text-[#070a05]/60">
                        {completedQuestions}/{chapter.totalQuestions}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-[#070a05] mb-3 group-hover:text-[#393f5b] transition-colors">
                    {chapter.name}
                  </h3>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full h-1.5 bg-[#393f5b]/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${subject.color} transition-all duration-500`}
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[#393f5b] text-sm group-hover:gap-3 transition-all">
                    <span className="font-medium">
                      {completionPercentage === 0 ? 'Start Chapter' : 'Continue'}
                    </span>
                    <ChevronRight size={14} />
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
