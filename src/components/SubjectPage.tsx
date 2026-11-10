import React from 'react';
import { motion } from 'motion/react';
import { SUBJECTS_DATA } from '../data/mockData';
import { SubjectItem, LanguageType } from '../types';
import { Calculator, Atom, Zap, FlaskConical, Dna, BookOpen, Languages, Globe, Laptop, TrendingUp, ArrowRight, Layers } from 'lucide-react';

interface SubjectPageProps {
  className: string;
  board: string;
  onSelectSubject: (subject: SubjectItem) => void;
  language: LanguageType;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  Atom,
  Zap,
  FlaskConical,
  Dna,
  BookOpen,
  Languages,
  Globe,
  Laptop,
  TrendingUp
};

export const SubjectPage: React.FC<SubjectPageProps> = ({
  className,
  board,
  onSelectSubject,
  language
}) => {
  const classNum = parseInt(className.replace('Class ', '').replace('வகுப்பு ', ''), 10) || 10;
  const displayClassName = language === 'Tamil' ? `வகுப்பு ${classNum}` : `Class ${classNum}`;

  // Filter subjects for this grade level
  const filteredSubjects = SUBJECTS_DATA.filter(s => s.classesAllowed.includes(classNum));

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-[22px] text-white shadow-xl mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold mb-3 border border-white/10">
              <span>{board}</span>
              <span>•</span>
              <span>{displayClassName}</span>
              <span>•</span>
              <span>{language === 'Tamil' ? 'தமிழ் வழி' : 'English Medium'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-poppins tracking-tight">
              {language === 'Tamil' ? `${displayClassName} - பாடப் பாடத்திட்டம்` : `${displayClassName} Subjects & Chapters`}
            </h2>
            <p className="mt-2 text-slate-300 font-inter text-sm max-w-2xl">
              {language === 'Tamil'
                ? 'அனைத்துப் பாடங்களுக்கும் உயர்தர வீடியோக்கள், AI சந்தேக நிவர்த்தி மற்றும் மாதிரித் தேர்வுகள்.'
                : 'Explore interactive chapter modules, video lectures, AI doubt clearing, and chapter quizzes.'}
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md self-start md:self-auto">
            <Layers className="w-8 h-8 text-amber-300" />
            <div>
              <div className="text-xl font-bold font-poppins">{filteredSubjects.length}</div>
              <div className="text-[10px] text-slate-300 uppercase font-semibold">
                {language === 'Tamil' ? 'பாடங்கள் கிடைக்கும்' : 'Available Subjects'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub, idx) => {
          const IconComponent = ICON_MAP[sub.iconName] || BookOpen;

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => onSelectSubject(sub)}
              className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-soft hover:shadow-glow hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${sub.colorGradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 font-poppins">
                    {sub.chapterCount} {language === 'Tamil' ? 'அத்தியாயங்கள்' : 'Chapters'}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-poppins text-slate-900 group-hover:text-[#6D5EF7] transition-colors">
                  {language === 'Tamil' && sub.tamilTitle ? sub.tamilTitle : sub.title}
                </h3>

                <p className="mt-3 text-xs text-slate-600 font-inter leading-relaxed">
                  {language === 'Tamil' && sub.tamilDescription ? sub.tamilDescription : sub.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs font-semibold text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{language === 'Tamil' ? 'AI உதவி பெறலாம்' : 'AI Tutor Enabled'}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-[#6D5EF7] group-hover:translate-x-1 transition-transform">
                  <span>{language === 'Tamil' ? 'பாடங்களை ஆரம்பி' : 'View Lessons'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
