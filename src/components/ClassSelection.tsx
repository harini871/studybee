import React from 'react';
import { motion } from 'motion/react';
import { LanguageType } from '../types';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface ClassSelectionProps {
  selectedClass: string | null;
  onSelectClass: (className: string) => void;
  language: LanguageType;
}

export const ClassSelection: React.FC<ClassSelectionProps> = ({
  selectedClass,
  onSelectClass,
  language
}) => {
  const classesList = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900">
          {language === 'Tamil' ? 'உங்கள் வகுப்பைத் தேர்ந்தெடுக்கவும்' : 'Select Your Grade / Class'}
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-inter">
          {language === 'Tamil'
            ? 'வகுப்பு 1 முதல் வகுப்பு 12 வரையிலான பாடத்திட்டங்கள் தமிழ் மற்றும் ஆங்கில வழியில் தயாராக உள்ளன.'
            : 'Tailored study plans and subject modules available from Class 1 to Class 12.'}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {classesList.map((cls, idx) => {
          const isSelected = selectedClass === cls;
          const classNum = idx + 1;
          const displayClassName = language === 'Tamil' ? `வகுப்பு ${classNum}` : `Class ${classNum}`;
          const category = classNum <= 5 
            ? (language === 'Tamil' ? 'தொடக்கக் கல்வி' : 'Primary') 
            : classNum <= 8 
            ? (language === 'Tamil' ? 'நடுநிலைக் கல்வி' : 'Middle') 
            : classNum <= 10 
            ? (language === 'Tamil' ? 'உயர்நிலைக் கல்வி' : 'High School') 
            : (language === 'Tamil' ? 'மேல்நிலைக் கல்வி' : 'Senior Sec');

          return (
            <motion.div
              key={cls}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectClass(cls)}
              className={`p-5 rounded-[22px] border-2 bg-white transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center relative overflow-hidden group ${
                isSelected
                  ? 'border-[#6D5EF7] shadow-glow bg-gradient-to-b from-indigo-50/50 to-purple-50/50'
                  : 'border-slate-200 hover:border-indigo-300 shadow-soft'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#6D5EF7] flex items-center justify-center font-bold mb-3 group-hover:bg-[#6D5EF7] group-hover:text-white transition-colors shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>

              <div>
                <span className="text-base sm:text-lg font-extrabold font-poppins text-slate-900 block group-hover:text-[#6D5EF7] transition-colors">
                  {displayClassName}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-0.5 font-inter">
                  {category}
                </span>
              </div>

              <div className="mt-4 w-full pt-2 border-t border-slate-100 text-[11px] font-semibold text-[#6D5EF7] flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{language === 'Tamil' ? 'பாடங்களை காண்க' : 'Open Subjects'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
