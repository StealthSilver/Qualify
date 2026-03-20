import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

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

  return (
    <section className="relative w-full min-h-screen bg-background text-text overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 sm:opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(57, 63, 91, 0.04), transparent 50%)',
        }}
      />

      {/* Header */}
      <div className="relative border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between">
          <h1 className="text-xl font-medium text-primary">
            Spardha
          </h1>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-text/70 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-6 sm:p-8 md:p-10 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="text-primary" size={24} />
              </div>
              <div>
                <h2 
                  className="font-light leading-tight tracking-tight mb-2"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw + 0.3rem, 2.5rem)',
                  }}
                >
                  Welcome, <span className="text-primary">{user.name}</span>
                </h2>
                <p className="text-text/70 text-sm sm:text-base">
                  {user.email} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-6 sm:p-8 md:p-10">
            <h3 className="text-xl font-medium text-text mb-4">
              Dashboard Coming Soon
            </h3>
            <p className="text-text/70 leading-relaxed mb-4">
              Your personalized dashboard is under development. Soon you'll be able to:
            </p>
            <ul className="space-y-3 text-text/70">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Access daily practice tests
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Track your performance and rankings
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                View detailed analytics
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Compete with other students
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Get AI-powered recommendations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
