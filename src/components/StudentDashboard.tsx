import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { UserProfile, LanguageType } from '../types';
import { MOCK_LEADERBOARD } from '../data/mockData';
import { Trophy, Play, Clock, Sparkles, TrendingUp, ArrowRight, Smartphone } from 'lucide-react';
import { ThirukkuralViewer } from './ThirukkuralViewer';

interface StudentDashboardProps {
  user: UserProfile;
  language: LanguageType;
  onNavigate: (view: string) => void;
  onOpenDoubtSolver: (prompt?: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  language,
  onNavigate
}) => {
  const [showThirukkural, setShowThirukkural] = useState(false);

  if (showThirukkural) {
    return <ThirukkuralViewer onBack={() => setShowThirukkural(false)} language={language} />;
  }

  // Filter Leaderboard strictly by the logged-in student's Educational Board (No mixing of boards!)
  const boardLeaderboard = MOCK_LEADERBOARD.filter((entry) => entry.board === user.board);

  const studyTimeData = [
    { day: language === 'Tamil' ? 'திங்கள்' : 'Mon', minutes: 45 },
    { day: language === 'Tamil' ? 'செவ்வாய்' : 'Tue', minutes: 60 },
    { day: language === 'Tamil' ? 'புதன்' : 'Wed', minutes: 75 },
    { day: language === 'Tamil' ? 'வியாழன்' : 'Thu', minutes: 50 },
    { day: language === 'Tamil' ? 'வெள்ளி' : 'Fri', minutes: 90 },
    { day: language === 'Tamil' ? 'சனி' : 'Sat', minutes: 120 },
    { day: language === 'Tamil' ? 'ஞாயிறு' : 'Sun', minutes: 80 }
  ];

  const subjectPerformanceData = [
    { subject: language === 'Tamil' ? 'கணிதம்' : 'Maths', score: 88 },
    { subject: language === 'Tamil' ? 'அறிவியல்' : 'Science', score: 92 },
    { subject: language === 'Tamil' ? 'ஆங்கிலம்' : 'English', score: 95 },
    { subject: language === 'Tamil' ? 'தமிழ்' : 'Tamil', score: 90 },
    { subject: language === 'Tamil' ? 'சமூக அறிவியல்' : 'Social', score: 84 }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-[24px] text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold border border-white/10">
              <Smartphone className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {language === 'Tamil' ? user.className.replace('Class ', 'வகுப்பு ') : user.className} • {user.board === 'State Board' ? (language === 'Tamil' ? 'தமிழ்நாடு அரசு' : 'TN State Board') : user.board} • {user.preferredLanguage === 'Tamil' ? 'தமிழ் வழி' : 'English Medium'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-poppins tracking-tight">
              {language === 'Tamil' ? `நல்வரவு, ${user.name}!` : `Welcome back, ${user.name}! 🐝`}
            </h1>

            <p className="text-slate-300 font-inter text-sm max-w-xl">
              {language === 'Tamil'
                ? 'உங்கள் மொபைல் போன் மூலம் இன்றைய பாடங்களைப் படித்து தொடர் தேர்ச்சி பெறுங்கள்.'
                : 'Learn on your smartphone with instant AI tutor assistance and 1330 Thirukkurals.'}
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
                🔥
              </div>
              <div>
                <div className="text-xl font-bold font-poppins">{user.streak} {language === 'Tamil' ? 'நாட்கள்' : 'Days'}</div>
                <div className="text-[10px] text-slate-300 font-semibold uppercase">{language === 'Tamil' ? 'தொடர் கற்றல்' : 'Daily Streak'}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-2xl font-bold">
                ⚡
              </div>
              <div>
                <div className="text-xl font-bold font-poppins">{user.xp} XP</div>
                <div className="text-[10px] text-slate-300 font-semibold uppercase">{language === 'Tamil' ? 'மொத்த புள்ளிகள்' : 'Total XP Points'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Continue Learning Banner */}
          <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white flex items-center justify-center text-3xl font-bold shadow-md shrink-0">
                📐
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#6D5EF7] uppercase tracking-wider">
                  {language === 'Tamil' ? 'கணிதம் • அத்தியாயம் 1' : 'Mathematics • Chapter 1'}
                </span>
                <h3 className="text-lg font-bold font-poppins text-slate-900 mt-0.5">
                  {language === 'Tamil' ? 'மெய்யெண்கள் மற்றும் பல்லுறுப்புக் கோவைகள்' : 'Real Numbers & Polynomial Theorems'}
                </h3>
                <div className="flex items-center space-x-3 text-xs text-slate-500 mt-2 font-inter">
                  <div className="w-32 bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#6D5EF7] h-full rounded-full" style={{ width: '45%' }} />
                  </div>
                  <span>45% {language === 'Tamil' ? 'முடிந்தது' : 'Completed'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('lessons')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white font-poppins font-semibold text-xs shadow-md hover:scale-105 transition-all flex items-center justify-center space-x-2 cursor-pointer shrink-0"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{language === 'Tamil' ? 'தொடரவும்' : 'Continue Learning'}</span>
            </button>
          </div>

          {/* Performance Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Study Time Chart */}
            <div className="bg-white p-5 rounded-[22px] border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold font-poppins text-slate-900 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#6D5EF7]" />
                  <span>{language === 'Tamil' ? 'தினசரி படிப்பு நேரம் (நிமிடங்கள்)' : 'Daily Study Time (Mins)'}</span>
                </h4>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +20%
                </span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={studyTimeData}>
                    <defs>
                      <linearGradient id="studyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6D5EF7" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6D5EF7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#94A3B8" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#94A3B8" />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="minutes" stroke="#6D5EF7" strokeWidth={2} fillOpacity={1} fill="url(#studyGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Mastery Bar Chart */}
            <div className="bg-white p-5 rounded-[22px] border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold font-poppins text-slate-900 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'Tamil' ? 'பாடத் தேர்ச்சி (%)' : 'Subject Mastery (%)'}</span>
                </h4>
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  89%
                </span>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectPerformanceData}>
                    <XAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="#94A3B8" />
                    <YAxis tick={{ fontSize: 10 }} stroke="#94A3B8" />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                    <Bar dataKey="score" fill="#8B7CFF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Recommended Modules Grid with Dedicated Thirukkural 1330 Launcher (No Video Reference) */}
          <div className="bg-white p-6 rounded-[22px] border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-poppins text-slate-900">
                {language === 'Tamil' ? 'பரிந்துரைக்கப்பட்ட பாடங்கள்' : 'Recommended Lessons'}
              </h3>
              <button
                onClick={() => onNavigate('curriculum')}
                className="text-xs font-semibold text-[#6D5EF7] hover:underline"
              >
                {language === 'Tamil' ? 'அனைத்தும்' : 'View All'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Science Module */}
              <div
                onClick={() => onNavigate('lessons')}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer flex items-center space-x-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xl shrink-0">
                  🔬
                </div>
                <div>
                  <h4 className="text-xs font-bold font-poppins text-slate-900 group-hover:text-[#6D5EF7] transition-colors">
                    {language === 'Tamil' ? 'இயற்பியல் & வேதி வினைகள்' : 'Chemical Reactions & Redox'}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-inter mt-0.5">
                    {language === 'Tamil' ? 'அறிவியல் • பாடக் குறிப்புகள் + வினாடி வினா' : 'Science • Lesson Notes + Quiz'}
                  </p>
                </div>
              </div>

              {/* Thirukkural Interactive Card (No Video Mention) */}
              <div
                onClick={() => setShowThirukkural(true)}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300 hover:border-amber-500 transition-all cursor-pointer flex items-center space-x-3 group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-sm">
                  📜
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-poppins text-amber-950 group-hover:text-amber-700 transition-colors">
                      {language === 'Tamil' ? 'திருக்குறள் (1330 குறள்கள்)' : 'Thirukkural (1330 Couplets)'}
                    </h4>
                  </div>
                  <p className="text-[11px] text-amber-900/80 font-inter mt-0.5">
                    {language === 'Tamil' ? 'அறத்துப்பால் • 1330 குறள்கள் + பாடக் குறிப்புகள்' : 'Arathupal • 1330 Couplets + Notes'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Board-Specific Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Isolated Board-Wise Leaderboard Section */}
          <div className="bg-white p-5 rounded-[22px] border border-slate-200 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold font-poppins text-slate-900 flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>{language === 'Tamil' ? 'தரவரிசைப் பட்டியல்' : 'Leaderboard'}</span>
                </h3>
                <p className="text-[11px] font-semibold text-[#6D5EF7] font-inter mt-0.5">
                  {user.board === 'State Board' ? (language === 'Tamil' ? 'தமிழ்நாடு அரசுப் பாடத்திட்டம்' : 'TN State Board') : user.board}
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-indigo-50 text-[#6D5EF7]">
                {language === 'Tamil' ? 'உங்கள் வாரியம் மட்டும்' : 'Board Isolated'}
              </span>
            </div>

            <div className="space-y-3">
              {boardLeaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    entry.isCurrentUser ? 'bg-indigo-50 border-[#6D5EF7] font-bold shadow-xs' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-500">#{entry.rank}</span>
                    <span className="text-lg">{entry.avatar}</span>
                    <div>
                      <div className="font-poppins font-bold text-slate-900">
                        {language === 'Tamil' ? (entry.tamilName || entry.name) : entry.name} {entry.isCurrentUser && (language === 'Tamil' ? '(நீங்கள்)' : '(You)')}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {language === 'Tamil' ? (entry.tamilClassName || entry.className.replace('Class ', 'வகுப்பு ')) : entry.className}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-[#6D5EF7]">{entry.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thirukkural Quick Launcher Widget in Sidebar */}
          <div 
            onClick={() => setShowThirukkural(true)}
            className="bg-gradient-to-tr from-amber-600 to-amber-500 p-5 rounded-[22px] text-white shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-100 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'Tamil' ? 'திருக்குறள் 1330 களஞ்சியம்' : 'Thirukkural 1330 Library'}</span>
            </div>
            <p className="text-xs text-amber-50 font-inter leading-relaxed">
              {language === 'Tamil'
                ? 'அறத்துப்பால், பொருட்பால், இன்பத்துப்பால் - 1330 குறள்கள் எளிய தெளிவுரையுடன்.'
                : 'Explore all 1330 Thirukkurals with clear explanations and notes.'}
            </p>
            <div className="mt-3 flex items-center justify-between text-xs font-bold text-amber-950 bg-white/90 px-3 py-2 rounded-xl">
              <span>{language === 'Tamil' ? 'குறள்கள் படிக்க' : 'Browse All 1330 Kurals'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
