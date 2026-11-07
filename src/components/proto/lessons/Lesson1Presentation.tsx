import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Star, BrainCircuit, Check, 
  CheckCircle2, XCircle, ArrowRight, Lightbulb,
  Smartphone, Award, RotateCcw, Home, Maximize2, Minimize2,
  BookOpen, Eye, Sparkles, AlertCircle, RefreshCw
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

export interface Lesson1Slide {
  id: number;
  type: 'intro' | 'situation' | 'question' | 'content' | 'reflection' | 'finish' | 'assessment';
  badge: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  keyPoints?: { title: string; text: string; icon?: React.ElementType; color?: string }[];
  questionData?: SlideQuestion;
  accentColor: string;
}

/**
 * 8 Sequenced Slides representing all 14 slides from Link 1 (ai recognition definition.pptx):
 * Slide 1 (PPT 1): Title Slide "Can AI Recognize You?"
 * Slide 2 (PPT 2): A Familiar Situation (Phone unlock)
 * Slide 3 (PPT 3, 4, 5): Checkpoint 1 - What is the phone doing?
 * Slide 4 (PPT 6): The Core Definition - "AI + Recognition = AI Recognition System"
 * Slide 5 (PPT 7): How Confident Are You? (Self-Reflection)
 * Slide 6 (PPT 8, 9, 10): Quick Check 1 - What does an AI Recognition System do?
 * Slide 7 (PPT 11, 12, 13): Quick Check 2 - Complete the equation
 * Slide 8 (PPT 14): Definition Mastery & Overall Star Assessment (Earn up to 3 stars)
 */
