import React, { useState } from 'react';
import { UserProfile, BoardType, LanguageType, SubjectItem } from './types';
import { MOCK_LESSONS, SUBJECTS_DATA } from './data/mockData';

// Component Imports
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { BoardSelection } from './components/BoardSelection';
import { LanguageSelection } from './components/LanguageSelection';
import { ClassSelection } from './components/ClassSelection';
import { SubjectPage } from './components/SubjectPage';
import { LessonPage } from './components/LessonPage';
import { AIDoubtSolver } from './components/AIDoubtSolver';
import { StudentDashboard } from './components/StudentDashboard';
import { SignUpPage } from './components/SignUpPage';
import { LoginPage } from './components/LoginPage';
import { ProfilePage } from './components/ProfilePage';
import { DemoModal } from './components/DemoModal';
import { Footer } from './components/Footer';
import { Award, Trophy } from 'lucide-react';
import { MOCK_LEADERBOARD } from './data/mockData';

export default function App() {
  // Global User State
  const [user, setUser] = useState<UserProfile | null>(null);

  // Current Main View
  const [currentView, setCurrentView] = useState<string>('home');
  const [globalLanguage, setGlobalLanguage] = useState<LanguageType>('English');

  // Curriculum Selection Steps State
  const [curriculumStep, setCurriculumStep] = useState<'board' | 'language' | 'class' | 'subjects' | 'lessons'>('board');
  const [selectedBoard, setSelectedBoard] = useState<BoardType | null>('State Board');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('English');
  const [selectedClass, setSelectedClass] = useState<string | null>('Class 10');
  const [selectedSubject, setSelectedSubject] = useState<SubjectItem | null>(SUBJECTS_DATA[0]);

  // Demo Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [doubtSolverInitialPrompt, setDoubtSolverInitialPrompt] = useState<string | undefined>(undefined);

  // Language Toggle Handler
  const handleToggleGlobalLanguage = () => {
    const nextLang = globalLanguage === 'English' ? 'Tamil' : 'English';
    setGlobalLanguage(nextLang);
    setSelectedLanguage(nextLang);
    if (user) {
      setUser({ ...user, preferredLanguage: nextLang });
    }
  };

  // Sign Up Handler
  const handleSignUpSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    setSelectedBoard(newUser.board);
    setSelectedClass(newUser.className);
    setSelectedLanguage(newUser.preferredLanguage);
    setGlobalLanguage(newUser.preferredLanguage);
    // Take directly to personalized dashboard
    setCurrentView('dashboard');
  };

  // Login Handler
  const handleLoginSuccess = (email: string) => {
    const emailPrefix = email.split('@')[0] || 'Student';
    const formattedName = emailPrefix
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    const loggedUser: UserProfile = {
      id: `u-${Date.now()}`,
      name: formattedName,
      email,
      phone: '+91 98765 43210',
      board: selectedBoard || 'State Board',
      className: selectedClass || 'Class 10',
      preferredLanguage: globalLanguage,
      streak: 1,
      xp: 350,
      completedLessonIds: [],
      savedNoteIds: [],
      bookmarkedPdfIds: []
    };
    setUser(loggedUser);
    setSelectedBoard(loggedUser.board);
    setSelectedClass(loggedUser.className);
    setSelectedLanguage(loggedUser.preferredLanguage);
    setCurrentView('dashboard');
  };

  // Board Selected Handler
  const handleSelectBoard = (board: BoardType) => {
    setSelectedBoard(board);
    if (user) setUser({ ...user, board });
    setCurriculumStep('language');
  };

  // Language Selected Handler
  const handleSelectLanguage = (lang: LanguageType) => {
    setSelectedLanguage(lang);
    setGlobalLanguage(lang);
    if (user) setUser({ ...user, preferredLanguage: lang });
    setCurriculumStep('class');
  };

  // Class Selected Handler
  const handleSelectClass = (cls: string) => {
    setSelectedClass(cls);
    if (user) setUser({ ...user, className: cls });
    setCurriculumStep('subjects');
  };

  // Subject Selected Handler
  const handleSelectSubject = (subject: SubjectItem) => {
    setSelectedSubject(subject);
    setCurriculumStep('lessons');
  };

  // Feature Selection from Homepage
  const handleSelectFeature = (featureKey: string) => {
    if (featureKey === 'doubt-solver' || featureKey === 'chat') {
      setCurrentView('doubt-solver');
    } else if (featureKey === 'quizzes' || featureKey === 'videos' || featureKey === 'pdfs' || featureKey === 'notes') {
      setCurrentView('curriculum');
      setCurriculumStep('subjects');
    } else if (featureKey === 'progress') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('curriculum');
    }
  };

  // Open AI Doubt Solver with prompt
  const handleOpenDoubtSolverWithPrompt = (prompt?: string) => {
    setDoubtSolverInitialPrompt(prompt);
    setCurrentView('doubt-solver');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] font-sans flex flex-col justify-between selection:bg-[#C4B5FD] selection:text-[#1F2937]">
      
      {/* Fixed Top Navigation Bar */}
      <Navbar
        user={user}
        currentView={currentView}
        onNavigate={(v) => {
          setCurrentView(v);
          if (v === 'curriculum') setCurriculumStep('board');
        }}
        onToggleLanguage={handleToggleGlobalLanguage}
        language={globalLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        
        {/* VIEW 1: Landing Home Page */}
        {currentView === 'home' && (
          <div>
            <HeroSection
              onGetStarted={() => {
                if (user) {
                  setCurrentView('dashboard');
                } else {
                  setCurrentView('signup');
                }
              }}
              onWatchDemo={() => setIsDemoModalOpen(true)}
              language={globalLanguage}
            />

            <FeaturesSection
              onSelectFeature={handleSelectFeature}
              language={globalLanguage}
            />
          </div>
        )}

        {/* VIEW 2: Student Dashboard */}
        {currentView === 'dashboard' && (
          user ? (
            <StudentDashboard
              user={user}
              language={globalLanguage}
              onNavigate={(v) => {
                setCurrentView(v);
                if (v === 'curriculum') setCurriculumStep('subjects');
              }}
              onOpenDoubtSolver={handleOpenDoubtSolverWithPrompt}
            />
          ) : (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToSignUp={() => setCurrentView('signup')}
              language={globalLanguage}
            />
          )
        )}

        {/* VIEW 3: Interactive Curriculum Steps */}
        {currentView === 'curriculum' && (
          <div className="px-4 py-6">
            
            {/* Step Navigation Indicator */}
            <div className="max-w-4xl mx-auto mb-8 bg-white p-3 rounded-full border border-slate-200/80 shadow-xs flex items-center justify-around text-xs font-semibold">
              <button
                onClick={() => setCurriculumStep('board')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  curriculumStep === 'board' ? 'bg-[#6D5EF7] text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                {globalLanguage === 'Tamil' ? '1. வாரியம்' : '1. Board'}
              </button>
              <button
                onClick={() => setCurriculumStep('language')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  curriculumStep === 'language' ? 'bg-[#6D5EF7] text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                {globalLanguage === 'Tamil' ? '2. மொழி' : '2. Language'}
              </button>
              <button
                onClick={() => setCurriculumStep('class')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  curriculumStep === 'class' ? 'bg-[#6D5EF7] text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                {globalLanguage === 'Tamil' ? '3. வகுப்பு' : '3. Class'}
              </button>
              <button
                onClick={() => setCurriculumStep('subjects')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  curriculumStep === 'subjects' ? 'bg-[#6D5EF7] text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                {globalLanguage === 'Tamil' ? '4. பாடங்கள்' : '4. Subjects'}
              </button>
            </div>

            {curriculumStep === 'board' && (
              <BoardSelection
                selectedBoard={selectedBoard}
                onSelectBoard={handleSelectBoard}
                language={globalLanguage}
              />
            )}

            {curriculumStep === 'language' && (
              <LanguageSelection
                selectedLanguage={selectedLanguage}
                onSelectLanguage={handleSelectLanguage}
                language={globalLanguage}
              />
            )}

            {curriculumStep === 'class' && (
              <ClassSelection
                selectedClass={selectedClass}
                onSelectClass={handleSelectClass}
                language={globalLanguage}
              />
            )}

            {curriculumStep === 'subjects' && (
              <SubjectPage
                className={selectedClass || 'Class 10'}
                board={selectedBoard || 'CBSE'}
                onSelectSubject={handleSelectSubject}
                language={globalLanguage}
              />
            )}

            {curriculumStep === 'lessons' && selectedSubject && (
              <LessonPage
                subject={selectedSubject}
                className={selectedClass || 'Class 10'}
                board={selectedBoard || 'CBSE'}
                lessons={MOCK_LESSONS[selectedSubject.id] || MOCK_LESSONS['maths']}
                language={globalLanguage}
                onOpenDoubtSolver={handleOpenDoubtSolverWithPrompt}
                onBackToSubjects={() => setCurriculumStep('subjects')}
              />
            )}
          </div>
        )}

        {/* VIEW 4: AI Doubt Solver */}
        {currentView === 'doubt-solver' && (
          <AIDoubtSolver
            initialPrompt={doubtSolverInitialPrompt}
            language={globalLanguage}
            board={user?.board || 'CBSE'}
            className={user?.className || 'Class 10'}
            onLanguageChange={(lang) => setGlobalLanguage(lang)}
          />
        )}

        {/* VIEW 6: Sign Up Page */}
        {currentView === 'signup' && (
          <SignUpPage
            onSignUpSuccess={handleSignUpSuccess}
            onNavigateToLogin={() => setCurrentView('login')}
            language={globalLanguage}
          />
        )}

        {/* VIEW 7: Login Page */}
        {currentView === 'login' && (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignUp={() => setCurrentView('signup')}
            language={globalLanguage}
          />
        )}

        {/* VIEW 8: Profile Page */}
        {currentView === 'profile' && (
          user ? (
            <ProfilePage
              user={user}
              language={globalLanguage}
              onUpdateProfile={(updated) => setUser({ ...user, ...updated })}
              onLogout={() => {
                setUser(null);
                setCurrentView('home');
              }}
            />
          ) : (
            <LoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateToSignUp={() => setCurrentView('signup')}
              language={globalLanguage}
            />
          )
        )}

      </main>

      {/* Product Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onGetStarted={() => {
          if (user) {
            setCurrentView('dashboard');
          } else {
            setCurrentView('signup');
          }
        }}
        language={globalLanguage}
      />

      {/* Minimal Footer */}
      <Footer
        language={globalLanguage}
        onNavigate={setCurrentView}
      />

    </div>
  );
}
