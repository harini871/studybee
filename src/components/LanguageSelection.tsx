import React from 'react';
import { motion } from 'motion/react';
import { LanguageType } from '../types';
import { Languages, CheckCircle2, Globe } from 'lucide-react';

interface LanguageSelectionProps {
  selectedLanguage: LanguageType;
  onSelectLanguage: (lang: LanguageType) => void;
  language: LanguageType;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  onSelectLanguage,
  language
}) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900">
          {language === 'Tamil' ? 'பயிற்சி மொழியைத் தேர்ந்தெடுக்கவும்' : 'Choose Your Preferred Language'}
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-inter">
          {language === 'Tamil'
            ? 'வீடியோக்கள், AI விளக்கம் மற்றும் குறிப்புகளுக்கான மொழியைத் தேர்வு செய்யவும்.'
            : 'Select your medium of instruction for AI explanations, notes, and video narration.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Tamil Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectLanguage('Tamil')}
          className={`relative p-6 rounded-[22px] border-2 bg-white transition-all cursor-pointer flex flex-col justify-between ${
            selectedLanguage === 'Tamil'
              ? 'border-[#6D5EF7] shadow-glow bg-indigo-50/20'
              : 'border-slate-200/80 hover:border-indigo-300 shadow-soft'
          }`}
        >
          {selectedLanguage === 'Tamil' && (
            <div className="absolute top-4 right-4 text-[#6D5EF7]">
              <CheckCircle2 className="w-6 h-6 fill-indigo-100" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EF4444] to-[#F87171] text-white flex items-center justify-center font-bold text-xl mb-4 font-poppins shadow-md">
              த
            </div>
            <h3 className="text-xl font-bold font-poppins text-slate-900">
              தமிழ் (Tamil Medium)
            </h3>
            <p className="text-xs text-slate-500 font-inter mt-2 leading-relaxed">
              தமிழ் வழியில் எளிமையான கதைகள், கருத்துக்கள், AI கேள்விகள் மற்றும் வினாக்கள்.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#EF4444]">
            <span>தமிழ் வழி தேர்வு</span>
            <Globe className="w-4 h-4" />
          </div>
        </motion.div>

        {/* English Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectLanguage('English')}
          className={`relative p-6 rounded-[22px] border-2 bg-white transition-all cursor-pointer flex flex-col justify-between ${
            selectedLanguage === 'English'
              ? 'border-[#6D5EF7] shadow-glow bg-indigo-50/20'
              : 'border-slate-200/80 hover:border-indigo-300 shadow-soft'
          }`}
        >
          {selectedLanguage === 'English' && (
            <div className="absolute top-4 right-4 text-[#6D5EF7]">
              <CheckCircle2 className="w-6 h-6 fill-indigo-100" />
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white flex items-center justify-center font-bold text-xl mb-4 font-poppins shadow-md">
              En
            </div>
            <h3 className="text-xl font-bold font-poppins text-slate-900">
              English (English Medium)
            </h3>
            <p className="text-xs text-slate-500 font-inter mt-2 leading-relaxed">
              Full English medium lectures, NCERT/Samacheer notes, and interactive doubt solving.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#6D5EF7]">
            <span>Select English Medium</span>
            <Globe className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