export const LESSON1_SLIDES_SEQUENCE: Lesson1Slide[] = [
  // SLIDE 1: Title
  {
    id: 1,
    type: 'intro',
    badge: 'SUBTOPIC 01 • INTERACTIVE DEFINITION ACTIVITY',
    title: 'Can AI Recognize You?',
    subtitle: 'An Interactive Definition Activity for AI Recognition Systems',
    paragraphs: [
      'Welcome to Chapter 10, Subtopic 1! In this interactive slide deck, you will discover what an AI recognition system really is, examine familiar everyday examples like smartphone unlock, and test your knowledge to earn stars.',
      'Work through the slides, complete the checkpoint challenges, and unlock your foundational understanding of artificial intelligence.'
    ],
    keyPoints: [
      { title: 'Familiar Scenarios', text: 'How personal devices identify human faces in milliseconds.', icon: Smartphone, color: 'text-cyan-400' },
      { title: 'The Core Equation', text: 'Artificial Intelligence + Pattern Recognition = AI Recognition System.', icon: BrainCircuit, color: 'text-emerald-400' },
      { title: 'Earn Up to 3 Stars', text: 'Answer questions directly inside the slides without multiple attempts.', icon: Star, color: 'text-amber-400' }
    ],
    accentColor: '#00f5c4',
  },

  // SLIDE 2: Familiar Situation
  {
    id: 2,
    type: 'situation',
    badge: 'A FAMILIAR SITUATION • REAL-WORLD CASE',
    title: 'You Look at Your Phone\'s Camera',
    subtitle: 'The phone recognizes your face and unlocks',
    paragraphs: [
      'Think about this everyday moment: You pick up your smartphone, look directly into the front camera, and within a fraction of a second, the lock screen disappears.',
      'What is actually happening inside the device? How does the camera know it is you and not a stranger, a photograph, or a friend?'
    ],
    keyPoints: [
      { title: 'Sensory Capture', text: 'The camera captures the optical matrix of your face.', icon: Smartphone, color: 'text-cyan-400' },
      { title: 'Computational Decision', text: 'The system decides if the captured pattern matches registered user data.', icon: BrainCircuit, color: 'text-emerald-400' }
    ],
    accentColor: '#38bdf8',
  },

  // SLIDE 3: Checkpoint 1 (From PPT Slides 3, 4, 5)
  {
    id: 3,
    type: 'question',
    badge: 'CHECKPOINT 1 • THINK & IDENTIFY',
    title: 'What Is the Phone Doing?',
    subtitle: 'How does the phone identify who is looking at it?',
    questionData: {
      id: 1,
      badge: 'CHECKPOINT 1',
      scenario: 'You look at your smartphone camera and the phone automatically unlocks for you.',
      question: 'What is the phone actually doing?',
      options: [
        'A. It is guessing',
        'B. It is recognizing your face',
        'C. It asks another person',
        'D. It chooses randomly'
      ],
      correctIndex: 1,
      hint: 'Hint: The phone is not guessing or picking randomly. Think about how it uses AI to match the face in front of the lens.',
      explanation: 'CORRECT! The phone is recognizing your face! This is a real-world example of AI recognition where artificial intelligence compares optical features against stored biometric data.',
      topic: 'Everyday Face Recognition'
    },
    accentColor: '#00f5c4',
  },

  // SLIDE 4: Core Definition (From PPT Slide 6)
  {
    id: 4,
    type: 'content',
    badge: 'THE OFFICIAL DEFINITION • CHAPTER 10',
    title: 'What Is an AI Recognition System?',
    subtitle: 'Artificial Intelligence + Recognition = AI Recognition System',
    paragraphs: [
      'An AI recognition system is a system that uses artificial intelligence to identify or recognize people, objects, voices, images, or patterns from data.',
      'Notice the core formula: AI (computational intelligence) + Recognition (pattern identification) = AI Recognition System. It does not just store raw bytes; it extracts meaningful features from noisy sensory data.'
    ],
    keyPoints: [
      { title: 'People & Faces', text: 'Facial landmarks, iris patterns, and fingerprint ridge geometry.', icon: BrainCircuit, color: 'text-cyan-400' },
      { title: 'Objects & Images', text: 'Automated vehicle license plate scanners (ALPR) and medical scans.', icon: Award, color: 'text-emerald-400' },
      { title: 'Voices & Acoustic Audio', text: 'Speech-to-text assistants identifying individual speaker voices.', icon: Smartphone, color: 'text-amber-400' },
      { title: 'Patterns from Data', text: 'Detecting handwriting, anomalous transactions, and gesture motions.', icon: Star, color: 'text-indigo-400' }
    ],
    accentColor: '#10b981',
  },

  // SLIDE 5: Confidence Check (From PPT Slide 7)
  {
    id: 5,
    type: 'reflection',
    badge: 'SELF-REFLECTION • CONFIDENCE CHECK',
    title: 'How Confident Are You?',
    subtitle: 'Evaluate your understanding of the foundational definition',
    paragraphs: [
      'Think about what you learned regarding the definition of an AI Recognition System. Can you define an AI recognition system in your own words?'
    ],
    accentColor: '#a78bfa',
  },

  // SLIDE 6: Quick Check 1 (From PPT Slides 8, 9, 10)
  {
    id: 6,
    type: 'question',
    badge: 'QUICK CHECK 1 • WHAT DOES IT MEAN?',
    title: 'What Is an AI Recognition System Designed to Do?',
    subtitle: 'Choose the answer that best matches the textbook definition',
    questionData: {
      id: 2,
      badge: 'QUICK CHECK 1',
      scenario: 'Reviewing the core purpose and capabilities of automated recognition technology.',
      question: 'What is an AI Recognition System designed to do?',
      options: [
        'A. Only store information',
        'B. Identify or recognize things from data',
        'C. Randomly choose an answer',
        'D. Replace every human decision'
      ],
      correctIndex: 1,
      hint: 'Hint: Remember the definition! An AI recognition system uses AI to identify or recognize people, objects, voices, or patterns from data.',
      explanation: 'CORRECT! An AI Recognition System uses AI to identify or recognize things from data. This includes people, objects, voices, images, and biometric patterns.',
      topic: 'Foundational System Purpose'
    },
    accentColor: '#38bdf8',
  },

  // SLIDE 7: Quick Check 2 (From PPT Slides 11, 12, 13)
  {
    id: 7,
    type: 'question',
    badge: 'QUICK CHECK 2 • COMPLETE THE IDEA',
    title: 'Complete the Foundational Equation',
    subtitle: 'Choose the answer that completes the definition',
    questionData: {
      id: 3,
      badge: 'QUICK CHECK 2',
      scenario: 'Recalling the two key computational pillars of Chapter 10.',
      question: 'AI + __________ = AI Recognition System',
      options: [
        'A. Recognition',
        'B. Randomness',
        'C. Storage',
        'D. Internet'
      ],
      correctIndex: 0,
      hint: 'Hint: Look at the title of this chapter! The missing word is the process of identifying or recognizing.',
      explanation: 'CORRECT! AI + Recognition = AI Recognition System! You have grasped the main foundational idea of this module.',
      topic: 'The Core Equation'
    },
    accentColor: '#ec4899',
  },

  // SLIDE 8: Assessment & Stars (From PPT Slide 14)
  {
    id: 8,
    type: 'assessment',
    badge: 'FINISH • DEFINITION MASTERY',
    title: 'Overall Assessment of Stars',
    subtitle: 'Lesson 1 Definition Subtopic Complete',
    accentColor: '#f59e0b',
  }
];

