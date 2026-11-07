import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, ShieldAlert, Check, 
  CheckCircle2, XCircle, ArrowRight, Lightbulb,
  Building2, BrainCircuit, Maximize2, Minimize2,
  Home, RotateCcw, AlertTriangle, EyeOff, DollarSign,
  Briefcase, PowerOff, HelpCircle, Award, BookOpen,
  Eye, RefreshCw, AlertCircle
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

export interface Lesson6Slide {
  id: number;
  type: 'intro' | 'menu' | 'content' | 'question' | 'reflection' | 'finish' | 'assessment';
  badge: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  keyPoints?: { title: string; text: string; icon?: React.ElementType; color?: string }[];
  questionData?: SlideQuestion;
  targetSlideId?: number;
  accentColor: string;
}

/**
 * 20 Sequenced Slides covering all 31 slides from Link 2 (ai recognation limitation.pptx):
 * - Slide 1: Title Slide (Topic 2: Limitations)
 * - Slide 2: Outline Menu (Accuracy, Privacy, Cost, Jobs, Dependence, Context, Quiz)
 * - Slide 3: Is AI Recognition Always Correct? (Overview of all 6 limits)
 * - Slide 4: Limitation 1 - Accuracy Issues (Lighting, noise, bias)
 * - Slide 5: Limitation 2 - Privacy and Ethics (Sensitive biometric theft)
 * - Slide 6: Limitation 3 - High Cost (Expensive hardware and maintenance)
 * - Slide 7: Limitation 4 - Job Displacement (Automation replacing human roles)
 * - Slide 8: Limitation 5 - Overdependence (Power outages and system failures)
 * - Slide 9: Limitation 6 - Limited Understanding (Pattern without context)
 * - Slide 10: Checkpoint 1 (THINK: Why did it fail? Dark room camera)
 * - Slide 11: Checkpoint 2 (INTERACT: Identify ethical issue - weak face protection)
 * - Slide 12: Bhutan Context (Phuentsholing AICS & Responsible Management)
 * - Slide 13: Checkpoint 3 (APPLY: Responsible use and failure planning)
 * - Slide 14: Final Quiz Intro (Limitations section)
 * - Slide 15: Checkpoint 4 (QUIZ 1: Factors causing errors - poor lighting)
 * - Slide 16: Checkpoint 5 (QUIZ 2: Why biometric privacy is important)
 * - Slide 17: Checkpoint 6 (QUIZ 3: Meaning of overdependence)
 * - Slide 18: Self-Evaluation Reflection (4 curriculum confidence checks)
 * - Slide 19: Chapter 10 Complete & Ethical Review
 * - Slide 20: Overall Star Assessment (Earn up to 6 stars!)
 */
