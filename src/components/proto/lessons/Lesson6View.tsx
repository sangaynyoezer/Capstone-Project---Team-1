import React from 'react';
import { 
  EyeOff, AlertTriangle, CreditCard, Cpu, ArrowRight, Award, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { Lesson6Presentation } from './Lesson6Presentation';

interface Lesson6ViewProps {
  onCompleteChapter: () => void;
}

export const Lesson6View: React.FC<Lesson6ViewProps> = ({
  onCompleteChapter,
}) => {
  const limitations = [
    {
      title: 'Accuracy Issues & Sensory Noise',
      desc: 'Poor lighting, acoustic chatter, camera lens blur, or demographic bias in training datasets cause recognition errors.',
      icon: AlertTriangle,
    },
    {
      title: 'Privacy Concerns & Data Theft',
      desc: 'Sensitive biometric indicators cannot be reset like passwords if servers are compromised.',
      icon: EyeOff,
    },
    {
      title: 'High Capital & Maintenance Cost',
      desc: 'Requires specialized thermal cameras, fast signal processing units, GPU servers, and continuous calibration.',
      icon: CreditCard,
    },
    {
      title: 'System Dependency & Outage Risks',
      desc: 'Power shutoffs or hardware loop glitches freeze critical entry doors completely without manual overrides.',
      icon: Cpu,
    },
  ];

  return (
    <div className="py-8 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-white">
      {/* ----------------- TOP LESSON PROGRESS HEADER ----------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#18253d]">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            SUBTOPIC 06 / CHAPTER 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Limitations & Ethical Challenges of AI Recognition
          </h1>
        </div>

        {/* Progress Bar Container: 100% COMPLETE */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-semibold text-[#00f5c4] whitespace-nowrap">
            PROGRESS: LESSON 6 of 6
          </div>
          <div className="w-40 sm:w-56 h-2 bg-[#121c2e] rounded-full overflow-hidden border border-[#21355a]">
            <div className="h-full bg-[#00f5c4] rounded-full w-[100%] shadow-[0_0_8px_#00f5c4]" />
          </div>
          <div className="text-xs font-mono text-[#00f5c4] font-bold whitespace-nowrap">
            100% DONE
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 1: INTERACTIVE PRESENTATION & STAR ASSESSMENT ----------------- */}
      <section className="space-y-4">
        <Lesson6Presentation 
          onCompleteChapter={onCompleteChapter}
        />
      </section>

      {/* ----------------- SECTION 2: REFERENCE CARDS & CHAPTER 10 COMPLETION ----------------- */}
      <div className="pt-6 border-t border-[#18253d]">
        <div className="mb-8 space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            CURRICULUM DEEP-DIVE
          </span>
          <h2 className="text-2xl font-bold text-white">
            Topic 2 Limitations Summary & Final Review
          </h2>
          <p className="text-xs text-slate-400">
            Compare key takeaways and prepare for the Chapter 10 Diagnostic Assessment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Limitations Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
              ETHICAL CHALLENGES
            </span>
            <h2 className="text-2xl font-bold text-white">
              The 4 Critical Failure Modes
            </h2>
          </div>

          <div className="space-y-3">
            {limitations.map((l, i) => {
              const IconComp = l.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#0b1122] border border-[#1b2b48] hover:border-[#ff6b6b]/50 transition-all flex items-start gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-[#ff6b6b] flex-shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      {l.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {l.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Chapter 10 Assessment Launch Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#0c1428] to-[#070c17] border-2 border-[#00f5c4]/40 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#00f5c4]" />
                <span>CHAPTER 10 CAPSTONE</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold">
                6/6 SUBTOPICS READY
              </span>
            </div>

            <h3 className="text-xl font-bold text-white leading-snug">
              Complete the Chapter 10 AI Recognition Systems Assessment
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              You have completed all 6 subtopics of Chapter 10! Test your knowledge across the entire curriculum to generate your printable certificate of completion.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>10 Comprehensive Multiple-Choice Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Detailed Explanations & Topic Mastery Breakdown</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Printable Certificate for Samtse College of Education</span>
              </div>
            </div>

            {/* Proceed to Diagnostic Assessment CTA */}
            <button
              onClick={onCompleteChapter}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_20px_rgba(0,245,196,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <span>Launch Chapter 10 Assessment →</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
