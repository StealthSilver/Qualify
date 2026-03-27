import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Trophy, Medal, Crown, TrendingUp, Target, Zap, Clock, Award, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  DASHBOARD_SECTION_CLASS,
  dashboardMainClass,
  DASHBOARD_TOPBAR_CLASS,
  DASHBOARD_CONTENT_CLASS,
  DASHBOARD_TITLE_CLASS,
  dashboardTitleStyle,
} from '../lib/dashboardLayout';
import { API_BASE_URL } from '../services/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  email: string;
  totalQuestionsAttempted: number;
  totalQuestionsCorrect: number;
  averageAccuracy: number;
  totalScore: number;
  rankPoints: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeSpent: number;
  subjectWiseStats: {
    subject: string;
    questionsAttempted: number;
    questionsCorrect: number;
    accuracy: number;
    timeSpent: number;
  }[];
}

interface UserRankData {
  rank: number;
  totalUsers: number;
  percentile: number;
}

export default function Leaderboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<UserRankData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'physics' | 'chemistry' | 'mathematics'>('all');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchLeaderboardData();
      fetchUserRank();

      const interval = setInterval(() => {
        fetchLeaderboardData();
        fetchUserRank();
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [user, filter]);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/leaderboard?limit=100`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setLeaderboardData(result.data || []);
      } else {
        generateMockData();
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  const fetchUserRank = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/leaderboard/rank`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUserRank(result.data);
      } else {
        setUserRank({
          rank: Math.floor(Math.random() * 50) + 1,
          totalUsers: 500,
          percentile: Math.floor(Math.random() * 30) + 70,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user rank:', error);
      setUserRank({
        rank: Math.floor(Math.random() * 50) + 1,
        totalUsers: 500,
        percentile: Math.floor(Math.random() * 30) + 70,
      });
    }
  };

  const generateMockData = () => {
    const mockData: LeaderboardEntry[] = [];
    const names = [
      'Arjun Sharma', 'Priya Patel', 'Rahul Kumar', 'Ananya Singh', 'Vikram Reddy',
      'Sneha Gupta', 'Karan Mehta', 'Divya Iyer', 'Aditya Verma', 'Neha Joshi',
      'Rohan Desai', 'Kavya Nair', 'Siddharth Roy', 'Isha Malhotra', 'Varun Kapoor',
      'Pooja Agarwal', 'Harsh Pandey', 'Riya Shah', 'Amit Saxena', 'Shruti Rao',
    ];

    for (let i = 0; i < 20; i++) {
      const questionsAttempted = Math.floor(Math.random() * 500) + 300;
      const accuracy = Math.floor(Math.random() * 25) + 70;
      const questionsCorrect = Math.floor((questionsAttempted * accuracy) / 100);
      const score = Math.floor(accuracy * 10 + questionsAttempted * 0.5);
      const streak = Math.floor(Math.random() * 30) + 5;
      const rankPoints = Math.floor(accuracy * 10 + questionsAttempted * 2 + streak * 50 + score);

      mockData.push({
        rank: i + 1,
        userId: `user-${i}`,
        name: names[i] || `Student ${i + 1}`,
        email: `student${i + 1}@example.com`,
        totalQuestionsAttempted: questionsAttempted,
        totalQuestionsCorrect: questionsCorrect,
        averageAccuracy: accuracy,
        totalScore: score,
        rankPoints: rankPoints,
        currentStreak: streak,
        longestStreak: streak + Math.floor(Math.random() * 10),
        totalTimeSpent: Math.floor(Math.random() * 200) + 100,
        subjectWiseStats: [
          {
            subject: 'Physics',
            questionsAttempted: Math.floor(questionsAttempted / 3),
            questionsCorrect: Math.floor((questionsAttempted / 3) * (accuracy / 100)),
            accuracy: accuracy + Math.floor(Math.random() * 10) - 5,
            timeSpent: Math.floor(Math.random() * 50) + 30,
          },
          {
            subject: 'Chemistry',
            questionsAttempted: Math.floor(questionsAttempted / 3),
            questionsCorrect: Math.floor((questionsAttempted / 3) * (accuracy / 100)),
            accuracy: accuracy + Math.floor(Math.random() * 10) - 5,
            timeSpent: Math.floor(Math.random() * 50) + 30,
          },
          {
            subject: 'Mathematics',
            questionsAttempted: Math.floor(questionsAttempted / 3),
            questionsCorrect: Math.floor((questionsAttempted / 3) * (accuracy / 100)),
            accuracy: accuracy + Math.floor(Math.random() * 10) - 5,
            timeSpent: Math.floor(Math.random() * 50) + 30,
          },
        ],
      });
    }

    mockData.sort((a, b) => b.rankPoints - a.rankPoints);
    mockData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    setLeaderboardData(mockData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Medal className="text-amber-600" size={24} />;
    return null;
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-br from-amber-500 to-amber-700 text-white';
    if (rank <= 10) return 'bg-[#393f5b] text-white';
    if (rank <= 50) return 'bg-[#393f5b]/20 text-[#393f5b]';
    return 'bg-[#393f5b]/10 text-[#070a05]/60';
  };

  const getFilteredData = () => {
    if (filter === 'all') return leaderboardData;
    
    return leaderboardData
      .map(entry => {
        const subjectStats = entry.subjectWiseStats.find(
          s => s.subject.toLowerCase() === filter
        );
        return {
          ...entry,
          subjectAccuracy: subjectStats?.accuracy || 0,
          subjectQuestions: subjectStats?.questionsAttempted || 0,
        };
      })
      .sort((a, b) => {
        const aAccuracy = a.subjectAccuracy || 0;
        const bAccuracy = b.subjectAccuracy || 0;
        const aQuestions = a.subjectQuestions || 0;
        const bQuestions = b.subjectQuestions || 0;
        
        if (aAccuracy !== bAccuracy) return bAccuracy - aAccuracy;
        return bQuestions - aQuestions;
      })
      .map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));
  };

  const filteredData = getFilteredData();

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
        <div
          className={`${DASHBOARD_TOPBAR_CLASS} flex-col items-stretch lg:flex-row lg:items-center lg:justify-between w-full gap-3`}
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 w-full">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 min-h-11 min-w-11 rounded-md hover:bg-[#393f5b]/5 transition-colors touch-manipulation inline-flex items-center justify-center shrink-0 -ml-1"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-[#393f5b]" />
            </button>
            <div className="min-w-0">
              <h1 className={DASHBOARD_TITLE_CLASS} style={dashboardTitleStyle}>
                Leaderboard
              </h1>
              <p className="text-xs sm:text-sm text-[#070a05]/60 mt-0.5 sm:mt-1">
                See how you rank against other students
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2 bg-white rounded-lg border border-[#393f5b]/20 p-1 w-full lg:w-auto justify-center lg:justify-end shrink-0">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all touch-manipulation ${
                filter === 'all'
                  ? 'bg-[#393f5b] text-white'
                  : 'text-[#070a05]/60 hover:text-[#393f5b]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('physics')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all touch-manipulation ${
                filter === 'physics'
                  ? 'bg-[#393f5b] text-white'
                  : 'text-[#070a05]/60 hover:text-[#393f5b]'
              }`}
            >
              Physics
            </button>
            <button
              type="button"
              onClick={() => setFilter('chemistry')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all touch-manipulation ${
                filter === 'chemistry'
                  ? 'bg-[#393f5b] text-white'
                  : 'text-[#070a05]/60 hover:text-[#393f5b]'
              }`}
            >
              Chemistry
            </button>
            <button
              type="button"
              onClick={() => setFilter('mathematics')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all touch-manipulation ${
                filter === 'mathematics'
                  ? 'bg-[#393f5b] text-white'
                  : 'text-[#070a05]/60 hover:text-[#393f5b]'
              }`}
            >
              Maths
            </button>
          </div>
        </div>

        <div className={DASHBOARD_CONTENT_CLASS}>
          {userRank && (
            <div className="bg-gradient-to-r from-[#393f5b] to-[#2f3450] rounded-lg p-4 sm:p-6 shadow-lg text-white mb-5 sm:mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Trophy size={32} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Your Current Rank</div>
                    <div className="text-3xl font-light tracking-tight">#{userRank.rank}</div>
                    <div className="text-sm text-white/70 mt-1">
                      Top {userRank.percentile.toFixed(1)}% of {userRank.totalUsers} students
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/dashboard/practice')}
                  className="bg-white text-[#393f5b] hover:bg-white/90 px-6 py-2.5 rounded-md text-sm font-medium transition-colors shadow-md"
                >
                  Improve Your Rank
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-[#393f5b]">
                  <Trophy className="text-white" size={20} />
                </div>
              </div>
              <h3 className="text-2xl font-light tracking-tight text-[#070a05] mb-1">
                {filteredData.length}
              </h3>
              <p className="text-sm text-[#070a05]/60">Total Students</p>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-emerald-500">
                  <Target className="text-white" size={20} />
                </div>
              </div>
              <h3 className="text-2xl font-light tracking-tight text-[#070a05] mb-1">
                {filteredData.length > 0 
                  ? Math.round(filteredData.reduce((sum, e) => sum + e.averageAccuracy, 0) / filteredData.length)
                  : 0}%
              </h3>
              <p className="text-sm text-[#070a05]/60">Avg. Accuracy</p>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-cyan-500">
                  <Zap className="text-white" size={20} />
                </div>
              </div>
              <h3 className="text-2xl font-light tracking-tight text-[#070a05] mb-1">
                {filteredData.length > 0 
                  ? Math.round(filteredData.reduce((sum, e) => sum + e.currentStreak, 0) / filteredData.length)
                  : 0}
              </h3>
              <p className="text-sm text-[#070a05]/60">Avg. Streak</p>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-amber-500">
                  <Clock className="text-white" size={20} />
                </div>
              </div>
              <h3 className="text-2xl font-light tracking-tight text-[#070a05] mb-1">
                {filteredData.length > 0 
                  ? Math.round(filteredData.reduce((sum, e) => sum + e.totalTimeSpent, 0) / filteredData.length)
                  : 0}h
              </h3>
              <p className="text-sm text-[#070a05]/60">Avg. Time</p>
            </div>
          </div>

          {filteredData.length > 0 && (
            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md mb-6 md:mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    Top 3 Performers
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    Leading the pack in {filter === 'all' ? 'overall performance' : filter}
                  </p>
                </div>
                <Award size={20} className="text-[#393f5b]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredData.slice(0, 3).map((entry) => (
                  <div
                    key={entry.userId}
                    className={`relative p-6 rounded-lg border-2 transition-all ${
                      entry.rank === 1
                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100/50'
                        : entry.rank === 2
                        ? 'border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100/50'
                        : 'border-amber-600 bg-gradient-to-br from-amber-50 to-amber-100/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getRankIcon(entry.rank)}
                        <div>
                          <h3 className="font-medium text-[#070a05]">
                            {entry.name}
                          </h3>
                          <p className="text-xs text-[#070a05]/60">Rank #{entry.rank}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        entry.rank === 1
                          ? 'bg-yellow-500 text-white'
                          : entry.rank === 2
                          ? 'bg-gray-500 text-white'
                          : 'bg-amber-600 text-white'
                      }`}>
                        {entry.rankPoints.toLocaleString()} pts
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#070a05]/60">Accuracy:</span>
                        <span className="font-medium text-emerald-600">{entry.averageAccuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#070a05]/60">Questions:</span>
                        <span className="font-medium">{entry.totalQuestionsAttempted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#070a05]/60">Streak:</span>
                        <span className="font-medium text-amber-600">{entry.currentStreak} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#070a05]/60">Score:</span>
                        <span className="font-medium text-[#393f5b]">{entry.totalScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 shadow-md overflow-hidden">
            <div className="p-6 border-b border-dotted border-[#393f5b]/15">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    All Rankings
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    Updated in real-time every 10 seconds
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs text-[#070a05]/60">Live</span>
                </div>
              </div>
            </div>

            {loading && filteredData.length === 0 ? (
              <div className="p-12 text-center">
                <Trophy size={48} className="text-[#393f5b]/30 mx-auto mb-4" />
                <p className="text-[#070a05]/60">Loading leaderboard...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#393f5b]/5 border-b border-dotted border-[#393f5b]/15">
                    <tr>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-left text-[0.65rem] sm:text-xs font-medium text-[#070a05]/70 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-left text-[0.65rem] sm:text-xs font-medium text-[#070a05]/70 uppercase tracking-wider min-w-[7rem]">
                        Student
                      </th>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center text-[0.65rem] sm:text-xs font-medium text-[#070a05]/70 uppercase tracking-wider">
                        Acc.
                      </th>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center text-[0.65rem] sm:text-xs font-medium text-[#070a05]/70 uppercase tracking-wider">
                        Qs
                      </th>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center text-xs font-medium text-[#070a05]/70 uppercase tracking-wider hidden md:table-cell">
                        Score
                      </th>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center text-xs font-medium text-[#070a05]/70 uppercase tracking-wider hidden lg:table-cell">
                        Streak
                      </th>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center text-[0.65rem] sm:text-xs font-medium text-[#070a05]/70 uppercase tracking-wider">
                        Pts
                      </th>
                      <th className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center text-xs font-medium text-[#070a05]/70 uppercase tracking-wider w-10">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dotted divide-[#393f5b]/10">
                    {filteredData.map((entry) => {
                      const isExpanded = expandedUserId === entry.userId;
                      const isCurrentUser = user?.id === entry.userId;
                      
                      return (
                        <>
                          <tr 
                            key={entry.userId}
                            className={`hover:bg-[#393f5b]/5 transition-colors ${
                              isCurrentUser ? 'bg-[#393f5b]/10' : ''
                            }`}
                          >
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                {entry.rank <= 3 && getRankIcon(entry.rank)}
                                <span className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium ${getRankBadgeColor(entry.rank)}`}>
                                  {entry.rank}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 max-w-[9rem] sm:max-w-none">
                              <div className="min-w-0">
                                <div className="font-medium text-[#070a05] flex flex-wrap items-center gap-1 sm:gap-2 text-sm">
                                  {entry.name}
                                  {isCurrentUser && (
                                    <span className="text-xs bg-[#393f5b] text-white px-2 py-0.5 rounded-full">
                                      You
                                    </span>
                                  )}
                                </div>
                                <div className="text-[0.65rem] sm:text-xs text-[#070a05]/60 mt-0.5 truncate">
                                  {entry.email}
                                </div>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center">
                              <span className={`inline-flex items-center px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.65rem] sm:text-xs font-medium ${
                                entry.averageAccuracy >= 90
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : entry.averageAccuracy >= 75
                                  ? 'bg-cyan-100 text-cyan-700'
                                  : entry.averageAccuracy >= 60
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {entry.averageAccuracy.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center">
                              <span className="text-xs sm:text-sm font-medium text-[#070a05]">
                                {entry.totalQuestionsAttempted}
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center hidden md:table-cell">
                              <span className="text-sm font-medium text-[#393f5b]">
                                {entry.totalScore}
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center hidden lg:table-cell">
                              <div className="flex items-center justify-center gap-1">
                                <Zap size={14} className="text-amber-500" />
                                <span className="text-sm font-medium">
                                  {entry.currentStreak}
                                </span>
                              </div>
                            </td>
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center">
                              <span className="text-xs sm:text-sm font-bold text-[#393f5b] tabular-nums">
                                {entry.rankPoints.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-2 sm:px-3 md:px-6 py-3 md:py-4 text-center">
                              <button
                                onClick={() => setExpandedUserId(isExpanded ? null : entry.userId)}
                                className="p-2 min-w-11 min-h-11 sm:min-w-0 sm:min-h-0 sm:p-1 rounded-md hover:bg-[#393f5b]/10 transition-colors touch-manipulation inline-flex items-center justify-center"
                              >
                                <ChevronDown 
                                  size={16} 
                                  className={`text-[#393f5b] transition-transform ${
                                    isExpanded ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr className={`bg-[#393f5b]/5 ${isCurrentUser ? 'bg-[#393f5b]/15' : ''}`}>
                              <td colSpan={8} className="px-3 sm:px-6 py-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="space-y-3">
                                    <h4 className="text-sm font-medium text-[#070a05]">
                                      Performance Details
                                    </h4>
                                    <div className="space-y-2 text-xs">
                                      <div className="flex justify-between">
                                        <span className="text-[#070a05]/60">Correct Answers:</span>
                                        <span className="font-medium text-emerald-600">
                                          {entry.totalQuestionsCorrect}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#070a05]/60">Time Spent:</span>
                                        <span className="font-medium">{entry.totalTimeSpent}h</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-[#070a05]/60">Longest Streak:</span>
                                        <span className="font-medium text-amber-600">
                                          {entry.longestStreak} days
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {entry.subjectWiseStats && entry.subjectWiseStats.length > 0 && (
                                    <div className="md:col-span-2 space-y-3">
                                      <h4 className="text-sm font-medium text-[#070a05]">
                                        Subject-wise Performance
                                      </h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        {entry.subjectWiseStats.map((subject) => (
                                          <div
                                            key={subject.subject}
                                            className="p-3 rounded-lg border border-[#393f5b]/10 bg-white"
                                          >
                                            <div className="text-xs font-medium text-[#393f5b] mb-2">
                                              {subject.subject}
                                            </div>
                                            <div className="space-y-1 text-xs">
                                              <div className="flex justify-between">
                                                <span className="text-[#070a05]/60">Accuracy:</span>
                                                <span className="font-medium">{subject.accuracy.toFixed(1)}%</span>
                                              </div>
                                              <div className="flex justify-between">
                                                <span className="text-[#070a05]/60">Questions:</span>
                                                <span className="font-medium">{subject.questionsAttempted}</span>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                  How Rankings Work
                </h2>
                <p className="text-xs text-[#070a05]/60 mt-1">
                  Understanding the leaderboard system
                </p>
              </div>
              <TrendingUp size={20} className="text-[#393f5b]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border border-[#393f5b]/10">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={16} className="text-emerald-500" />
                  <h3 className="text-sm font-medium text-[#070a05]">Accuracy</h3>
                </div>
                <p className="text-xs text-[#070a05]/60">
                  10 points per 1% accuracy
                </p>
              </div>

              <div className="p-4 rounded-lg border border-[#393f5b]/10">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-cyan-500" />
                  <h3 className="text-sm font-medium text-[#070a05]">Volume</h3>
                </div>
                <p className="text-xs text-[#070a05]/60">
                  2 points per question attempted
                </p>
              </div>

              <div className="p-4 rounded-lg border border-[#393f5b]/10">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={16} className="text-amber-500" />
                  <h3 className="text-sm font-medium text-[#070a05]">Streak</h3>
                </div>
                <p className="text-xs text-[#070a05]/60">
                  50 points per day in streak
                </p>
              </div>

              <div className="p-4 rounded-lg border border-[#393f5b]/10">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy size={16} className="text-[#393f5b]" />
                  <h3 className="text-sm font-medium text-[#070a05]">Score</h3>
                </div>
                <p className="text-xs text-[#070a05]/60">
                  Direct score points earned
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
