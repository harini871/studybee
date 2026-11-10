import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, BoardType, LanguageType } from '../types';
import { User, GraduationCap, Globe, Award, Settings, LogOut, CheckCircle2, FileText, Download, Eye, Sparkles, RefreshCcw } from 'lucide-react';

interface ProfilePageProps {
  user: UserProfile;
  language: LanguageType;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  language,
  onUpdateProfile,
  onLogout
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardType>(user.board);
  const [selectedClass, setSelectedClass] = useState(user.className);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(user.preferredLanguage);
  
  // Certificate view modal
  const [viewCertificate, setViewCertificate] = useState<string | null>(null);

  const classesList = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

  const handleSaveCurriculumChange = () => {
    onUpdateProfile({
      board: selectedBoard,
      className: selectedClass,
      preferredLanguage: selectedLanguage
    });
    setShowEditModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-[22px] border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
          
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-indigo-500/20">
            {user.name.charAt(0)}
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-extrabold font-poppins text-slate-900">{user.name}</h2>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-[#6D5EF7]">
                {user.className}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-inter mt-1">
              {user.email} • {user.phone || '+91 98765 43210'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                Board: {user.board}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                Medium: {user.preferredLanguage}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700">
                🔥 {user.streak} Days Streak
              </span>
            </div>
          </div>
        </div>

        {/* Change Board/Class Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowEditModal(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold font-poppins hover:bg-slate-200 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Change Board / Class</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold font-poppins hover:bg-rose-100 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="bg-white p-6 rounded-[22px] border border-slate-200/80 shadow-soft">
        <h3 className="text-lg font-bold font-poppins text-slate-900 mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>Earned Course Certificates</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-white flex items-center justify-center font-bold text-lg">
                📜
              </div>
              <div>
                <h4 className="text-xs font-bold font-poppins text-slate-900">
                  {user.className} Mathematics Foundations
                </h4>
                <p className="text-[10px] text-slate-500">Issued: Aug 2026 • StudyBee Academic Board</p>
              </div>
            </div>

            <button
              onClick={() => setViewCertificate('Mathematics Foundations')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-[11px] font-bold hover:bg-amber-600 flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#6D5EF7] text-white flex items-center justify-center font-bold text-lg">
                🧬
              </div>
              <div>
                <h4 className="text-xs font-bold font-poppins text-slate-900">
                  Science & Technology AI Master
                </h4>
                <p className="text-[10px] text-slate-500">Issued: Jul 2026 • StudyBee Academic Board</p>
              </div>
            </div>

            <button
              onClick={() => setViewCertificate('Science & Technology AI Master')}
              className="px-3 py-1.5 rounded-lg bg-[#6D5EF7] text-white text-[11px] font-bold hover:opacity-90 flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Change Board / Class / Language Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-6 sm:p-8 rounded-[22px] max-w-md w-full shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>

              <h3 className="text-lg font-bold font-poppins text-slate-900">
                Update Board, Class & Language
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Board / Curriculum
                  </label>
                  <select
                    value={selectedBoard}
                    onChange={e => setSelectedBoard(e.target.value as BoardType)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <option value="State Board">Tamil Nadu State Board</option>
                    <option value="CBSE">CBSE (NCERT)</option>
                    <option value="ICSE">ICSE / CISCE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Grade / Class
                  </label>
                  <select
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    {classesList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Medium
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value as LanguageType)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <option value="English">English Medium</option>
                    <option value="Tamil">தமிழ் Medium</option>
                  </select>
                </div>

                <button
                  onClick={handleSaveCurriculumChange}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6D5EF7] to-[#8B7CFF] text-white text-xs font-bold font-poppins"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Printable Certificate Modal */}
      <AnimatePresence>
        {viewCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 sm:p-12 rounded-[22px] max-w-2xl w-full border-8 border-indigo-100 shadow-2xl relative text-center space-y-4"
            >
              <button
                onClick={() => setViewCertificate(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>

              <div className="text-3xl font-bold font-poppins text-[#6D5EF7]">🐝 StudyBee Academic Board</div>
              <h2 className="text-2xl font-extrabold font-poppins text-slate-900 uppercase tracking-widest pt-2">
                Certificate of Academic Excellence
              </h2>

              <p className="text-xs text-slate-500 font-inter">This is proudly presented to</p>

              <div className="text-3xl font-extrabold font-poppins text-indigo-950 border-b-2 border-indigo-200 pb-2 inline-block px-8">
                {user.name}
              </div>

              <p className="text-xs text-slate-600 font-inter max-w-md mx-auto leading-relaxed pt-2">
                For outstanding performance and mastery in <span className="font-bold text-slate-900">{viewCertificate}</span> for <span className="font-bold text-slate-900">{user.className} ({user.board})</span>.
              </p>

              <div className="pt-6 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 font-inter">
                <div>Date: Aug 05, 2026</div>
                <div>Certificate ID: STB-2026-9941</div>
                <div>Authorized Signatory</div>
              </div>

              <button
                onClick={() => window.print()}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold font-poppins hover:bg-slate-800"
              >
                Print / Download PDF Certificate
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
