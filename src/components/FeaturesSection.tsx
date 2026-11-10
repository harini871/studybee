import React from 'react';
import { motion } from 'motion/react';
import { Bot, HelpCircle, Video, FileText, TrendingUp, BookMarked, Award, MessageSquareCode, Sparkles } from 'lucide-react';
import { LanguageType } from '../types';

interface FeaturesSectionProps {
  onSelectFeature: (featureKey: string) => void;
  language: LanguageType;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onSelectFeature,
  language
}) => {
  const features = [
    {
      key: 'doubt-solver',
      icon: Bot,
      title: language === 'Tamil' ? 'AI ஆசிரியர்' : 'AI Tutor',
      description: language === 'Tamil' ? '24/7 பாடச் சந்தேகங்களை உடனடி விளக்கங்களுடன் கேட்கலாம்.' : 'Instant, step-by-step doubt resolution tailored to CBSE, State Board & ICSE.',
      gradient: 'from-[#6D5EF7] to-[#8B7CFF]',
      badge: '2026 Gemini AI'
    },
    {
      key: 'quizzes',
      icon: HelpCircle,
      title: language === 'Tamil' ? 'பயிற்சி வினாடிவினா' : 'Interactive Quizzes',
      description: language === 'Tamil' ? 'டைமர் மற்றும் உடனடி மதிப்பெண் விளக்கங்களுடன் கூடிய வினாடி வினா.' : 'Timed MCQs, Duolingo-style streak rewards, and deep concept explanations.',
      gradient: 'from-[#10B981] to-[#34D399]',
      badge: 'Duolingo Style'
    },
    {
      key: 'videos',
      icon: Video,
      title: language === 'Tamil' ? 'பாட வீடியோக்கள்' : 'Lesson Videos',
      description: language === 'Tamil' ? 'HD தரத்திலான வீடியோக்கள் மற்றும் AI முக்கிய குறிப்புகள்.' : 'Bilingual HD visual lectures with AI key takeaway generators.',
      gradient: 'from-[#0EA5E9] to-[#38BDF8]',
      badge: 'HD Quality'
    },
    {
      key: 'pdfs',
      icon: FileText,
      title: language === 'Tamil' ? 'புத்தகங்கள் & PDFs' : 'Books & PDFs',
      description: language === 'Tamil' ? 'அனைத்துப் பாடப் புத்தகங்களும் டிஜிட்டல் வடிவில். ஹைலைட் வசதியுடன்.' : 'NCERT and Tamil Nadu State Board digital textbooks with PDF highlighter and dark mode.',
      gradient: 'from-[#EC4899] to-[#F472B6]',
      badge: 'Textbooks'
    },
    {
      key: 'progress',
      icon: TrendingUp,
      title: language === 'Tamil' ? 'முன்னேற்றக் கண்காணிப்பு' : 'Progress Tracking',
      description: language === 'Tamil' ? 'தினசரி படிப்பு நேரம், செயல்திறன் வரைபடங்கள்.' : 'Visual study time analytics, subject proficiency heatmaps, and exam goals.',
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      badge: 'Analytics'
    },
    {
      key: 'notes',
      icon: BookMarked,
      title: language === 'Tamil' ? 'பாடக் குறிப்புகள்' : 'Smart Notes',
      description: language === 'Tamil' ? 'வண்ணக் குறியீட்டுடன் கூடிய பாடக் குறிப்புகள் மற்றும் AI சுருக்கம்.' : 'Color-coded revision notes, bookmarking, and automated AI cheat-sheets.',
      gradient: 'from-[#8B5CF6] to-[#A78BFA]',
      badge: 'Color Coded'
    },
    {
      key: 'tests',
      icon: Award,
      title: language === 'Tamil' ? 'மாதிரித் தேர்வுகள்' : 'Practice Tests',
      description: language === 'Tamil' ? 'அத்தியாயம் வாரியாக மாதிரி வினாத்தாள்கள் மற்றும் முந்தைய ஆண்டு வினாக்கள்.' : 'Chapter-wise mock exams, board question papers, and score predictor.',
      gradient: 'from-[#EF4444] to-[#F87171]',
      badge: 'Exam Ready'
    },
    {
      key: 'chat',
      icon: MessageSquareCode,
      title: language === 'Tamil' ? 'கேள்வி பதில் கரைப்பான்' : 'Doubt Solver',
      description: language === 'Tamil' ? 'புகைப்படம் எடுத்து பதிவேற்றி சந்தேகங்களைத் தீர்க்கலாம்.' : 'Snap photos of textbook questions or dictate voice doubts in Tamil/English.',
      gradient: 'from-[#14B8A6] to-[#2DD4BF]',
      badge: 'Photo & Voice'
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#6D5EF7] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'Tamil' ? 'சிறப்பம்சங்கள்' : 'Engineered for Excellence'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-slate-900 tracking-tight">
            {language === 'Tamil' ? 'உயர்நிலை கற்றல் கருவிகள்' : 'Everything You Need to Ace Your Exams'}
          </h2>
          <p className="mt-4 text-slate-600 font-inter text-base">
            {language === 'Tamil'
              ? 'BYJU\'S, Khan Academy, Duolingo மற்றும் ChatGPT ஆகியவற்றின் சிறந்த அம்சங்களின் சேர்க்கை.'
              : 'Combining the interactive gamification of Duolingo, clarity of Khan Academy, and power of AI.'}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => onSelectFeature(feat.key)}
                className="group relative bg-white p-6 rounded-[22px] border border-slate-200/80 shadow-soft hover:shadow-glow hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feat.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-inter">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-poppins text-slate-900 group-hover:text-[#6D5EF7] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 font-inter leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#6D5EF7] group-hover:translate-x-1 transition-transform">
                  <span>{language === 'Tamil' ? 'திறக்குக' : 'Explore Feature'}</span>
                  <span>→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
