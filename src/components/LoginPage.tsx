import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, LanguageType } from '../types';
import { Mail, Lock, ArrowRight, CheckCircle2, KeyRound, Sparkles } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (email: string) => void;
  onNavigateToSignUp: () => void;
  language: LanguageType;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateToSignUp,
  language
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Forgot Password Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'reset' | 'success'>('email');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onLoginSuccess(email);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotStep === 'email') {
      setForgotStep('otp');
    } else if (forgotStep === 'otp') {
      setForgotStep('reset');
    } else if (forgotStep === 'reset') {
      setForgotStep('success');
    }
  };

  return (
    <div className="relative min-h-[88vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-[#F8FAFC]">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-[#6D5EF7]/20 to-[#8B7CFF]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md glass-card p-8 sm:p-10 rounded-[22px] shadow-glow"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white font-bold text-3xl mb-3 shadow-md">
            🐝
          </div>
          <h2 className="text-2xl font-extrabold font-poppins text-slate-900">
            {language === 'Tamil' ? 'மீண்டும் வருக!' : 'Welcome Back!'}
          </h2>
          <p className="text-xs text-slate-500 font-inter mt-1">
            {language === 'Tamil' ? 'உங்கள் கற்றலைத் தொடர உள்நுழையவும்.' : 'Enter your credentials to continue your learning journey.'}
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="student@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 font-poppins">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(true);
                  setForgotStep('email');
                }}
                className="text-[11px] font-semibold text-[#6D5EF7] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-[#6D5EF7]"
            />
            <label htmlFor="remember" className="text-xs text-slate-600 font-inter">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-[22px] bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white font-poppins font-semibold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social Login Option */}
        <div className="mt-6 pt-6 border-t border-slate-200/80 text-center">
          <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-3">
            Or Sign In With
          </p>
          <button
            onClick={() => onLoginSuccess('google.student@studybee.edu')}
            className="w-full py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
          >
            <span className="font-bold text-blue-500">G</span>
            <span>Sign in with Google</span>
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 font-inter">
          Don't have an account yet?{' '}
          <button onClick={onNavigateToSignUp} className="font-bold text-[#6D5EF7] hover:underline cursor-pointer">
            Sign Up Now
          </button>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 sm:p-8 rounded-[22px] max-w-md w-full shadow-2xl space-y-4 relative"
            >
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>

              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#6D5EF7] mx-auto flex items-center justify-center mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-poppins text-slate-900">
                  Password Recovery
                </h3>
              </div>

              {forgotStep === 'email' && (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <p className="text-xs text-slate-500 text-center font-inter">
                    Enter your registered email address to receive an OTP reset code.
                  </p>
                  <input
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#6D5EF7] text-white text-xs font-bold font-poppins"
                  >
                    Send OTP Code
                  </button>
                </form>
              )}

              {forgotStep === 'otp' && (
                <form onSubmit={handleForgotSubmit} className="space-y-4 text-center">
                  <p className="text-xs text-slate-500 font-inter">
                    Enter the 4-digit code sent to {forgotEmail || 'your email'}. (Demo: 2026)
                  </p>
                  <input
                    type="text"
                    maxLength={4}
                    required
                    placeholder="2026"
                    value={forgotOtp}
                    onChange={e => setForgotOtp(e.target.value)}
                    className="w-36 mx-auto block text-center text-xl font-bold py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#6D5EF7] text-white text-xs font-bold font-poppins"
                  >
                    Verify Code
                  </button>
                </form>
              )}

              {forgotStep === 'reset' && (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <input
                    type="password"
                    required
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                  <input
                    type="password"
                    required
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#6D5EF7] text-white text-xs font-bold font-poppins"
                  >
                    Reset Password
                  </button>
                </form>
              )}

              {forgotStep === 'success' && (
                <div className="text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-800 font-poppins">
                    Password Reset Successfully!
                  </p>
                  <button
                    onClick={() => setShowForgotModal(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-poppins"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
