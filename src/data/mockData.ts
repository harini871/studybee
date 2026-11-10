import { BoardOption, SubjectItem, LessonItem, LeaderboardEntry, AchievementBadge } from '../types';

export const BOARDS_DATA: BoardOption[] = [
  {
    id: 'CBSE',
    title: 'Central Board of Secondary Education (CBSE)',
    subtitle: 'NCERT Curriculum',
    description: 'National school education curriculum based on NCERT standards for Classes 1 to 12.',
    logoUrl: '/images/cbse_official_logo.png',
    badge: 'Classes 1–12'
  },
  {
    id: 'State Board',
    title: 'Tamil Nadu State Board',
    subtitle: 'Samacheer Kalvi Curriculum',
    description: 'Tamil Nadu School Education Department syllabus for Classes 1 to 12 in English & Tamil medium.',
    logoUrl: '/images/tn_state_board_logo.png',
    badge: 'Classes 1–12'
  },
  {
    id: 'ICSE',
    title: 'Council for the Indian School Certificate Examinations (ICSE)',
    subtitle: 'CISCE Board Curriculum',
    description: 'Comprehensive CISCE curriculum for Classes 1 to 12 emphasizing practical application.',
    logoUrl: '/images/icse_board_logo.png',
    badge: 'Classes 1–12'
  }
];

