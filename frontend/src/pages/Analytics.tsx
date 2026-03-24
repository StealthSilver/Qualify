import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, TrendingUp, Target, Award, BookOpen, Clock, Calendar as CalendarIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface PerformanceData {
  date: string;
  score: number;
  questionsAttempted: number;
  accuracy: number;
}

interface SubjectPerformance {
  subject: string;
  accuracy: number;
  questionsAttempted: number;
  timeSpent: number;
}

export default function Analytics() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectPerformance[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

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
    generateMockData();

    const interval = setInterval(() => {
      updateDataRealTime();
    }, 5000);

    return () => clearInterval(interval);
  }, [timeRange]);

  const generateMockData = () => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
    const data: PerformanceData[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: Math.floor(Math.random() * 30) + 70,
        questionsAttempted: Math.floor(Math.random() * 50) + 20,
        accuracy: Math.floor(Math.random() * 20) + 75,
      });
    }
    
    setPerformanceData(data);

    setSubjectData([
      {
        subject: 'Physics',
        accuracy: Math.floor(Math.random() * 15) + 80,
        questionsAttempted: Math.floor(Math.random() * 100) + 300,
        timeSpent: Math.floor(Math.random() * 30) + 120,
      },
      {
        subject: 'Chemistry',
        accuracy: Math.floor(Math.random() * 15) + 75,
        questionsAttempted: Math.floor(Math.random() * 100) + 250,
        timeSpent: Math.floor(Math.random() * 30) + 100,
      },
      {
        subject: 'Mathematics',
        accuracy: Math.floor(Math.random() * 15) + 85,
        questionsAttempted: Math.floor(Math.random() * 100) + 350,
        timeSpent: Math.floor(Math.random() * 30) + 140,
      },
    ]);
  };

  const updateDataRealTime = () => {
    setPerformanceData(prevData => {
      const newData = [...prevData];
      if (newData.length > 0) {
        const lastIndex = newData.length - 1;
        newData[lastIndex] = {
          ...newData[lastIndex],
          score: Math.floor(Math.random() * 30) + 70,
          questionsAttempted: Math.floor(Math.random() * 50) + 20,
          accuracy: Math.floor(Math.random() * 20) + 75,
        };
      }
      return newData;
    });

    setSubjectData(prevData => 
      prevData.map(subject => ({
        ...subject,
        accuracy: Math.floor(Math.random() * 15) + 75,
      }))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  if (!user) {
    return null;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#393f5b',
          font: {
            size: 12,
            weight: 500,
          },
          padding: 12,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#393f5b',
        padding: 12,
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#393f5b',
        borderWidth: 1,
        displayColors: true,
        cornerRadius: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(57, 63, 91, 0.08)',
          drawBorder: false,
        },
        ticks: {
          color: '#070a05',
          font: {
            size: 11,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#070a05',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const performanceChartData = {
    labels: performanceData.map(d => d.date),
    datasets: [
      {
        label: 'Score',
        data: performanceData.map(d => d.score),
        borderColor: '#393f5b',
        backgroundColor: 'rgba(57, 63, 91, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#393f5b',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
      {
        label: 'Accuracy',
        data: performanceData.map(d => d.accuracy),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
    ],
  };

  const questionsAttemptedChartData = {
    labels: performanceData.map(d => d.date),
    datasets: [
      {
        label: 'Questions Attempted',
        data: performanceData.map(d => d.questionsAttempted),
        backgroundColor: '#393f5b',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const subjectAccuracyChartData = {
    labels: subjectData.map(s => s.subject),
    datasets: [
      {
        label: 'Accuracy %',
        data: subjectData.map(s => s.accuracy),
        backgroundColor: [
          '#393f5b',
          '#06b6d4',
          '#f59e0b',
        ],
        borderWidth: 0,
        borderRadius: 6,
      },
    ],
  };

  const subjectDistributionData = {
    labels: subjectData.map(s => s.subject),
    datasets: [
      {
        data: subjectData.map(s => s.questionsAttempted),
        backgroundColor: [
          '#393f5b',
          '#06b6d4',
          '#f59e0b',
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
      },
    ],
  };

  const totalQuestionsAttempted = subjectData.reduce((sum, s) => sum + s.questionsAttempted, 0);
  const averageAccuracy = Math.round(subjectData.reduce((sum, s) => sum + s.accuracy, 0) / subjectData.length);
  const totalTimeSpent = subjectData.reduce((sum, s) => sum + s.timeSpent, 0);
  const currentStreak = 15;

  const stats = [
    {
      label: 'Total Questions',
      value: totalQuestionsAttempted.toString(),
      icon: BookOpen,
      color: 'bg-[#393f5b]',
    },
    {
      label: 'Average Accuracy',
      value: `${averageAccuracy}%`,
      icon: Target,
      color: 'bg-emerald-500',
    },
    {
      label: 'Time Spent',
      value: `${totalTimeSpent}h`,
      icon: Clock,
      color: 'bg-cyan-500',
    },
    {
      label: 'Current Streak',
      value: `${currentStreak} days`,
      icon: Award,
      color: 'bg-amber-500',
    },
  ];

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
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-[#393f5b]/5 transition-colors"
            >
              <Menu size={24} className="text-[#393f5b]" />
            </button>
            <div>
              <h1 
                className="font-light leading-tight tracking-tight"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw + 0.3rem, 1.75rem)',
                }}
              >
                Analytics
              </h1>
              <p className="text-sm text-[#070a05]/60 mt-1">
                Track your performance and progress
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-lg border border-[#393f5b]/20 p-1">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                timeRange === 'week'
                  ? 'bg-[#393f5b] text-white'
                  : 'text-[#070a05]/60 hover:text-[#393f5b]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                timeRange === 'month'
                  ? 'bg-[#393f5b] text-white'
                  : 'text-[#070a05]/60 hover:text-[#393f5b]'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                timeRange === 'year'
                  ? 'bg-[#393f5b] text-white'
                  : 'text-[#070a05]/60 hover:text-[#393f5b]'
              }`}
            >
              Year
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="text-white" size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-light tracking-tight text-[#070a05] mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-[#070a05]/60">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    Performance Trend
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    Score and accuracy over time
                  </p>
                </div>
                <TrendingUp size={20} className="text-[#393f5b]" />
              </div>
              <div className="h-[300px]">
                <Line data={performanceChartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    Daily Activity
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    Questions attempted per day
                  </p>
                </div>
                <CalendarIcon size={20} className="text-[#393f5b]" />
              </div>
              <div className="h-[300px]">
                <Bar 
                  data={questionsAttemptedChartData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        display: false,
                      },
                    },
                  }} 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    Subject-wise Accuracy
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    Compare your performance across subjects
                  </p>
                </div>
                <Target size={20} className="text-[#393f5b]" />
              </div>
              <div className="h-[300px]">
                <Bar 
                  data={subjectAccuracyChartData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      ...chartOptions.scales,
                      y: {
                        ...chartOptions.scales.y,
                        max: 100,
                      },
                    },
                  }} 
                />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {subjectData.map((subject) => (
                  <div 
                    key={subject.subject}
                    className="p-4 rounded-lg border border-[#393f5b]/10 hover:border-[#393f5b]/30 transition-all"
                  >
                    <h3 className="text-sm font-medium text-[#070a05] mb-3">
                      {subject.subject}
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#070a05]/60">Accuracy:</span>
                        <span className="font-medium text-[#393f5b]">{subject.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#070a05]/60">Questions:</span>
                        <span className="font-medium">{subject.questionsAttempted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#070a05]/60">Time:</span>
                        <span className="font-medium">{subject.timeSpent}h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    Question Distribution
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    By subject
                  </p>
                </div>
                <BookOpen size={20} className="text-[#393f5b]" />
              </div>
              <div className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full max-w-[250px]">
                  <Doughnut 
                    data={subjectDistributionData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom' as const,
                          labels: {
                            color: '#393f5b',
                            font: {
                              size: 12,
                              weight: 500,
                            },
                            padding: 16,
                            usePointStyle: true,
                          },
                        },
                        tooltip: {
                          backgroundColor: '#393f5b',
                          padding: 12,
                          titleColor: '#ffffff',
                          bodyColor: '#ffffff',
                          borderColor: '#393f5b',
                          borderWidth: 1,
                          displayColors: true,
                          cornerRadius: 6,
                          callbacks: {
                            label: function(context) {
                              const label = context.label || '';
                              const value = context.parsed || 0;
                              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                              const percentage = ((value / total) * 100).toFixed(1);
                              return `${label}: ${value} (${percentage}%)`;
                            }
                          }
                        },
                      },
                    }} 
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-dotted border-[#393f5b]/15">
                <h3 className="text-sm font-medium text-[#070a05] mb-3">Summary</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#070a05]/60">Total Questions:</span>
                    <span className="font-medium">{totalQuestionsAttempted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#070a05]/60">Avg. Accuracy:</span>
                    <span className="font-medium text-emerald-600">{averageAccuracy}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#070a05]/60">Total Time:</span>
                    <span className="font-medium">{totalTimeSpent}h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    Strengths & Weaknesses
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    Based on your recent performance
                  </p>
                </div>
                <Award size={20} className="text-[#393f5b]" />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-emerald-600">Strong Topics</span>
                  </div>
                  <div className="space-y-3">
                    {['Calculus - Differentiation', 'Mechanics - Newton\'s Laws', 'Organic Chemistry'].map((topic, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-200/50">
                        <span className="text-sm text-[#070a05]">{topic}</span>
                        <span className="text-sm font-medium text-emerald-600 ml-4 flex-shrink-0">
                          {90 - i * 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-dotted border-[#393f5b]/15">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-red-600">Needs Improvement</span>
                  </div>
                  <div className="space-y-3">
                    {['Thermodynamics', 'Probability', 'Chemical Bonding'].map((topic, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 rounded-lg bg-red-50 border border-red-200/50">
                        <span className="text-sm text-[#070a05]">{topic}</span>
                        <span className="text-sm font-medium text-red-600 ml-4 flex-shrink-0">
                          {58 + i * 3}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-light tracking-tight text-[#070a05]">
                    Recent Test Scores
                  </h2>
                  <p className="text-xs text-[#070a05]/60 mt-1">
                    Your latest mock test results
                  </p>
                </div>
                <BookOpen size={20} className="text-[#393f5b]" />
              </div>

              <div className="space-y-3">
                {[
                  { name: 'JEE Main Mock Test #8', score: 92, date: '2 days ago', rank: 45 },
                  { name: 'JEE Advanced Mock #5', score: 78, date: '5 days ago', rank: 127 },
                  { name: 'JEE Main Mock Test #7', score: 85, date: '1 week ago', rank: 89 },
                  { name: 'Chapter Test - Physics', score: 88, date: '1 week ago', rank: 56 },
                  { name: 'JEE Main Mock Test #6', score: 81, date: '2 weeks ago', rank: 112 },
                ].map((test, i) => (
                  <div 
                    key={i}
                    className="p-4 rounded-lg border border-[#393f5b]/10 hover:border-[#393f5b]/30 transition-all hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium text-[#070a05]">
                        {test.name}
                      </h3>
                      <span className={`text-sm font-medium px-2 py-0.5 rounded ${
                        test.score >= 90 
                          ? 'bg-emerald-100 text-emerald-700'
                          : test.score >= 75
                          ? 'bg-cyan-100 text-cyan-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {test.score}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#070a05]/60">{test.date}</span>
                      <span className="text-[#393f5b] font-medium">Rank #{test.rank}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#393f5b] to-[#2f3450] rounded-lg p-6 shadow-lg text-white">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-xl font-light tracking-tight mb-2">
                  Keep Up the Great Work!
                </h2>
                <p className="text-white/80 text-sm mb-4">
                  You're on a {currentStreak}-day streak! Practice daily to maintain your momentum and improve your rank.
                </p>
                <button 
                  onClick={() => navigate('/dashboard/daily-practice')}
                  className="bg-white text-[#393f5b] hover:bg-white/90 px-6 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Start Today's Practice
                </button>
              </div>
              <TrendingUp className="text-white/30 hidden sm:block" size={48} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
