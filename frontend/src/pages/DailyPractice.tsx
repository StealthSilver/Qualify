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
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d > today;
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
  const dayNamesShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
            <div className="bg-white/95 backdrop-blur-md rounded-xl sm:rounded-lg border border-white/50 p-3 sm:p-6 md:p-8 shadow-lg">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="p-2 sm:p-3 bg-[#393f5b]/10 rounded-xl sm:rounded-lg shrink-0">
                    <CalendarIcon className="text-[#393f5b]" size={22} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-xl md:text-2xl font-light tracking-tight text-[#070a05]">
                      {monthNames[month]} {year}
                    </h2>
                    <p className="text-[0.7rem] sm:text-sm text-[#070a05]/60">
                      Tap a day to start DPP
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-1 sm:gap-2 shrink-0 w-full sm:w-auto border border-[#393f5b]/10 rounded-xl sm:border-0 sm:rounded-none p-1 sm:p-0 bg-[#393f5b]/[0.03] sm:bg-transparent">
                  <button
                    type="button"
                    onClick={previousMonth}
                    className="p-2.5 min-h-11 min-w-11 sm:min-h-0 sm:min-w-0 rounded-lg hover:bg-[#393f5b]/10 sm:hover:bg-[#393f5b]/5 transition-colors touch-manipulation inline-flex items-center justify-center"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="text-[#393f5b]" size={22} />
                  </button>
                  <span className="sm:hidden text-xs font-medium text-[#070a05]/50 tabular-nums">
                    {month + 1}/{year}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    disabled={!canGoNext}
                    className={`p-2.5 min-h-11 min-w-11 sm:min-h-0 sm:min-w-0 rounded-lg transition-colors touch-manipulation inline-flex items-center justify-center ${
                      canGoNext
                        ? 'hover:bg-[#393f5b]/10 sm:hover:bg-[#393f5b]/5 text-[#393f5b]'
                        : 'opacity-30 cursor-not-allowed text-[#070a05]/30'
                    }`}
                    aria-label="Next month"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
                {dayNames.map((day, di) => (
                  <div
                    key={day}
                    className="text-center font-semibold text-[#393f5b]/80 pb-1 sm:pb-2 px-0.5"
                  >
                    <span className="sm:hidden text-[0.7rem] leading-none block">{dayNamesShort[di]}</span>
                    <span className="hidden sm:block text-xs md:text-sm truncate">{day}</span>
                  </div>
                ))}

                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="min-h-[2.85rem] sm:min-h-0 sm:aspect-square" />
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
                      type="button"
                      onClick={() => handleDateClick(day)}
                      disabled={isFuture}
                      className={`min-h-[2.85rem] sm:min-h-0 sm:aspect-square rounded-lg border-2 sm:border transition-all duration-200 flex flex-col items-center justify-center gap-0.5 p-1 sm:p-2 relative touch-manipulation active:scale-[0.97]
                        ${isFuture
                          ? 'bg-gray-50 border-gray-100 cursor-not-allowed opacity-45'
                          : isCurrentDay
                          ? 'bg-[#393f5b] border-[#393f5b] text-white shadow-md ring-2 ring-[#393f5b]/20 ring-offset-1'
                          : dppInfo?.completed
                          ? 'bg-emerald-50/90 border-emerald-300 hover:bg-emerald-100'
                          : 'bg-white border-[#393f5b]/15 hover:border-[#393f5b]/40 hover:bg-[#393f5b]/[0.04]'
                        }`}
                    >
                      <span
                        className={`text-sm sm:text-base md:text-lg font-semibold tabular-nums leading-none ${
                          isCurrentDay ? 'text-white' : isFuture ? 'text-gray-400' : 'text-[#070a05]'
                        }`}
                      >
                        {day}
                      </span>

                      {!isFuture && (
                        <span
                          className={`h-1.5 w-1.5 rounded-full shrink-0 sm:hidden ${
                            dppInfo?.completed
                              ? 'bg-emerald-500'
                              : dppInfo?.attempted
                              ? 'bg-amber-500'
                              : isCurrentDay
                              ? 'bg-cyan-300'
                              : 'bg-red-300/90'
                          }`}
                          aria-hidden
                        />
                      )}

                      {!isFuture && dppInfo && (
                        <div className="hidden sm:flex items-center justify-center gap-0.5 mt-0.5">
                          {dppInfo.completed ? (
                            <>
                              <CheckCircle size={11} className="text-emerald-600 sm:w-3.5 sm:h-3.5" />
                              <span className="text-[0.65rem] sm:text-xs font-medium text-emerald-700 tabular-nums">
                                {dppInfo.score}/{dppInfo.totalQuestions}
                              </span>
                            </>
                          ) : dppInfo.attempted ? (
                            <>
                              <Clock size={11} className="text-amber-600 sm:w-3.5 sm:h-3.5" />
                              <span className="text-[0.65rem] sm:text-xs font-medium text-amber-700 tabular-nums">
                                {dppInfo.attempted}/{dppInfo.totalQuestions}
                              </span>
                            </>
                          ) : null}
                        </div>
                      )}

                      {!isFuture && !dppInfo && !isCurrentDay && (
                        <div className="hidden sm:flex items-center justify-center">
                          <XCircle size={12} className="text-red-400/80" />
                        </div>
                      )}

                      {isCurrentDay && (
                        <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full border-2 border-white shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-dotted border-[#393f5b]/15">
                <p className="text-center text-[0.65rem] sm:text-xs text-[#070a05]/45 mb-3 sm:hidden font-medium uppercase tracking-wider">
                  Legend
                </p>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-x-6 sm:gap-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded bg-[#393f5b] shrink-0 ring-2 ring-cyan-400/50 ring-offset-1" />
                    <span className="text-[#070a05]/70 truncate">Today</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 sm:hidden" />
                    <CheckCircle size={14} className="text-emerald-600 shrink-0 hidden sm:block" />
                    <span className="text-[#070a05]/70 truncate">Done</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 sm:hidden" />
                    <Clock size={14} className="text-amber-600 shrink-0 hidden sm:block" />
                    <span className="text-[#070a05]/70 truncate">In progress</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-300 shrink-0 sm:hidden" />
                    <XCircle size={14} className="text-red-400 shrink-0 hidden sm:block" />
                    <span className="text-[#070a05]/70 truncate">Not started</span>
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