export const LESSON6_SLIDES_SEQUENCE: Lesson6Slide[] = [
  // SLIDE 1: Title
  {
    id: 1,
    type: 'intro',
    badge: 'TOPIC 2 • LIMITATIONS & ETHICS',
    title: 'Limitations of AI Recognition Systems',
    subtitle: 'Accuracy, Privacy, Bias, Cost, Jobs, Dependence and Responsible Use',
    paragraphs: [
      'Welcome to Lesson 6! While AI recognition systems deliver speed, security, and convenience, they also have important real-world limitations and ethical challenges that must be evaluated.',
      'In this interactive presentation, you will analyze why systems fail, examine the social impacts of automation, and test your understanding across 6 checkpoint questions to earn stars!'
    ],
    keyPoints: [
      { title: 'The 6 Core Limitations', text: 'Accuracy issues, privacy risks, high costs, job displacement, overdependence, and limited contextual understanding.', icon: AlertTriangle, color: 'text-rose-400' },
      { title: 'Bhutan & Border Context', text: 'Balancing automated immigration gates at Phuentsholing with backup procedures and citizen privacy.', icon: Building2, color: 'text-cyan-400' },
      { title: 'Earn Up to 6 Stars', text: 'Complete scenario challenges directly inside the slides without multiple attempts.', icon: Star, color: 'text-amber-400' }
    ],
    accentColor: '#ff6b6b',
  },

  // SLIDE 2: Menu / Outline
  {
    id: 2,
    type: 'menu',
    badge: 'INTERACTIVE NAVIGATION • TOPIC 2 OUTLINE',
    title: 'Explore the Limitations of AI Recognition',
    subtitle: 'Click any section to study, or follow the sequenced curriculum',
    paragraphs: [
      'Recognition systems perform well under controlled lab environments, but real-world deployment reveals severe physical, societal, and mathematical constraints.'
    ],
    keyPoints: [
      { title: '1. Accuracy & Noise', text: 'Poor lighting, camera angles, noise, and demographic training bias.', icon: AlertTriangle, color: 'text-rose-400' },
      { title: '2. Privacy & Ethics', text: 'Sensitive biometric identifiers cannot be changed if hacked.', icon: EyeOff, color: 'text-orange-400' },
      { title: '3. High Capital Cost', text: 'Expensive infrared hardware, GPU compute, and ongoing calibration.', icon: DollarSign, color: 'text-amber-400' },
      { title: '4. Job Displacement', text: 'Automation replacing manual security guards and desk clerks.', icon: Briefcase, color: 'text-blue-400' },
      { title: '5. Overdependence', text: 'Critical infrastructure freezing when internet or electricity drops.', icon: PowerOff, color: 'text-purple-400' },
      { title: '6. Limited Context', text: 'Mathematical pattern correlation without human common sense.', icon: BrainCircuit, color: 'text-indigo-400' }
    ],
    accentColor: '#f97316',
  },

  // SLIDE 3: Is AI Always Correct?
  {
    id: 3,
    type: 'content',
    badge: 'CORE CONCEPT • OVERVIEW',
    title: 'Is AI Recognition Always Correct?',
    subtitle: 'Why automated classification systems make errors',
    paragraphs: [
      'AI systems do not possess genuine human vision. Instead, they run complex statistical approximations over pixel brightness values and acoustic soundwaves.',
      'When real-world conditions vary from the training dataset, errors occur. A slight drop in room lighting, lens smudges, facial hair, or aging can drop accuracy below acceptable thresholds.'
    ],
    keyPoints: [
      { title: 'False Positives', text: 'Granting entry to an unauthorized stranger by mistake.', icon: AlertTriangle, color: 'text-rose-400' },
      { title: 'False Negatives', text: 'Denying entry to an authorized user due to bad lighting.', icon: EyeOff, color: 'text-amber-400' }
    ],
    accentColor: '#f43f5e',
  },

  // SLIDE 4: Limitation 1 - Accuracy Issues
  {
    id: 4,
    type: 'content',
    badge: 'LIMITATION 1 • ACCURACY ISSUES',
    title: 'Accuracy Issues & Environmental Noise',
    subtitle: 'Lighting conditions, camera angles, noise, and demographic bias',
    paragraphs: [
      'In a dark hallway or under intense glare, camera sensors fail to collect enough distinct photons. Algorithms cannot extract sharp geometric landmark points.',
      'Additionally, if training datasets lack diversity across different age groups, ethnicities, or facial shapes, the AI model will exhibit high error rates for underrepresented populations.'
    ],
    keyPoints: [
      { title: 'Low Lighting & Glare', text: 'Shadows obscure nose bridge and eye socket coordinates.', icon: AlertTriangle, color: 'text-rose-400' },
      { title: 'Algorithmic Bias', text: 'Models trained on skewed datasets perform poorly on diverse groups.', icon: BrainCircuit, color: 'text-amber-400' }
    ],
    accentColor: '#f43f5e',
  },

  // SLIDE 5: Limitation 2 - Privacy and Ethics
  {
    id: 5,
    type: 'content',
    badge: 'LIMITATION 2 • PRIVACY AND ETHICS',
    title: 'Privacy Concerns & Biometric Vulnerability',
    subtitle: 'Biometric indicators are sensitive, permanent, and irreplaceable',
    paragraphs: [
      'Unlike a compromised email password or physical credit card, you cannot change your face, retinas, or fingerprints if a database is breached.',
      'When corporations or governments store citizen face matrices on unencrypted servers, individuals risk lifelong identity impersonation and unauthorized mass surveillance.'
    ],
    keyPoints: [
      { title: 'Irreplaceable Identifiers', text: 'You cannot reset your biological face after a server leak.', icon: EyeOff, color: 'text-orange-400' },
      { title: 'Lack of Informed Consent', text: 'Public cameras scanning citizens without clear disclosure.', icon: ShieldAlert, color: 'text-rose-400' }
    ],
    accentColor: '#f97316',
  },

  // SLIDE 6: Limitation 3 - High Cost
  {
    id: 6,
    type: 'content',
    badge: 'LIMITATION 3 • HIGH COST',
    title: 'High Capital & Operational Cost',
    subtitle: 'Specialized hardware, continuous GPU servers, and technical upkeep',
    paragraphs: [
      'Enterprise recognition deployments require high-resolution 4K optical cameras, infrared depth emitters, and expensive GPU server racks.',
      'Small schools, remote rural hospitals, and developing communities often cannot afford the initial hardware or the recurring calibration expenses.'
    ],
    keyPoints: [
      { title: 'Hardware Infrastructure', text: 'Thermal sensors, optical lenses, and gigabit networking.', icon: DollarSign, color: 'text-amber-400' },
      { title: 'Maintenance & Licensing', text: 'Routine dataset retraining, security audits, and power draw.', icon: Award, color: 'text-yellow-400' }
    ],
    accentColor: '#eab308',
  },

  // SLIDE 7: Limitation 4 - Job Displacement
  {
    id: 7,
    type: 'content',
    badge: 'LIMITATION 4 • JOB DISPLACEMENT',
    title: 'Workforce Shifts & Job Displacement',
    subtitle: 'Automation replacing entry-level human monitoring roles',
    paragraphs: [
      'Automated airport e-gates, smart tollbooths, and biometric office turnstiles directly replace human security guards, ticket collectors, and attendance clerks.',
      'While new tech jobs emerge for machine learning engineers, displaced low-skilled workers face unemployment unless provided with reskilling programs.'
    ],
    keyPoints: [
      { title: 'Automated Roles', text: 'Traditional security checkpoints, cashiers, and identity inspectors.', icon: Briefcase, color: 'text-blue-400' },
      { title: 'Need for Reskilling', text: 'Societies must help displaced workers transition into digital maintenance roles.', icon: BrainCircuit, color: 'text-cyan-400' }
    ],
    accentColor: '#3b82f6',
  },

  // SLIDE 8: Limitation 5 - Overdependence
  {
    id: 8,
    type: 'content',
    badge: 'LIMITATION 5 • OVERDEPENDENCE',
    title: 'Overdependence & Outage Risks',
    subtitle: 'Power failures, software loops, and the need for manual backup',
    paragraphs: [
      'If an organization relies solely on AI recognition without manual backups, a simple power blackout, internet disconnect, or software glitch can freeze critical building doors, hospital wards, or border crossings.',
      'Organisations must always plan manual override keys, paper logs, and trained human personnel to manage emergencies responsibly.'
    ],
    keyPoints: [
      { title: 'Single Point of Failure', text: 'Server crashes or power cutoffs can lock thousands of users outside facilities.', icon: PowerOff, color: 'text-rose-400' },
      { title: 'Manual Overrides', text: 'Every automated door or border lane requires fail-safe manual key procedures.', icon: Check, color: 'text-emerald-400' }
    ],
    accentColor: '#9333ea',
  },

  // SLIDE 9: Limitation 6 - Limited Understanding
  {
    id: 9,
    type: 'content',
    badge: 'LIMITATION 6 • LIMITED UNDERSTANDING',
    title: 'Limited Contextual Understanding',
    subtitle: 'AI matches statistical pixels, not human wisdom or meaning',
    paragraphs: [
      'AI recognition algorithms excel at comparing numbers and pixel matrices, but they cannot truly understand human context, cultural nuances, sarcasm, or emergency exceptions.',
      'For example, a facial recognition camera cannot distinguish between an actor holding a prop weapon in a play and a real security threat without human judgment.'
    ],
    keyPoints: [
      { title: 'Pattern vs Comprehension', text: 'Mathematical vector correlation is not genuine comprehension.', icon: BrainCircuit, color: 'text-indigo-400' },
      { title: 'Human in the Loop', text: 'High-stakes decisions must keep human operators in authority.', icon: Award, color: 'text-[#00f5c4]' }
    ],
    accentColor: '#6366f1',
  },

  // SLIDE 10: Checkpoint 1 - Why did it fail? (Dark Room)
  {
    id: 10,
    type: 'question',
    badge: 'CHECKPOINT 1 • THINK: WHY DID IT FAIL?',
    title: 'THINK • Why Did the System Fail?',
    subtitle: 'Evaluate how sensory conditions degrade recognition accuracy',
    questionData: {
      id: 1,
      badge: 'CHECKPOINT 1',
      scenario: 'A face-recognition camera performs poorly in a dark room.',
      question: 'Which limitation best explains the problem?',
      options: [
        'A. High cost only',
        'B. Poor lighting affecting accuracy',
        'C. Personalised service',
        'D. Faster processing'
      ],
      correctIndex: 1,
      hint: 'Hint: The problem is with the physical quality of the visual input. Without photons, the camera sensor cannot extract facial landmark vectors.',
      explanation: 'CORRECT! Poor lighting can make it harder for a recognition system to extract useful features accurately. Understanding WHY matters more than memorising.',
      topic: 'Sensory Degradation & Poor Lighting'
    },
    accentColor: '#f43f5e',
  },

  // SLIDE 11: Checkpoint 2 - Identify the ethical issue
  {
    id: 11,
    type: 'question',
    badge: 'CHECKPOINT 2 • INTERACT: ETHICAL RISKS',
    title: 'INTERACT • Identify the Ethical Issue',
    subtitle: 'Analyze the consequence of weakly secured biometric databases',
    questionData: {
      id: 2,
      badge: 'CHECKPOINT 2',
      scenario: 'A company stores customers\' face data but does not protect it properly.',
      question: 'What risk is most directly involved?',
      options: [
        'A. Identity theft or impersonation',
        'B. Faster processing',
        'C. Convenience',
        'D. Reduced hardware cost'
      ],
      correctIndex: 0,
      hint: 'Hint: Focus on the consequence of stolen biometric data. Unlike passwords, people cannot change their biometric features.',
      explanation: 'CORRECT! Biometric data is sensitive, so weak protection creates severe privacy and identity risks. If leaked, victims face permanent impersonation.',
      topic: 'Biometric Data Privacy'
    },
    accentColor: '#f97316',
  },

  // SLIDE 12: Bhutan Context
  {
    id: 12,
    type: 'content',
    badge: 'BHUTAN CONTEXT • REGIONAL CASE STUDY',
    title: 'Bhutan Context : Automated Identity Checking',
    subtitle: 'Phuentsholing Automated Pedestrian Terminal (AICS)',
    paragraphs: [
      'The Phuntsholing Automated Identification & Clearance System (AICS) example highlights how automated recognition can improve cross-border identity verification speed while maintaining security.',
      'However, responsible implementation in Bhutan requires strict citizen privacy encryption, fail-safe manual immigration officer counters, and fair demographic accuracy for all visitors.'
    ],
    keyPoints: [
      { title: 'Operational Efficiency', text: 'Clearing thousands of daily border commuters with minimal wait times.', icon: Building2, color: 'text-cyan-400' },
      { title: 'Responsible Safeguards', text: 'Securing biometric databases with state-level encryption and manual lanes.', icon: ShieldAlert, color: 'text-emerald-400' }
    ],
    accentColor: '#00f5c4',
  },

  // SLIDE 13: Checkpoint 3 - Responsible use
  {
    id: 13,
    type: 'question',
    badge: 'CHECKPOINT 3 • APPLY: RESPONSIBLE USE',
    title: 'APPLY • Responsible Management',
    subtitle: 'Balancing technological power with human welfare',
    questionData: {
      id: 3,
      badge: 'CHECKPOINT 3',
      scenario: 'Designing policies for public biometric surveillance or immigration gates.',
      question: 'Which action best supports responsible management of a biometric recognition system?',
      options: [
        'A. Ignore security because AI is accurate',
        'B. Protect sensitive data and plan for system failures',
        'C. Collect unlimited data without purpose',
        'D. Assume the system understands every situation'
      ],
      correctIndex: 1,
      hint: 'Hint: Responsible use means actively protecting citizen rights and preparing backup protocols for inevitable system limitations.',
      explanation: 'CORRECT! Great thinking! Responsible management includes strong data security, ethical privacy policies, and contingency plans for outages.',
      topic: 'Responsible AI Governance'
    },
    accentColor: '#10b981',
  },

  // SLIDE 14: Final Quiz Intro
  {
    id: 14,
    type: 'content',
    badge: 'FINAL QUIZ • LIMITATIONS SECTION',
    title: 'Final Checkpoint Quiz : Limitations',
    subtitle: 'Answer scenarios on error factors, privacy, and overdependence',
    paragraphs: [
      'You are now entering the final limitations checkpoint. Review the concepts of lighting conditions, sensitive biometric indicators, and backup procedures.'
    ],
    keyPoints: [
      { title: 'Single-Attempt Rule', text: 'Read each prompt carefully. Answers are confirmed on your first selection.', icon: AlertTriangle, color: 'text-amber-400' },
      { title: 'Earn Stars 4, 5, & 6', text: 'Score correct answers across Quiz 1, Quiz 2, and Quiz 3 to maximize your mastery rating.', icon: Star, color: 'text-yellow-400' }
    ],
    accentColor: '#f59e0b',
  },

  // SLIDE 15: Checkpoint 4 (QUIZ 1 - Lighting Errors)
  {
    id: 15,
    type: 'question',
    badge: 'FINAL QUIZ • QUIZ 1 • CHECKPOINT 4',
    title: 'QUIZ 1 : Factors Causing Recognition Errors',
    subtitle: 'Identifying environmental obstacles to computer vision',
    questionData: {
      id: 4,
      badge: 'QUIZ 1',
      scenario: 'Analyzing factors that degrade visual data quality in public spaces.',
      question: 'Which factor can cause recognition errors?',
      options: [
        'A. Poor lighting',
        'B. Perfect data quality',
        'C. Consistent performance',
        'D. User convenience'
      ],
      correctIndex: 0,
      hint: 'Hint: Choose the condition that makes visual camera frames harder to process.',
      explanation: 'CORRECT! Poor lighting can reduce visual quality and cause recognition errors. Lighting, blur, and angles are physical limitations of camera sensors.',
      topic: 'Environmental Lighting Obstacles'
    },
    accentColor: '#38bdf8',
  },

  // SLIDE 16: Checkpoint 5 (QUIZ 2 - Biometric Privacy)
  {
    id: 16,
    type: 'question',
    badge: 'FINAL QUIZ • QUIZ 2 • CHECKPOINT 5',
    title: 'QUIZ 2 : Why Is Biometric Privacy Important?',
    subtitle: 'Understanding the unique nature of human physiological data',
    questionData: {
      id: 5,
      badge: 'QUIZ 2',
      scenario: 'Contrasting numeric bank passwords against physiological biometric templates.',
      question: 'Why is biometric privacy important?',
      options: [
        'A. Biometric data is sensitive',
        'B. Biometric data is always public',
        'C. Biometric data cannot identify people',
        'D. Biometric data has no security value'
      ],
      correctIndex: 0,
      hint: 'Hint: The textbook describes biometric data as highly sensitive because it is tied directly to a human body and cannot be altered if leaked.',
      explanation: 'CORRECT! Biometric data is sensitive! Misuse or theft of biological markers can lead to permanent identity theft or impersonation.',
      topic: 'Sensitive Biometric Data'
    },
    accentColor: '#fb7185',
  },

  // SLIDE 17: Checkpoint 6 (QUIZ 3 - Overdependence)
  {
    id: 17,
    type: 'question',
    badge: 'FINAL QUIZ • QUIZ 3 • CHECKPOINT 6',
    title: 'QUIZ 3 : What Does Overdependence Mean?',
    subtitle: 'Evaluating risks when human organizations rely exclusively on software',
    questionData: {
      id: 6,
      badge: 'QUIZ 3',
      scenario: 'Considering an airport or bank terminal when internet connections fail.',
      question: 'What does overdependence mean in this context?',
      options: [
        'A. A system failure can disrupt important tasks',
        'B. AI becomes human',
        'C. The system never needs maintenance',
        'D. People stop using technology'
      ],
      correctIndex: 0,
      hint: 'Hint: Think about what happens when an organization abandons manual procedures and the software suddenly crashes.',
      explanation: 'CORRECT! Overdependence means an automated system failure can halt critical operations. Backup procedures and human staff reduce disruption.',
      topic: 'Overdependence & Outage Planning'
    },
    accentColor: '#9333ea',
  },

  // SLIDE 18: Self-Evaluation Reflection
  {
    id: 18,
    type: 'reflection',
    badge: 'REFLECT • SELF-EVALUATION',
    title: 'REFLECT • How Confident Are You?',
    subtitle: 'Use the textbook-style confidence levels to assess your mastery of limitations:',
    paragraphs: [
      'Take a moment to self-evaluate against the 4 curriculum learning outcomes for Class IX DTI Limitations topic:'
    ],
    accentColor: '#a78bfa',
  },

  // SLIDE 19: Chapter 10 Review & Ethical Summary
  {
    id: 19,
    type: 'finish',
    badge: 'FINISH • CHAPTER 10 REVIEW',
    title: 'FINISH • Chapter 10 Ethical Review',
    subtitle: 'Balancing computational benefits with responsible management',
    paragraphs: [
      'You have completed the limitations topic and explored both sides of AI Recognition Systems!',
      'Remember: Recognition technology can be incredibly useful, but responsible use requires balanced attention to accuracy, privacy, security, fairness, and avoiding overdependence on technology.'
    ],
    keyPoints: [
      { title: 'Benefits & Limitations in Balance', text: 'Fast speed and enhanced security must be matched by strong privacy and backup procedures.', icon: Award, color: 'text-[#00f5c4]' },
      { title: 'Human Oversight', text: 'Autonomous pipelines require human judgment and regular ethical audits.', icon: BrainCircuit, color: 'text-amber-400' }
    ],
    accentColor: '#00f5c4',
  },

  // SLIDE 20: Overall Star Assessment
  {
    id: 20,
    type: 'assessment',
    badge: 'ASSESSMENT SUMMARY • EARNED STARS',
    title: 'Overall Assessment of Stars',
    subtitle: 'Class IX Information Technology Chapter 10 Topic 2 Assessment',
    accentColor: '#f59e0b',
  }
];

