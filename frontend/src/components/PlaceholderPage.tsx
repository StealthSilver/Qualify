import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: any;
}

export default function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

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
          <h1 
            className="font-light leading-tight tracking-tight text-[#393f5b]"
            style={{
              fontSize: 'clamp(1.25rem, 2vw + 0.3rem, 1.75rem)',
            }}
          >
            {title}
          </h1>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-[#393f5b]/5 transition-colors"
          >
            <Menu size={24} className="text-[#393f5b]" />
          </button>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-72px)] p-6">
          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-8 sm:p-12 shadow-lg text-center max-w-md">
            {Icon && (
              <div className="inline-flex p-4 bg-[#393f5b]/10 rounded-full mb-6">
                <Icon className="text-[#393f5b]" size={48} />
              </div>
            )}
            <h2 className="text-2xl font-light tracking-tight text-[#070a05] mb-4">
              {title}
            </h2>
            <p className="text-[#070a05]/70 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
