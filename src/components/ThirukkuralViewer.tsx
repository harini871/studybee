import React, { useState } from 'react';
import { motion } from 'motion/react';
import { getThirukkural, getDailyThirukkural, ThirukkuralItem, ATHIGARAMS } from '../data/thirukkuralData';
import { LanguageType } from '../types';
import { FileText, ChevronLeft, ChevronRight, Sparkles, Search, ArrowLeft } from 'lucide-react';

interface ThirukkuralViewerProps {
  onBack: () => void;
  language: LanguageType;
}

export const ThirukkuralViewer: React.FC<ThirukkuralViewerProps> = ({
  onBack,
  language
}) => {
  const dailyKural = getDailyThirukkural();
  const [currentKuralNum, setCurrentKuralNum] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ThirukkuralItem[] | null>(null);

  const currentKural: ThirukkuralItem = getThirukkural(currentKuralNum);

  const handleNext = () => {
    if (currentKuralNum < 1330) {
      setCurrentKuralNum(currentKuralNum + 1);
    }
  };

  const handlePrev = () => {
    if (currentKuralNum > 1) {
      setCurrentKuralNum(currentKuralNum - 1);
    }
  };

  // Immediate Search Handler for Exact Thirukkural Number (1 to 1330) or Chapter/Keyword search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const num = parseInt(searchQuery.trim(), 10);
    // If user enters an exact Thirukkural number (e.g. 15, 36, 100, 500, 1330), open it instantly!
    if (!isNaN(num) && num >= 1 && num <= 1330) {
      setCurrentKuralNum(num);
      setSearchResults(null);
      setSearchQuery('');
      return;
    }

    // Keyword or Chapter search across all 1330 Kurals
    const query = searchQuery.trim().toLowerCase();
    const matches: ThirukkuralItem[] = [];

    for (let i = 1; i <= 1330; i++) {
      const kural = getThirukkural(i);
      if (
        kural.athigaram.toLowerCase().includes(query) ||
        kural.line1.toLowerCase().includes(query) ||
        kural.line2.toLowerCase().includes(query) ||
        kural.tamExplain.toLowerCase().includes(query) ||
        kural.engExplain.toLowerCase().includes(query)
      ) {
        matches.push(kural);
        if (matches.length >= 8) break; // Display top matching results
      }
    }

    setSearchResults(matches);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-700 bg-white px-4 py-2.5 rounded-full border border-slate-200 shadow-xs hover:bg-slate-100 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#6D5EF7]" />
          <span>{language === 'Tamil' ? 'டாஷ்போர்டுக்குத் திரும்புக' : 'Back to Dashboard'}</span>
        </button>

        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold font-poppins">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{language === 'Tamil' ? '1330 திருக்குறள்கள்' : '1330 Thirukkural Book'}</span>
        </div>
      </div>

      {/* Featured Daily Thirukkural (இன்றைய திருக்குறள்) Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-amber-900 via-amber-950 to-slate-950 p-6 sm:p-8 rounded-[28px] text-white shadow-xl overflow-hidden border border-amber-500/30"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold font-poppins">
              🌟 {language === 'Tamil' ? 'இன்றைய திருக்குறள்' : 'Daily Thirukkural'}
            </span>
            <span className="text-xs text-amber-200 font-mono font-bold">
              {language === 'Tamil' ? `திருக்குறள் ${dailyKural.number}` : `Thirukkural No. ${dailyKural.number}`}
            </span>
          </div>

          <div className="text-center py-4 px-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <p className="text-xl sm:text-2xl font-extrabold font-serif text-amber-100 leading-relaxed tracking-wide">
              "{dailyKural.line1}"
            </p>
            <p className="text-xl sm:text-2xl font-extrabold font-serif text-amber-100 leading-relaxed tracking-wide mt-1">
              "{dailyKural.line2}"
            </p>
          </div>

          <div className="text-xs sm:text-sm text-slate-200 font-inter leading-relaxed bg-amber-950/40 p-4 rounded-xl border border-amber-500/20">
            <span className="font-bold text-amber-300">
              {language === 'Tamil' ? 'விளக்கம்: ' : 'Meaning: '}
            </span>
            {language === 'Tamil' ? dailyKural.tamExplain : dailyKural.engExplain}
          </div>

          <div className="flex items-center justify-between text-xs text-amber-200/80 pt-2 border-t border-amber-500/20">
            <span>
              {language === 'Tamil'
                ? `அதிகாரம்: ${dailyKural.athigaram} • ${dailyKural.paal}`
                : `Chapter: ${dailyKural.athigaram} • Division: ${dailyKural.paal}`}
            </span>
            <button
              onClick={() => setCurrentKuralNum(dailyKural.number)}
              className="text-amber-300 hover:underline font-bold"
            >
              {language === 'Tamil' ? 'இந்தக் குறளைப் படிக்க ▶' : 'Read This Kural ▶'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main 1330 Thirukkural Digital Book Browser & Search Engine */}
      <div className="bg-white p-6 sm:p-8 rounded-[28px] border border-slate-200 shadow-soft space-y-6">
        
        {/* Search Header Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-extrabold font-poppins text-slate-900">
              {language === 'Tamil' ? 'திருக்குறள் டிஜிட்டல் நூல் (1 - 1330)' : 'Digital Thirukkural Book (1 - 1330)'}
            </h2>
            <p className="text-xs text-slate-500 font-inter mt-1">
              {language === 'Tamil'
                ? 'குறள் எண் (எ.கா: 15, 36, 100, 500, 1330) அல்லது அதிகாரம் தட்டச்சு செய்து தேடலாம்.'
                : 'Enter exact Thirukkural number (e.g., 15, 36, 100, 500, 1330) or chapter name to search.'}
            </p>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={language === 'Tamil' ? 'குறள் எண் (1-1330) அல்லது அதிகாரம்...' : 'Enter Kural No. (1-1330) or Chapter...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#6D5EF7]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#6D5EF7] text-white text-xs font-bold hover:bg-indigo-600 transition-colors cursor-pointer"
            >
              {language === 'Tamil' ? 'தேடுக' : 'Search'}
            </button>
          </form>
        </div>

        {/* Keyword Search Results Preview Grid */}
        {searchResults && (
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
              <span>{language === 'Tamil' ? `தேடல் முடிவுகள் (${searchResults.length})` : `Search Results (${searchResults.length})`}</span>
              <button onClick={() => setSearchResults(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            {searchResults.length === 0 ? (
              <p className="text-xs text-slate-500">{language === 'Tamil' ? 'முடிவுகள் எதுவும் கிடைக்கவில்லை.' : 'No matching Kurals found.'}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchResults.map((k) => (
                  <button
                    key={k.number}
                    onClick={() => {
                      setCurrentKuralNum(k.number);
                      setSearchResults(null);
                    }}
                    className="p-3 rounded-xl bg-white border border-slate-200 text-left hover:border-[#6D5EF7] transition-all cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-[#6D5EF7]">
                      {language === 'Tamil' ? `திருக்குறள் ${k.number}` : `Thirukkural No. ${k.number}`} • {k.athigaram}
                    </div>
                    <div className="text-xs font-serif font-semibold text-slate-800 line-clamp-1">{k.line1}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Clean Thirukkural Display Card (Clean UI without video or extra buttons) */}
        <div className="bg-gradient-to-b from-indigo-50/40 to-slate-50 p-6 sm:p-8 rounded-[24px] border-2 border-indigo-100 space-y-6">
          
          {/* Clean Header Display */}
          <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
            <div className="text-lg font-extrabold font-poppins text-slate-900">
              {language === 'Tamil' ? `திருக்குறள் ${currentKural.number}` : `Thirukkural No. ${currentKural.number}`}
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800">
                {language === 'Tamil' ? `பால்: ${currentKural.paal}` : `Division: ${currentKural.paal}`}
              </span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-[#6D5EF7]">
                {language === 'Tamil' ? `அதிகாரம்: ${currentKural.athigaram}` : `Chapter: ${currentKural.athigaram}`}
              </span>
            </div>
          </div>

          {/* Original Tamil Kural Display */}
          <div className="text-center py-8 px-4 bg-white rounded-2xl border border-indigo-100 shadow-xs space-y-2">
            <p className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 leading-snug tracking-wide">
              {currentKural.line1}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 leading-snug tracking-wide">
              {currentKural.line2}
            </p>
          </div>

          {/* Tamil & English Meanings */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1">
              <span className="font-bold text-[#6D5EF7] block text-xs uppercase tracking-wider">
                {language === 'Tamil' ? 'எளிய தமிழ் விளக்கம்:' : 'Tamil Meaning:'}
              </span>
              <p className="font-inter leading-relaxed font-normal">
                {currentKural.tamExplain}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
              <span className="font-bold text-slate-500 block text-xs uppercase tracking-wider">
                English Meaning:
              </span>
              <p className="font-inter leading-relaxed italic">
                "{currentKural.engExplain}"
              </p>
            </div>
          </div>

          {/* Printable Study Notes */}
          <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-[#6D5EF7]">
              <FileText className="w-4 h-4" />
              <span>{language === 'Tamil' ? 'பாடக் குறிப்புகள்:' : 'Lesson Notes:'}</span>
            </div>
            <p className="font-inter whitespace-pre-line leading-relaxed">
              {currentKural.notes}
            </p>
          </div>

          {/* Previous & Next Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-indigo-100">
            <button
              onClick={handlePrev}
              disabled={currentKuralNum <= 1}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 text-xs font-bold border border-slate-200 hover:border-indigo-300 disabled:opacity-40 transition-all cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4 text-[#6D5EF7]" />
              <span>{language === 'Tamil' ? 'முந்தைய குறள்' : 'Previous'}</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-500">
              {currentKuralNum} / 1330
            </span>

            <button
              onClick={handleNext}
              disabled={currentKuralNum >= 1330}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#6D5EF7] text-white text-xs font-bold hover:bg-indigo-600 disabled:opacity-40 transition-all cursor-pointer shadow-md"
            >
              <span>{language === 'Tamil' ? 'அடுத்த குறள்' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
