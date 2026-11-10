import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { LanguageType } from '../types';

interface HeroSectionProps {
  onGetStarted: () => void;
  onWatchDemo: () => void;
  language: LanguageType;
}

export const HERO_BACKGROUND_IMAGES = [
  '/images/mobile_learning_student_1.png',
  '/images/mobile_learning_parent_child.png',
  '/images/hero_ai_tablet_study.png',
  '/images/hero_online_laptop_learning.png',
  'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=1400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1400&auto=format&fit=crop&q=80'
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onWatchDemo,
  language
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background auto-slide every 4 seconds with smooth fade, no slider controls/dots/counters
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col justify-center items-center pt-24 pb-20 overflow-hidden bg-slate-950 text-white">
      
      {/* High Quality HD Background Image Slider (Low Overlay Opacity for High Visibility) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={HERO_BACKGROUND_IMAGES[currentBgIndex]}
              alt="Learning platform background"
              className="w-full h-full object-cover object-center filter brightness-105 saturate-110"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Soft overlay ensuring images shine through while text remains 100% readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/85 z-0 pointer-events-none" />
      </div>

      {/* Ambient background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#6D5EF7]/30 via-[#8B7CFF]/20 to-purple-600/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-10 -right-20 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Top Board Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full glass-dark text-indigo-100 border border-indigo-400/40 text-xs font-semibold mb-8 shadow-glow backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span>
            {language === 'Tamil'
              ? 'சிபிஎஸ்இ • தமிழ்நாடு ஸ்டேட் போர்டு • ஐசிஎஸ்இ — வகுப்புகள் 1 முதல் 12 வரை'
              : 'CBSE • Tamil Nadu State Board • ICSE — Classes 1 to 12'}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </motion.div>

        {/* Exact Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-poppins tracking-tight leading-[1.15] max-w-4xl drop-shadow-lg"
        >
          {language === 'Tamil' ? (
            <>
              கற்றலின் எதிர்காலம் <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8FD3FE] via-[#C4B5FD] to-[#8B7CFF]">
                இங்கே தொடங்குகிறது
              </span>
            </>
          ) : (
            <>
              The Future of Learning <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8FD3FE] via-[#C4B5FD] to-[#8B7CFF]">
                Starts Here
              </span>
            </>
          )}
        </motion.h1>

        {/* Exact Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-slate-200 font-inter text-lg sm:text-2xl max-w-2xl font-light leading-relaxed drop-shadow-md"
        >
          {language === 'Tamil' ? (
            <>
              வகுப்பு 1 முதல் 12 வரை மாணவர்களுக்கான <span className="text-indigo-300 font-semibold font-poppins">AI-ஆதரித்த கற்றல் தளம்</span> <br />
              தமிழ் மற்றும் ஆங்கில வழியில் கிடைக்கிறது
            </>
          ) : (
            <>
              AI-Powered Learning Platform for <span className="text-indigo-300 font-semibold font-poppins">Classes 1–12</span> <br />
              Available in Tamil & English
            </>
          )}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 rounded-[22px] bg-gradient-to-r from-[#6D5EF7] via-[#8B7CFF] to-indigo-600 text-white font-poppins font-semibold text-base shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>{language === 'Tamil' ? 'தொடங்கவும்' : 'Get Started'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onWatchDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-[22px] glass-dark text-white font-poppins font-semibold text-base border border-slate-700 hover:border-slate-500 hover:bg-slate-800/80 transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-300">
              <Play className="w-4 h-4 fill-amber-300 ml-0.5" />
            </div>
            <span>{language === 'Tamil' ? 'டெமோ பார்க்கவும்' : 'Watch Demo'}</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
