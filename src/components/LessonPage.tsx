import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { LessonItem, SubjectItem, NoteItem, QuizQuestion, LanguageType } from '../types';
import { Play, FileText, BookMarked, HelpCircle, Bot, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, Download, ZoomIn, ZoomOut, Moon, Sun, Highlighter, Search, Plus, Clock, Trophy, RefreshCw, Upload, AlertCircle, Share2, Volume2, ArrowLeft } from 'lucide-react';

interface LessonPageProps {
  subject: SubjectItem;
  className: string;
  board: string;
  lessons: LessonItem[];
  language: LanguageType;
  onOpenDoubtSolver: (topicPrompt: string) => void;
  onBackToSubjects: () => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  subject,
  className,
  board,
  lessons,
  language,
  onOpenDoubtSolver,
  onBackToSubjects
}) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'notes' | 'quiz' | 'ai-tutor'>('video');

  // Video State
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(25);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // PDF Viewer State
  const [pdfZoom, setPdfZoom] = useState(100);
  const [isPdfDarkMode, setIsPdfDarkMode] = useState(false);
  const [isPdfBookmarked, setIsPdfBookmarked] = useState(false);
  const [customPdfName, setCustomPdfName] = useState<string | null>(null);

  // Notes State
  const [notesList, setNotesList] = useState<NoteItem[]>(lessons[0]?.notes || []);
  const [noteSearch, setNoteSearch] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteColor, setNewNoteColor] = useState<'purple' | 'blue' | 'emerald' | 'amber' | 'rose'>('purple');
  const [showAddNote, setShowAddNote] = useState(false);

  // Quiz State
  const currentLesson = lessons[selectedLessonIndex] || lessons[0];
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(currentLesson?.quiz || []);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [quizTimer, setQuizTimer] = useState(30);

  // Sync lesson notes/quiz when switching lessons
  const handleSelectLesson = (idx: number) => {
    setSelectedLessonIndex(idx);
    setNotesList(lessons[idx]?.notes || []);
    setQuizQuestions(lessons[idx]?.quiz || []);
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setQuizAnswers({});
    setIsQuizSubmitted(false);
    setAiSummary(null);
    setCustomPdfName(null);
  };

  // Generate AI Summary using Gemini API backend
  const handleGenerateAISummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentLesson.title,
          lessonTitle: currentLesson.title,
          language
        })
      });
      const data = await res.json();
      if (data.summary) {
        setAiSummary(data.summary);
      } else {
        setAiSummary(`### AI Summary for ${currentLesson.title}\n- Key Concept: Master fundamental formulas and laws.\n- Exam Focus: Pay attention to step-by-step derivations.`);
      }
    } catch (e) {
      setAiSummary(`### AI Summary for ${currentLesson.title}\n- Core Theme: Key conceptual points for ${className} ${subject.title}.`);
    } finally {
      setLoadingSummary(false);
    }
  };

  // Custom PDF Upload Handler
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomPdfName(e.target.files[0].name);
    }
  };

  // Add Note Handler
  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;
    const newNote: NoteItem = {
      id: `n-${Date.now()}`,
      title: newNoteTitle,
      content: newNoteContent,
      colorTag: newNoteColor,
      topic: currentLesson.title,
      createdAt: new Date().toISOString().split('T')[0],
      isBookmarked: false
    };
    setNotesList([newNote, ...notesList]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNote(false);
  };

  // Quiz Option Click
  const handleSelectQuizOption = (optIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedOption(optIdx);
    setQuizAnswers({ ...quizAnswers, [currentQuizIdx]: optIdx });
  };

  // Submit Quiz
  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);

    // Calculate score
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswerIndex) score++;
    });

    if (score >= quizQuestions.length * 0.7) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const filteredNotes = notesList.filter(
    n => n.title.toLowerCase().includes(noteSearch.toLowerCase()) || n.content.toLowerCase().includes(noteSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackToSubjects}
          className="flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-[#6D5EF7] bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'Tamil' ? 'பாடங்களுக்குத் திரும்புக' : 'Back to Subjects'}</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 font-inter">
          <span>{board}</span>
          <span>/</span>
          <span>{language === 'Tamil' ? `வகுப்பு ${parseInt(className.replace('Class ', '').replace('வகுப்பு ', ''), 10) || 10}` : className}</span>
          <span>/</span>
          <span className="font-bold text-slate-800">{language === 'Tamil' && subject.tamilTitle ? subject.tamilTitle : subject.title}</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Chapter / Lesson Sidebar List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-5 rounded-[22px] border border-slate-200/80 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold font-poppins text-slate-900">
                {language === 'Tamil' ? 'பாட அத்தியாயங்கள்' : 'Chapter Lessons'}
              </h3>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#6D5EF7]">
                {lessons.length} {language === 'Tamil' ? 'அத்தியாயங்கள்' : 'Lessons'}
              </span>
            </div>

            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
              {lessons.map((les, idx) => {
                const isActive = idx === selectedLessonIndex;
                return (
                  <div
                    key={les.id}
                    onClick={() => handleSelectLesson(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50/90 to-purple-50/90 border-[#6D5EF7] shadow-sm'
                        : 'bg-slate-50/60 border-slate-200/60 hover:bg-white hover:border-indigo-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isActive ? 'bg-[#6D5EF7] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {les.chapterNumber}
                      </div>

                      <div>
                        <div className="text-xs font-bold font-poppins text-slate-900 line-clamp-1">
                          {language === 'Tamil' && les.tamilTitle ? les.tamilTitle : les.title}
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-inter mt-0.5">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{les.duration}</span>
                          </span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">{language === 'Tamil' ? 'செயல்முறை பாடம்' : 'Interactive'}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#6D5EF7]' : 'text-slate-400'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick AI Doubt Launcher Box */}
          <div className="bg-gradient-to-tr from-[#6D5EF7] to-[#8B7CFF] p-5 rounded-[22px] text-white shadow-md relative overflow-hidden">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{language === 'Tamil' ? 'AI சந்தேக நிவர்த்தி' : 'StudyBee AI Assistant'}</span>
            </div>
            <p className="text-xs text-indigo-100 font-inter leading-relaxed">
              {language === 'Tamil'
                ? 'இந்த பாடத்தில் சந்தேகம் உள்ளதா? தமிழ் அல்லது ஆங்கிலத்தில் நேரடியாகக் கேட்கவும்.'
                : 'Have questions about this chapter? Ask StudyBee AI Tutor right away!'}
            </p>
            <button
              onClick={() => onOpenDoubtSolver(`Help me understand Chapter ${currentLesson.chapterNumber}: ${currentLesson.title}`)}
              className="mt-3 w-full py-2.5 rounded-xl bg-white text-[#6D5EF7] text-xs font-bold hover:bg-indigo-50 transition-colors shadow-sm flex items-center justify-center space-x-2 cursor-pointer font-poppins"
            >
              <Bot className="w-4 h-4" />
              <span>{language === 'Tamil' ? 'AI-யிடம் கேட்கவும்' : 'Ask AI Doubt Solver'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Lesson Workspace */}
        <div className="lg:col-span-8 bg-white p-6 rounded-[22px] border border-slate-200/80 shadow-soft flex flex-col justify-between">
          
          <div>
            {/* Lesson Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D5EF7]">
                  {language === 'Tamil' ? `அத்தியாயம் ${currentLesson.chapterNumber}` : `Chapter ${currentLesson.chapterNumber}`}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-poppins text-slate-900 mt-0.5">
                  {language === 'Tamil' && currentLesson.tamilTitle ? currentLesson.tamilTitle : currentLesson.title}
                </h2>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto overflow-x-auto">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-inter transition-all ${
                    activeTab === 'video' ? 'bg-white text-[#6D5EF7] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{language === 'Tamil' ? 'காணொளி' : 'Video'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('pdf')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-inter transition-all ${
                    activeTab === 'pdf' ? 'bg-white text-[#6D5EF7] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'Tamil' ? 'பாடநூல் PDF' : 'Textbook PDF'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-inter transition-all ${
                    activeTab === 'notes' ? 'bg-white text-[#6D5EF7] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>{language === 'Tamil' ? 'குறிப்புகள்' : 'Notes'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-inter transition-all ${
                    activeTab === 'quiz' ? 'bg-white text-[#6D5EF7] shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{language === 'Tamil' ? 'வினாடி வினா' : 'Quiz'}</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: Video Player */}
            {activeTab === 'video' && (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-lg group">
                  <video
                    src={currentLesson.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>

                {/* Video Controls & AI Summary Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <span className="text-xs font-semibold text-slate-700">{language === 'Tamil' ? 'முடிவடைந்தது:' : 'Completion:'}</span>
                    <div className="flex-1 sm:w-36 bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#6D5EF7] h-full rounded-full transition-all duration-300" style={{ width: '45%' }} />
                    </div>
                    <span className="text-xs font-bold text-[#6D5EF7]">45%</span>
                  </div>

                  <button
                    onClick={handleGenerateAISummary}
                    disabled={loadingSummary}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{loadingSummary ? (language === 'Tamil' ? 'AI பாடச் சுருக்கம் உருவாக்கப்படுகிறது...' : 'Generating AI Summary...') : (language === 'Tamil' ? 'AI பாடச் சுருக்கம் பெறுக' : 'AI Lesson Summary')}</span>
                  </button>
                </div>

                {/* AI Summary Display */}
                {aiSummary && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-slate-800 text-xs leading-relaxed space-y-2"
                  >
                    <div className="flex items-center justify-between font-bold text-indigo-900 font-poppins">
                      <span className="flex items-center space-x-1.5">
                        <Bot className="w-4 h-4 text-[#6D5EF7]" />
                        <span>AI Generated Lesson Key Takeaways</span>
                      </span>
                      <button onClick={() => setAiSummary(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                    </div>
                    <div className="whitespace-pre-line font-inter">{aiSummary}</div>
                  </motion.div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: Embedded PDF Viewer */}
            {activeTab === 'pdf' && (
              <div className="space-y-4">
                {/* PDF Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-700 font-poppins">
                      {customPdfName || currentLesson.pdfName || 'Textbook_Chapter.pdf'}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-[#6D5EF7] font-semibold">
                      Digital Edition
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPdfZoom(Math.max(75, pdfZoom - 15))}
                      className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-200 transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-semibold text-slate-600">{pdfZoom}%</span>
                    <button
                      onClick={() => setPdfZoom(Math.min(150, pdfZoom + 15))}
                      className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-200 transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setIsPdfDarkMode(!isPdfDarkMode)}
                      className="p-1.5 rounded-lg bg-white text-slate-700 hover:bg-slate-200 transition-colors"
                      title="Toggle Night Reader Mode"
                    >
                      {isPdfDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => setIsPdfBookmarked(!isPdfBookmarked)}
                      className={`p-1.5 rounded-lg bg-white transition-colors ${isPdfBookmarked ? 'text-indigo-600' : 'text-slate-700'}`}
                      title="Bookmark Page"
                    >
                      <BookMarked className="w-3.5 h-3.5" />
                    </button>

                    {/* Custom PDF Upload */}
                    <label className="p-1.5 rounded-lg bg-[#6D5EF7] text-white hover:opacity-90 transition-opacity cursor-pointer flex items-center space-x-1 px-2.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-semibold">Upload PDF</span>
                      <input type="file" accept=".pdf" onChange={handlePdfUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* PDF Content Frame Simulation */}
                <div
                  className={`p-8 rounded-2xl border min-h-[420px] transition-all flex flex-col justify-between ${
                    isPdfDarkMode ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-800 border-slate-200 shadow-inner'
                  }`}
                  style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-3 border-slate-200/40 text-xs text-slate-400">
                      <span>{board} Textbook Reader</span>
                      <span>Chapter {currentLesson.chapterNumber} • Page 1 of 14</span>
                    </div>

                    <h3 className="text-xl font-bold font-poppins">
                      {currentLesson.title}
                    </h3>

                    <p className="text-xs font-inter leading-relaxed">
                      {currentLesson.summaryText}
                    </p>

                    <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 text-slate-800 text-xs space-y-2">
                      <span className="font-bold text-[#6D5EF7]">High-Yield Board Question Note:</span>
                      <p>
                        Always define fundamental axioms before solving numerical equations in CBSE & State Board examinations. Diagrams carry 20% weightage.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200/40 flex items-center justify-between text-xs text-slate-400">
                    <span>Note: Provided by StudyBee Content Engine</span>
                    <button className="text-[#6D5EF7] font-semibold flex items-center space-x-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search notes..."
                      value={noteSearch}
                      onChange={e => setNoteSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs focus:outline-none focus:border-[#6D5EF7]"
                    />
                  </div>

                  <button
                    onClick={() => setShowAddNote(!showAddNote)}
                    className="px-4 py-2 rounded-xl bg-[#6D5EF7] text-white text-xs font-semibold hover:opacity-90 transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Note</span>
                  </button>
                </div>

                {showAddNote && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-slate-50 border border-indigo-200 space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Note Title..."
                      value={newNoteTitle}
                      onChange={e => setNewNoteTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold"
                    />
                    <textarea
                      placeholder="Write your study notes here..."
                      rows={3}
                      value={newNoteContent}
                      onChange={e => setNewNoteContent(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-slate-500 font-semibold">Tag Color:</span>
                        {(['purple', 'blue', 'emerald', 'amber', 'rose'] as const).map(color => (
                          <button
                            key={color}
                            onClick={() => setNewNoteColor(color)}
                            className={`w-5 h-5 rounded-full border-2 ${
                              newNoteColor === color ? 'border-slate-800 scale-110' : 'border-transparent'
                            } ${
                              color === 'purple' ? 'bg-purple-500' : color === 'blue' ? 'bg-blue-500' : color === 'emerald' ? 'bg-emerald-500' : color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={handleAddNote}
                        className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                      >
                        Save Note
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredNotes.map(note => (
                    <div
                      key={note.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          note.colorTag === 'purple' ? 'bg-purple-100 text-purple-700' : note.colorTag === 'blue' ? 'bg-blue-100 text-blue-700' : note.colorTag === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {note.topic}
                        </span>
                        <span className="text-[10px] text-slate-400">{note.createdAt}</span>
                      </div>

                      <h4 className="text-sm font-bold font-poppins text-slate-900">{note.title}</h4>
                      <p className="mt-1.5 text-xs text-slate-600 font-inter leading-relaxed line-clamp-3">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: Interactive Quiz */}
            {activeTab === 'quiz' && (
              <div className="space-y-6">
                {quizQuestions.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">
                    No quiz questions available for this chapter yet.
                  </div>
                ) : (
                  <div>
                    {/* Quiz Progress & Timer Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-700">
                          Question {currentQuizIdx + 1} of {quizQuestions.length}
                        </span>
                        <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#6D5EF7] h-full transition-all"
                            style={{ width: `${((currentQuizIdx + 1) / quizQuestions.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" />
                        <span>30s Timer</span>
                      </div>
                    </div>

                    {/* Question Card */}
                    {quizQuestions[currentQuizIdx] && (
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                        <h3 className="text-base font-bold font-poppins text-slate-900">
                          {language === 'Tamil' && quizQuestions[currentQuizIdx].tamilQuestion
                            ? quizQuestions[currentQuizIdx].tamilQuestion
                            : quizQuestions[currentQuizIdx].question}
                        </h3>

                        {/* MCQ Options */}
                        <div className="space-y-2.5">
                          {((language === 'Tamil' && quizQuestions[currentQuizIdx].tamilOptions)
                            ? quizQuestions[currentQuizIdx].tamilOptions!
                            : quizQuestions[currentQuizIdx].options
                          ).map((optionText, optIdx) => {
                            const isSelected = selectedOption === optIdx || quizAnswers[currentQuizIdx] === optIdx;
                            const isCorrect = isQuizSubmitted && optIdx === quizQuestions[currentQuizIdx].correctAnswerIndex;
                            const isWrong = isQuizSubmitted && isSelected && !isCorrect;

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectQuizOption(optIdx)}
                                className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold font-inter transition-all flex items-center justify-between cursor-pointer ${
                                  isCorrect
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                                    : isWrong
                                    ? 'bg-rose-50 border-rose-500 text-rose-900'
                                    : isSelected
                                    ? 'bg-indigo-50 border-[#6D5EF7] text-[#6D5EF7]'
                                    : 'bg-white border-slate-200/80 text-slate-700 hover:border-indigo-200 hover:bg-slate-50'
                                }`}
                              >
                                <span>{optionText}</span>
                                {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box on Quiz Submission */}
                        {isQuizSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1"
                          >
                            <span className="font-bold text-[#6D5EF7]">Explanation:</span>
                            <p className="font-inter">
                              {language === 'Tamil' && quizQuestions[currentQuizIdx].tamilExplanation
                                ? quizQuestions[currentQuizIdx].tamilExplanation
                                : quizQuestions[currentQuizIdx].explanation}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* Quiz Controls */}
                    <div className="flex items-center justify-between mt-5">
                      <button
                        onClick={() => setCurrentQuizIdx(Math.max(0, currentQuizIdx - 1))}
                        disabled={currentQuizIdx === 0}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {currentQuizIdx < quizQuestions.length - 1 ? (
                        <button
                          onClick={() => {
                            setCurrentQuizIdx(currentQuizIdx + 1);
                            setSelectedOption(quizAnswers[currentQuizIdx + 1] ?? null);
                          }}
                          className="px-5 py-2 rounded-xl bg-[#6D5EF7] text-white text-xs font-semibold hover:opacity-90"
                        >
                          Next Question
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitQuiz}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-md hover:opacity-90"
                        >
                          Submit & Check Score
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Next/Prev Lesson Navigation */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
            <button
              onClick={() => handleSelectLesson(Math.max(0, selectedLessonIndex - 1))}
              disabled={selectedLessonIndex === 0}
              className="flex items-center space-x-1.5 text-slate-600 hover:text-[#6D5EF7] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'Tamil' ? 'முந்தைய அத்தியாயம்' : 'Previous Lesson'}</span>
            </button>

            <button
              onClick={() => handleSelectLesson(Math.min(lessons.length - 1, selectedLessonIndex + 1))}
              disabled={selectedLessonIndex === lessons.length - 1}
              className="flex items-center space-x-1.5 text-[#6D5EF7] hover:underline disabled:opacity-40 cursor-pointer"
            >
              <span>{language === 'Tamil' ? 'அடுத்த அத்தியாயம்' : 'Next Lesson'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
