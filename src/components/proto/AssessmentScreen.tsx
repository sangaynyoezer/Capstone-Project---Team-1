import React, { useState } from 'react';
import { Trophy, Award, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Printer, Download, Lock } from 'lucide-react';
import { COURSE_MATERIALS, QuizQuestion } from '../../materialsConfig';
import confetti from 'canvas-confetti';

interface AssessmentScreenProps {
  lessonsCompletedCount: number;
  totalLessons: number;
  activitiesCompletedCount: number;
  totalActivities: number;
  notesReviewedCount: number;
  totalNotes: number;
  studentName: string;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  lessonsCompletedCount,
  totalLessons,
  activitiesCompletedCount,
  totalActivities,
  notesReviewedCount,
  totalNotes,
  studentName,
}) => {
  const questions: QuizQuestion[] = COURSE_MATERIALS.quizzes.assessmentDiagnostic;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  const currentQ = questions[currentQuestionIndex] || questions[0];
  const userSelectedOption = selectedAnswers[currentQuestionIndex];
  const isCurrentAnswered = userSelectedOption !== undefined;

  // USER REQUIREMENT: "they cant attempt again if they get wrong ans"
  const handleSelectOption = (optIndex: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) {
      return; // Locked permanently once an answer is chosen
    }
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIndex,
    }));
  };

  // USER REQUIREMENT: "make sure students cant move on without completing a quiz question"
  const handleNext = () => {
    if (!isCurrentAnswered) {
      return; // Cannot advance until answered
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all questions
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isQuizFinished = answeredCount === questions.length;

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => questions[Number(qIdx)]?.correctAnswerIndex === ansIdx
  ).length;

  const scorePercentage = answeredCount > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
  const isEligibleForCertificate = lessonsCompletedCount === totalLessons && isQuizFinished && scorePercentage >= 60;

  const quickReviewCards = [
    {
      title: 'Classification Model',
      badge: 'FLIPPED CARD',
      text: 'A mathematical pipeline organizing sensory vectors into discrete classes based on numeric matching ranges.',
    },
    {
      title: 'Feature Matrix Match',
      badge: 'FLIPPED CARD',
      text: 'The third loop of recognition comparing personal metrics directly against secure databases.',
    },
    {
      title: 'Sensory Capture Noise',
      badge: 'FLIPPED CARD',
      text: 'Redundant background data, lighting flare, or signal distortion stripped away during preprocessing.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b16] py-10 px-6 sm:px-12 text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            <span>END-OF-CHAPTER</span>
            <span>•</span>
            <span>DIAGNOSTIC TEST</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Chapter Review & Assessment
          </h1>
        </div>

        {/* 3 Progress Indicators Row - REAL DYNAMIC COUNTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat 1: Lessons Completed */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1b2b48] flex items-center gap-5 shadow-lg">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 transition-all ${
                lessonsCompletedCount === totalLessons
                  ? 'border-[#00f5c4] text-[#00f5c4] shadow-[0_0_15px_rgba(0,245,196,0.3)] bg-[#00f5c4]/10'
                  : 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20'
              }`}
            >
              {lessonsCompletedCount}/{totalLessons}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Lessons Completed</h4>
              <p className="text-xs text-slate-400">
                {lessonsCompletedCount === totalLessons
                  ? 'All modules cleared in computer lab syllabus.'
                  : `${totalLessons - lessonsCompletedCount} module(s) remaining to complete.`}
              </p>
            </div>
          </div>

          {/* Stat 2: Activities Done */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1b2b48] flex items-center gap-5 shadow-lg">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 transition-all ${
                activitiesCompletedCount >= totalActivities && totalActivities > 0
                  ? 'border-emerald-400 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] bg-emerald-950/20'
                  : activitiesCompletedCount > 0
                  ? 'border-[#00f5c4] text-[#00f5c4] shadow-[0_0_15px_rgba(0,245,196,0.3)] bg-[#00f5c4]/10'
                  : 'border-slate-600 text-slate-400 bg-slate-900'
              }`}
            >
              {activitiesCompletedCount}/{totalActivities}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Activities Done</h4>
              <p className="text-xs text-slate-400">
                {activitiesCompletedCount >= totalActivities && totalActivities > 0
                  ? 'Both facial recognition and hand gesture activities completed.'
                  : activitiesCompletedCount === 1
                  ? '1 of 2 activities completed. Complete both facial recognition and hand gesture tasks.'
                  : 'Complete both facial recognition and hand gesture activities in the Activities tab.'}
              </p>
            </div>
          </div>

          {/* Stat 3: Additional Notes Reviewed */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1b2b48] flex items-center gap-5 shadow-lg">
            <div
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 transition-all ${
                notesReviewedCount === totalNotes
                  ? 'border-[#00f5c4] text-[#00f5c4] shadow-[0_0_15px_rgba(0,245,196,0.3)] bg-[#00f5c4]/10'
                  : 'border-slate-600 text-slate-400 bg-slate-900'
              }`}
            >
              {notesReviewedCount}/{totalNotes}
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Additional Notes Reviewed</h4>
              <p className="text-xs text-slate-400">
                {notesReviewedCount === totalNotes
                  ? 'Glossary matrices & reference pages cleared.'
                  : `${notesReviewedCount} of ${totalNotes} textbook sections reviewed.`}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Chapter Quiz (Left) vs Review, Score & Certificate (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Chapter Quiz */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
                  CHAPTER 10 DIAGNOSTIC TEST
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Chapter Quiz
                </h3>
              </div>
            </div>

            {/* Quiz Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl space-y-6">
              {/* Question Meta */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#00f5c4] font-bold">
                  QUESTION {currentQuestionIndex + 1} OF {questions.length}
                </span>
                <span className="text-slate-400">
                  CLASS IX DTI CHAPTER 10
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQ.question}
              </h4>

              {/* Radio Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = userSelectedOption === idx;
                  const isCorrect = idx === currentQ.correctAnswerIndex;
                  
                  let optStyle = 'bg-[#0e1629] border-[#1d2d4c] text-slate-300 hover:border-slate-500 cursor-pointer';

                  if (isCurrentAnswered) {
                    if (isSelected && isCorrect) {
                      optStyle = 'bg-emerald-950/40 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-not-allowed';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-950/40 border-rose-400 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.25)] cursor-not-allowed';
                    } else if (!isSelected && isCorrect) {
                      optStyle = 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300/80 cursor-not-allowed';
                    } else {
                      optStyle = 'bg-[#0e1629]/50 border-slate-800 text-slate-500 opacity-50 cursor-not-allowed';
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center gap-3.5 transition-all ${optStyle}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                          isSelected && isCorrect
                            ? 'border-emerald-400 bg-emerald-400'
                            : isSelected && !isCorrect
                            ? 'border-rose-400 bg-rose-400'
                            : isSelected
                            ? 'border-[#00f5c4] bg-[#00f5c4]'
                            : 'border-slate-500'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#070b16]" />}
                      </div>
                      <span className="flex-1">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Inline Feedback Box once answered */}
              {isCurrentAnswered && (
                <div className="pt-2 space-y-2 animate-in fade-in">
                  {userSelectedOption === currentQ.correctAnswerIndex ? (
                    <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Correct! +1 Mark</span>
                      </div>
                      <p className="text-[11px] text-slate-300 pl-5">{currentQ.explanation}</p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-200 space-y-1.5">
                      <div className="font-bold flex items-center justify-between text-rose-400">
                        <div className="flex items-center gap-1.5">
                          <Lock className="w-4 h-4" />
                          <span>Incorrect • Attempt Locked</span>
                        </div>
                        <span className="text-[10px] font-mono bg-slate-900 px-2 py-0.5 rounded border border-rose-500/30">
                          No Retries
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 pl-5">
                        <span className="text-emerald-400 font-semibold">Correct Answer: </span>
                        {currentQ.options[currentQ.correctAnswerIndex]}
                      </p>
                      <p className="text-[11px] text-slate-400 pl-5">{currentQ.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#182742]">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#111a2f] border border-[#21355a] text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous Question
                </button>

                <div className="text-xs font-mono text-slate-400">
                  {answeredCount} of {questions.length} Answered
                </div>

                <button
                  disabled={!isCurrentAnswered}
                  onClick={handleNext}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    !isCurrentAnswered
                      ? 'bg-slate-800 text-slate-500 border border-slate-700/60 opacity-60 cursor-not-allowed shadow-none'
                      : 'bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.25)] cursor-pointer active:scale-95'
                  }`}
                >
                  {!isCurrentAnswered
                    ? 'Answer Question to Continue'
                    : currentQuestionIndex === questions.length - 1
                    ? 'Finish Assessment'
                    : 'Next Question'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Review Cards, Score & Certificate */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Review Cards */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">
                Quick Review Cards
              </h3>

              <div className="space-y-3">
                {quickReviewCards.map((c, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#090f1d] border border-[#1b2b48] hover:border-[#00f5c4]/40 transition-colors space-y-2 shadow-sm"
                  >
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 uppercase">
                      {c.badge}
                    </span>
                    <h4 className="text-sm font-bold text-white pt-0.5">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Score Card */}
            <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1e2f4e] text-center space-y-3 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-500/30 text-[#ff6b6b] flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>

              <h4 className="text-base font-bold text-white">
                Your Score
              </h4>

              <div className="font-mono text-2xl font-extrabold text-[#00f5c4]">
                {answeredCount > 0 ? `${scorePercentage}%` : 'Pending'}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                {answeredCount > 0
                  ? `You have answered ${answeredCount} of ${questions.length} questions. Correct: ${correctCount}.`
                  : 'Complete the chapter quiz in this browser session to clear your final Class IX DTI course completion report!'}
              </p>
            </div>

            {/* Certificate of Completion Card */}
            <div className="p-6 rounded-2xl bg-[#091120] border-2 border-[#00f5c4]/60 space-y-4 shadow-[0_0_20px_rgba(0,245,196,0.15)]">
              <div className="flex items-center gap-2.5 text-[#00f5c4] font-bold text-base">
                <Award className="w-5 h-5 flex-shrink-0" />
                <span>Certificate of Completion</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Earn a physical, class-verified badge from your technology lab instructor. Complete all lessons and achieve at least 60% on course completion to claim accreditation!
              </p>

              <button
                onClick={() => setShowCertificateModal(true)}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 ${
                  isEligibleForCertificate
                    ? 'bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_15px_rgba(0,245,196,0.25)]'
                    : 'bg-[#15233d] text-slate-300 hover:text-white border border-[#233556]'
                }`}
              >
                {isEligibleForCertificate ? (
                  <>
                    <Award className="w-4 h-4" />
                    <span>View & Claim Official Certificate</span>
                  </>
                ) : (
                  <>
                    <span>Preview Certificate Format</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- CERTIFICATE MODAL ----------------- */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-[#0b1122] border-2 border-[#00f5c4] rounded-3xl p-8 space-y-6 shadow-2xl relative text-center">
            {/* Certificate Border Design */}
            <div className="p-6 rounded-2xl bg-[#070b16] border border-cyan-500/40 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#070b16] border border-[#00f5c4] flex items-center justify-center p-2 mx-auto shadow-[0_0_20px_#00f5c4] overflow-hidden">
                <img 
                  src="/assets/logo_eye.png" 
                  alt="AI Recognition System Eye Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono tracking-widest text-[#ff6b6b] uppercase font-bold">
                  CERTIFICATE OF ACADEMIC EXCELLENCE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Class IX Digital Technology and Innovation (DTI)
                </h2>
                <div className="flex items-center justify-center gap-2 pt-0.5">
                  <span className="px-3 py-1 rounded-full bg-[#00f5c4]/10 border border-[#00f5c4]/30 text-[#00f5c4] text-xs font-mono font-bold">
                    Chapter 10 • Topic: AI Recognition System
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Samtse College of Education • Royal University of Bhutan
                </p>
              </div>

              <div className="py-2 border-y border-[#182740] space-y-1">
                <span className="text-xs text-slate-400">This certifies that</span>
                <div className="text-xl font-bold text-[#00f5c4]">
                  {studentName || 'Class IX Student'}
                </div>
                <span className="text-xs text-slate-400">
                  has demonstrated exemplary mastery in algorithmic pattern detection and biometric security pipelines.
                </span>
              </div>

              {/* Properly ordered formal date and credential footer */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 px-4 border-t border-[#182740] text-center sm:text-left">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Date of Issue</div>
                  <div className="text-xs font-semibold text-slate-200 font-mono mt-0.5">
                    {(() => {
                      const now = new Date();
                      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                      return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
                    })()}
                  </div>
                </div>

                <div className="sm:text-center">
                  <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Course Completion</div>
                  <div className="text-xs font-bold text-[#00f5c4] font-mono mt-0.5">
                    {scorePercentage}% / 100%
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Module Tutor</div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">
                    Ms. Sapna Thapa
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-slate-500 text-center pt-1">
                Samtse College of Education • Bachelors of Education in IT • Credential REC-IX-2026-407
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-[#121c32] hover:bg-[#1a2846] text-white border border-[#21355a] flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
