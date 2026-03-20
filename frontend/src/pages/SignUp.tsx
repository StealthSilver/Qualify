import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { authService } from '../services/api';
import type { SignUpData } from '../services/api';
import AnimatedGradientBackground from '../components/AnimatedGradientBackground';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.signup(formData);
      
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#f3f6f8] text-[#070a05] overflow-hidden">
      {/* Animated 3D Spiral Fiber Background */}
      <AnimatedGradientBackground />

      {/* Vertical Lines Container */}
      <div className="fixed top-[72px] left-0 right-0 bottom-0 pointer-events-none z-[3]">
        <div className="max-w-7xl mx-auto px-6 h-full relative">
          <div className="absolute left-6 top-0 h-full w-[1px] border-l border-dotted border-[#393f5b]/15" />
          <div className="absolute right-6 top-0 h-full w-[1px] border-r border-dotted border-[#393f5b]/15" />
        </div>
      </div>

      {/* Navbar Area */}
      <div className="relative w-full bg-white/60 backdrop-blur-sm border-b border-dotted border-[#393f5b]/15 z-[2]">
        <div className="max-w-7xl mx-auto px-10 py-4">
          <Link to="/" className="inline-block transition-opacity hover:opacity-80">
            <img 
              src="/logo-light.svg" 
              alt="Spardha" 
              className="h-7 w-auto"
            />
          </Link>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 pt-10 pb-8 xs:pt-12 sm:pt-16 md:pt-20 md:pb-16 z-[2]">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6 xs:mb-8 md:mb-12">
            {/* Badge - Minimal Style matching landing */}
            <div className="inline-block mb-4 xs:mb-6">
              <span className="text-[0.5rem] xs:text-[0.625rem] sm:text-xs font-light text-[#070a05]/40 tracking-[0.12em] xs:tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                Prepare • Compete • Excel
              </span>
            </div>
            
            {/* Main Headline - matching landing page typography */}
            <h1 
              className="font-light leading-[1] xs:leading-[1.05] sm:leading-[1.1] tracking-tight mb-2 xs:mb-3"
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw + 0.4rem, 3.5rem)',
              }}
            >
              Join <span className="text-[#393f5b]">Spardha</span>
            </h1>
            
            {/* Subheadline - matching landing page */}
            <p 
              className="text-[#070a05]/70 leading-snug xs:leading-normal sm:leading-relaxed"
              style={{
                fontSize: 'clamp(0.6875rem, 1.6vw + 0.2rem, 1.125rem)',
              }}
            >
              Start your journey to JEE success
            </p>
          </div>

          {/* Form Card */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-lg xs:rounded-xl shadow-xl border border-white/50 p-5 xs:p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 xs:px-4 py-2.5 xs:py-3 rounded-md text-xs xs:text-sm">
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-xs xs:text-sm font-medium text-[#070a05]/80 mb-1.5 xs:mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393f5b]/50 focus:border-[#393f5b] transition-all duration-300 text-sm xs:text-base"
                />
              </div>

              {/* Email Input */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-xs xs:text-sm font-medium text-[#070a05]/80 mb-1.5 xs:mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393f5b]/50 focus:border-[#393f5b] transition-all duration-300 text-sm xs:text-base"
                />
              </div>

              {/* Password Input */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-xs xs:text-sm font-medium text-[#070a05]/80 mb-1.5 xs:mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#393f5b]/50 focus:border-[#393f5b] transition-all duration-300 text-sm xs:text-base"
                  minLength={6}
                />
                <p className="mt-1 text-[0.625rem] xs:text-xs text-[#070a05]/60">
                  Must be at least 6 characters long
                </p>
              </div>

              {/* Submit Button - matching landing page CTA button */}
              <button 
                type="submit"
                disabled={loading}
                className="group relative flex items-center justify-center gap-1.5 xs:gap-2 bg-[#393f5b] text-white rounded-md xs:rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#2f3450] active:scale-95 overflow-hidden w-full disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  padding: 'clamp(0.5rem, 1vw + 0.15rem, 0.875rem) clamp(0.875rem, 2.2vw + 0.3rem, 2rem)',
                  fontSize: 'clamp(0.6875rem, 1.2vw + 0.15rem, 1rem)',
                  minHeight: '40px',
                }}
              >
                <span className="relative">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </span>
                
                {!loading && (
                  <span className="relative w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex items-center justify-center overflow-hidden">
                    <ChevronRight
                      size={14}
                      className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2 xs:hidden"
                    />
                    <ChevronRight
                      size={16}
                      className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2 hidden xs:block sm:hidden"
                    />
                    <ChevronRight
                      size={18}
                      className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-2 hidden sm:block"
                    />
                    <ArrowRight
                      size={14}
                      className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 xs:hidden"
                    />
                    <ArrowRight
                      size={16}
                      className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden xs:block sm:hidden"
                    />
                    <ArrowRight
                      size={18}
                      className="absolute opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block"
                    />
                  </span>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <div className="mt-5 xs:mt-6 text-center">
              <p className="text-xs xs:text-sm text-[#070a05]/60">
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className="text-[#393f5b] hover:text-[#2f3450] font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
