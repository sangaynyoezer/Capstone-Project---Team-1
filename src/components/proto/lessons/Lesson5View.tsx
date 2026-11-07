import React from 'react';
import { 
  ShieldCheck, Zap, UserCheck, TrendingUp, Sparkles, ArrowRight
} from 'lucide-react';
import { Lesson5Presentation } from './Lesson5Presentation';

interface Lesson5ViewProps {
  onNextLesson: () => void;
}

export const Lesson5View: React.FC<Lesson5ViewProps> = ({
  onNextLesson,
}) => {
  const benefits = [
    {
      title: 'Speed & Reduced Human Effort',
      desc: 'Processes hundreds of identity vectors simultaneously, cutting manual queue overhead and fatigue.',
      icon: Zap,
    },
    {
      title: 'Enhanced Biometric Security',
      desc: 'Prevents unauthorized entry using non-transferable, impossible-to-forge physiological templates.',
      icon: ShieldCheck,
    },
    {
      title: 'Fraud & Unusual Behaviour Detection',
      desc: 'Spots suspicious banking activity, abnormal login patterns, and perimeter intrusions in real time.',
      icon: Sparkles,
    },
    {
      title: '24/7 Consistent Performance',
      desc: 'Maintains 100% mathematical vigilance without cognitive exhaustion or subjective lapses.',
      icon: TrendingUp,
    },
    {
      title: 'Everyday Convenience',
      desc: 'Instant face unlock and frictionless interaction eliminating passwords and physical badges.',
      icon: UserCheck,
    },
  ];

  return (
    <div className="py-8 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-white">
      {/* ----------------- TOP LESSON PROGRESS HEADER ----------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#18253d]">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
            SUBTOPIC 05 / CHAPTER 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Benefits of AI Recognition Systems
          </h1>
        </div>

        {/* Progress Bar Container: Lesson 5 of 6 (83%) */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-semibold text-[#00f5c4] whitespace-nowrap">
            PROGRESS: LESSON 5 of 6
          </div>
          <div className="w-40 sm:w-56 h-2 bg-[#121c2e] rounded-full overflow-hidden border border-[#21355a]">
            <div className="h-full bg-[#00f5c4] rounded-full w-[83%] shadow-[0_0_8px_#00f5c4]" />
          </div>
          <div className="text-xs font-mono text-[#00f5c4] font-bold whitespace-nowrap">
            83% DONE
          </div>
        </div>
      </div>

      {/* ----------------- SECTION 1: INTERACTIVE PRESENTATION & STAR ASSESSMENT ----------------- */}
      <section className="space-y-4">
        <Lesson5Presentation 
          onCompleteChapter={onNextLesson}
        />
      </section>

      {/* ----------------- SECTION 2: REFERENCE CARDS: BENEFITS ----------------- */}
      <div className="pt-6 border-t border-[#18253d] space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
            TOPIC 2 PART 1 • CURRICULUM REFERENCE
          </span>
          <h2 className="text-2xl font-bold text-white">
            Explore the 6 Core Benefits
          </h2>
          <p className="text-xs text-slate-400">
            Summary of computational and social advantages studied in this module.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => {
            const IconComp = b.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#0b1122] border border-[#1b2b48] hover:border-[#00f5c4]/50 transition-all flex items-start gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00f5c4] flex-shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    {b.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transition CTA to Lesson 6 Limitations */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1c33] via-[#091426] to-[#120d24] border border-[#20365c] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#ff6b6b] font-bold">
              UP NEXT: SUBTOPIC 06
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Ready to explore Limitations & Ethical Challenges?
            </h3>
            <p className="text-xs text-slate-300">
              Complete your understanding by examining accuracy margins, privacy, high installation costs, and overdependence.
            </p>
          </div>

          <button
            onClick={onNextLesson}
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[0_0_15px_rgba(255,107,107,0.35)] flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>Proceed to Lesson 6: Limitations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
