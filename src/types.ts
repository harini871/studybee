export type BoardType = 'State Board' | 'CBSE' | 'ICSE';
export type LanguageType = 'English' | 'Tamil';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  board: BoardType;
  className: string; // 'Class 1' ... 'Class 12'
  preferredLanguage: LanguageType;
  avatarUrl?: string;
  streak: number; // e.g. 7 days
  xp: number; // e.g. 1450 XP
  completedLessonIds: string[];
  savedNoteIds: string[];
  bookmarkedPdfIds: string[];
}

export interface BoardOption {
  id: BoardType;
  title: string;
  subtitle: string;
  description: string;
  logoUrl: string;
  badge: string;
}

export interface SubjectItem {
  id: string;
  title: string;
  tamilTitle?: string;
  iconName: string; // Lucide icon name string
  colorGradient: string;
  chapterCount: number;
  description: string;
  tamilDescription?: string;
  classesAllowed: number[]; // e.g. [1,2,3,4,5,6,7,8,9,10,11,12]
}

export interface QuizQuestion {
  id: string;
  question: string;
  tamilQuestion?: string;
  options: string[];
  tamilOptions?: string[];
  correctAnswerIndex: number;
  explanation: string;
  tamilExplanation?: string;
}

export interface NoteItem {
  id: string;
  title: string;
  tamilTitle?: string;
  content: string;
  tamilContent?: string;
  colorTag: 'purple' | 'blue' | 'emerald' | 'amber' | 'rose';
  topic: string;
  tamilTopic?: string;
  createdAt: string;
  isBookmarked: boolean;
}

export interface LessonItem {
  id: string;
  chapterNumber: number;
  title: string;
  tamilTitle?: string;
  duration: string;
  videoUrl: string;
  pdfUrl?: string;
  pdfName?: string;
  summaryText: string;
  tamilSummaryText?: string;
  notes: NoteItem[];
  quiz: QuizQuestion[];
  isCompleted?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  tamilName?: string;
  className: string;
  tamilClassName?: string;
  board: BoardType;
  xp: number;
  streak: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  imageUrl?: string;
  language?: LanguageType;
}
