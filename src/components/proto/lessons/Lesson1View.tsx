import React, { useState } from 'react';
import { 
  AlertCircle, ArrowRight, Layers, Compass, Target, Lock, CheckCircle2, BookOpen, Check
} from 'lucide-react';
import { Lesson1Presentation } from './Lesson1Presentation';

interface Lesson1ViewProps {
  onNextLesson: () => void;
}

export const Lesson1View: React.FC<Lesson1ViewProps> = ({
  onNextLesson,
}) => {
  // USER REQUIREMENT: Students can't move to next lesson without completing the current lesson activity
  const [isActivityCompleted, setIsActivityCompleted] = useState<boolean>(false);

  return (
    <div className="py-8 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-white">
      {/* ----------------- TOP LESSON PROGRESS HEADER ----------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#18253d]">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
            SUBTOPIC 01 / CHAPTER 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Are AI Recognition Systems?
          </h1>
        </div>

        {/* Progress Bar Container: Lesson 1 of 6 (17%) */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-semibold text-[#00f5c4] whitespace-nowrap">
            PROGRESS: LESSON 1 of 6
          </div>
          <div className="w-40 sm:w-56 h-2 bg-[#121c2e] rounded-full overflow-hidden border border-[#21355a]">
            <div className="h-full bg-[#00f5c4] rounded-full w-[17%] shadow-[0_0_8px_#00f5c4]" />
          </div>
          <div className="text-xs font-mono text-[#00f5c4] font-bold whitespace-nowrap">
            17% DONE
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 1: INTERACTIVE PRESENTATION & STAR ASSESSMENT (LINK 1 PPT) ----------------- */}
      <section className="space-y-4">
        <Lesson1Presentation 
          onNextLesson={onNextLesson}
        />
      </section>

      {/* ----------------- SECTION 2: CURRICULUM DEEP DIVE & COMPUTATIONAL CONCEPTS ----------------- */}
      <div className="pt-6 border-t border-[#18253d] space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
            CURRICULUM DEEP DIVE • FOUNDATIONS
          </span>
          <h2 className="text-2xl font-bold text-white">
            Biometric Geometry & The Official Definition
          </h2>
          <p className="text-xs text-slate-400">
            Explore how cameras convert human features into mathematical vector meshes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Face Scan Mesh & Official Definition */}
          <div className="lg:col-span-6 space-y-6">
            {/* Neon Face Scan Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[#090f1d] border border-[#1d2d4c] p-4 overflow-hidden shadow-2xl flex items-center justify-center group">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Tech Reticles */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#00f5c4]/60" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#00f5c4]/60" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#00f5c4]/60" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#00f5c4]/60" />

                {/* Scanning Sweep Line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00f5c4] to-transparent shadow-[0_0_15px_#00f5c4] animate-pulse top-1/2 -translate-y-1/2" />

                {/* Face Wireframe SVG */}
                <svg className="w-56 h-56 sm:w-64 sm:h-64 text-[#00f5c4]" viewBox="0 0 200 200" fill="none">
                  {/* Face Contour */}
                  <path d="M50 80 Q50 30 100 30 Q150 30 150 80 Q150 140 100 170 Q50 140 50 80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  {/* Cheeks & Jaw mesh */}
                  <path d="M65 90 L100 115 L135 90" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                  <path d="M75 130 L100 145 L125 130" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                  {/* Eyes Coordinates */}
                  <ellipse cx="78" cy="85" rx="14" ry="7" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="78" cy="85" r="3" fill="currentColor" />
                  <ellipse cx="122" cy="85" rx="14" ry="7" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="122" cy="85" r="3" fill="currentColor" />
                  {/* Nose Bridge */}
                  <path d="M100 80 L96 110 L104 110 Z" stroke="currentColor" strokeWidth="1.2" />
                  {/* Mouth Line */}
                  <path d="M85 135 Q100 142 115 135" stroke="currentColor" strokeWidth="1.5" />
                  {/* Landmark Points */}
                  <circle cx="100" cy="50" r="2" fill="#00f5c4" />
                  <circle cx="65" cy="70" r="2" fill="#ff6b6b" />
                  <circle cx="135" cy="70" r="2" fill="#ff6b6b" />
                  <circle cx="60" cy="110" r="2" fill="#00f5c4" />
                  <circle cx="140" cy="110" r="2" fill="#00f5c4" />
                  <circle cx="100" cy="165" r="2.5" fill="#00f5c4" />
                </svg>

                {/* Data Overlays */}
                <div className="absolute top-4 left-6 font-mono text-[11px] text-[#00f5c4] tracking-wider bg-black/60 px-2 py-0.5 rounded border border-[#00f5c4]/30">
                  ID: 407.08A
                </div>
                <div className="absolute bottom-4 right-6 font-mono text-[11px] text-emerald-400 tracking-wider bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse">
                  SCANNING...
                </div>
              </div>
            </div>

            {/* Official Definition Box (Cyan Border) */}
            <div className="p-6 rounded-2xl bg-[#09101d] border-2 border-[#00f5c4]/70 shadow-[0_0_20px_rgba(0,245,196,0.15)] space-y-3">
              <div className="flex items-center gap-2.5 text-[#00f5c4] font-bold text-base">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>Official Definition</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                An <strong className="text-white">AI Recognition System</strong> is a software and hardware pipeline that automatically identifies, categorizes, and validates digital patterns (such as images, soundwaves, or biometric data) by matching raw sensory inputs against pretrained database models.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Activity Completion Status & Next Lesson Gate */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#00f5c4]" />
                  <span>LESSON 1 ACTIVITY STATUS</span>
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                  isActivityCompleted 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {isActivityCompleted ? 'Completed' : 'Activity Pending'}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">
                  Lesson 1 Core Concept Review
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Before moving to Lesson 2, students must complete the interactive slide presentation above (including the 5 checkpoint questions and self-reflection).
                </p>
              </div>

              {/* Activity Checklist */}
              <div className="space-y-2.5 pt-1">
                <div 
                  onClick={() => setIsActivityCompleted(!isActivityCompleted)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between gap-3 transition-all ${
                    isActivityCompleted
                      ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                      : 'bg-[#10192e] border-[#1d2d4c] text-slate-300 hover:border-[#00f5c4]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                      isActivityCompleted ? 'bg-emerald-400 border-emerald-400 text-slate-950 font-bold' : 'border-slate-500 bg-slate-900'
                    }`}>
                      {isActivityCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-semibold text-white">Completed Lesson 1 Interactive Slide Deck</div>
                      <div className="text-[11px] text-slate-400">Reviewed 14 sequenced slides, biometrics, and checkpoints</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#00f5c4]">
                    {isActivityCompleted ? 'VERIFIED' : 'CLICK TO CONFIRM'}
                  </span>
                </div>
              </div>

              {/* Helper Notice if Locked */}
              {!isActivityCompleted && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Progression locked: Confirm you have explored the interactive slides above to unlock Lesson 2.</span>
                </div>
              )}

              {/* Next Lesson Button - Locked until activity is completed */}
              {isActivityCompleted ? (
                <button
                  onClick={onNextLesson}
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_20px_rgba(0,245,196,0.3)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <span>✓ Proceed to Lesson 2: The Recognition Cycle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed opacity-60 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-slate-500" />
                  <span>Complete Lesson 1 Activity to Unlock Lesson 2</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- BOTTOM ROW: KEY COMPUTATIONAL CONCEPTS ----------------- */}
      <div className="pt-8 space-y-6">
        <h3 className="text-xl font-bold text-white tracking-tight">
          Key Computational Concepts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1b2b48] space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00f5c4]">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              Classification Models
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Machines classify objects into predefined folders based on high-frequency numeric thresholds.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1b2b48] space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00f5c4]">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              Feature Extraction
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algorithms strip away redundant image background data to extract key geometric anchors.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1b2b48] space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00f5c4]">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              High-Confidence Outputs
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The system matches anchors against database tables to output structured predictions with confidence metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