interface Lesson6PresentationProps {
  onCompleteChapter: () => void;
}

export const Lesson6Presentation: React.FC<Lesson6PresentationProps> = ({
  onCompleteChapter,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [earnedStarsMap, setEarnedStarsMap] = useState<Record<number, boolean>>({});
  const [reflections, setReflections] = useState<Record<number, string>>({
    1: 'Confident to move on',
    2: 'Confident to move on',
    3: 'Confident to move on',
    4: 'Confident to move on',
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [reviewBannerNotice, setReviewBannerNotice] = useState<string | null>(null);

  const currentSlide = LESSON6_SLIDES_SEQUENCE[currentSlideIndex];
  const isQuestionSlide = currentSlide.type === 'question';
  const isAssessmentSlide = currentSlide.type === 'assessment';
  const currentQId = currentSlide.questionData?.id;
  const hasAnsweredCurrentQuestion = currentQId !== undefined && selectedAnswers[currentQId] !== undefined;

  const earnedStars = Object.values(earnedStarsMap).filter(Boolean).length;

  const handleSelectOption = (optIdx: number) => {
    if (!currentSlide.questionData) return;
    const q = currentSlide.questionData;
    if (selectedAnswers[q.id] !== undefined) return; // Single attempt lock

    setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }));

    if (optIdx === q.correctIndex) {
      setEarnedStarsMap((prev) => ({ ...prev, [q.id]: true }));
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#ff6b6b', '#f59e0b', '#00f5c4', '#38bdf8'],
      });
    }
  };

  const handleNextSlide = useCallback(() => {
    if (isQuestionSlide && !hasAnsweredCurrentQuestion) return;
    if (currentSlideIndex < LESSON6_SLIDES_SEQUENCE.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  }, [currentSlideIndex, isQuestionSlide, hasAnsweredCurrentQuestion]);

  const handlePrevSlide = useCallback(() => {
    if (isQuestionSlide && hasAnsweredCurrentQuestion) return;
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex, isQuestionSlide, hasAnsweredCurrentQuestion]);

  const handleJumpToSlide = (idx: number) => {
    if (isQuestionSlide && !hasAnsweredCurrentQuestion && idx > currentSlideIndex) return;
    setCurrentSlideIndex(idx);
  };

  const handleReset = () => {
    setCurrentSlideIndex(0);
    setSelectedAnswers({});
    setEarnedStarsMap({});
    setReviewBannerNotice(null);
  };

  // USER REQUIREMENT: When student chooses "Needs more work" in reflection, route back to Slide 2 (Limitations Overview)
  const handleSelectNeedsMoreWork = (itemId: number) => {
    setReflections((prev) => ({ ...prev, [itemId]: 'Needs more work' }));
    setReviewBannerNotice('You marked "Needs more work" on limitations. Review the 6 core limitations below before completing your chapter assessment!');
    // Slide 2 is index 1
    setCurrentSlideIndex(1);
  };

  const hasAnyGettingThere = Object.values(reflections).some((v) => v === 'Getting there');
  const hasAnyNeedsMoreWork = Object.values(reflections).some((v) => v === 'Needs more work');

  const getMasteryRating = (stars: number) => {
    if (stars === 6) {
      return {
        title: 'Mastery Level: Ethics & Governance Champion ⭐⭐⭐⭐⭐⭐',
        badge: 'Top Honors • 6/6 Perfect Score',
        color: 'text-amber-400 border-amber-500/50 bg-amber-950/30',
        desc: 'Outstanding understanding! You have mastered all limitation concepts: environmental lighting errors, biometric privacy ethics, backup procedures for outages, and responsible management.',
      };
    } else if (stars >= 4) {
      return {
        title: 'Mastery Level: Responsible Technologist ⭐⭐⭐⭐',
        badge: 'Proficient • Passing Grade',
        color: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/30',
        desc: 'Solid achievement! You understand why automated recognition requires human oversight and privacy protection.',
      };
    } else {
      return {
        title: 'Mastery Level: Developing Explorer ⭐⭐',
        badge: 'Review Recommended',
        color: 'text-rose-400 border-rose-500/50 bg-rose-950/30',
        desc: 'Good effort! Review the limitation slides on poor lighting and biometric data sensitivity to understand failure points.',
      };
    }
  };

  const mastery = getMasteryRating(earnedStars);

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-[#050811] overflow-y-auto flex flex-col justify-center' : ''}`}>
      {/* ----------------- TOP HUD BAR ----------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#090f1d] border border-[#1b2b48] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
              LESSON 6 • LIMITATIONS PRESENTATION
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">|</span>
          <span className="text-xs font-mono text-slate-400">
            SLIDE {currentSlide.id} OF {LESSON6_SLIDES_SEQUENCE.length}
          </span>
        </div>

        {/* Action Controls & Stars Counter */}
        <div className="flex items-center gap-3">
          {/* Star Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{earnedStars} / 6 Stars Earned</span>
          </div>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restart Slide Deck"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Review Banner Notice if navigated back from reflection */}
      {reviewBannerNotice && currentSlideIndex === 1 && (
        <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-200 gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{reviewBannerNotice}</span>
          </div>
          <button
            onClick={() => {
              setReviewBannerNotice(null);
              setCurrentSlideIndex(17); // Slide 18 (reflection)
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all cursor-pointer whitespace-nowrap"
          >
            Return to Reflection →
          </button>
        </div>
      )}

      {/* ----------------- MAIN PRESENTATION SCREEN ----------------- */}
      <div className="rounded-3xl bg-[#090f1d] border border-[#1b2b48] shadow-2xl overflow-hidden flex flex-col min-h-[580px]">
        {/* Progress Line */}
        <div className="w-full h-1 bg-[#121c2e]">
          <div
            className="h-full bg-gradient-to-r from-[#ff6b6b] via-amber-400 to-[#00f5c4] transition-all duration-300"
            style={{ width: `${(currentSlide.id / LESSON6_SLIDES_SEQUENCE.length) * 100}%` }}
          />
        </div>

        {/* Slide Canvas */}
        <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header Badge & Title */}
            <div className="space-y-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 border border-slate-800"
                style={{ color: currentSlide.accentColor }}
              >
                <span>{currentSlide.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {currentSlide.title}
              </h2>

              {currentSlide.subtitle && (
                <p className="text-sm sm:text-base text-slate-300 font-light">
                  {currentSlide.subtitle}
                </p>
              )}
            </div>

            {/* SLIDE TYPE SPECIFIC VIEWS */}

            {/* INTRO SLIDE */}
            {currentSlide.type === 'intro' && (
              <div className="space-y-6 max-w-4xl">
                {currentSlide.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {p}
                  </p>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || AlertTriangle;
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-[#0a1224] border border-[#1a2942] space-y-2 hover:border-[#ff6b6b]/40 transition-all">
                        <div className={`p-2.5 rounded-xl bg-slate-900 w-fit ${pt.color || 'text-rose-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-white text-sm">{pt.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{pt.text}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleNextSlide}
                    className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[0_0_20px_rgba(255,107,107,0.35)] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>EXPLORE THE 6 LIMITATIONS →</span>
                  </button>
                </div>
              </div>
            )}

            {/* MENU / OUTLINE SLIDE */}
            {currentSlide.type === 'menu' && (
              <div className="space-y-6 max-w-4xl">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentSlide.paragraphs?.[0]}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentSlide.keyPoints?.map((item, idx) => {
                    const Icon = item.icon || AlertTriangle;
                    // Links: idx 0 -> slide 4, idx 1 -> slide 5, etc.
                    const targetSlide = idx + 3;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleJumpToSlide(targetSlide)}
                        className="p-4 rounded-2xl bg-[#091122] border border-[#1a2842] hover:border-slate-400 transition-all cursor-pointer space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-xl bg-slate-900 ${item.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 group-hover:text-white">
                            Slide {targetSlide + 1} →
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#ff6b6b] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CONTENT SLIDES */}
            {currentSlide.type === 'content' && (
              <div className="space-y-6 max-w-4xl">
                {currentSlide.paragraphs?.map((p, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#0a1122] border border-[#192843]">
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                      {p}
                    </p>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || ShieldAlert;
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

            {/* QUESTION SLIDES */}
            {isQuestionSlide && currentSlide.questionData && (
              <div className="space-y-5 max-w-3xl">
                {currentSlide.questionData.scenario && (
                  <div className="p-4 rounded-xl bg-[#0b1426] border border-[#1b2b48] text-xs text-slate-300">
                    <span className="font-mono text-[#ff6b6b] font-bold uppercase mr-2">Scenario:</span>
                    <span>{currentSlide.questionData.scenario}</span>
                  </div>
                )}

                <div className="p-5 rounded-2xl bg-[#0d1629] border border-[#1e2f4f] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#ff6b6b] font-bold uppercase">CHOOSE ONE ANSWER</span>
                    {hasAnsweredCurrentQuestion ? (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Answer Confirmed
                      </span>
                    ) : (
                      <span className="text-rose-400 animate-pulse font-medium">
                        * Required to unlock next slide
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {currentSlide.questionData.question}
                  </h3>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-3">
                  {currentSlide.questionData.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQId!] === optIdx;
                    const isCorrect = optIdx === currentSlide.questionData!.correctIndex;
                    const showFeedback = hasAnsweredCurrentQuestion;

                    let btnStyle = 'bg-[#0a1224] border-[#1b2b48] text-slate-200 hover:border-slate-500 hover:bg-[#0e1933]';

                    if (showFeedback) {
                      if (isSelected) {
                        btnStyle = isCorrect 
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-rose-500/20 border-rose-400 text-rose-200 font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)]';
                      } else if (isCorrect) {
                        btnStyle = 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300';
                      } else {
                        btnStyle = 'bg-[#070d1a] border-slate-800 text-slate-500 opacity-50 cursor-not-allowed';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={hasAnsweredCurrentQuestion}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-4 cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                            isSelected 
                              ? (isCorrect ? 'bg-emerald-400 text-slate-950' : 'bg-rose-400 text-slate-950')
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span>{opt}</span>
                        </div>

                        {showFeedback && (
                          <div>
                            {isSelected && (isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-400" />
                            ))}
                            {!isSelected && isCorrect && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                Correct
                              </span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Box (Locked single attempt) */}
                {hasAnsweredCurrentQuestion && (
                  <div className="space-y-3 pt-2">
                    {selectedAnswers[currentQId!] === currentSlide.questionData.correctIndex ? (
                      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/50 space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <span>CORRECT! • 1 Star Earned</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
                            +1 Star ★
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed pl-7">
                          {currentSlide.questionData.explanation}
                        </p>
                      </div>
                    ) : (
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
                          You selected Option {String.fromCharCode(65 + selectedAnswers[currentQId!])}. Single attempt locked.
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

            {/* SELF-EVALUATION REFLECTION (SLIDE 18) */}
            {currentSlide.type === 'reflection' && (
              <div className="space-y-6 max-w-3xl">
                <p className="text-xs sm:text-sm text-slate-300">
                  Select your confidence level for each Class IX limitations objective:
                </p>

                <div className="space-y-3">
                  {[
                    { id: 1, title: 'I can explain at least four limitations of AI recognition systems.' },
                    { id: 2, title: 'I can explain how poor data quality can cause recognition errors.' },
                    { id: 3, title: 'I can describe privacy and ethical concerns about biometric data.' },
                    { id: 4, title: 'I can suggest responsible ways to manage recognition technology.' }
                  ].map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#0a1224] border border-[#1b2b48] space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 font-mono text-xs flex-shrink-0 mt-0.5">
                          {item.id}
                        </div>
                        <p className="text-xs sm:text-sm text-white font-medium">
                          {item.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap pl-8">
                        {/* Needs more work button */}
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

                        {/* Getting there button */}
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

                        {/* Confident button */}
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

                {/* USER REQUIREMENT: If student chose "Getting there", show preview of the lesson */}
                {hasAnyGettingThere && (
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/50 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>Lesson 6 Limitations Preview & Quick Recap</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Topic Summary
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      Review these key takeaways before finishing your chapter assessment:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">1. Accuracy Issues</span>
                        <div className="font-bold text-white">Lighting & Noise</div>
                        <p className="text-[11px] text-slate-400">Poor room illumination and sensor noise degrade facial landmark detection.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-orange-400 font-bold">2. Biometric Privacy</span>
                        <div className="font-bold text-white">Permanent Theft Risk</div>
                        <p className="text-[11px] text-slate-400">Biometric templates cannot be reset if servers are breached.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">3. Overdependence</span>
                        <div className="font-bold text-white">Outages & Blackouts</div>
                        <p className="text-[11px] text-slate-400">Organizations require manual overrides when power or networks fail.</p>
                      </div>

                      <div className="p-3 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">4. Responsible Management</span>
                        <div className="font-bold text-white">Bhutan AICS Case Study</div>
                        <p className="text-[11px] text-slate-400">Protects citizen rights via encryption and manual officer lanes.</p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-cyan-500/20">
                      <button
                        onClick={() => handleJumpToSlide(1)} // Jump to Slide 2
                        className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Review Limitations Overview (Slide 2)</span>
                      </button>

                      <button
                        onClick={() => handleJumpToSlide(18)} // Advance to Slide 19
                        className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_12px_rgba(0,245,196,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>I Understand: Proceed to Final Review →</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FINISH & REVIEW SLIDE */}
            {currentSlide.type === 'finish' && (
              <div className="space-y-6 max-w-4xl">
                {currentSlide.paragraphs?.map((p, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#0a1122] border border-[#192843]">
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                      {p}
                    </p>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || ShieldAlert;
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

            {/* OVERALL STAR ASSESSMENT (SLIDE 20) */}
            {isAssessmentSlide && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c162e] to-[#070c17] border-2 border-amber-500/40 text-center space-y-4 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5, 6].map((starNum) => {
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
                          <Star className={`w-7 h-7 sm:w-9 sm:h-9 ${isEarned ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
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

                  <div className="max-w-md mx-auto pt-2 space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Total Stars Achieved:</span>
                      <span className="text-amber-400 font-bold">{earnedStars} / 6 Stars ({Math.round((earnedStars / 6) * 100)}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-[#00f5c4] rounded-full transition-all duration-700"
                        style={{ width: `${(earnedStars / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 6 Checkpoints Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Limitations Checkpoints Breakdown:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { qId: 1, title: 'Dark Room Camera Failure', topic: 'Lighting & Accuracy', slideIdx: 9 },
                      { qId: 2, title: 'Unsecured Face Database', topic: 'Biometric Privacy Theft', slideIdx: 10 },
                      { qId: 3, title: 'Responsible Use Policy', topic: 'Bhutan & Outage Planning', slideIdx: 12 },
                      { qId: 4, title: 'Quiz 1: Recognition Error Factor', topic: 'Poor Lighting Conditions', slideIdx: 14 },
                      { qId: 5, title: 'Quiz 2: Biometric Data Privacy', topic: 'Sensitive Unchangeable Data', slideIdx: 15 },
                      { qId: 6, title: 'Quiz 3: Overdependence Meaning', topic: 'System Failure Disruptions', slideIdx: 16 },
                    ].map((item) => {
                      const isCorrect = earnedStarsMap[item.qId] === true;
                      const isAnswered = selectedAnswers[item.qId] !== undefined;

                      return (
                        <div
                          key={item.qId}
                          onClick={() => handleJumpToSlide(item.slideIdx)}
                          className="p-3.5 rounded-xl bg-[#080d19] border border-[#19273f] hover:border-slate-500 transition-all cursor-pointer space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-400">Q{item.qId}</span>
                            {isAnswered ? (
                              isCorrect ? (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                                  <span>1 Star</span>
                                </span>
                              ) : (
                                <span className="text-[11px] font-bold text-rose-400">0 Stars</span>
                              )
                            ) : (
                              <span className="text-[11px] text-slate-500">Skipped</span>
                            )}
                          </div>
                          <h5 className="text-xs font-bold text-white truncate">{item.title}</h5>
                          <p className="text-[10px] text-slate-400 truncate">{item.topic}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Bar */}
          <div className="pt-8 border-t border-[#182640] flex items-center justify-between gap-4 mt-6">
            <div>
              {currentSlideIndex > 0 && !hasAnsweredCurrentQuestion ? (
                <button
                  onClick={handlePrevSlide}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-[#0f172a] hover:bg-[#16233d] border border-slate-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}
            </div>

            {/* Slide Dots */}
            <div className="hidden lg:flex items-center gap-1">
              {LESSON6_SLIDES_SEQUENCE.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => handleJumpToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'bg-[#ff6b6b] w-5 shadow-[0_0_8px_#ff6b6b]'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Slide ${idx + 1}: ${slide.title}`}
                />
              ))}
            </div>

            {/* Next / Complete Button */}
            <div>
              {!isAssessmentSlide ? (
                <button
                  onClick={handleNextSlide}
                  disabled={isQuestionSlide && !hasAnsweredCurrentQuestion}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isQuestionSlide && !hasAnsweredCurrentQuestion
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                      : 'bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[0_0_15px_rgba(255,107,107,0.35)] hover:scale-[1.02] cursor-pointer'
                  }`}
                >
                  <span>
                    {isQuestionSlide && !hasAnsweredCurrentQuestion
                      ? 'Answer Question to Unlock Next'
                      : currentSlideIndex === LESSON6_SLIDES_SEQUENCE.length - 2
                      ? 'View Overall Assessment →'
                      : 'Next Slide'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onCompleteChapter}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_20px_rgba(0,245,196,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Complete Chapter & Claim Certificate</span>
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
