import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Menu
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  DASHBOARD_SECTION_CLASS,
  dashboardMainClass,
  DASHBOARD_TOPBAR_CLASS,
  DASHBOARD_CONTENT_CLASS,
  DASHBOARD_TITLE_CLASS,
  dashboardTitleStyle,
} from '../lib/dashboardLayout';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface StatCard {
  label: string;
  value: string;
  change?: string;
  icon: any;
  color: string;
}

export default function Dashboard() {
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

  if (!user) {
    return null;
  }

  const stats: StatCard[] = [
    {
      label: 'Questions Solved',
      value: '1,234',
      change: '+12% this week',
      icon: CheckCircle2,
      color: 'bg-emerald-500',
    },
    {
      label: 'Current Streak',
      value: '15 days',
      change: 'Keep going!',
      icon: Target,
      color: 'bg-[#393f5b]',
    },
    {
      label: 'Mock Tests',
      value: '28',
      change: '+3 this month',
      icon: BookOpen,
      color: 'bg-cyan-500',
    },
    {
      label: 'Leaderboard Rank',
      value: '#127',
      change: '↑ 23 positions',
      icon: Award,
      color: 'bg-amber-500',
    },
  ];

  const recentActivity = [
    {
      title: 'Daily Practice Test',
      subject: 'Physics - Mechanics',
      score: '85%',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      title: 'Mock Test - JEE Main',
      subject: 'Full Syllabus',
      score: 'In Progress',
      time: '1 day ago',
      status: 'pending',
    },
    {
      title: 'Practice Session',
      subject: 'Mathematics - Calculus',
      score: '92%',
      time: '2 days ago',
      status: 'completed',
    },
  ];

  return (
    <section className={DASHBOARD_SECTION_CLASS}>
      {/* Sidebar */}
      <Sidebar 
        user={user} 
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onCollapseChange={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className={dashboardMainClass(sidebarCollapsed)}>
        {/* Top Bar */}
        <div className={`${DASHBOARD_TOPBAR_CLASS} w-full`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 w-full">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 min-h-11 min-w-11 rounded-md hover:bg-[#393f5b]/5 transition-colors touch-manipulation inline-flex items-center justify-center shrink-0 -ml-1"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-[#393f5b]" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className={DASHBOARD_TITLE_CLASS} style={dashboardTitleStyle}>
                Welcome back,{' '}
                <span className="text-[#393f5b]">
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className={DASHBOARD_CONTENT_CLASS}>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-5 sm:mb-6 md:mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-4 sm:p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`p-2.5 sm:p-3 rounded-lg ${stat.color}`}>
                      <Icon className="text-white" size={18} />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[#070a05] mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#070a05]/60 mb-1 sm:mb-2">{stat.label}</p>
                  {stat.change && (
                    <p className="text-xs text-[#393f5b] font-medium">{stat.change}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Recent Activity */}
            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-4 sm:p-5 md:p-6 shadow-md min-w-0">
              <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-lg sm:text-xl font-light tracking-tight text-[#070a05]">
                  Recent Activity
                </h2>
                <Clock size={20} className="text-[#393f5b]" />
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b border-dotted border-[#393f5b]/10 last:border-0 last:pb-0"
                  >
                    <div className={`p-2 rounded-md ${
                      activity.status === 'completed' ? 'bg-emerald-100' : 'bg-amber-100'
                    }`}>
                      {activity.status === 'completed' ? (
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      ) : (
                        <AlertCircle size={16} className="text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#070a05] mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-xs text-[#070a05]/60 mb-1">
                        {activity.subject}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className={`font-medium ${
                          activity.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {activity.score}
                        </span>
                        <span className="text-[#070a05]/40">•</span>
                        <span className="text-[#070a05]/60">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 flex items-center justify-center gap-2 text-sm text-[#393f5b] hover:text-[#2f3450] font-medium transition-colors">
                View All Activity
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Quick Actions & Recommendations */}
            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-4 sm:p-5 md:p-6 shadow-md min-w-0">
              <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
                <h2 className="text-lg sm:text-xl font-light tracking-tight text-[#070a05]">
                  Quick Actions
                </h2>
                <TrendingUp size={20} className="text-[#393f5b]" />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <button type="button" className="w-full bg-[#393f5b] hover:bg-[#2f3450] text-white rounded-lg p-3.5 sm:p-4 text-left transition-colors shadow-md hover:shadow-lg touch-manipulation min-h-[3.25rem]">
                  <h3 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Start Daily Practice</h3>
                  <p className="text-[0.65rem] sm:text-xs text-white/80">
                    Continue your 15-day streak
                  </p>
                </button>

                <button type="button" className="w-full bg-white hover:bg-gray-50 border border-[#393f5b]/20 text-[#070a05] rounded-lg p-3.5 sm:p-4 text-left transition-colors touch-manipulation min-h-[3.25rem]">
                  <h3 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Take Mock Test</h3>
                  <p className="text-xs text-[#070a05]/60">
                    New JEE Main pattern available
                  </p>
                </button>

                <button type="button" className="w-full bg-white hover:bg-gray-50 border border-[#393f5b]/20 text-[#070a05] rounded-lg p-3.5 sm:p-4 text-left transition-colors touch-manipulation min-h-[3.25rem]">
                  <h3 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">View Analytics</h3>
                  <p className="text-xs text-[#070a05]/60">
                    Track your progress this week
                  </p>
                </button>

                <button type="button" className="w-full bg-white hover:bg-gray-50 border border-[#393f5b]/20 text-[#070a05] rounded-lg p-3.5 sm:p-4 text-left transition-colors touch-manipulation min-h-[3.25rem]">
                  <h3 className="font-medium text-sm sm:text-base mb-0.5 sm:mb-1">Check Leaderboard</h3>
                  <p className="text-xs text-[#070a05]/60">
                    You're rank #127 • ↑ 23 positions
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Tests Banner */}
          <div className="mt-5 sm:mt-6 md:mt-8 bg-gradient-to-r from-[#393f5b] to-[#2f3450] rounded-lg p-4 sm:p-6 shadow-lg text-white">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-light tracking-tight mb-2">
                  Upcoming Mock Test
                </h2>
                <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                  JEE Main Full Syllabus Test • Scheduled for tomorrow at 10:00 AM
                </p>
                <button type="button" className="bg-white text-[#393f5b] hover:bg-white/90 px-4 sm:px-6 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 touch-manipulation w-full sm:w-auto justify-center sm:justify-start">
                  Register Now
                  <ArrowRight size={16} />
                </button>
              </div>
              <Target className="text-white/30 hidden sm:block" size={48} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
