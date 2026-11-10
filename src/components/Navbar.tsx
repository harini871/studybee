import React from 'react';
import { Sparkles, Languages, LogIn, UserPlus, LayoutDashboard, BookOpen } from 'lucide-react';
import { UserProfile, LanguageType } from '../types';

interface NavbarProps {
  user: UserProfile | null;
  currentView: string;
  onNavigate: (view: string) => void;
  onToggleLanguage: () => void;
  language: LanguageType;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentView,
  onNavigate,
  onToggleLanguage,
  language
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-panel border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Top Left: Logo + Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-[16px] bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-bold font-poppins">🐝</span>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-[#6D5EF7] via-[#8B7CFF] to-indigo-900 tracking-tight">
                  StudyBee
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 font-inter">
                {language === 'Tamil' ? 'AI மூலம் சிறந்த முறையில் கற்கலாம்' : 'Learn Smarter with AI'}
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Hidden on small mobile) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/80">
            <button
              onClick={() => onNavigate('home')}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-inter transition-all ${
                currentView === 'home'
                  ? 'bg-white text-[#6D5EF7] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {language === 'Tamil' ? 'முகப்பு' : 'Home'}
            </button>

            {user && (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold font-inter transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-white text-[#6D5EF7] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>{language === 'Tamil' ? 'டாஷ்போர்டு' : 'Dashboard'}</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('curriculum')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold font-inter transition-all ${
                ['curriculum', 'subjects', 'lessons'].includes(currentView)
                  ? 'bg-white text-[#6D5EF7] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'Tamil' ? 'பாடத்திட்டம்' : 'Curriculum'}</span>
            </button>

            <button
              onClick={() => onNavigate('doubt-solver')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold font-inter transition-all ${
                currentView === 'doubt-solver'
                  ? 'bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white shadow-md'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>{language === 'Tamil' ? 'சந்தேக நிவாரணி' : 'AI Doubt Solver'}</span>
            </button>
          </nav>

          {/* Top Right: Language Toggle & User Auth / Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-200 cursor-pointer"
              title="Switch Language / மொழியை மாற்றுக"
            >
              <Languages className="w-3.5 h-3.5 text-[#6D5EF7]" />
              <span className="font-poppins">{language === 'Tamil' ? 'தமிழ்' : 'English'}</span>
            </button>

            {user ? (
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 p-1.5 pl-3 pr-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 transition-all cursor-pointer"
              >
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold font-poppins text-slate-800 leading-tight">
                    {user.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {language === 'Tamil' ? user.className.replace('Class ', 'வகுப்பு ') : user.className} • {user.board === 'State Board' ? (language === 'Tamil' ? 'தமிழ்நாடு அரசு' : 'TN State') : user.board}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#6D5EF7] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {user.name.charAt(0)}
                </div>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="flex items-center space-x-1 px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-all font-inter cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{language === 'Tamil' ? 'உள்நுழை' : 'Login'}</span>
                </button>

                <button
                  onClick={() => onNavigate('signup')}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all cursor-pointer font-inter"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{language === 'Tamil' ? 'பதிவு செய்யவும்' : 'Sign Up'}</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
