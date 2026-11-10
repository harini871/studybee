import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, CheckCircle2, Bot, Video, HelpCircle, FileText } from 'lucide-react';
import { LanguageType } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
  language: LanguageType;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  onGetStarted,
  language
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 text-white rounded-[22px] max-w-3xl w-full border border-white/10 shadow-2xl overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 font-bold"
          >
            ✕
          </button>

          {/* Video / Interactive Tour Banner */}
          <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-8 text-center border-b border-white/10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 animate-pulse">
              <Play className="w-8 h-8 fill-white ml-1" />
            </div>

            <h3 className="text-2xl font-extrabold font-poppins text-white">
              {language === 'Tamil' ? 'StudyBee 2026 செயல்விளக்கம்' : 'StudyBee Product Walkthrough'}
            </h3>
            <p className="text-xs text-slate-300 max-w-md mt-2 font-inter">
              Watch how our Gemini-powered AI Tutor breaks down complex Math & Science problems step-by-step in Tamil & English.
            </p>
          </div>

          {/* Key Walkthrough Points */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/90 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-300 font-bold font-poppins">
                <Bot className="w-4 h-4" />
                <span>1. AI Doubt Solver</span>
              </div>
              <p className="text-slate-400">Snap photos or ask doubts in Tamil script with instant math formulas.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center space-x-1.5 text-cyan-300 font-bold font-poppins">
                <Video className="w-4 h-4" />
                <span>2. Bilingual HD Lessons</span>
              </div>
              <p className="text-slate-400">CBSE, State Board & ICSE lessons with AI-generated summary key points.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-300 font-bold font-poppins">
                <HelpCircle className="w-4 h-4" />
                <span>3. Duolingo Gamification</span>
              </div>
              <p className="text-slate-400">Timed MCQs, streak badges, XP points, and statewide leaderboard.</p>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs text-slate-400 font-inter">
              Available for Classes 1 to 12
            </div>

            <button
              onClick={() => {
                onClose();
                onGetStarted();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white font-poppins font-semibold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              Start Free Trial Now
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
