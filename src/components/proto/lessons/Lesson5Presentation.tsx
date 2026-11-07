import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, ShieldCheck, Zap, UserCheck, 
  TrendingUp, Award, RotateCcw, CheckCircle2, XCircle, ArrowRight, 
  Sparkles, HelpCircle, Building2, BrainCircuit, Maximize2, Minimize2,
  Home, Check, Lightbulb
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface SlideQuestion {
  id: number;
  badge: string;
  scenario?: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  topic: string;
}

export interface PresentationSlide {
  id: number;
  type: 'intro' | 'menu' | 'content' | 'question' | 'reflection' | 'finish' | 'assessment';
  badge: string;
  title: string;
  subtitle?: string;
  category?: 'benefit' | 'context' | 'quiz' | 'reflection' | 'summary';
  contentHeading?: string;
  paragraphs?: string[];
  keyPoints?: { title: string; text: string; icon?: React.ElementType; color?: string }[];
  questionData?: SlideQuestion;
  targetSlideId?: number;
  accentColor: string;
}

// 19 sequenced slides covering all 28 slides from the user's PowerPoint presentation deck:
// Embedded questions, hints, explanations, and Bhutan context directly inside the slides.
export const SLIDES_SEQUENCE: PresentationSlide[] = [
  // SLIDE 1: Title Slide (from PPT Slide 1)
  {
    id: 1,
    type: 'intro',
    badge: 'TOPIC 2 • Interactive Self-Learning PowerPoint',
    title: 'Benefits of AI Recognition Systems',
    subtitle: 'Why recognition technology can be useful',
    paragraphs: [
      'Welcome to Topic 2 of Chapter 10. Recognition systems make our lives faster, safer, and easier by identifying patterns quickly, working consistently, and delivering personalized services.',
      'In this interactive presentation deck, you will discover the core benefits, explore Bhutanese real-world applications (such as Phuentsholing AICS), and test your knowledge through checkpoint questions to earn stars!'
    ],
    keyPoints: [
      { title: 'Core Advantages', text: 'Speed, reduced effort, biometric security, fraud detection, and convenience.', icon: Zap, color: 'text-emerald-400' },
      { title: 'Everyday & Bhutan Context', text: 'Real automated immigration & identity checking at Phuentsholing pedestrian terminal.', icon: Building2, color: 'text-cyan-400' },
      { title: 'Earn Up to 5 Stars', text: 'Solve checkpoint questions directly inside the slides to earn stars and a final mastery rating.', icon: Star, color: 'text-amber-400' }
    ],
    accentColor: '#00f5c4',
  },

  // SLIDE 2: Section Menu / Roadmap (from PPT Slide 2)
  {
    id: 2,
    type: 'menu',
    badge: 'TOPIC 2: BENEFITS • OUTLINE',
    title: 'Choose a Section to Study',
    subtitle: 'Click any section card to jump directly, or click Next to follow the sequenced lesson',
    paragraphs: [
      'Recognition systems use machine learning and pattern matching to automate tasks that previously required manual human effort and card credentials.'
    ],
    keyPoints: [
      { title: '1. Why Recognition Systems Are Useful', text: 'Foundational concepts of automated pattern detection.', icon: BrainCircuit, color: 'text-teal-400' },
      { title: '2. Speed, Effort, Security & Convenience', text: 'The 6 key benefits analyzed with real-world examples.', icon: ShieldCheck, color: 'text-cyan-400' },
      { title: '3. Everyday and Bhutan Context', text: 'Automated biometric identity checking at Phuentsholing AICS.', icon: Building2, color: 'text-indigo-400' },
      { title: '4. Final Quiz • Check Understanding', text: 'Answer questions directly in slides to earn stars and immediate feedback.', icon: HelpCircle, color: 'text-amber-400' },
      { title: '5. Self-Evaluation & Star Assessment', text: 'Textbook confidence check and comprehensive star rating.', icon: Award, color: 'text-emerald-400' }
    ],
    accentColor: '#38bdf8',
  },

  // SLIDE 3: Why Use Recognition Systems? (from PPT Slide 3)
  {
    id: 3,
    type: 'content',
    badge: 'FOUNDATIONAL CONCEPTS',
    title: 'Why Use Recognition Systems?',
    subtitle: 'Making lives faster, safer, and easier',
    category: 'benefit',
    paragraphs: [
      'Recognition systems make our lives faster, safer, and easier. They can recognize patterns quickly, work consistently, and even give us personalized services.'
    ],
    keyPoints: [
      { title: 'Rapid Pattern Recognition', text: 'Processes visual, biometric, and acoustic signals in milliseconds without manual lookup.', icon: Zap, color: 'text-emerald-400' },
      { title: 'Consistent Operation', text: 'Maintains uniform accuracy standards without lapses caused by human exhaustion or stress.', icon: TrendingUp, color: 'text-cyan-400' },
      { title: 'Personalized Experiences', text: 'Learns user preferences to customize interfaces, recommendations, and services.', icon: UserCheck, color: 'text-indigo-400' }
    ],
    accentColor: '#10b981',
  },

  // SLIDE 4: Benefit 1 (from PPT Slide 4)
  {
    id: 4,
    type: 'content',
    badge: 'BENEFIT 1 • Speed and reduced effort',
    title: 'Speed and Reduced Effort',
    subtitle: 'Automated data processing and repetitive task reduction',
    category: 'benefit',
    paragraphs: [
      'Recognition systems can quickly process and identify patterns in large datasets. This reduces human effort and can reduce errors in repetitive identification tasks.'
    ],
    keyPoints: [
      { title: 'High-Throughput Processing', text: 'Processes hundreds of identity vectors simultaneously at border gates, train terminals, or school entrances.', icon: Zap, color: 'text-emerald-400' },
      { title: 'Eliminating Human Error', text: 'Avoids visual fatigue and typos common during repetitive manual identity verification.', icon: CheckCircle2, color: 'text-teal-400' }
    ],
    accentColor: '#00f5c4',
  },

  // SLIDE 5: Benefit 2 (from PPT Slide 5)
  {
    id: 5,
    type: 'content',
    badge: 'BENEFIT 2 • Security',
    title: 'Security',
    subtitle: 'Biometric verification in high-stakes environments',
    category: 'benefit',
    paragraphs: [
      'Faces, fingerprints, and voices can be recognized to support security in places such as airports, offices, and banks. Biometric recognition can help verify identity.'
    ],
    keyPoints: [
      { title: 'Non-Transferable Credentials', text: 'Unlike passwords or badges, biological features cannot be easily lost, stolen, or shared.', icon: ShieldCheck, color: 'text-cyan-400' },
      { title: 'Multi-Modal Verification', text: 'Combining facial landmarks, fingerprint scans, and voice patterns produces near-foolproof security.', icon: UserCheck, color: 'text-blue-400' }
    ],
    accentColor: '#38bdf8',
  },

  // SLIDE 6: Benefit 3 (from PPT Slide 6)
  {
    id: 6,
    type: 'content',
    badge: 'BENEFIT 3 • Fraud and unusual behaviour',
    title: 'Fraud and Unusual Behaviour',
    subtitle: 'Detecting anomalies and preventing unauthorized access',
    category: 'benefit',
    paragraphs: [
      'Recognition systems can detect unusual behavior, helping prevent fraud and unauthorized access.',
      'The benefit depends on data quality, model quality, and how the system is managed.'
    ],
    keyPoints: [
      { title: 'Behavioral Anomaly Detection', text: 'Spots suspicious banking activity, abnormal login locations, and perimeter intrusions in real time.', icon: ShieldCheck, color: 'text-indigo-400' },
      { title: 'Quality Matters', text: 'System effectiveness is directly bounded by training dataset diversity and ongoing monitoring protocols.', icon: Sparkles, color: 'text-amber-400' }
    ],
    accentColor: '#818cf8',
  },

  // SLIDE 7: Benefit 4 (from PPT Slide 7)
  {
    id: 7,
    type: 'content',
    badge: 'BENEFIT 4 • Consistent performance',
    title: 'Consistent Performance',
    subtitle: '24/7 reliability without fatigue',
    category: 'benefit',
    paragraphs: [
      'Unlike humans, AI systems don’t get tired. They can keep working consistently, helping us make quick and reliable decisions.'
    ],
    keyPoints: [
      { title: 'Zero Fatigue Degradation', text: 'Human security guards experience cognitive fatigue after 20 minutes of CCTV monitoring; AI algorithms maintain 100% vigilance.', icon: TrendingUp, color: 'text-emerald-400' },
      { title: 'Standardized Decision Criteria', text: 'Applies identical mathematical thresholds to every single verification regardless of time or workload.', icon: CheckCircle2, color: 'text-teal-400' }
    ],
    accentColor: '#2dd4bf',
  },

  // SLIDE 8: Benefit 5 (from PPT Slide 8)
  {
    id: 8,
    type: 'content',
    badge: 'BENEFIT 5 • Convenience',
    title: 'Convenience',
    subtitle: 'Frictionless authentication in everyday life',
    category: 'benefit',
    paragraphs: [
      'Face unlock, voice assistants, and fingerprint scanning can make everyday tasks quicker and easier. The technology reduces repeated manual input for some tasks.'
    ],
    keyPoints: [
      { title: 'Instant Smartphone Access', text: 'Unlocking devices in 200ms without memorizing or typing 16-character complex passwords.', icon: UserCheck, color: 'text-amber-400' },
      { title: 'Frictionless Interaction', text: 'Voice assistants handle queries hands-free while cooking, driving, or working.', icon: Zap, color: 'text-yellow-400' }
    ],
    accentColor: '#fbbf24',
  },

  // SLIDE 9: Benefit 6 (from PPT Slide 9)
  {
    id: 9,
    type: 'content',
    badge: 'BENEFIT 6 • Personalized services',
    title: 'Personalized Services',
    subtitle: 'Adapting to individual preferences',
    category: 'benefit',
    paragraphs: [
      'Recognition systems can support personalized services by learning individual preferences. The aim is to make interactions more relevant to a user.'
    ],
    keyPoints: [
      { title: 'Context-Aware Adaptation', text: 'Smart learning platforms and media recommendation engines tailor content based on recognized user habits.', icon: Sparkles, color: 'text-pink-400' },
      { title: 'Targeted Relevance', text: 'Ensures users receive timely, pertinent suggestions without navigating complex menu hierarchies.', icon: TrendingUp, color: 'text-rose-400' }
    ],
    accentColor: '#f472b6',
  },

  // SLIDE 10: Interactive Question 1 (from PPT Slides 10, 11, 12)
  {
    id: 10,
    type: 'question',
    badge: 'THINK : WHICH BENEFIT? • CHECKPOINT 1',
    title: 'THINK : Which Benefit Is Demonstrated?',
    subtitle: 'Apply your understanding of banking security and fraud prevention',
    category: 'quiz',
    questionData: {
      id: 1,
      badge: 'THINK : WHICH BENEFIT?',
      scenario: 'A bank uses recognition technology to help identify unusual transactions and prevent unauthorized access.',
      question: 'Which benefit is most directly shown?',
      options: [
        'A. Convenience only',
        'B. Security and fraud prevention',
        'C. Entertainment',
        'D. Job creation'
      ],
      correctIndex: 1,
      hint: 'Hint: the scenario is about protecting accounts and detecting suspicious activity. Think about preventing unauthorized access.',
      explanation: 'CORRECT! Great thinking! Recognition systems can support security and fraud prevention by identifying unusual behavior or verifying identity. Remember: understanding WHY matters more than memorizing.',
      topic: 'Security & Fraud Prevention'
    },
    accentColor: '#38bdf8',
  },

  // SLIDE 11: Bhutan Context (from PPT Slide 13)
  {
    id: 11,
    type: 'content',
    badge: 'BHUTAN CONTEXT • Phuentsholing AICS',
    title: 'Bhutan Context : Phuentsholing AICS',
    subtitle: 'Automated Immigration Clearance System in the Kingdom',
    category: 'context',
    paragraphs: [
      'Biometric and recognition technologies automate identity checks, making verification faster and more efficient while allowing data to be captured automatically.'
    ],
    keyPoints: [
      { title: 'Phuentsholing Pedestrian Terminal', text: 'Deploys biometric gates and automated credential scanning to process thousands of commuters daily with speed and security.', icon: Building2, color: 'text-amber-400' },
      { title: 'Automated Data Capture', text: 'Replaces manual paperwork with instant digital logs, reducing queue bottlenecks while maintaining border integrity.', icon: ShieldCheck, color: 'text-emerald-400' },
      { title: 'National Digital Identity (NDI)', text: 'Aligns with Bhutan’s pioneering sovereign digital identity ecosystem utilizing cryptographic credentials.', icon: Sparkles, color: 'text-cyan-400' }
    ],
    accentColor: '#00f5c4',
  },

  // SLIDE 12: Interactive Question 2 (from PPT Slides 14, 15, 16)
  {
    id: 12,
    type: 'question',
    badge: 'APPLY : CHOOSE THE BENEFIT • CHECKPOINT 2',
    title: 'APPLY : Choose the Benefit',
    subtitle: 'Evaluate fingerprint scanning in an educational environment',
    category: 'quiz',
    questionData: {
      id: 2,
      badge: 'APPLY : CHOOSE THE BENEFIT',
      scenario: 'A school uses fingerprint scanning for daily student attendance.',
      question: 'Which benefit is most directly related to this example?',
      options: [
        'A. Automated identity / attendance checking',
        'B. Generating new stories',
        'C. Removing all privacy concerns',
        'D. Making the system understand every human situation'
      ],
      correctIndex: 0,
      hint: 'Hint: focus on automated attendance and identity checking. How does fingerprint scanning replace manual roll-call?',
      explanation: 'CORRECT! Great thinking! Automated recognition can make identity or attendance checking quicker and reduce repeated manual recording. Remember: understanding WHY matters more than memorising.',
      topic: 'Automated Attendance & Identity Checking'
    },
    accentColor: '#10b981',
  },

  // SLIDE 13: Final Quiz Introduction (from PPT Slide 17)
  {
    id: 13,
    type: 'content',
    badge: 'FINAL QUIZ • BENEFITS',
    title: 'Final Quiz : Benefits Section',
    subtitle: 'Choose the benefit that is best supported by each situation',
    category: 'quiz',
    paragraphs: [
      'You are now entering the final checkpoint quiz. Test your understanding of consistent performance, convenience, and personalization across three focused scenarios.'
    ],
    keyPoints: [
      { title: 'How It Works', text: 'Answer each question directly inside the slide. Correct answers show an explanation and earn stars; incorrect answers give a hint so you can learn and try again.', icon: Star, color: 'text-amber-400' },
      { title: 'Self-Check • No Pressure', text: 'Learn from mistakes and reinforce conceptual understanding over pure memorization.', icon: HelpCircle, color: 'text-cyan-400' },
      { title: 'Final Star Assessment', text: 'Earn up to 5 total stars across the entire slide deck to unlock your overall mastery badge!', icon: Award, color: 'text-emerald-400' }
    ],
    accentColor: '#f59e0b',
  },

  // SLIDE 14: Interactive Question 3 - Quiz 1 (from PPT Slides 18, 19, 20)
  {
    id: 14,
    type: 'question',
    badge: 'FINAL QUIZ • QUIZ 1 • CHECKPOINT 3',
    title: 'QUIZ 1 : Consistent Performance',
    subtitle: 'Evaluating fatigue resistance in automated systems',
    category: 'quiz',
    questionData: {
      id: 3,
      badge: 'QUIZ 1',
      scenario: 'Comparing automated computer vision pipelines with human monitoring shifts.',
      question: 'Which is a benefit of consistent AI performance?',
      options: [
        'A. It works without any data',
        'B. It can support reliable decisions without fatigue',
        'C. It guarantees zero errors',
        'D. It removes the need for security'
      ],
      correctIndex: 1,
      hint: 'Hint: think about a system that performs repeatedly without fatigue. How does that compare to humans who get tired?',
      explanation: 'CORRECT! Great thinking! Consistent performance can support faster and more reliable decisions because the system does not tire. Remember: understanding WHY matters more than memorising.',
      topic: 'Consistent Decision-Making Without Fatigue'
    },
    accentColor: '#38bdf8',
  },

  // SLIDE 15: Interactive Question 4 - Quiz 2 (from PPT Slides 21, 22, 23)
  {
    id: 15,
    type: 'question',
    badge: 'FINAL QUIZ • QUIZ 2 • CHECKPOINT 4',
    title: 'QUIZ 2 : Everyday Convenience',
    subtitle: 'Identifying frictionless everyday authentication',
    category: 'quiz',
    questionData: {
      id: 4,
      badge: 'QUIZ 2',
      scenario: 'Examining consumer-facing biometric features on personal devices.',
      question: 'Which feature is mainly about user convenience?',
      options: [
        'A. Face unlock',
        'B. Fraud detection',
        'C. Unusual-behaviour detection',
        'D. Database matching only'
      ],
      correctIndex: 0,
      hint: 'Hint: convenience means making an everyday task easier or quicker for the user. Which feature makes phone access instant?',
      explanation: 'CORRECT! Great thinking! Face unlock can make access quicker and easier for users. Remember: understanding WHY matters more than memorising.',
      topic: 'User Convenience & Frictionless Access'
    },
    accentColor: '#fbbf24',
  },

  // SLIDE 16: Interactive Question 5 - Quiz 3 (from PPT Slides 24, 25, 26)
  {
    id: 16,
    type: 'question',
    badge: 'FINAL QUIZ • QUIZ 3 • CHECKPOINT 5',
    title: 'QUIZ 3 : Personalized Services',
    subtitle: 'Understanding adaptive system behavior and user profiles',
    category: 'quiz',
    questionData: {
      id: 5,
      badge: 'QUIZ 3',
      scenario: 'Analyzing how machine learning algorithms tailor content to user behavior.',
      question: 'Which benefit is most closely connected to learning individual preferences?',
      options: [
        'A. Personalised services',
        'B. Job displacement',
        'C. Power failure',
        'D. Poor lighting'
      ],
      correctIndex: 0,
      hint: 'Hint: this benefit is about making services more relevant to a person based on their unique preferences.',
      explanation: 'CORRECT! Great thinking! Personalized services are designed to make interactions more relevant to an individual. Remember: understanding WHY matters more than memorising.',
      topic: 'Personalized Services & Preference Learning'
    },
    accentColor: '#f472b6',
  },

  // SLIDE 17: Textbook Self-Reflection (from PPT Slide 27)
  {
    id: 17,
    type: 'reflection',
    badge: 'REFLECT • How confident are you?',
    title: 'REFLECT • How Confident Are You?',
    subtitle: 'Use the textbook-style confidence levels to assess your mastery:',
    category: 'reflection',
    paragraphs: [
      'Take a moment to self-evaluate against the curriculum objectives from Class IX DTI Topic 2:'
    ],
    accentColor: '#a78bfa',
  },

  // SLIDE 18: Topic 2 Complete & Transition (from PPT Slide 28)
  {
    id: 18,
    type: 'finish',
    badge: 'FINISH • Topic 2 complete',
    title: 'FINISH • Topic 2 Complete',
    subtitle: 'Balancing benefits with responsible AI governance',
    category: 'summary',
    paragraphs: [
      'You have completed the benefits topic!',
      'Next, study the limitations so you can consider both usefulness and responsible use. Understanding both sides ensures you can design and evaluate AI solutions with ethical awareness.'
    ],
    keyPoints: [
      { title: 'Next Topic: Limitations', text: 'Privacy intrusion, training data bias, high capital installation costs, and system dependency.', icon: ShieldCheck, color: 'text-rose-400' },
      { title: 'The Ethical Balance', text: 'Technologists must balance efficiency gains against citizen privacy and emergency overrides.', icon: BrainCircuit, color: 'text-amber-400' }
    ],
    accentColor: '#00f5c4',
  },

  // SLIDE 19: OVERALL ASSESSMENT OF STARS (User Request: Assessment style inside the PPT with stars)
  {
    id: 19,
    type: 'assessment',
    badge: 'FINISH • Overall assessment of stars',
    title: 'Overall Assessment of Stars',
    subtitle: 'Comprehensive evaluation of your checkpoint performance and answers',
    category: 'summary',
    accentColor: '#f59e0b',
  }
];

