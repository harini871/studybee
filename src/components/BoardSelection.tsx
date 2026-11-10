import React from 'react';
import { motion } from 'motion/react';
import { BOARDS_DATA } from '../data/mockData';
import { BoardType, LanguageType } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface BoardSelectionProps {
  selectedBoard: BoardType | null;
  onSelectBoard: (board: BoardType) => void;
  language: LanguageType;
}

export const BoardSelection: React.FC<BoardSelectionProps> = ({
  selectedBoard,
  onSelectBoard,
  language
}) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Neutral Title for Curriculum */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900">
          {language === 'Tamil' ? 'பாடத்திட்டம் (Choose Your Curriculum)' : 'Choose Your Curriculum'}
        </h2>
        <p className="mt-2 text-sm text-slate-600 font-inter max-w-xl mx-auto">
          {language === 'Tamil'
            ? 'சிபிஎஸ்இ, தமிழ்நாடு மாநில பாடத்திட்டம் அல்லது ஐசிஎஸ்இ வாரியங்களில் இருந்து தேர்வு செய்யவும்.'
            : 'Select your educational board to access textbook solutions, syllabus notes, and practice materials for Classes 1 to 12.'}
        </p>
      </div>

      {/* 3 Equal Board Cards: CBSE, Tamil Nadu State Board, ICSE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BOARDS_DATA.map((board) => {
          const isSelected = selectedBoard === board.id;
          return (
            <motion.div
              key={board.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectBoard(board.id)}
              className={`relative bg-white p-6 rounded-[24px] border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#6D5EF7] shadow-glow bg-indigo-50/20'
                  : 'border-slate-200 hover:border-indigo-300 shadow-soft hover:shadow-lg'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 text-[#6D5EF7] z-10">
                  <CheckCircle2 className="w-6 h-6 fill-indigo-100" />
                </div>
              )}

              <div>
                {/* Official Board Logo Container */}
                <div className="h-36 w-full rounded-2xl overflow-hidden mb-5 relative bg-slate-50 border border-slate-200/80 flex items-center justify-center p-4">
                  <img
                    src={board.logoUrl}
                    alt={board.title}
                    className="max-h-full max-w-full object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-[11px] font-bold bg-[#6D5EF7] text-white shadow-xs font-poppins">
                    {language === 'Tamil' ? 'வகுப்புகள் 1–12' : 'Classes 1–12'}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-poppins text-slate-900 leading-snug">
                  {board.title}
                </h3>
                <p className="text-xs font-semibold text-[#6D5EF7] mt-1 font-inter">
                  {board.subtitle}
                </p>
                <p className="text-xs text-slate-500 font-inter mt-2 leading-relaxed">
                  {language === 'Tamil'
                    ? (board.id === 'CBSE'
                        ? 'மத்திய இடைநிலைக் கல்வி வாரியம் - வகுப்புகள் 1 முதல் 12 வரையிலான NCERT பாடத்திட்டம்.'
                        : board.id === 'State Board'
                        ? 'தமிழ்நாடு அரசு பள்ளிவழிக் கல்வித் துறை சமச்சீர் கல்வி பாடத்திட்டம் - வகுப்புகள் 1 முதல் 12 வரை.'
                        : 'ஐசிஎஸ்இ சிஐஎஸ்சிஈ சர்வதேச தரம் வாய்ந்த பாடத்திட்டம் - வகுப்புகள் 1 முதல் 12 வரை.')
                    : board.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#6D5EF7]">
                <span>{language === 'Tamil' ? 'பாடத்திட்டத்தை தேர்வு செய்க' : 'Select Board'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
