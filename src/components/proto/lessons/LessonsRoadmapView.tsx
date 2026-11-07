import React from 'react';
import { CheckCircle2, ArrowRight, Lock, Play } from 'lucide-react';

interface LessonsRoadmapViewProps {
  onSelectLesson: (lessonId: 'lesson-1' | 'lesson-2' | 'lesson-3' | 'lesson-4' | 'lesson-5' | 'lesson-6') => void;
  unlockedLessons: string[];
  completedLessons: string[];
}

export const LessonsRoadmapView: React.FC<LessonsRoadmapViewProps> = ({
  onSelectLesson,
  unlockedLessons,
  completedLessons,
}) => {
  const curriculumGoals = [
    {
      title: 'Define AI Recognition Systems',
      desc: 'Formulate baseline criteria distinguishing automatic algorithmic classification from manual rule-based inputs (Subtopic 1).',
    },
    {
      title: 'Understand the Recognition Cycle',
      desc: 'Map how data starts as sensory/raw input, transforms through processor nodes, and resolves as classified output (Subtopic 2).',
    },
    {
      title: 'Examine Key Biometric Types',
      desc: 'Identify facial, soundwave, fingerprint, and text pattern structures (Subtopic 3).',
    },
    {
      title: 'Trace Real-World Deployments',
      desc: 'Audit high-stakes industrial use cases including smartphone gateways, airport terminals, and automated bank vaults (Subtopic 4).',
    },
    {
      title: 'Analyze Core System Benefits',
      desc: 'Examine 24/7 consistency, biometric accuracy, high-speed throughput, and fraud detection (Subtopic 5).',
    },
    {
      title: 'Map Limitations & Ethical Dilemmas',
      desc: 'Investigate lighting/noise errors, algorithmic bias, biometric privacy risks, capital costs, and overdependence (Subtopic 6).',
    },
  ];

  const roadmapSteps = [
    {
      id: 'lesson-1' as const,
      num: '01',
      title: 'Lesson 1: System Definition',
    },
    {
      id: 'lesson-2' as const,
      num: '02',
      title: 'Lesson 2: The Cycle',
    },
    {
      id: 'lesson-3' as const,
      num: '03',
      title: 'Lesson 3: Biometric Types',
    },
    {
      id: 'lesson-4' as const,
      num: '04',
      title: 'Lesson 4: Real World Use',
    },
    {
      id: 'lesson-5' as const,
      num: '05',
      title: 'Lesson 5: System Benefits',
    },
    {
      id: 'lesson-6' as const,
      num: '06',
      title: 'Lesson 6: Limitations & Ethics',
    },
  ];

  // Determine current active lesson
  const currentLessonId = roadmapSteps.find((s) => !completedLessons.includes(s.id))?.id || 'lesson-6';

  return (
    <div className="py-12 px-6 sm:px-12 max-w-7xl mx-auto space-y-16">
      {/* Top Banner Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
          <span>DIGITAL TECHNOLOGY SUBTOPICS</span>
          <span>•</span>
          <span>CHAPTER 10</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Recognition Systems
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          Welcome to Chapter 10. AI Recognition Systems allow computers to perceive, categorize, and verify digital or physical objects. In this unit, we explore the computational models behind biometric scan systems, tracing how machines convert raw sensor inputs into actionable classified outputs, while examining real-world benefits and ethical limits.
        </p>
      </div>

      {/* Main Grid: Curriculum Goals (Left) vs Visual Roadmap (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: What You Will Learn */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
              CURRICULUM GOALS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What You Will Learn
            </h2>
          </div>

          <div className="space-y-5 pt-2">
            {curriculumGoals.map((goal, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="mt-1 flex-shrink-0 text-[#00f5c4]">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white group-hover:text-[#00f5c4] transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {goal.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual Course Roadmap Card */}
        <div className="lg:col-span-5">
          <div className="p-8 rounded-3xl bg-[#0b1122] border border-[#1d2d4c] shadow-2xl space-y-8">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
                PROGRESS PIPELINE TRACKER
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Visual Course Roadmap
              </h3>
            </div>

            {/* Vertical timeline */}
            <div className="relative pl-2 space-y-7">
              {/* Connecting vertical line */}
              <div className="absolute top-4 bottom-4 left-6 w-[2px] bg-gradient-to-b from-[#00f5c4] via-[#1d2d4c] to-[#152037]" />

              {roadmapSteps.map((step) => {
                const isCompleted = completedLessons.includes(step.id);
                const isUnlocked = unlockedLessons.includes(step.id);
                const isCurrent = step.id === currentLessonId && !isCompleted;

                let statusLabel = 'LOCKED';
                if (isCompleted) {
                  statusLabel = 'COMPLETED';
                } else if (isCurrent) {
                  statusLabel = step.id === 'lesson-1' ? 'CURRENT SUBTOPIC - START HERE' : 'CURRENT SUBTOPIC';
                } else if (isUnlocked) {
                  statusLabel = 'UNLOCKED';
                }

                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      if (isUnlocked) {
                        onSelectLesson(step.id);
                      }
                    }}
                    className={`relative flex items-center gap-5 group select-none ${
                      isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                    }`}
                  >
                    {/* Circle badge */}
                    <div
                      className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                          : isCurrent
                          ? 'bg-[#00f5c4] text-[#070b16] shadow-[0_0_15px_#00f5c4]'
                          : isUnlocked
                          ? 'bg-[#00f5c4]/20 border border-[#00f5c4] text-[#00f5c4]'
                          : 'bg-[#10182b] border border-[#21355a] text-slate-500'
                      }`}
                    >
                      {isCompleted ? '✓' : step.num}
                    </div>

                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-bold transition-colors ${
                            isCurrent
                              ? 'text-[#00f5c4]'
                              : isCompleted
                              ? 'text-white'
                              : isUnlocked
                              ? 'text-white group-hover:text-[#00f5c4]'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </h4>

                        {!isUnlocked && (
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>

                      <p
                        className={`text-[10px] font-mono tracking-wider uppercase ${
                          isCompleted
                            ? 'text-emerald-400 font-bold'
                            : isCurrent
                            ? 'text-[#00f5c4] font-bold'
                            : isUnlocked
                            ? 'text-cyan-300'
                            : 'text-slate-500'
                        }`}
                      >
                        {statusLabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Start / Continue Chapter Button */}
            <button
              onClick={() => onSelectLesson(currentLessonId)}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[0_0_20px_rgba(255,107,107,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              <span>
                {completedLessons.length === 0
                  ? 'Start Chapter'
                  : completedLessons.length === 6
                  ? 'Review All Subtopics'
                  : `Continue: ${roadmapSteps.find((s) => s.id === currentLessonId)?.title}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