export const SUBJECTS_DATA: SubjectItem[] = [
  {
    id: 'maths',
    title: 'Mathematics',
    tamilTitle: 'கணிதம்',
    iconName: 'Calculator',
    colorGradient: 'from-[#6D5EF7] to-[#8B7CFF]',
    chapterCount: 14,
    description: 'Algebra, Geometry, Trigonometry, Calculus and Numerical Skills',
    tamilDescription: 'இயற்கணிதம், வடிவியல், முக்கோணவியல், நுண்கணிதம் மற்றும் எண்ணியல் திறன்கள்',
    classesAllowed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 'science',
    title: 'Science & Tech',
    tamilTitle: 'அறிவியல் மற்றும் தொழில்நுட்பம்',
    iconName: 'Atom',
    colorGradient: 'from-[#0EA5E9] to-[#38BDF8]',
    chapterCount: 16,
    description: 'Physical & Natural Sciences, Experiments, and Scientific Inquiry',
    tamilDescription: 'இயற்பியல் அறிவியல், இயற்கை அறிவியல், பரிசோதனைகள் மற்றும் அறிவியல் சோதனைகள்',
    classesAllowed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 'physics',
    title: 'Physics',
    tamilTitle: 'இயற்பியல் அறிவியல்',
    iconName: 'Zap',
    colorGradient: 'from-[#6366F1] to-[#818CF8]',
    chapterCount: 12,
    description: 'Mechanics, Electricity, Magnetism, Optics, and Quantum Physics',
    tamilDescription: 'இயக்கவியல், மின்சாரவியல், காந்தவியல், ஒளியியல் மற்றும் குவாண்டம் இயற்பியல்',
    classesAllowed: [11, 12]
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    tamilTitle: 'வேதியியல்',
    iconName: 'FlaskConical',
    colorGradient: 'from-[#EC4899] to-[#F472B6]',
    chapterCount: 14,
    description: 'Organic, Inorganic, and Physical Chemistry Laws and Reactions',
    tamilDescription: 'கரிம, கனிம மற்றும் இயற்பியல் வேதியியல் விதிகளும் வினைகளும்',
    classesAllowed: [11, 12]
  },
  {
    id: 'biology',
    title: 'Biology',
    tamilTitle: 'இயற்கை அறிவியல் (உயிரியல்)',
    iconName: 'Dna',
    colorGradient: 'from-[#10B981] to-[#34D399]',
    chapterCount: 12,
    description: 'Genetics, Human Anatomy, Botany, Zoology, and Ecology',
    tamilDescription: 'மரபியல், மனித உடலியல், தாவரவியல், விலங்கியல் மற்றும் சூழ்நிலையியல்',
    classesAllowed: [11, 12]
  },
  {
    id: 'english',
    title: 'English',
    tamilTitle: 'ஆங்கிலம்',
    iconName: 'BookOpen',
    colorGradient: 'from-[#F59E0B] to-[#FBBF24]',
    chapterCount: 10,
    description: 'Prose, Poetry, Grammar, Creative Writing, and Speaking Mastery',
    tamilDescription: 'உரைநடை, செய்யுள், இலக்கணம், படைப்பாக்க எழுத்து மற்றும் பேச்சுத்திறன்',
    classesAllowed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 'tamil',
    title: 'Tamil',
    tamilTitle: 'தமிழ்',
    iconName: 'Languages',
    colorGradient: 'from-[#EF4444] to-[#F87171]',
    chapterCount: 12,
    description: 'Prose, Poetry, Grammar, Literature and Thirukkural',
    tamilDescription: 'செம்மொழித் தமிழ், உரைநடை, செய்யுள், இலக்கணம் மற்றும் திருக்குறள்',
    classesAllowed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 'social',
    title: 'Social Science',
    tamilTitle: 'சமூக அறிவியல்',
    iconName: 'Globe',
    colorGradient: 'from-[#8B5CF6] to-[#A78BFA]',
    chapterCount: 15,
    description: 'History, Geography, Civics, and Economics',
    tamilDescription: 'வரலாறு, புவியியல், குடியியல் மற்றும் பொருளாதாரம்',
    classesAllowed: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 'cs',
    title: 'Computer Science',
    tamilTitle: 'கணிப்பொறி அறிவியல்',
    iconName: 'Laptop',
    colorGradient: 'from-[#14B8A6] to-[#2DD4BF]',
    chapterCount: 10,
    description: 'Python, C++, Data Structures, AI Concepts & Web Technology',
    tamilDescription: 'பைத்தான், C++, தரவு அமைப்புகள், செயற்கை நுண்ணறிவு மற்றும் இணைய தொழில்நுட்பம்',
    classesAllowed: [6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 'commerce',
    title: 'Commerce & Economics',
    tamilTitle: 'வணிகவியல் மற்றும் பொருளாதாரம்',
    iconName: 'TrendingUp',
    colorGradient: 'from-[#F97316] to-[#FB923C]',
    chapterCount: 12,
    description: 'Financial Accounting, Business Studies, Macro & Micro Economics',
    tamilDescription: 'நிதி கணக்கியல், வணிகவியல் பாடங்கள், பேரியல் மற்றும் நுண் பொருளாதாரம்',
    classesAllowed: [11, 12]
  }
];

export const MOCK_LESSONS: Record<string, LessonItem[]> = {
  maths: [
    {
      id: 'maths-ch1',
      chapterNumber: 1,
      title: 'Real Numbers, Algebra & Polynomial Theorems',
      tamilTitle: 'மெய்யெண்கள், இயற்கணிதம் மற்றும் பல்லுறுப்புக் கோவைகள்',
      duration: '18 mins',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      pdfName: 'Mathematics_Chapter_1_NCERT.pdf',
      pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
      summaryText: 'This lesson covers Algebra fundamentals, Euclid Division Lemma, Fundamental Theorem of Arithmetic, verifying irrational numbers, and zero factorization of polynomials.',
      tamilSummaryText: 'இந்த பாடம் இயற்கணித அடிப்படைகள், யூக்ளிட்டின் வகுத்தல் காரணி விதி, கணிதத்தின் அடிப்படை தேற்றம் மற்றும் இருபடி பல்லுறுப்புக் கோவைகளின் பூச்சியங்களைக் கண்டறிதல் ஆகியவற்றை விளக்குகிறது.',
      notes: [
        {
          id: 'n1',
          title: 'Euclid Division Lemma',
          tamilTitle: 'யூக்ளிட்டின் வகுத்தல் துணைத் தேற்றம்',
          content: 'For any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r < b.',
          tamilContent: 'ஏதேனும் இரு மிகை முழுக்கள் a மற்றும் b-க்கு, a = bq + r (0 ≤ r < b) என்றவாறு அமைந்த தனித்த முழுக்கள் q மற்றும் r அமையும்.',
          colorTag: 'purple',
          topic: 'Number Systems',
          tamilTopic: 'எண் முறைகள்',
          createdAt: '2026-08-01',
          isBookmarked: true
        },
        {
          id: 'n2',
          title: 'Fundamental Theorem of Arithmetic',
          tamilTitle: 'எண்ணியலின் அடிப்படைத் தேற்றம்',
          content: 'Every composite number can be expressed as a product of primes, and this factorization is unique apart from the order of prime factors.',
          tamilContent: 'ஒவ்வொரு பகு எண்ணையும் பகா எண்களின் பெருக்கற்பலனாக காரணிப்படுத்த முடியும், மேலும் இக்காரணிப்படுத்துதல் வரிசையைத் தவிர தனித்தன்மை வாய்ந்தது.',
          colorTag: 'emerald',
          topic: 'Primes & HCF',
          tamilTopic: 'பகா எண்கள் மற்றும் மீ.பொ.வ',
          createdAt: '2026-08-02',
          isBookmarked: false
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What is the HCF of two co-prime numbers a and b?',
          tamilQuestion: 'இரு சார்பகா எண்கள் a மற்றும் b-ன் மீப்பெரு பொதுக் காரணி (மீ.பொ.வ) என்ன?',
          options: ['0', '1', 'a × b', 'a + b'],
          tamilOptions: ['0', '1', 'a × b', 'a + b'],
          correctAnswerIndex: 1,
          explanation: 'Co-prime numbers share no common positive factors other than 1.',
          tamilExplanation: 'சார்பகா எண்களுக்கு 1-ஐத் தவிர வேறு பொதுக் காரணிகள் இல்லை.'
        },
        {
          id: 'q2',
          question: 'If HCF(306, 657) = 9, what is LCM(306, 657)?',
          tamilQuestion: 'HCF(306, 657) = 9 எனில், LCM(306, 657) என்ன?',
          options: ['22338', '12440', '306', '657'],
          tamilOptions: ['22338', '12440', '306', '657'],
          correctAnswerIndex: 0,
          explanation: 'Formula: HCF × LCM = Product of numbers. LCM = (306 × 657) / 9 = 22,338.',
          tamilExplanation: 'சூத்திரம்: HCF × LCM = எண்களின் பெருக்கற்பலன். LCM = (306 × 657) / 9 = 22,338.'
        },
        {
          id: 'q3',
          question: 'A polynomial of degree 2 is called a _____ polynomial.',
          tamilQuestion: 'படி 2 கொண்ட பல்லுறுப்புக் கோவை எவ்வாறு அழைக்கப்படுகிறது?',
          options: ['Linear', 'Quadratic', 'Cubic', 'Constant'],
          tamilOptions: ['நேரியல்', 'இருபடி', 'முப்படி', 'மாறிலி'],
          correctAnswerIndex: 1,
          explanation: 'Degree 2 polynomials are Quadratic polynomials (e.g. ax² + bx + c).',
          tamilExplanation: 'படி 2 உடையவை இருபடிப் பல்லுறுப்புக் கோவைகளாகும்.'
        }
      ]
    },
    {
      id: 'maths-ch2',
      chapterNumber: 2,
      title: 'Geometry & Trigonometry Principles',
      tamilTitle: 'வடிவியல் மற்றும் முக்கோணவியல் விதிகள்',
      duration: '22 mins',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      pdfName: 'Mathematics_Chapter_2_Geometry.pdf',
      summaryText: 'Pythagoras theorem geometric proofs, trigonometric ratios (sin, cos, tan) and practical applications.',
      tamilSummaryText: 'வடிவியல் வடிவங்களின் பிதாகரஸ் தேற்ற நிரூபணம், முக்கோணவியல் விகிதங்கள் (sin, cos, tan) மற்றும் பயன்பாடுகள்.',
      notes: [
        {
          id: 'n3',
          title: 'Pythagoras Theorem Proof',
          tamilTitle: 'பிதாகரஸ் தேற்றம் நிரூபணம்',
          content: 'In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides (a² + b² = c²).',
          tamilContent: 'ஒரு செங்கோண முக்கோணத்தில் கர்ணத்தின் வர்க்கம் மற்ற இரு பக்கங்களின் வர்க்கங்களின் கூடுதலுக்குச் சமம் (a² + b² = c²).',
          colorTag: 'blue',
          topic: 'Geometry & Trigonometry',
          tamilTopic: 'வடிவியல் மற்றும் முக்கோணவியல்',
          createdAt: '2026-08-03',
          isBookmarked: true
        }
      ],
      quiz: [
        {
          id: 'q4',
          question: 'In a right triangle with sides 3cm and 4cm, what is the hypotenuse length?',
          tamilQuestion: 'பக்கங்கள் 3 செ.மீ மற்றும் 4 செ.மீ கொண்ட செங்கோண முக்கோணத்தின் கர்ணம் எவ்வளவு?',
          options: ['5 cm', '6 cm', '7 cm', '8 cm'],
          tamilOptions: ['5 செ.மீ', '6 செ.மீ', '7 செ.மீ', '8 செ.மீ'],
          correctAnswerIndex: 0,
          explanation: 'c = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.',
          tamilExplanation: 'பிதாகரஸ் தேற்றம்: c = √(3² + 4²) = √(9 + 16) = √25 = 5 செ.மீ.'
        }
      ]
    }
  ],
  science: [
    {
      id: 'sci-ch1',
      chapterNumber: 1,
      title: 'Physical Science & Chemical Reactions',
      tamilTitle: 'இயற்பியல் அறிவியல் மற்றும் வேதி வினைகள்',
      duration: '20 mins',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      pdfName: 'Science_Chemistry_Ch1.pdf',
      summaryText: 'Understanding physical science, chemical equations, displacement reactions, and redox concepts.',
      tamilSummaryText: 'இயற்பியல் அறிவியல் கொள்கைகள், வேதிச் சமன்பாடுகள், இடப்பெயர்ச்சி வினைகள் மற்றும் ஆக்சிஜனேற்ற வினைகள்.',
      notes: [
        {
          id: 'n4',
          title: 'Law of Conservation of Mass',
          tamilTitle: 'பொருண்மை அழிவின்மை விதி',
          content: 'Mass can neither be created nor destroyed in a chemical reaction. Total mass of reactants equals total mass of products.',
          tamilContent: 'ஒரு வேதி வினையில் பொருண்மையை ஆக்கவோ அழிக்கவோ முடியாது. வினைபடு பொருட்களின் மொத்த நிறை வினைவிளை பொருட்களின் மொத்த நிறைக்குச் சமம்.',
          colorTag: 'amber',
          topic: 'Physical Science',
          tamilTopic: 'இயற்பியல் அறிவியல்',
          createdAt: '2026-08-04',
          isBookmarked: true
        }
      ],
      quiz: [
        {
          id: 'q5',
          question: 'Fe₂O₃ + 2Al → Al₂O₃ + 2Fe is an example of a:',
          tamilQuestion: 'Fe₂O₃ + 2Al → Al₂O₃ + 2Fe என்பது எவ்வகை வினைக்கான சான்று?',
          options: ['Combination Reaction', 'Double Displacement Reaction', 'Decomposition Reaction', 'Displacement Reaction'],
          tamilOptions: ['சேர்க்கை வினை', 'இரட்டை இடப்பெயர்ச்சி வினை', 'சிதைவுறு வினை', 'இடப்பெயர்ச்சி வினை'],
          correctAnswerIndex: 3,
          explanation: 'Aluminium displaces Iron from Iron oxide because Aluminium is more reactive.',
          tamilExplanation: 'அலுமினியம் இரும்பை விட அதிக வினையா திறன் கொண்டதால் அதை இடப்பெயர்ச்சி செய்கிறது.'
        }
      ]
    }
  ]
};

// Independent Board-Wise Leaderboards (No mixing of students between boards!)
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  // --- CBSE Board Leaderboard ---
  { rank: 1, name: 'Ananya Sharma', tamilName: 'அனன்யா ஷர்மா', className: 'Class 10', tamilClassName: 'வகுப்பு 10', board: 'CBSE', xp: 4850, streak: 18, avatar: '👩‍🎓' },
  { rank: 2, name: 'Rohan Gupta', tamilName: 'ரோஹன் குப்தா', className: 'Class 10', tamilClassName: 'வகுப்பு 10', board: 'CBSE', xp: 4620, streak: 15, avatar: '👨‍🎓' },
  { rank: 3, name: 'Divya N', tamilName: 'திவ்யா என்', className: 'Class 10', tamilClassName: 'வகுப்பு 10', board: 'CBSE', xp: 3740, streak: 10, avatar: '👩‍🔬' },
  { rank: 4, name: 'Aditya Verma', tamilName: 'ஆதித்யா வர்மா', className: 'Class 11', tamilClassName: 'வகுப்பு 11', board: 'CBSE', xp: 3500, streak: 9, avatar: '👨‍💻' },
  { rank: 5, name: 'Sneha Patel', tamilName: 'சினேகா பட்டேல்', className: 'Class 9', tamilClassName: 'வகுப்பு 9', board: 'CBSE', xp: 3200, streak: 8, avatar: '👩‍🏫' },

  // --- Tamil Nadu State Board Leaderboard ---
  { rank: 1, name: 'Karthik Raja', tamilName: 'கார்த்திக் ராஜா', className: 'Class 10', tamilClassName: 'வகுப்பு 10', board: 'State Board', xp: 4920, streak: 19, avatar: '👨‍🎓', isCurrentUser: true },
  { rank: 2, name: 'Priya Sundaram', tamilName: 'பிரியா சுந்தரம்', className: 'Class 12', tamilClassName: 'வகுப்பு 12', board: 'State Board', xp: 4710, streak: 16, avatar: '👩‍🏫' },
  { rank: 3, name: 'Sanjay Kumar', tamilName: 'சஞ்சய் குமார்', className: 'Class 11', tamilClassName: 'வகுப்பு 11', board: 'State Board', xp: 4210, streak: 12, avatar: '👨‍🚀' },
  { rank: 4, name: 'Kavitha Ramesh', tamilName: 'கவிதா ரமேஷ்', className: 'Class 10', tamilClassName: 'வகுப்பு 10', board: 'State Board', xp: 3950, streak: 11, avatar: '👩‍🔬' },
  { rank: 5, name: 'Muralidharan V', tamilName: 'முரளிதரன் வி', className: 'Class 12', tamilClassName: 'வகுப்பு 12', board: 'State Board', xp: 3680, streak: 9, avatar: '👨‍💻' },

  // --- ICSE Board Leaderboard ---
  { rank: 1, name: 'Arjun Mehta', tamilName: 'அர்ஜுன் மேத்தா', className: 'Class 9', tamilClassName: 'வகுப்பு 9', board: 'ICSE', xp: 4780, streak: 17, avatar: '👨‍💻' },
  { rank: 2, name: 'Tanya Sengupta', tamilName: 'தான்யா சென்குப்தா', className: 'Class 10', tamilClassName: 'வகுப்பு 10', board: 'ICSE', xp: 4450, streak: 14, avatar: '👩‍🎓' },
  { rank: 3, name: 'Neil Mukherjee', tamilName: 'நீல் முகர்ஜி', className: 'Class 11', tamilClassName: 'வகுப்பு 11', board: 'ICSE', xp: 4120, streak: 13, avatar: '👨‍🔬' },
  { rank: 4, name: 'Rhea Kapoor', tamilName: 'ரியா கபூர்', className: 'Class 10', tamilClassName: 'வகுப்பு 10', board: 'ICSE', xp: 3890, streak: 10, avatar: '👩‍🏫' },
  { rank: 5, name: 'Kabir Roy', tamilName: 'கபீர் ராய்', className: 'Class 12', tamilClassName: 'வகுப்பு 12', board: 'ICSE', xp: 3560, streak: 8, avatar: '👨‍🚀' }
];

export const MOCK_ACHIEVEMENTS: AchievementBadge[] = [
  { id: 'b1', title: '7-Day Streak Master', description: 'Maintained a 7-day study streak continuously', icon: '🔥', unlockedAt: '2026-08-01', isUnlocked: true },
  { id: 'b2', title: 'AI Doubt Buster', description: 'Solved 10+ homework doubts using StudyBee AI', icon: '🐝', unlockedAt: '2026-08-03', isUnlocked: true },
  { id: 'b3', title: 'Quiz Whiz', description: 'Scored 100% on 5 consecutive lesson quizzes', icon: '🎯', unlockedAt: '2026-08-04', isUnlocked: true },
  { id: 'b4', title: 'Bilingual Scholar', description: 'Switched lessons seamlessly between English and Tamil', icon: '🌐', isUnlocked: true },
  { id: 'b5', title: 'Top 3 Leaderboard', description: 'Reached Top 3 on the study leaderboard', icon: '👑', isUnlocked: false },
  { id: 'b6', title: 'Night Owl Genius', description: 'Completed a full science chapter after 8 PM', icon: '🦉', isUnlocked: false }
];
