import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {
  DASHBOARD_SECTION_CLASS,
  dashboardMainClass,
  DASHBOARD_TOPBAR_CLASS,
  DASHBOARD_TITLE_CLASS,
  dashboardTitleStyle,
} from '../lib/dashboardLayout';

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
            <h1 className={`${DASHBOARD_TITLE_CLASS} text-[#393f5b] min-w-0 flex-1`} style={dashboardTitleStyle}>
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100dvh-4rem)] sm:min-h-[calc(100dvh-4.5rem)] p-4 sm:p-6">
          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-6 sm:p-8 md:p-12 shadow-lg text-center max-w-md w-full mx-auto">
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
