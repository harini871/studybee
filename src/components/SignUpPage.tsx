import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserProfile, BoardType, LanguageType } from '../types';
import { User, Mail, Phone, Lock, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

interface SignUpPageProps {
  onSignUpSuccess: (user: UserProfile) => void;
  onNavigateToLogin: () => void;
  language: LanguageType;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
  onSignUpSuccess,
  onNavigateToLogin,
  language
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Curriculum preferences
  const [board, setBoard] = useState<BoardType>('State Board');
  const [className, setClassName] = useState('Class 10');
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageType>('English');

  // Captcha states
  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const [captchaCode, setCaptchaCode] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const classesList = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  const handleRefreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg(language === 'Tamil' ? 'உங்கள் பெயரை உள்ளிடவும்.' : 'Please enter your Full Name.');
      return;
    }

    if (!email.trim()) {
      setErrorMsg(language === 'Tamil' ? 'மின்னஞ்சல் முகவரியை உள்ளிடவும்.' : 'Please enter a valid Email Address.');
      return;
    }

    if (!phone.trim()) {
      setErrorMsg(language === 'Tamil' ? 'தொலைபேசி எண்ணை உள்ளிடவும்.' : 'Please enter your Phone Number.');
      return;
    }

    if (!password || !confirmPassword) {
      setErrorMsg(language === 'Tamil' ? 'கடவுச்சொல்லை உள்ளிடவும்.' : 'Please create and confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg(language === 'Tamil' ? 'கடவுச்சொற்கள் பொருந்தவில்லை.' : 'Create Password and Confirm Password do not match.');
      return;
    }

    if (!captchaInput || captchaInput.trim().toUpperCase() !== captchaCode) {
      setErrorMsg(language === 'Tamil' ? 'சரியான CAPTCHA குறியீட்டை உள்ளிடவும்.' : 'Invalid CAPTCHA code. Please enter the code shown in the box.');
      return;
    }

    if (!agreedToTerms) {
      setErrorMsg(language === 'Tamil' ? 'விதிமுறைகளை ஏற்கவும்.' : 'Please agree to the Terms of Service.');
      return;
    }

    const newUser: UserProfile = {
      id: `u-${Date.now()}`,
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      board,
      className,
      preferredLanguage,
      streak: 1,
      xp: 250,
      completedLessonIds: [],
      savedNoteIds: [],
      bookmarkedPdfIds: []
    };

    onSignUpSuccess(newUser);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-[#F8FAFC]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-[22px] border border-slate-200/80 shadow-glow relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-tr from-[#6D5EF7]/20 to-[#8B7CFF]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white font-bold text-2xl mb-3 shadow-md">
            🐝
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900">
            {language === 'Tamil' ? 'StudyBee கணக்கை உருவாக்குங்கள்' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-slate-500 font-inter mt-1">
            {language === 'Tamil'
              ? 'வகுப்பு 1 முதல் 12 வரையிலான மாணவர்களுக்கான AI கற்றல் தளம்.'
              : 'Join StudyBee for CBSE, Tamil Nadu State Board & ICSE AI learning.'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold text-center font-inter">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Email Address *
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

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
                />
              </div>
            </div>

            {/* Board Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Board / Curriculum *
              </label>
              <select
                value={board}
                onChange={e => setBoard(e.target.value as BoardType)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
              >
                <option value="State Board">Tamil Nadu State Board</option>
                <option value="CBSE">CBSE (NCERT)</option>
                <option value="ICSE">ICSE / CISCE</option>
              </select>
            </div>

            {/* Class Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Grade / Class *
              </label>
              <select
                value={className}
                onChange={e => setClassName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
              >
                {classesList.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Preferred Medium *
              </label>
              <select
                value={preferredLanguage}
                onChange={e => setPreferredLanguage(e.target.value as LanguageType)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
              >
                <option value="English">English Medium</option>
                <option value="Tamil">தமிழ் Medium</option>
              </select>
            </div>

            {/* Create Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Create Password *
              </label>
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 font-poppins mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-inter focus:outline-none focus:border-[#6D5EF7] focus:bg-white"
                />
              </div>
            </div>

          </div>

          {/* Captcha Section */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
            <label className="block text-xs font-bold text-slate-800 font-poppins">
              Security Verification (CAPTCHA) *
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Visual Captcha Display Box */}
              <div className="flex items-center space-x-2 px-4 py-2.5 bg-slate-900 text-amber-300 font-mono font-extrabold text-xl tracking-[0.3em] rounded-xl border border-slate-700 select-none shadow-inner">
                <span className="line-through decoration-indigo-400 decoration-2">{captchaCode}</span>
                <button
                  type="button"
                  onClick={handleRefreshCaptcha}
                  className="ml-2 text-slate-400 hover:text-white transition-colors p-1"
                  title="Refresh Captcha Code"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Captcha Input */}
              <input
                type="text"
                required
                placeholder="Enter CAPTCHA Code"
                value={captchaInput}
                onChange={e => setCaptchaInput(e.target.value)}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono uppercase tracking-wider focus:outline-none focus:border-[#6D5EF7]"
              />
            </div>
          </div>

          {/* Checkbox Terms */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded text-[#6D5EF7] focus:ring-[#6D5EF7]"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 font-inter">
              I agree to the <span className="font-semibold text-[#6D5EF7]">Terms of Service</span> and <span className="font-semibold text-[#6D5EF7]">Privacy Policy</span>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-[22px] bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white font-poppins font-semibold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{language === 'Tamil' ? 'பதிவு செய்க (Sign Up)' : 'Sign Up'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-inter">
          Already have an account?{' '}
          <button onClick={onNavigateToLogin} className="font-bold text-[#6D5EF7] hover:underline cursor-pointer">
            Login Here
          </button>
        </div>

      </motion.div>
    </div>
  );
};
