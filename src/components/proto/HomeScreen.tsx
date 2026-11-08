import React from 'react';
import { 
  ArrowRight, Video, BookOpen, Compass, Users, Code, MessageSquare, 
  Sparkles, Layers, ShieldCheck, Globe, HelpCircle, CheckCircle2, Quote, FolderPlus
} from 'lucide-react';
import { assetUrl } from '../../utils/assetUrl';

interface HomeScreenProps {
  onStartLearning: () => void;
  onOpenCreators: () => void;
  onNavigateTab: (tab: 'home' | 'lessons' | 'activities' | 'notes' | 'tutor' | 'assessment' | 'login') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartLearning,
  onOpenCreators,
  onNavigateTab,
}) => {
  const journeySteps = [
    { num: 1, label: 'Learn', sub: 'Core Basics', icon: BookOpen },
    { num: 2, label: 'Watch', sub: 'Animated Explainer', icon: Video },
    { num: 3, label: 'Explore', sub: 'AI Sandboxes', icon: Compass },
    { num: 4, label: 'Interact', sub: 'Roleplay Sim', icon: Users },
    { num: 5, label: 'Apply', sub: 'Code Playground', icon: Code },
    { num: 6, label: 'Clarify', sub: 'AI Copilot Tutor', icon: MessageSquare },
    { num: 7, label: 'Reflect', sub: 'Concept Mapping', icon: Sparkles },
  ];

  const highlights = [
    {
      title: 'Video Lessons',
      desc: 'Immersive animated 5-minute explainers for busy teens.',
      icon: Video,
      color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      tab: 'lessons' as const,
    },
    {
      title: 'Interactive Activities',
      desc: 'Real-time facial expression and hand gesture camera activities.',
      icon: Layers,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      tab: 'activities' as const,
    },
    {
      title: 'Real-World Examples',
      desc: 'Examine biometrics in high-frequency airport gates.',
      icon: Globe,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      tab: 'lessons' as const,
    },
    {
      title: 'AI Chatbot Support',
      desc: '24/7 student assistant to answer Class IX DTI syllabus doubts instantly.',
      icon: MessageSquare,
      color: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      tab: 'tutor' as const,
    },
    {
      title: 'Additional Teacher & Learner Tools',
      desc: 'Class IX DTI lesson plans, slide decks, rubrics, and upload space for teachers and learners.',
      icon: FolderPlus,
      color: 'bg-slate-800/40 text-slate-300 border-slate-700/60',
      tab: 'notes' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b16] text-white">
      {/* ----------------- SECTION 1: HERO ----------------- */}
      <section className="relative px-6 sm:px-12 pt-14 pb-20 max-w-7xl mx-auto overflow-hidden">
        {/* Glow ambient circles */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-[#00f5c4] bg-[#00f5c4]/10 border border-[#00f5c4]/30 uppercase">
              LEVELSET EDTECH PLATFORM
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Explore the World of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00f5c4]">
                AI Recognition Systems
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              An interactive online course designed specifically for Class IX DTI students. Master AI definition model parameters, cycles, and biometrics through interactive presentations, roleplay simulators, and instant AI tutor debug.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartLearning}
                className="px-6 py-3 rounded-lg font-semibold text-sm bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_20px_rgba(0,245,196,0.35)] flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCreators}
                className="px-5 py-3 rounded-lg font-medium text-sm bg-[#0d1627] hover:bg-[#14213d] text-slate-200 border border-[#21355a] flex items-center gap-2 transition-all hover:border-[#00f5c4]/40"
              >
                <span>Know the creators</span>
                <Video className="w-4 h-4 text-[#ff6b6b]" />
              </button>
            </div>
          </div>

          {/* Right Hero Graphic (Matching 3D Biometric Tech illustration in screenshot) */}
          {/* Right Hero Graphic (Official AI Recognition System artwork) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl bg-[#0b1222] border border-[#1a2b4b] shadow-2xl overflow-hidden flex flex-col justify-between group hover:border-[#00f5c4]/60 transition-all">
              <img 
                src={assetUrl('assets/aistudio/Gemini_Generated_Image_ohi75yohi75yohi7_afdc3e63.jpg')}
                alt="AI Recognition System Official Artwork" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b16]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#00f5c4]">
                <span className="bg-[#070b16]/90 px-2.5 py-1 rounded-md border border-[#00f5c4]/30 backdrop-blur-sm">
                  SCE • B.Ed in IT
                </span>
                <span className="text-slate-300 bg-black/70 px-2 py-0.5 rounded border border-slate-700">
                  DTI Chapter 10 Curriculum
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 2: 7-STEP IMMERSIVE JOURNEY ----------------- */}
      <section className="bg-[#050811] border-y border-[#121c2e] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
              LEARNING PIPELINE METHODOLOGY
            </h4>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Our 7-Step Immersive Journey
            </h2>
          </div>

          {/* Stepper with connecting line */}
          <div className="relative">
            {/* Horizontal line across circles on desktop */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-[#1a2944] z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
              {journeySteps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={step.num}
                    className="flex flex-col items-center text-center space-y-2.5 group cursor-pointer"
                    onClick={onStartLearning}
                  >
                    {/* Circle Node */}
                    <div className="w-14 h-14 rounded-full bg-[#090f1d] border-2 border-[#00f5c4]/60 group-hover:border-[#00f5c4] flex items-center justify-center text-[#00f5c4] shadow-[0_0_12px_rgba(0,245,196,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,245,196,0.4)] transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#00f5c4] transition-colors">
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {step.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 3: COURSE HIGHLIGHTS ----------------- */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-10">
        <div className="space-y-1">
          <h4 className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
            PLATFORM HIGH-POINTS
          </h4>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Course Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {highlights.map((h, i) => {
            const IconComp = h.icon;
            return (
              <div
                key={i}
                onClick={() => onNavigateTab(h.tab)}
                className="p-6 rounded-2xl bg-[#0c1324] border border-[#1b2b48] hover:border-[#00f5c4]/50 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between space-y-6 group shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${h.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-[#00f5c4] transition-colors">
                    {h.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- SECTION 4: TAILORED LEARNER PERSPECTIVES ----------------- */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto space-y-10">
        <div className="space-y-1">
          <h4 className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            WHO IS THIS DTI SYLLABUS DESIGNED FOR?
          </h4>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Tailored Learner Perspectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Perspective 1: Students */}
          <div className="p-6 rounded-2xl bg-[#0c1324] border border-[#1b2b48] flex flex-col sm:flex-row items-center gap-6 hover:border-cyan-500/40 transition-colors">
            {/* Bhutanese Student Illustration Box */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl bg-[#0f172a] border border-cyan-500/30 flex-shrink-0 overflow-hidden">
              <img 
                src={assetUrl('assets/bhutan_student_simple.jpg')}
                alt="Bhutanese Student" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 uppercase">
                FOR LEARNERS
              </span>
              <h3 className="text-lg font-bold text-white">
                Students (Class IX DTI Learners)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Study biometric scan protocols, definition schemas, and AI algorithm pipelines via engaging micro-modules and interactive slides. Take fun diagnostic quizzes with friends!
              </p>
            </div>
          </div>

          {/* Perspective 2: Teachers */}
          <div className="p-6 rounded-2xl bg-[#0c1324] border border-[#1b2b48] flex flex-col sm:flex-row items-center gap-6 hover:border-rose-500/40 transition-colors">
            {/* Bhutanese Teacher Illustration Box */}
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl bg-[#0f172a] border border-rose-500/30 flex-shrink-0 overflow-hidden">
              <img 
                src={assetUrl('assets/bhutan_teacher_simple.jpg')}
                alt="Bhutanese Teacher" 
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="space-y-3 text-center sm:text-left">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-[#ff6b6b] bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 uppercase">
                FOR INSTRUCTORS
              </span>
              <h3 className="text-lg font-bold text-white">
                Teachers (Ready DTI Instructionals)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Utilize slides, ready-made lesson structures, student notes, automatic quiz analytics, and interactive team roleplays in physical or digital high-school computer labs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- SECTION 5: STUDENT TESTIMONIAL ----------------- */}
      <section className="py-20 px-6 sm:px-12 bg-[#090e1b] border-t border-[#141f34] text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center text-[#ff6b6b]">
            <Quote className="w-12 h-12 stroke-1" />
          </div>

          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-200 leading-relaxed max-w-3xl mx-auto">
            "Before using AI Learn, DTI Chapter 10 AI Recognition Systems felt dry and theoretical. With the interactive biometric face unlock scans and the helpful AI Tutor on hand, we spent our computer lab hours building neural meshes and testing them in our classrooms."
          </blockquote>

          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#00f5c4]">
              Rohan K. & Team
            </h4>
            <p className="text-xs text-slate-400">
              Class IX Student Group, Springdale High School
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