interface Lesson1PresentationProps {
  onNextLesson: () => void;
}

export const Lesson1Presentation: React.FC<Lesson1PresentationProps> = ({
  onNextLesson,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [earnedStarsMap, setEarnedStarsMap] = useState<Record<number, boolean>>({});
  const [confidenceLevel, setConfidenceLevel] = useState<'Needs more work' | 'Getting there' | 'Confident to move on' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [reviewBannerNotice, setReviewBannerNotice] = useState<string | null>(null);

  const currentSlide = LESSON1_SLIDES_SEQUENCE[currentSlideIndex];
  const isQuestionSlide = currentSlide.type === 'question';
  const isAssessmentSlide = currentSlide.type === 'assessment';
  const currentQId = currentSlide.questionData?.id;
  const hasAnsweredCurrentQuestion = currentQId !== undefined && selectedAnswers[currentQId] !== undefined;

  const earnedStars = Object.values(earnedStarsMap).filter(Boolean).length;

  const handleSelectOption = (qId: number, optionIdx: number, correctIdx: number) => {
    if (selectedAnswers[qId] !== undefined) return;

    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    const isCorrect = optionIdx === correctIdx;
    setEarnedStarsMap((prev) => ({ ...prev, [qId]: isCorrect }));

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextSlide = () => {
    if (isQuestionSlide && !hasAnsweredCurrentQuestion) return;

    if (currentSlideIndex < LESSON1_SLIDES_SEQUENCE.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // USER REQUIREMENT: When student chooses "Needs more work", route back to understanding slide (Slide 4 - Core Definition)
  const handleSelectNeedsMoreWork = () => {
    setConfidenceLevel('Needs more work');
    setReviewBannerNotice('You selected "Needs more work". Review the core equation and official definition below before taking the quiz!');
    // Slide 4 is index 3 in 0-indexed array
    setCurrentSlideIndex(3);
  };

  // USER REQUIREMENT: When student chooses "Getting there", show lesson preview with option to jump back or proceed
  const handleSelectGettingThere = () => {
    setConfidenceLevel('Getting there');
    setReviewBannerNotice(null);
  };

  const handleSelectConfident = () => {
    setConfidenceLevel('Confident to move on');
    setReviewBannerNotice(null);
  };

  const handleJumpToSlide = (slideIdx: number) => {
    setCurrentSlideIndex(slideIdx);
  };

  const handleResetSlideDeck = () => {
    setCurrentSlideIndex(0);
    setSelectedAnswers({});
    setEarnedStarsMap({});
    setConfidenceLevel(null);
    setReviewBannerNotice(null);
  };

  // Trigger celebration on final assessment slide
  useEffect(() => {
    if (isAssessmentSlide) {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isAssessmentSlide]);

  return (
    <div className={`relative transition-all duration-300 ${
      isFullscreen 
        ? 'fixed inset-0 z-50 bg-[#060a14] p-4 sm:p-8 flex flex-col justify-between overflow-y-auto' 
        : 'w-full'
    }`}>
      {/* Outer Card Container */}
      <div className="w-full rounded-3xl bg-[#090f1d] border border-[#1b2b48] shadow-2xl overflow-hidden flex flex-col">
        {/* Top Control Bar: Breadcrumb, Star Counter & Fullscreen Toggle */}
        <div className="px-6 py-4 bg-[#060b16] border-b border-[#182640] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
              LESSON 1 PRESENTATION • SLIDE {currentSlide.id} OF {LESSON1_SLIDES_SEQUENCE.length}
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500">•</span>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-mono truncate max-w-xs">
              {currentSlide.badge}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Stars Tracker */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{earnedStars} / 3 Stars</span>
            </div>

            {/* Restart Deck Button */}
            <button
              onClick={handleResetSlideDeck}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Restart Slide Deck"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Review Notice Banner when student navigated back from reflection */}
        {reviewBannerNotice && currentSlideIndex === 3 && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 px-6 py-3 flex items-center justify-between text-xs text-amber-200 gap-3 animate-fadeIn">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{reviewBannerNotice}</span>
            </div>
            <button
              onClick={() => {
                setReviewBannerNotice(null);
                setCurrentSlideIndex(4); // Back to slide 5 (reflection)
              }}
              className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all cursor-pointer whitespace-nowrap"
            >
              Done Reviewing →
            </button>
          </div>
        )}

        {/* Progress Bar Line */}
        <div className="w-full h-1 bg-[#121c2e]">
          <div 
            className="h-full bg-gradient-to-r from-[#00f5c4] via-cyan-400 to-amber-400 transition-all duration-300"
            style={{ width: `${(currentSlide.id / LESSON1_SLIDES_SEQUENCE.length) * 100}%` }}
          />
        </div>

        {/* Main Slide Content Canvas */}
        <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between min-h-[500px]">
          <div className="space-y-6">
            {/* Slide Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-900 border border-slate-800" style={{ color: currentSlide.accentColor }}>
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

            {/* SLIDE TYPE SPECIFIC RENDERERS */}

            {/* 1. INTRO SLIDE */}
            {currentSlide.type === 'intro' && (
              <div className="space-y-6 max-w-4xl">
                {currentSlide.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {p}
                  </p>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || BrainCircuit;
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

            {/* 2. SITUATION SLIDE */}
            {currentSlide.type === 'situation' && (
              <div className="space-y-6 max-w-4xl">
                {currentSlide.paragraphs?.map((p, idx) => (
                  <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#0d172e] border border-[#1f3152] shadow-sm">
                    <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-light">
                      {p}
                    </p>
                  </div>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || Smartphone;
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-[#0a1224] border border-[#192843] flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl bg-slate-900 ${pt.color || 'text-cyan-400'} flex-shrink-0 mt-0.5`}>
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

            {/* 3. QUESTION SLIDES (Checkpoint 1, Quick Check 1, Quick Check 2) */}
            {isQuestionSlide && currentSlide.questionData && (
              <div className="space-y-6 max-w-3xl">
                {/* Scenario Context */}
                {currentSlide.questionData.scenario && (
                  <div className="p-4 rounded-xl bg-[#0b1426] border border-[#1b2b48] text-xs text-slate-300">
                    <span className="font-mono text-[#00f5c4] font-bold uppercase mr-2">Scenario:</span>
                    <span>{currentSlide.questionData.scenario}</span>
                  </div>
                )}

                {/* Question Prompt */}
                <div className="p-5 rounded-2xl bg-[#0d1629] border border-[#1e2f4f] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#00f5c4] font-bold">CHOOSE ONE ANSWER</span>
                    {hasAnsweredCurrentQuestion ? (
                      <span className="text-amber-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Answer Recorded
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

                {/* Lightbulb Think Hint Prompt from PPT */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    {currentSlide.questionData.id === 1 && "Think: How does the phone identify who is looking at it?"}
                    {currentSlide.questionData.id === 2 && "Think: What does the definition say AI recognition can identify or recognize?"}
                    {currentSlide.questionData.id === 3 && "Think: Look at the equation shown on the definition slide!"}
                  </span>
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
                        onClick={() => handleSelectOption(currentQId!, optIdx, currentSlide.questionData!.correctIndex)}
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
                                Correct Answer
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
                          You selected Option {String.fromCharCode(65 + selectedAnswers[currentQId!])}. Questions cannot be re-attempted.
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

            {/* 4. CORE DEFINITION SLIDE */}
            {currentSlide.type === 'content' && (
              <div className="space-y-6 max-w-4xl">
                {/* Big Formula Highlight */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#00f5c4]/15 via-cyan-500/10 to-transparent border-2 border-[#00f5c4]/50 shadow-[0_0_20px_rgba(0,245,196,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f5c4] font-bold">
                      THE CORE FORMULA
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-white">
                      AI + Recognition = AI Recognition System
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-[#00f5c4]/30 text-xs font-mono text-[#00f5c4] whitespace-nowrap">
                    CHAPTER 10 EQUATION
                  </div>
                </div>

                {currentSlide.paragraphs?.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                    {p}
                  </p>
                ))}

                {/* 4 Modalities Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentSlide.keyPoints?.map((pt, idx) => {
                    const Icon = pt.icon || BrainCircuit;
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-[#091224] border border-[#18263f] hover:border-[#00f5c4]/40 transition-all flex items-start gap-3">
                        <div className={`p-2 rounded-xl bg-slate-900 ${pt.color || 'text-cyan-400'} flex-shrink-0 mt-0.5`}>
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

                {/* Quick button to test confidence */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setCurrentSlideIndex(4)} // Jump to Slide 5 (confidence check)
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#00f5c4] text-slate-950 hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.3)] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>CHECK MY CONFIDENCE →</span>
                  </button>
                </div>
              </div>
            )}

            {/* 5. SELF-REFLECTION SLIDE (With Navigation to Understanding Slide & Lesson Preview) */}
            {currentSlide.type === 'reflection' && (
              <div className="space-y-6 max-w-3xl">
                <div className="p-5 rounded-2xl bg-[#0a1224] border border-[#1b2b48] space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#00f5c4] font-bold">LEARNING OBJECTIVE SELF-EVALUATION</span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      "I can define an AI recognition system in my own words."
                    </h3>
                    <p className="text-xs text-slate-400">
                      Choose one confidence level based on what you have learned:
                    </p>
                  </div>

                  {/* 3 Confidence Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* 1. Needs more work */}
                    <button
                      onClick={handleSelectNeedsMoreWork}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        confidenceLevel === 'Needs more work'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'bg-[#070d1a] border-slate-800 text-slate-300 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-400 text-sm">🟡 Needs more work</span>
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Review the definition before taking the quiz
                      </span>
                    </button>

                    {/* 2. Getting there */}
                    <button
                      onClick={handleSelectGettingThere}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        confidenceLevel === 'Getting there'
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                          : 'bg-[#070d1a] border-slate-800 text-slate-300 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-400 text-sm">🔵 Getting there</span>
                        <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <span className="text-[11px] text-slate-400">
                        View a quick lesson preview & summary recap
                      </span>
                    </button>

                    {/* 3. Confident to move on */}
                    <button
                      onClick={handleSelectConfident}
                      className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        confidenceLevel === 'Confident to move on'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                          : 'bg-[#070d1a] border-slate-800 text-slate-300 hover:border-emerald-500/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-400 text-sm">🟢 Confident</span>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Ready to jump straight into the checkpoint quiz!
                      </span>
                    </button>
                  </div>
                </div>

                {/* USER REQUIREMENT: When student selects "Getting there", show them a preview of the lesson */}
                {confidenceLevel === 'Getting there' && (
                  <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/50 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>Lesson 1 Preview & Concept Summary</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Quick Recap
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      Here is the essential breakdown of what you need to master for this topic:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">1. The Equation</span>
                        <div className="font-bold text-white">AI + Recognition = AI Recognition System</div>
                        <p className="text-[11px] text-slate-400">Combines intelligent algorithms with pattern identification.</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">2. The Definition</span>
                        <div className="font-bold text-white">Identifies & Recognizes from Data</div>
                        <p className="text-[11px] text-slate-400">Applies to people, objects, voices, images, or numerical patterns.</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">3. Everyday Analogy</span>
                        <div className="font-bold text-white">Smartphone Camera Unlock</div>
                        <p className="text-[11px] text-slate-400">The phone does not guess randomly; it matches face landmark vectors.</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#081020] border border-cyan-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">4. Core Purpose</span>
                        <div className="font-bold text-white">Automatic Classification</div>
                        <p className="text-[11px] text-slate-400">Turns raw physical sensor inputs into digital category decisions.</p>
                      </div>
                    </div>

                    {/* Dual Action Options */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-cyan-500/20">
                      <button
                        onClick={() => handleJumpToSlide(3)} // Return to Slide 4 (definition)
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Review Full Definition Slide (Slide 4)</span>
                      </button>

                      <button
                        onClick={() => handleJumpToSlide(5)} // Move forward to Quick Check 1 (Slide 6)
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_12px_rgba(0,245,196,0.3)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>I'm Ready Now: Proceed to Quiz →</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* State when student clicked "Confident to move on" */}
                {confidenceLevel === 'Confident to move on' && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Great! You're ready to test your knowledge in Quick Check 1 and Quick Check 2.</span>
                    </div>
                    <button
                      onClick={() => handleJumpToSlide(5)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-400 text-slate-950 font-bold text-xs hover:bg-emerald-300 cursor-pointer"
                    >
                      Start Quiz →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 6. ASSESSMENT FINISH SLIDE (Slide 8) */}
            {isAssessmentSlide && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c162e] to-[#070c17] border-2 border-amber-500/40 text-center space-y-4 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    {[1, 2, 3].map((starNum) => {
                      const isEarned = starNum <= earnedStars;
                      return (
                        <div
                          key={starNum}
                          className={`p-3 rounded-2xl transition-all ${
                            isEarned
                              ? 'bg-amber-500/20 border border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110'
                              : 'bg-slate-900/60 border border-slate-800 text-slate-700'
                          }`}
                        >
                          <Star className={`w-8 h-8 ${isEarned ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} />
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold border uppercase tracking-wider text-amber-400 border-amber-500/40 bg-amber-950/30">
                      {earnedStars === 3 ? 'Mastery: Definition Champion' : earnedStars >= 2 ? 'Mastery: Proficient' : 'Mastery: Review Recommended'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      You Earned {earnedStars} Out of 3 Stars!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                      {earnedStars === 3
                        ? 'Flawless performance! You understand the definition equation and everyday recognition scenarios perfectly.'
                        : earnedStars >= 2
                        ? 'Solid job! You grasped the foundational ideas of AI recognition systems and their capabilities.'
                        : 'Good first attempt! Review the definition equation and take another look before advancing to the recognition cycle.'}
                    </p>
                  </div>
                </div>

                {/* Checkpoints Recap */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Lesson 1 Checkpoints Breakdown:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { qId: 1, title: 'Checkpoint 1: Phone Camera Action', topic: 'Recognizing face vs guessing', slideIdx: 2 },
                      { qId: 2, title: 'Quick Check 1: What Does It Mean?', topic: 'Identify or recognize from data', slideIdx: 5 },
                      { qId: 3, title: 'Quick Check 2: The Core Equation', topic: 'AI + Recognition', slideIdx: 6 },
                    ].map((item) => {
                      const isCorrect = earnedStarsMap[item.qId] === true;
                      const isAnswered = selectedAnswers[item.qId] !== undefined;

                      return (
                        <div
                          key={item.qId}
                          onClick={() => handleJumpToSlide(item.slideIdx)}
                          className="p-4 rounded-xl bg-[#09101f] border border-[#1b2b48] hover:border-slate-500 transition-all cursor-pointer space-y-1.5"
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
                          <p className="text-[11px] text-slate-400 truncate">{item.topic}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Controls */}
          <div className="pt-8 border-t border-[#182640] flex items-center justify-between gap-4 mt-6">
            {/* Back Button (USER CONSTRAINT: Remove back button after answering question to maintain strict sequence) */}
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

            {/* Slide Indicator Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {LESSON1_SLIDES_SEQUENCE.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => handleJumpToSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx
                      ? 'bg-[#00f5c4] w-6 shadow-[0_0_8px_#00f5c4]'
                      : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Slide ${idx + 1}: ${slide.title}`}
                />
              ))}
            </div>

            {/* Next / Proceed Button */}
            <div>
              {!isAssessmentSlide ? (
                <button
                  onClick={handleNextSlide}
                  disabled={isQuestionSlide && !hasAnsweredCurrentQuestion}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isQuestionSlide && !hasAnsweredCurrentQuestion
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
                      : 'bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_15px_rgba(0,245,196,0.3)] hover:scale-[1.02] cursor-pointer'
                  }`}
                >
                  <span>
                    {isQuestionSlide && !hasAnsweredCurrentQuestion
                      ? 'Answer Question to Unlock Next'
                      : currentSlideIndex === LESSON1_SLIDES_SEQUENCE.length - 2
                      ? 'View Overall Assessment →'
                      : 'Next Slide'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onNextLesson}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Proceed to Lesson 2: The Recognition Cycle</span>
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
