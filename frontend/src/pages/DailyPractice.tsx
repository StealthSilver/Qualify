import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle, Clock, XCircle } from 'lucide-react';
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

interface DPPData {
  date: string;
  completed: boolean;
  score?: number;
  totalQuestions: number;
  attempted?: number;
}

export default function DailyPractice() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const getDPPData = (): Map<string, DPPData> => {
    const stored = localStorage.getItem('dppData');
    if (stored) {
      const data = JSON.parse(stored);
      return new Map(Object.entries(data));
    }
    return new Map();
  };

  const dppData = getDPPData();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date > today;
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (isFutureDate(clickedDate)) {
      return;
    }

    const dateKey = formatDateKey(clickedDate);
    navigate(`/dashboard/dpp/${dateKey}`);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    const today = new Date();
    const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    
    if (nextMonthDate <= today) {
      setCurrentDate(nextMonthDate);
    }
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const today = new Date();
  const canGoNext = new Date(year, month + 1, 1) <= today;

  if (!user) {
    return null;
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
              <h1 className={`${DASHBOARD_TITLE_CLASS} text-[#393f5b]`} style={dashboardTitleStyle}>
                Daily Practice Problems
              </h1>
              <p className="text-[0.65rem] sm:text-xs md:text-sm text-[#070a05]/60 mt-0.5 leading-snug">
                Complete daily DPPs to maintain your streak
              </p>
            </div>
          </div>
        </div>

        <div className={DASHBOARD_CONTENT_CLASS}>
          <div className="max-w-6xl mx-auto w-full min-w-0">
            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-4 sm:p-6 md:p-8 shadow-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="p-2 sm:p-3 bg-[#393f5b]/10 rounded-lg shrink-0">
                    <CalendarIcon className="text-[#393f5b]" size={22} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-2xl font-light tracking-tight text-[#070a05]">
                      {monthNames[month]} {year}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#070a05]/60">
                      Select a day to practice
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                  <button
                    onClick={previousMonth}
                    className="p-2 rounded-md hover:bg-[#393f5b]/5 transition-colors"
                  >
                    <ChevronLeft className="text-[#393f5b]" size={20} />
                  </button>
                  <button
                    onClick={nextMonth}
                    disabled={!canGoNext}
                    className={`p-2 rounded-md transition-colors ${
                      canGoNext 
                        ? 'hover:bg-[#393f5b]/5 text-[#393f5b]' 
                        : 'opacity-30 cursor-not-allowed text-[#070a05]/30'
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-[0.65rem] sm:text-xs md:text-sm font-medium text-[#070a05]/70 pb-1 sm:pb-2 truncate px-0.5"
                  >
                    {day}
                  </div>
                ))}

                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const date = new Date(year, month, day);
                  const dateKey = formatDateKey(date);
                  const dppInfo = dppData.get(dateKey);
                  const isCurrentDay = isToday(date);
                  const isFuture = isFutureDate(date);

                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      disabled={isFuture}
                      className={`aspect-square rounded-md sm:rounded-lg border transition-all duration-200 flex flex-col items-center justify-center p-1 sm:p-2 relative touch-manipulation min-h-0
                        ${isFuture 
                          ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-50' 
                          : isCurrentDay
                          ? 'bg-[#393f5b] border-[#393f5b] text-white shadow-md hover:shadow-lg'
                          : dppInfo?.completed
                          ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-white border-[#393f5b]/20 hover:border-[#393f5b] hover:shadow-md'
                        }`}
                    >
                      <span className={`text-sm sm:text-base md:text-lg font-medium mb-0 sm:mb-1 ${
                        isCurrentDay ? 'text-white' : isFuture ? 'text-gray-400' : 'text-[#070a05]'
                      }`}>
                        {day}
                      </span>

                      {!isFuture && dppInfo && (
                        <div className="flex items-center justify-center gap-1">
                          {dppInfo.completed ? (
                            <>
                              <CheckCircle size={12} className="text-emerald-600" />
                              <span className="text-xs font-medium text-emerald-600">
                                {dppInfo.score}/{dppInfo.totalQuestions}
                              </span>
                            </>
                          ) : dppInfo.attempted ? (
                            <>
                              <Clock size={12} className="text-amber-600" />
                              <span className="text-xs font-medium text-amber-600">
                                {dppInfo.attempted}/{dppInfo.totalQuestions}
                              </span>
                            </>
                          ) : null}
                        </div>
                      )}

                      {!isFuture && !dppInfo && !isCurrentDay && (
                        <div className="flex items-center justify-center">
                          <XCircle size={12} className="text-red-400" />
                        </div>
                      )}

                      {isCurrentDay && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-dotted border-[#393f5b]/15">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#393f5b]" />
                    <span className="text-[#070a05]/70">Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-600" />
                    <span className="text-[#070a05]/70">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-amber-600" />
                    <span className="text-[#070a05]/70">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-400" />
                    <span className="text-[#070a05]/70">Not Attempted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
