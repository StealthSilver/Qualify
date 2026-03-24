import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Calendar, 
  FileText, 
  BarChart3, 
  Trophy, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  X
} from 'lucide-react';

interface SidebarProps {
  user: {
    name: string;
    email: string;
  };
  onLogout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  onCollapseChange?: (collapsed: boolean) => void;
  disableNavigation?: boolean;
}

interface NavItem {
  label: string;
  path: string;
  icon: any;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Practice', path: '/dashboard/practice', icon: Dumbbell },
  { label: 'Daily Practice', path: '/dashboard/daily-practice', icon: Calendar },
  { label: 'Mock Tests', path: '/dashboard/mock-tests', icon: FileText },
  { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Leaderboard', path: '/dashboard/leaderboard', icon: Trophy },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ user, onLogout, isOpen = false, onClose, onCollapseChange, disableNavigation = false }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseChange?.(newCollapsedState);
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (disableNavigation && location.pathname !== path) {
      e.preventDefault();
    } else {
      onClose?.();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[19] lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-dotted border-[#393f5b]/15 transition-all duration-300 z-20 flex flex-col
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo/Brand Section */}
        <div className="h-[72px] border-b border-dotted border-[#393f5b]/15 flex items-center justify-between px-6">
          {!isCollapsed ? (
            <Link 
              to="/dashboard" 
              className="flex-1" 
              onClick={(e) => handleNavClick(e, '/dashboard')}
            >
              <img 
                src="/logo-light.svg" 
                alt="Spardha" 
                className="h-7 w-auto"
              />
            </Link>
          ) : (
            <Link 
              to="/dashboard" 
              className="flex-1 flex justify-center" 
              onClick={(e) => handleNavClick(e, '/dashboard')}
            >
              <img 
                src="/logo-sm.svg" 
                alt="Spardha" 
                className="h-8 w-8"
              />
            </Link>
          )}
          
          {/* Close button on mobile, collapse button on desktop */}
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                onClose?.();
              } else {
                handleCollapseToggle();
              }
            }}
            className="p-2 rounded-md hover:bg-[#393f5b]/5 transition-colors flex-shrink-0"
          >
            <X size={20} className="text-[#393f5b] lg:hidden" />
            {isCollapsed ? (
              <ChevronRight size={20} className="text-[#393f5b] hidden lg:block" />
            ) : (
              <ChevronLeft size={20} className="text-[#393f5b] hidden lg:block" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isDisabled = disableNavigation && !isActive;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${
                      isActive
                        ? 'bg-[#393f5b] text-white shadow-md'
                        : isDisabled
                        ? 'text-[#070a05]/30 cursor-not-allowed opacity-50'
                        : 'text-[#070a05]/70 hover:bg-[#393f5b]/5 hover:text-[#393f5b]'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon 
                      size={20} 
                      className={`flex-shrink-0 ${
                        isActive 
                          ? 'text-white' 
                          : isDisabled
                          ? 'text-[#070a05]/30'
                          : 'text-[#393f5b] group-hover:text-[#393f5b]'
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile Section at Bottom */}
        <div className="border-t border-dotted border-[#393f5b]/15 p-4">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#393f5b]/5 transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#393f5b]/10 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-[#393f5b]" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium text-[#070a05] truncate">
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
                  </p>
                  <p className="text-xs text-[#070a05]/60 truncate">
                    {user.email}
                  </p>
                </div>
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div 
                className={`absolute bottom-full mb-2 bg-white rounded-lg shadow-xl border border-[#393f5b]/15 overflow-hidden ${
                  isCollapsed ? 'right-0 w-48' : 'left-0 right-0'
                }`}
              >
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Click outside to close profile menu */}
        {showProfileMenu && (
          <div 
            className="fixed inset-0 z-[-1]"
            onClick={() => setShowProfileMenu(false)}
          />
        )}
      </aside>
    </>
  );
}
