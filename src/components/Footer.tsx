import React from 'react';
import { LanguageType } from '../types';

interface FooterProps {
  language: LanguageType;
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white flex items-center justify-center font-bold text-xl shadow-sm">
            🐝
          </div>
          <div>
            <span className="text-lg font-bold font-poppins text-slate-900">StudyBee</span>
            <p className="text-xs text-slate-500 font-inter">
              {language === 'Tamil' ? 'வகுப்புகள் 1–12 மாணவர்களுக்கான AI கற்றல் தளம்' : 'Learn Smarter with AI • Classes 1–12'}
            </p>
          </div>
        </div>

        {/* Center: Minimal Links */}
        <div className="flex items-center space-x-6 text-xs font-semibold text-slate-600 font-inter">
          <button onClick={() => onNavigate('home')} className="hover:text-[#6D5EF7] transition-colors">
            {language === 'Tamil' ? 'முகப்பு' : 'Home'}
          </button>
          <button onClick={() => onNavigate('doubt-solver')} className="hover:text-[#6D5EF7] transition-colors">
            {language === 'Tamil' ? 'சந்தேக நிவாரணி' : 'AI Doubt Solver'}
          </button>
          <button onClick={() => onNavigate('curriculum')} className="hover:text-[#6D5EF7] transition-colors">
            {language === 'Tamil' ? 'பாடத்திட்டம்' : 'Curriculum'}
          </button>
          <button onClick={() => alert('Contact: support@studybee.edu')} className="hover:text-[#6D5EF7] transition-colors">
            {language === 'Tamil' ? 'தொடர்பு கொள்ள' : 'Contact'}
          </button>
          <button onClick={() => alert('Privacy Policy: All student data is end-to-end encrypted.')} className="hover:text-[#6D5EF7] transition-colors">
            {language === 'Tamil' ? 'தனியுரிமை கொள்கை' : 'Privacy'}
          </button>
          <button onClick={() => alert('Terms of Service: StudyBee AI Platform Terms 2026.')} className="hover:text-[#6D5EF7] transition-colors">
            {language === 'Tamil' ? 'விதிமுறைகள்' : 'Terms'}
          </button>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-slate-400 font-inter">
          © {new Date().getFullYear()} StudyBee Inc. {language === 'Tamil' ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : 'All rights reserved.'}
        </div>

      </div>
    </footer>
  );
};