interface Lesson5PresentationProps {
  onCompleteChapter: () => void;
}

export const Lesson5Presentation: React.FC<Lesson5PresentationProps> = ({
  onCompleteChapter,
}) => {
  // Navigation State
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  
  // Interactive Quiz State:
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [wrongGuesses, setWrongGuesses] = useState<Record<number, boolean>>({});
  const [earnedStarsMap, setEarnedStarsMap] = useState<Record<number, boolean>>({});
  
  // Reflection Checkbox State for Slide 17
  const [reflections, setReflections] = useState<Record<number, string>>({
    1: 'Confident to move on',
    2: 'Confident to move on',
    3: 'Confident to move on'
  });
  const [reviewBannerNotice, setReviewBannerNotice] = useState<string | null>(null);

  // Presentation Fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const handleSelectNeedsMoreWork = (itemId: number) => {
    setReflections((prev) => ({ ...prev, [itemId]: 'Needs more work' }));
    setReviewBannerNotice('You marked "Needs more work" on benefits. Review the core advantages below before finishing your module!');
    setCurrentSlideIndex(1); // Jump to Slide 2 (Menu/Overview)
  };

  const currentSlide = SLIDES_SEQUENCE[currentSlideIndex];
  const isQuestionSlide = currentSlide.type === 'question';
  const isAssessmentSlide = currentSlide.type === 'assessment';
  
  // Calculate total earned stars
  const earnedStars = Object.values(earnedStarsMap).filter(Boolean).length;
  const currentQId = currentSlide.questionData?.id;
  const hasAnsweredCurrentQuestion = currentQId !== undefined && selectedAnswers[currentQId] !== undefined;

  // Keyboard navigation listener (ArrowRight / ArrowLeft)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // USER REQUIREMENT: students cant move on without completing a quiz question
        if (isQuestionSlide && !hasAnsweredCurrentQuestion) {
          return;
        }
        if (currentSlideIndex < SLIDES_SEQUENCE.length - 1) {
          setCurrentSlideIndex(prev => Math.min(prev + 1, SLIDES_SEQUENCE.length - 1));
        }
      } else if (e.key === 'ArrowLeft') {
        // Obey user's rule: cannot go back if question was answered
        if (!isQuestionSlide || !hasAnsweredCurrentQuestion) {
          if (currentSlideIndex > 0) {
            setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, isQuestionSlide, hasAnsweredCurrentQuestion]);

  // Handle Answer Selection
  // USER REQUIREMENT: "they cant attempt again if they get wrong ans"
  const handleSelectOption = (optionIndex: number) => {
    if (!currentSlide.questionData) return;
    const q = currentSlide.questionData;
    
    // If this question is already answered, it is permanently locked!
    if (selectedAnswers[q.id] !== undefined) {
      return;
    }

    setSelectedAnswers(prev => ({ ...prev, [q.id]: optionIndex }));

    if (optionIndex === q.correctIndex) {
      // Award star for correct answer
      setEarnedStarsMap(prev => ({ ...prev, [q.id]: true }));
      
      // Trigger festive confetti
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#00f5c4', '#38bdf8', '#f59e0b', '#10b981']
      });
    } else {
      // Wrong answer: permanently locked without retry, 0 stars for this checkpoint
      setWrongGuesses(prev => ({ ...prev, [q.id]: true }));
    }
  };

  // Navigation Handlers
  // USER REQUIREMENT: "make sure students cant move on without completing a quiz question"
  const handleNextSlide = useCallback(() => {
    if (isQuestionSlide && !hasAnsweredCurrentQuestion) {
      return; // Block advancement until question is answered
    }
    if (currentSlideIndex < SLIDES_SEQUENCE.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex, isQuestionSlide, hasAnsweredCurrentQuestion]);

  const handlePrevSlide = useCallback(() => {
    if (isQuestionSlide && hasAnsweredCurrentQuestion) {
      return; // Locked per user requirement
    }
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex, isQuestionSlide, hasAnsweredCurrentQuestion]);

  const handleJumpToSlide = (slideId: number) => {
    const targetIdx = SLIDES_SEQUENCE.findIndex(s => s.id === slideId);
    if (targetIdx !== -1) {
      // If currently on an unanswered question, cannot jump forward past it
      if (isQuestionSlide && !hasAnsweredCurrentQuestion && targetIdx > currentSlideIndex) {
        return;
      }
      setCurrentSlideIndex(targetIdx);
    }
  };

  const handleResetPresentation = () => {
    setCurrentSlideIndex(0);
    setSelectedAnswers({});
    setWrongGuesses({});
    setEarnedStarsMap({});
  };

  // Performance Rating Logic
  const getMasteryRating = (stars: number) => {
    if (stars === 5) {
      return {
        title: 'Mastery Level: AI Champion ⭐⭐⭐⭐⭐',
        badge: 'Top Honors • 100% Score',
        color: 'text-amber-400 border-amber-500/50 bg-amber-950/30',
        desc: 'Outstanding mastery! You have successfully mastered all five benefit domains: Fraud Detection, Automated Attendance, Consistent Fatigue Resistance, User Convenience, and Personalized Services.'
      };
    } else if (stars >= 3) {
      return {
        title: 'Mastery Level: Proficient Scholar ⭐⭐⭐⭐',
        badge: 'Competent • Passing Grade',
        color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/30',
        desc: 'Solid achievement! You understand the operational benefits and Bhutanese context of automated recognition systems. Review any missed checkpoints to earn the full 5 stars.'
      };
    } else {
      return {
        title: 'Mastery Level: Developing Explorer ⭐⭐',
        badge: 'Review Recommended',
        color: 'text-rose-400 border-rose-500/50 bg-rose-950/30',
        desc: 'Good start! Re-read the six benefit slides and use the built-in hints to understand why biometric systems excel in repetitive tasks.'
      };
    }
  };

  const mastery = getMasteryRating(earnedStars);

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-[#050811] overflow-y-auto flex flex-col justify-center' : ''}`}>
      
      {/* ----------------- PRESENTATION CONTROL BAR ----------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#090f1d] border border-[#1b2b48] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#00f5c4]/15 border border-[#00f5c4]/30 text-[#00f5c4] flex-shrink-0">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>Class IX DTI • Topic 2</span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-[#00f5c4]">Interactive PowerPoint Deck</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Benefits of AI Recognition Systems</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#14233e] text-cyan-300 font-mono">
                Slide {currentSlideIndex + 1} / {SLIDES_SEQUENCE.length}
              </span>
            </h2>
          </div>
        </div>

        {/* Stars HUD + Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Quick Outline / Home Button */}
          <button
            onClick={() => handleJumpToSlide(2)}
            title="Jump to Section Outline"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d1627] hover:bg-[#162542] text-xs font-semibold text-slate-300 border border-[#21355a] transition-all cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Outline</span>
          </button>

          {/* Real-time Star Assessment HUD */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 transition-all ${
                    s <= earnedStars
                      ? 'fill-amber-400 text-amber-400 scale-110 drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]'
                      : 'text-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-mono font-bold tracking-tight">
              {earnedStars}/5 Stars
            </span>
          </div>

          {/* Fullscreen Mode Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Presentation'}
            className="p-2 rounded-xl bg-[#0d1627] hover:bg-[#162542] text-slate-300 border border-[#21355a] transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Review Notice Banner when student routed back from reflection */}
      {reviewBannerNotice && currentSlideIndex === 1 && (
        <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-200 gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>{reviewBannerNotice}</span>
          </div>
          <button
            onClick={() => {
              setReviewBannerNotice(null);
              setCurrentSlideIndex(16); // Slide 17 (reflection)
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all cursor-pointer whitespace-nowrap"
          >
            Return to Reflection Check →
          </button>
        </div>
      )}

      {/* ----------------- INTERACTIVE WIDESCREEN SLIDE CANVAS (POWERPOINT STYLE) ----------------- */}
      <div className="relative rounded-3xl border-2 border-[#1f3152] bg-gradient-to-b from-[#0a1024] via-[#070b17] to-[#040711] overflow-hidden shadow-2xl">
        {/* Accent Top Border Bar */}
        <div 
          className="h-1.5 w-full transition-all duration-500"
          style={{ backgroundColor: currentSlide.accentColor }}
        />

        <div className="p-6 sm:p-10 space-y-6 sm:space-y-8 min-h-[580px] sm:min-h-[640px] flex flex-col justify-between relative">
          {/* Subtle Presentation Ambient Lights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* 1. SLIDE HEADER (Exact PPT Badges & Slide Indicator) */}
          <div className="space-y-2 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span 
                className="px-3.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border shadow-sm"
                style={{ 
                  color: currentSlide.accentColor, 
                  borderColor: `${currentSlide.accentColor}50`,
                  backgroundColor: `${currentSlide.accentColor}15`
                }}
              >
                {currentSlide.badge}
              </span>

              {/* Slide Counter & Question Indicator */}
              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                <span>SLIDE {currentSlideIndex + 1} OF {SLIDES_SEQUENCE.length}</span>
                {isQuestionSlide && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    <span>Checkpoint (+1 Star)</span>
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {currentSlide.title}
              </h2>
              {currentSlide.subtitle && (
                <p className="text-xs sm:text-sm text-cyan-400/90 font-medium mt-1">
                  {currentSlide.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* 2. SLIDE BODY CONTENT (Exact Content from PPT) */}
          <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-center py-2">
            
            {/* ---------------- SLIDE 1: INTRO TITLE SLIDE ---------------- */}
            {currentSlide.type === 'intro' && (
              <div className="space-y-6 max-w-4xl">
                {currentSlide.paragraphs && currentSlide.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                    {p}
                  </p>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || Zap;
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-[#091224] border border-[#18263f] hover:border-[#00f5c4]/40 transition-all space-y-2 shadow-sm">
                        <div className={`p-2.5 rounded-xl bg-slate-900 w-fit ${pt.color || 'text-cyan-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-white text-sm">{pt.title}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{pt.text}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleNextSlide}
                    className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#00f5c4] text-[#080d19] hover:bg-[#00e0b3] shadow-[0_0_20px_rgba(0,245,196,0.3)] transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
                  >
                    <span>START LEARNING →</span>
                  </button>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 2: OUTLINE MENU (Clickable Topic Jumps) ---------------- */}
            {currentSlide.type === 'menu' && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-300">
                  Click any topic card below to jump directly, or click <strong>Next</strong> to progress through the lesson in exact order:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                  {[
                    { num: '01', title: 'Why Recognition Systems?', desc: 'Faster, safer, easier living and pattern recognition', slideId: 3, icon: BrainCircuit, color: 'text-teal-400' },
                    { num: '02', title: 'Speed & Reduced Effort', desc: 'Benefit 1 • Rapid processing without repetitive errors', slideId: 4, icon: Zap, color: 'text-emerald-400' },
                    { num: '03', title: 'Security & Biometrics', desc: 'Benefit 2 • Faces, fingerprints & unforgeable identity', slideId: 5, icon: ShieldCheck, color: 'text-cyan-400' },
                    { num: '04', title: 'Fraud & Unusual Behaviour', desc: 'Benefit 3 • Anomaly alerts & data quality importance', slideId: 6, icon: Sparkles, color: 'text-indigo-400' },
                    { num: '05', title: 'Consistent Performance', desc: 'Benefit 4 • 24/7 reliability without cognitive fatigue', slideId: 7, icon: TrendingUp, color: 'text-teal-300' },
                    { num: '06', title: 'Convenience', desc: 'Benefit 5 • Face unlock & frictionless authentication', slideId: 8, icon: UserCheck, color: 'text-amber-400' },
                    { num: '07', title: 'Personalized Services', desc: 'Benefit 6 • Learning preferences & adaptive experiences', slideId: 9, icon: Sparkles, color: 'text-pink-400' },
                    { num: '08', title: 'Bhutan: Phuentsholing AICS', desc: 'Real-world border pedestrian terminal biometrics', slideId: 11, icon: Building2, color: 'text-emerald-400' },
                    { num: '09', title: 'Final Star Assessment', desc: 'Overall star rating and mastery evaluation', slideId: 19, icon: Award, color: 'text-amber-400' }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.num}
                        onClick={() => handleJumpToSlide(item.slideId)}
                        className="p-4 rounded-2xl bg-[#0a1226] border border-[#1b2b48] hover:border-[#00f5c4] hover:bg-[#0e1a36] text-left transition-all duration-200 group flex items-start gap-3 cursor-pointer shadow-sm hover:scale-[1.01]"
                      >
                        <div className={`p-2 rounded-xl bg-slate-900 ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-cyan-400 font-bold">{item.num}</span>
                            <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-[#00f5c4] transition-colors">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------- SLIDES 3-9: CORE CONTENT & BENEFITS 1-6 ---------------- */}
            {currentSlide.type === 'content' && (
              <div className="space-y-6 max-w-4xl">
                {/* Main PPT Statement Box */}
                {currentSlide.paragraphs && currentSlide.paragraphs.map((p, idx) => (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#0d172e] border border-[#1f3152] shadow-sm">
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-light">
                      {p}
                    </p>
                  </div>
                ))}

                {/* Key Points Grid */}
                {currentSlide.keyPoints && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSlide.keyPoints.map((pt, idx) => {
                      const Icon = pt.icon || ShieldCheck;
                      return (
                        <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#091224] border border-[#192742] space-y-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`p-2 rounded-xl bg-slate-900 ${pt.color || 'text-cyan-400'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-white text-sm">{pt.title}</h3>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed pl-1">
                            {pt.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ---------------- SLIDES 10, 12, 14, 15, 16: INTERACTIVE QUIZ & STAR CHECKPOINTS ---------------- */}
            {isQuestionSlide && currentSlide.questionData && (
              <div className="space-y-5 max-w-3xl">
                {/* Scenario Banner */}
                {currentSlide.questionData.scenario && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#091325] border border-[#1c2e4e] space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Situation / Scenario:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                      "{currentSlide.questionData.scenario}"
                    </p>
                  </div>
                )}

                {/* Question Prompt */}
                <h3 className="text-sm sm:text-lg font-bold text-white leading-snug">
                  {currentSlide.questionData.question}
                </h3>

                {/* 4 Interactive Option Buttons (A, B, C, D) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {currentSlide.questionData.options.map((opt, optIdx) => {
                    const qId = currentSlide.questionData!.id;
                    const isSelected = selectedAnswers[qId] === optIdx;
                    const isCorrect = optIdx === currentSlide.questionData!.correctIndex;
                    const hasAnswered = selectedAnswers[qId] !== undefined;

                    let btnStyle = 'bg-[#091224] border-[#1d2d4c] text-slate-200 hover:border-[#00f5c4]/60 hover:bg-[#0e1a36] cursor-pointer';

                    if (hasAnswered) {
                      if (isSelected && isCorrect) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-not-allowed';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/40 border-rose-400 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)] cursor-not-allowed';
                      } else if (!isSelected && isCorrect && selectedAnswers[qId] !== undefined) {
                        btnStyle = 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300/80 cursor-not-allowed';
                      } else {
                        btnStyle = 'bg-[#091224]/50 border-slate-800 text-slate-500 opacity-50 cursor-not-allowed';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnswered}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected && isCorrect 
                            ? 'bg-emerald-400 text-slate-950'
                            : isSelected && !isCorrect
                            ? 'bg-rose-400 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Inline PPT Feedback Box (Appears directly inside the slide) */}
                {hasAnsweredCurrentQuestion && (
                  <div className="pt-2 animate-fadeIn space-y-3">
                    {selectedAnswers[currentQId!] === currentSlide.questionData.correctIndex ? (
                      /* Correct Feedback Box */
                      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <span>CORRECT! Great thinking!</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-amber-300" />
                            <span>+1 Star Awarded</span>
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed pl-7">
                          {currentSlide.questionData.explanation}
                        </p>
                      </div>
                    ) : (
                      /* Incorrect / Attempt Locked Box (USER REQUIREMENT: cannot attempt again) */
                      <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/25 border border-rose-500/50 space-y-2.5 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            <span>INCORRECT • Attempt Locked</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-900 border border-rose-500/40 text-rose-300">
                            0 Stars Awarded
                          </span>
                        </div>
                        
                        <p className="text-xs text-rose-200 leading-relaxed pl-7">
                          You selected Option {String.fromCharCode(65 + selectedAnswers[currentQId!])}. In this assessment, questions cannot be re-attempted.
                        </p>

                        <div className="p-3.5 rounded-xl bg-[#090f1e] border border-[#1b2b48] space-y-2 text-xs text-slate-300 pl-3">
                          <div className="flex items-center gap-2 text-[#00f5c4] font-semibold text-xs">
                            <Check className="w-4 h-4" />
                            <span>Correct Answer: Option {String.fromCharCode(65 + currentSlide.questionData.correctIndex)}: {currentSlide.questionData.options[currentSlide.questionData.correctIndex]}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed text-[11px]">
                            {currentSlide.questionData.explanation}
                          </p>
                          <div className="pt-1 flex items-start gap-1.5 text-amber-300 text-[11px]">
                            <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
                            <span>{currentSlide.questionData.hint}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ---------------- SLIDE 17: TEXTBOOK SELF-EVALUATION (Confidence Check) ---------------- */}
            {currentSlide.type === 'reflection' && (
              <div className="space-y-5 max-w-3xl">
                <p className="text-xs sm:text-sm text-slate-300">
                  Select your confidence level for each Class IX curriculum learning outcome:
                </p>

                <div className="space-y-3">
                  {[
                    { id: 1, title: 'Explain the 6 core benefits of AI recognition systems with real-world examples.' },
                    { id: 2, title: 'Analyze how biometric gates support security and convenience in Bhutan (Phuentsholing AICS).' },
                    { id: 3, title: 'Understand why automated models can work consistently without fatigue.' }
                  ].map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#0a1224] border border-[#1b2b48] space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#00f5c4]/20 border border-[#00f5c4] flex items-center justify-center text-[#00f5c4] font-mono text-xs flex-shrink-0 mt-0.5">
                          {item.id}
                        </div>
                        <p className="text-xs sm:text-sm text-white font-medium">
                          {item.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap pl-8">
                        <button
                          onClick={() => handleSelectNeedsMoreWork(item.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            reflections[item.id] === 'Needs more work'
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          🟡 Needs more work
                        </button>

                        <button
                          onClick={() => setReflections((prev) => ({ ...prev, [item.id]: 'Getting there' }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            reflections[item.id] === 'Getting there'
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          🔵 Getting there
                        </button>

                        <button
                          onClick={() => setReflections((prev) => ({ ...prev, [item.id]: 'Confident to move on' }))}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            reflections[item.id] === 'Confident to move on'
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          🟢 Confident to move on
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* USER REQUIREMENT: Preview on the lesson when students select "Getting there" */}
                {Object.values(reflections).some((v) => v === 'Getting there') && (
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/50 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Lesson 5 Benefits Preview & Core Recap</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Quick Summary
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      Review these key benefits before moving forward:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00f5c4] font-bold">1. Speed & Efficiency</span>
                        <div className="font-bold text-white">Sub-Second Processing</div>
                        <p className="text-[11px] text-slate-400">Verifies hundreds of commuters simultaneously without human cognitive fatigue.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00f5c4] font-bold">2. Biometric Security</span>
                        <div className="font-bold text-white">Impossible to Forge</div>
                        <p className="text-[11px] text-slate-400">Biological indicators cannot be lost, loaned to peers, or stolen like badges.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00f5c4] font-bold">3. 24/7 Consistency</span>
                        <div className="font-bold text-white">Zero Cognitive Exhaustion</div>
                        <p className="text-[11px] text-slate-400">Maintains identical precision across day and night security monitoring.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-[#00f5c4] font-bold">4. Phuentsholing Case</span>
                        <div className="font-bold text-white">Automated Pedestrian Gates</div>
                        <p className="text-[11px] text-slate-400">High-speed identity checking clears thousands of daily border crossings.</p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-cyan-500/20">
                      <button
                        onClick={() => setCurrentSlideIndex(1)} // Jump to Slide 2
                        className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Review Full Benefits Deck (Slide 2)</span>
                      </button>

                      <button
                        onClick={() => setCurrentSlideIndex(17)} // Advance to Slide 18
                        className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_12px_rgba(0,245,196,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>I'm Ready: View Summary & Stars →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ---------------- SLIDE 18: FINISH & TRANSITION TO LIMITATIONS ---------------- */}
            {currentSlide.type === 'finish' && (
              <div className="space-y-6 max-w-4xl">
                {currentSlide.paragraphs && currentSlide.paragraphs.map((p, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#0a1122] border border-[#192843]">
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                      {p}
                    </p>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || ShieldCheck;
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-[#091224] border border-[#18263f] flex items-start gap-3">
                        <div className={`p-2 rounded-xl bg-slate-900 ${pt.color || 'text-rose-400'} flex-shrink-0 mt-0.5`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-sm">{pt.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{pt.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 19: OVERALL ASSESSMENT OF STARS (USER REQUIREMENT) ---------------- */}
            {isAssessmentSlide && (
              <div className="space-y-6 max-w-4xl">
                {/* Big Glowing Stars Display */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c162e] to-[#070c17] border-2 border-amber-500/40 text-center space-y-4 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((starNum) => {
                      const isEarned = starNum <= earnedStars;
                      return (
                        <div
                          key={starNum}
                          className={`p-2.5 sm:p-3.5 rounded-2xl transition-all ${
                            isEarned
                              ? 'bg-amber-500/20 border border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110'
                              : 'bg-slate-900/60 border border-slate-800 text-slate-700'
                          }`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-10 sm:h-10 ${
                              isEarned ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase tracking-wider ${mastery.color}`}>
                      {mastery.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {mastery.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                      {mastery.desc}
                    </p>
                  </div>

                  {/* Score Bar */}
                  <div className="max-w-md mx-auto pt-2 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Total Stars Achieved:</span>
                      <span className="text-amber-400 font-bold">{earnedStars} / 5 Stars ({Math.round((earnedStars / 5) * 100)}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-[#00f5c4] rounded-full transition-all duration-700"
                        style={{ width: `${(earnedStars / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary of 5 Checkpoint Questions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Assessment Checkpoints Breakdown:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { qId: 1, title: 'Bank Unusual Behaviour', topic: 'Security & Fraud Prevention', slideIdx: 9 },
                      { qId: 2, title: 'School Fingerprint Attendance', topic: 'Automated Identity Checks', slideIdx: 11 },
                      { qId: 3, title: 'Consistent AI Performance', topic: 'Fatigue Resistance', slideIdx: 13 },
                      { qId: 4, title: 'Everyday Convenience', topic: 'Face Unlock & Frictionless Use', slideIdx: 14 },
                      { qId: 5, title: 'Preference Learning', topic: 'Personalized Services', slideIdx: 15 }
                    ].map((cp) => {
                      const targetSlide = SLIDES_SEQUENCE[cp.slideIdx];
                      const qInfo = targetSlide?.questionData;
                      const isCorrect = selectedAnswers[cp.qId] === qInfo?.correctIndex;
                      const wasAnswered = selectedAnswers[cp.qId] !== undefined;

                      return (
                        <div
                          key={cp.qId}
                          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                            isCorrect
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                              : wasAnswered
                              ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                              : 'bg-[#080d19] border-[#18263f] text-slate-400'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              Checkpoint {cp.qId} • {cp.topic}
                            </span>
                            <p className="font-semibold text-white text-[11px] leading-tight">
                              {cp.title}
                            </p>
                          </div>

                          {isCorrect ? (
                            <div className="flex items-center gap-1 text-amber-400 font-mono font-bold flex-shrink-0">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>+1</span>
                            </div>
                          ) : wasAnswered ? (
                            <span className="text-rose-400 text-[10px] font-mono font-bold flex-shrink-0">Try Again</span>
                          ) : (
                            <span className="text-slate-500 text-[10px] font-mono flex-shrink-0">Skipped</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Actions on Assessment Slide */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleResetPresentation}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-xs bg-[#0b1325] text-slate-300 border border-[#21355a] hover:bg-[#121e38] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-cyan-400" />
                    <span>Retake Presentation & Star Challenges</span>
                  </button>

                  <button
                    onClick={onCompleteChapter}
                    className="w-full sm:flex-1 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_20px_rgba(0,245,196,0.3)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
                  >
                    <span>Proceed to Chapter 10 Final Diagnostic Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. SLIDE FOOTER NAVIGATION CONTROLS */}
          {/* CRITICAL USER REQUIREMENT:
              "put in next but remove the back button after the question and answer under the ppt."
              - When on a question slide AND the user has answered, the Back button is REMOVED!
              - On assessment slide, the Back button is REMOVED!
              - Sequential progression prevents any desynchronization.
          */}
          <div className="pt-4 border-t border-[#152238] flex items-center justify-between relative z-10 gap-3">
            {/* Back Button or Lock Status */}
            <div>
              {!isQuestionSlide && !isAssessmentSlide ? (
                <button
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    currentSlideIndex === 0
                      ? 'text-slate-600 opacity-40 cursor-not-allowed'
                      : 'bg-[#090f1d] hover:bg-[#121c33] text-slate-300 border border-[#1b2b48]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : isQuestionSlide && !hasAnsweredCurrentQuestion ? (
                <button
                  onClick={handlePrevSlide}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#090f1d] hover:bg-[#121c33] text-slate-300 border border-[#1b2b48] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : isQuestionSlide && hasAnsweredCurrentQuestion ? (
                /* USER REQUIREMENT: "remove the back button after the question and answer under the ppt." */
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <Check className="w-3.5 h-3.5" />
                  <span>Answer confirmed • Proceed with Next</span>
                </div>
              ) : (
                <div className="text-[11px] font-mono text-amber-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Overall Assessment Complete</span>
                </div>
              )}
            </div>

            {/* Interactive Slide Thumbnail Stepper Dots */}
            <div className="hidden md:flex items-center gap-1.5">
              {SLIDES_SEQUENCE.map((s, idx) => {
                const isActive = idx === currentSlideIndex;
                const isQ = s.type === 'question';
                const isQAnswered = s.questionData && selectedAnswers[s.questionData.id] !== undefined;
                const isQCorrect = s.questionData && selectedAnswers[s.questionData.id] === s.questionData.correctIndex;

                let dotColor = 'bg-slate-700/80 hover:bg-slate-500';
                if (isActive) dotColor = 'bg-[#00f5c4] w-6 shadow-[0_0_8px_#00f5c4]';
                else if (isQ && isQCorrect) dotColor = 'bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.5)]';
                else if (isQ && isQAnswered) dotColor = 'bg-rose-400';
                else if (idx < currentSlideIndex) dotColor = 'bg-cyan-500/60';

                return (
                  <button
                    key={s.id}
                    onClick={() => handleJumpToSlide(s.id)}
                    title={`Slide ${s.id}: ${s.title}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${dotColor} ${
                      isActive ? 'w-6' : 'w-1.5'
                    }`}
                  />
                );
              })}
            </div>

            {/* Next Slide Button */}
            <div>
              {!isAssessmentSlide ? (
                <button
                  onClick={handleNextSlide}
                  disabled={isQuestionSlide && !hasAnsweredCurrentQuestion}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isQuestionSlide && !hasAnsweredCurrentQuestion
                      ? 'bg-[#0f172a] text-slate-500 border border-slate-700/60 opacity-60 cursor-not-allowed shadow-none'
                      : 'bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.25)] hover:scale-[1.02] active:scale-95 cursor-pointer'
                  }`}
                >
                  <span>
                    {isQuestionSlide && !hasAnsweredCurrentQuestion
                      ? 'Answer Question to Unlock Next'
                      : currentSlideIndex === SLIDES_SEQUENCE.length - 2
                      ? 'View Overall Assessment →'
                      : 'Next Slide'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onCompleteChapter}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Proceed to Diagnostic Exam</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
