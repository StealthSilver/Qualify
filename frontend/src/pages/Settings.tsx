import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  User,
  Bell,
  Shield,
  Loader2,
  Check,
  Volume2,
  Mail,
  Clock,
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
import { authService } from '../services/api';
import {
  loadPreferences,
  savePreferences,
  type AppPreferences,
} from '../lib/preferences';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileBusy, setProfileBusy] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  const [prefs, setPrefs] = useState<AppPreferences>(loadPreferences);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordBusy, setPasswordBusy] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/signin');
      return;
    }

    const parsed = JSON.parse(userData) as UserData;
    setUser(parsed);
    setName(parsed.name || '');
    setEmail(parsed.email || '');
  }, [navigate]);

  const syncUserLocalStorage = useCallback((partial: Partial<UserData>) => {
    const raw = localStorage.getItem('user');
    if (!raw) return;
    try {
      const cur = JSON.parse(raw) as UserData;
      const next = { ...cur, ...partial };
      localStorage.setItem('user', JSON.stringify(next));
      setUser(next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await authService.getProfile();
        if (res.success && res.data) {
          const d = res.data as {
            id: string;
            name: string;
            email: string;
            role: string;
          };
          setName(d.name);
          setEmail(d.email);
          syncUserLocalStorage({ id: String(d.id), name: d.name, email: d.email, role: d.role });
        }
      } catch {
        /* offline or error — keep cached user */
      } finally {
        setInitialLoad(false);
      }
    };
    run();
  }, [syncUserLocalStorage]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setProfileMessage({ type: 'err', text: 'Name must be at least 2 characters.' });
      return;
    }
    setProfileBusy(true);
    try {
      const res = await authService.updateProfile({ name: trimmed });
      if (res.success && res.data) {
        syncUserLocalStorage({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
        setProfileMessage({ type: 'ok', text: 'Profile saved.' });
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Could not save profile.';
      setProfileMessage({ type: 'err', text: msg });
    } finally {
      setProfileBusy(false);
    }
  };

  const togglePref = (key: keyof AppPreferences) => {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    savePreferences(next);
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);
    if (!currentPassword || !newPassword) {
      setPasswordMessage({ type: 'err', text: 'Fill in current and new password.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'err', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'err', text: 'New passwords do not match.' });
      return;
    }
    setPasswordBusy(true);
    try {
      const res = await authService.updateProfile({
        currentPassword,
        newPassword,
      });
      if (res.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordMessage({ type: 'ok', text: 'Password updated.' });
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Could not update password.';
      setPasswordMessage({ type: 'err', text: msg });
    } finally {
      setPasswordBusy(false);
    }
  };

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
              <h1 className={`${DASHBOARD_TITLE_CLASS} text-[#070a05]`} style={dashboardTitleStyle}>
                Settings
              </h1>
              <p className="text-xs sm:text-sm text-[#070a05]/55 mt-0.5">
                Account, notifications, and security
              </p>
            </div>
          </div>
        </div>

        <div className={`${DASHBOARD_CONTENT_CLASS} max-w-3xl space-y-5 sm:space-y-6 md:space-y-8`}>
          {initialLoad && (
            <div className="flex items-center gap-2 text-sm text-[#070a05]/50">
              <Loader2 className="animate-spin" size={18} />
              Syncing profile…
            </div>
          )}

          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-4 sm:p-5 md:p-6 shadow-md min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-[#393f5b]/10">
                <User size={20} className="text-[#393f5b]" />
              </div>
              <div>
                <h2 className="text-lg font-light tracking-tight text-[#070a05]">Profile</h2>
                <p className="text-xs text-[#070a05]/55">Name is saved to your account</p>
              </div>
            </div>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label htmlFor="settings-name" className="block text-xs font-medium text-[#070a05]/60 mb-1.5">
                  Display name
                </label>
                <input
                  id="settings-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-dotted border-[#393f5b]/20 bg-white text-[#070a05] text-sm focus:outline-none focus:ring-2 focus:ring-[#393f5b]/25 focus:border-[#393f5b]/30"
                  autoComplete="name"
                />
              </div>
              <div>
                <label htmlFor="settings-email" className="block text-xs font-medium text-[#070a05]/60 mb-1.5">
                  Email
                </label>
                <input
                  id="settings-email"
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-md border border-dotted border-[#393f5b]/15 bg-[#f3f6f8]/80 text-[#070a05]/50 text-sm cursor-not-allowed"
                />
                <p className="text-xs text-[#070a05]/45 mt-1">Contact support to change your email.</p>
              </div>
              {profileMessage && (
                <p
                  className={`text-sm flex items-center gap-1.5 ${
                    profileMessage.type === 'ok' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {profileMessage.type === 'ok' && <Check size={16} />}
                  {profileMessage.text}
                </p>
              )}
              <button
                type="submit"
                disabled={profileBusy}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-[#393f5b] text-white text-sm font-medium hover:bg-[#2d3248] transition-colors disabled:opacity-60"
              >
                {profileBusy ? <Loader2 className="animate-spin" size={18} /> : null}
                Save profile
              </button>
            </form>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-4 sm:p-5 md:p-6 shadow-md min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-[#393f5b]/10">
                <Bell size={20} className="text-[#393f5b]" />
              </div>
              <div>
                <h2 className="text-lg font-light tracking-tight text-[#070a05]">Notifications & practice</h2>
                <p className="text-xs text-[#070a05]/55">Stored on this device</p>
              </div>
            </div>
            <ul className="space-y-1 divide-y divide-dotted divide-[#393f5b]/10">
              <li className="flex items-center justify-between gap-4 py-4 first:pt-0">
                <div className="flex items-start gap-3 min-w-0">
                  <Mail size={18} className="text-[#393f5b] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#070a05]">Product & study emails</p>
                    <p className="text-xs text-[#070a05]/50">Tips, streaks, and weekly summaries</p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs.emailNotifications}
                  onClick={() => togglePref('emailNotifications')}
                  className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${
                    prefs.emailNotifications ? 'bg-[#393f5b]' : 'bg-[#393f5b]/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      prefs.emailNotifications ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </li>
              <li className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-start gap-3 min-w-0">
                  <Clock size={18} className="text-[#393f5b] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#070a05]">Daily practice reminders</p>
                    <p className="text-xs text-[#070a05]/50">Nudge when you have not practiced today</p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs.practiceReminders}
                  onClick={() => togglePref('practiceReminders')}
                  className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${
                    prefs.practiceReminders ? 'bg-[#393f5b]' : 'bg-[#393f5b]/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      prefs.practiceReminders ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </li>
              <li className="flex items-center justify-between gap-4 py-4 last:pb-0">
                <div className="flex items-start gap-3 min-w-0">
                  <Volume2 size={18} className="text-[#393f5b] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#070a05]">Sound feedback</p>
                    <p className="text-xs text-[#070a05]/50">Short sounds when submitting answers (where supported)</p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={prefs.soundEffects}
                  onClick={() => togglePref('soundEffects')}
                  className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${
                    prefs.soundEffects ? 'bg-[#393f5b]' : 'bg-[#393f5b]/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      prefs.soundEffects ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </li>
            </ul>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-lg border border-white/50 p-4 sm:p-5 md:p-6 shadow-md min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-[#393f5b]/10">
                <Shield size={20} className="text-[#393f5b]" />
              </div>
              <div>
                <h2 className="text-lg font-light tracking-tight text-[#070a05]">Security</h2>
                <p className="text-xs text-[#070a05]/55">Change your sign-in password</p>
              </div>
            </div>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="settings-current-password"
                  className="block text-xs font-medium text-[#070a05]/60 mb-1.5"
                >
                  Current password
                </label>
                <input
                  id="settings-current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-dotted border-[#393f5b]/20 bg-white text-[#070a05] text-sm focus:outline-none focus:ring-2 focus:ring-[#393f5b]/25"
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label
                  htmlFor="settings-new-password"
                  className="block text-xs font-medium text-[#070a05]/60 mb-1.5"
                >
                  New password
                </label>
                <input
                  id="settings-new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-dotted border-[#393f5b]/20 bg-white text-[#070a05] text-sm focus:outline-none focus:ring-2 focus:ring-[#393f5b]/25"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label
                  htmlFor="settings-confirm-password"
                  className="block text-xs font-medium text-[#070a05]/60 mb-1.5"
                >
                  Confirm new password
                </label>
                <input
                  id="settings-confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md border border-dotted border-[#393f5b]/20 bg-white text-[#070a05] text-sm focus:outline-none focus:ring-2 focus:ring-[#393f5b]/25"
                  autoComplete="new-password"
                />
              </div>
              {passwordMessage && (
                <p
                  className={`text-sm flex items-center gap-1.5 ${
                    passwordMessage.type === 'ok' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {passwordMessage.type === 'ok' && <Check size={16} />}
                  {passwordMessage.text}
                </p>
              )}
              <button
                type="submit"
                disabled={passwordBusy}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-dotted border-[#393f5b]/30 text-[#393f5b] text-sm font-medium hover:bg-[#393f5b]/5 transition-colors disabled:opacity-60"
              >
                {passwordBusy ? <Loader2 className="animate-spin" size={18} /> : null}
                Update password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
