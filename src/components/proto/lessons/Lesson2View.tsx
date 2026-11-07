import React, { useState } from 'react';
import { 
  Play, Pause, ArrowRight, ChevronDown, ChevronUp, Sparkles, 
  Layers, Volume2, Shield, Video, ExternalLink, Lock, Check, CheckCircle2
} from 'lucide-react';
import { COURSE_MATERIALS } from '../../../materialsConfig';
import { formatVideoEmbedUrl } from '../../../utils/mediaUtils';
import { VideoCheckpointQuiz } from './VideoCheckpointQuiz';
import { LESSON2_VIDEO_QUIZ } from './videoQuizData';

interface Lesson2ViewProps {
  onNextLesson: () => void;
}

export const Lesson2View: React.FC<Lesson2ViewProps> = ({
  onNextLesson,
}) => {
  const videoData = COURSE_MATERIALS.videos.lesson2Explainer;
  const [activeStage, setActiveStage] = useState<number>(1);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  // USER REQUIREMENT: Students can't move to next lesson without completing the whole video and video quiz
  const [hasWatchedVideo, setHasWatchedVideo] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [expandedAccordion, setExpandedAccordion] = useState<number>(1);

  const stages = [
    {
      num: 1,
      title: 'Input',
      desc: 'Sensors capture raw physical variables (like face images or acoustic waves).',
    },
    {
      num: 2,
      title: 'Processing',
      desc: 'Algorithms apply filters to strip noise, aligning feature landmarks.',
    },
    {
      num: 3,
      title: 'Pattern Identification',
      desc: 'Neural networks compare extracted features against trained models.',
    },
    {
      num: 4,
      title: 'Output',
      desc: 'Computers deliver structured classification with margin confidence.',
    },
  ];

  const breakdownStages = [
    {
      id: 1,
      title: 'Stage 1: Input Protocols (Camera / Microphone)',
      content: 'Sensors gather raw pixels, light rays, or sound pressure frequencies. High fidelity is required to bypass ambient noise metrics.',
    },
    {
      id: 2,
      title: 'Stage 2: Digital Signal Pre-Processing',
      content: 'Digital signal processors (DSP) normalize light gradients, apply edge-isolation kernels, and convert analog inputs into structured numeric tensors.',
    },
    {
      id: 3,
      title: 'Stage 3: Feature Matrix Match',
      content: 'Trained convolutional neural networks generate high-dimensional feature embeddings, measuring cosine distances against stored authorized identity vectors.',
    },
    {
      id: 4,
      title: 'Stage 4: Output Confidence Resolution',
      content: 'The decision gate compares the similarity score against safety thresholds. If score >= 98.2%, access is granted; otherwise, a security flag or fallback prompt is triggered.',
    },
  ];

  return (
    <div className="py-8 px-6 sm:px-12 max-w-7xl mx-auto space-y-10 text-white">
      {/* ----------------- TOP LESSON PROGRESS HEADER ----------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#18253d]">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            SUBTOPIC 02 / CHAPTER 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Recognition System Cycle
          </h1>
        </div>

        {/* Progress Bar Container */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-semibold text-[#00f5c4] whitespace-nowrap">
            PROGRESS: LESSON 2 of 5
          </div>
          <div className="w-40 sm:w-56 h-2 bg-[#121c2e] rounded-full overflow-hidden border border-[#21355a]">
            <div className="h-full bg-[#00f5c4] rounded-full w-[40%] shadow-[0_0_8px_#00f5c4]" />
          </div>
          <div className="text-xs font-mono text-slate-400 whitespace-nowrap">
            40% DONE
          </div>
        </div>
      </div>

      {/* ----------------- MAIN TWO-COLUMN CONTENT ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: System Loop Diagram & Accordion */}
        <div className="lg:col-span-7 space-y-8">
          {/* Concentric Engine Pipeline Card */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl space-y-6">
            <div className="space-y-1 text-center">
              <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
                CONCENTRIC ENGINE PIPELINE
              </span>
              <h3 className="text-xl font-bold text-white">
                System Loop Diagram
              </h3>
            </div>

            {/* 4 Connected Stages */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              {stages.map((st, idx) => {
                const isActive = activeStage === st.num;
                return (
                  <React.Fragment key={st.num}>
                    <div
                      onClick={() => setActiveStage(st.num)}
                      className={`p-4 rounded-xl text-center space-y-2 cursor-pointer transition-all ${
                        isActive
                          ? 'bg-[#00f5c4]/15 border-2 border-[#00f5c4] shadow-[0_0_15px_rgba(0,245,196,0.2)]'
                          : 'bg-[#0f172a] border border-[#233556] hover:border-slate-400'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          isActive
                            ? 'bg-[#00f5c4] text-[#070b16]'
                            : 'bg-[#1e293b] text-slate-300'
                        }`}
                      >
                        {st.num}
                      </div>

                      <h4
                        className={`text-xs font-bold ${
                          isActive ? 'text-[#00f5c4]' : 'text-white'
                        }`}
                      >
                        {st.title}
                      </h4>

                      <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                        {st.desc}
                      </p>
                    </div>

                    {/* Arrow between steps on sm+ */}
                    {idx < 3 && (
                      <div className="hidden sm:flex justify-center text-slate-500 font-bold">
                        →
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Detailed Stage Breakdown Accordion */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Detailed Stage Breakdown
            </h3>

            <div className="space-y-3">
              {breakdownStages.map((stage) => {
                const isExpanded = expandedAccordion === stage.id;
                return (
                  <div
                    key={stage.id}
                    className={`rounded-2xl transition-all overflow-hidden border ${
                      isExpanded
                        ? 'border-[#00f5c4] bg-[#0b1222] shadow-[0_0_15px_rgba(0,245,196,0.12)]'
                        : 'border-[#1b2b48] bg-[#090e1b] hover:border-slate-500'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedAccordion(isExpanded ? 0 : stage.id)}
                      className="w-full p-4.5 px-5 flex items-center justify-between text-left text-sm font-bold text-white"
                    >
                      <span className={isExpanded ? 'text-[#00f5c4]' : 'text-white'}>
                        {stage.title}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#00f5c4]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-[#16243d]">
                        {stage.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Video Slot & Did You Know Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Explainer Animation Card */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl space-y-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
                {videoData.subtitle}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {videoData.title}
            </h3>

            {/* Video Player Container */}
            {videoData.embedUrl ? (
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-[#23385c] bg-black">
                {formatVideoEmbedUrl(videoData.embedUrl).type === 'video' ? (
                  <video
                    src={formatVideoEmbedUrl(videoData.embedUrl).src}
                    controls
                    className="w-full h-full object-contain"
                    onPlay={() => setHasWatchedVideo(true)}
                    onEnded={() => setHasWatchedVideo(true)}
                  />
                ) : (
                  <iframe
                    src={formatVideoEmbedUrl(videoData.embedUrl).src}
                    title={videoData.title}
                    className="w-full h-full"
                    allowFullScreen
                    onLoad={() => setHasWatchedVideo(true)}
                  />
                )}
              </div>
            ) : (
              <div className="relative aspect-video rounded-xl bg-gradient-to-tr from-[#050b16] via-[#09152b] to-[#122448] border border-[#23385c] overflow-hidden flex items-center justify-center group shadow-inner">
                {/* Simulated Neural Network Lines in background */}
                <div className="absolute inset-0 bg-[radial-gradient(#00f5c4_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

                {/* Cyber Geometric Mesh Points */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 rounded-full border border-cyan-500/20 animate-ping opacity-25" />
                  <div className="w-48 h-48 rounded-full border border-indigo-500/20 animate-pulse" />
                </div>

                {/* Play Button */}
                <button
                  onClick={() => {
                    setIsPlayingVideo(!isPlayingVideo);
                    setHasWatchedVideo(true);
                  }}
                  className="relative z-10 w-16 h-16 rounded-full bg-[#00f5c4] text-[#070b16] flex items-center justify-center shadow-[0_0_25px_#00f5c4] group-hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                  aria-label="Play Video"
                >
                  {isPlayingVideo ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                {/* Duration Badge bottom right */}
                <div className="absolute bottom-3 right-3 font-mono text-xs text-white bg-black/75 px-2 py-0.5 rounded border border-white/20">
                  {videoData.duration}
                </div>

                {/* Video playing animation banner */}
                {isPlayingVideo && (
                  <div className="absolute top-3 left-3 bg-[#070b16]/90 border border-[#00f5c4]/50 px-3 py-1 rounded text-[11px] font-mono text-[#00f5c4] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-ping" />
                    <span>PLAYING PREVIEW ANIMATION</span>
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-slate-400 leading-relaxed">
              {videoData.description}
            </p>

            {/* Video Activity Completion Tracker */}
            <div 
              onClick={() => setHasWatchedVideo(!hasWatchedVideo)}
              className={`p-3.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between gap-3 transition-all ${
                hasWatchedVideo
                  ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'bg-[#0b1222] border-[#1d2d4c] text-slate-300 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                  hasWatchedVideo ? 'bg-emerald-400 border-emerald-400 text-slate-950 font-bold' : 'border-slate-500 bg-slate-900'
                }`}>
                  {hasWatchedVideo && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="font-semibold text-white">Lesson 2 Video Activity</div>
                  <div className="text-[11px] text-slate-400">
                    {hasWatchedVideo ? 'Watched 5:20 Explainer Video' : 'Click to watch video & unlock next lesson'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono uppercase font-bold ${hasWatchedVideo ? 'text-emerald-400' : 'text-amber-400'}`}>
                {hasWatchedVideo ? 'COMPLETED' : 'PENDING'}
              </span>
            </div>
          </div>

          {/* Did You Know? Box (Coral Border) */}
          <div className="p-6 rounded-2xl bg-[#0e101f] border-2 border-[#ff6b6b]/60 shadow-[0_0_20px_rgba(255,107,107,0.12)] space-y-3">
            <div className="flex items-center gap-2.5 text-[#ff6b6b] font-bold text-base">
              <Sparkles className="w-5 h-5 flex-shrink-0" />
              <span>Did you know?</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Some smart security cameras in your computer have resolution fixing features. If the camera captures a blurry face input, pre-processing filters will resolve the noise coordinates.
            </p>
          </div>
        </div>
      </div>

      {/* ----------------- 10-QUESTION VIDEO CHECKPOINT QUIZ ----------------- */}
      <div className="space-y-4 pt-6 border-t border-[#18253d]">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
            MANDATORY VIDEO CHECKPOINT QUIZ
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Subtopic 2 Comprehension: AI Recognition Cycle
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {hasWatchedVideo 
              ? 'Answer all 10 questions (MCQ, Concept Matching, and Fill in the Blanks) based on the video to unlock Lesson 3.'
              : 'Please watch the video above first to activate this 10-question checkpoint quiz.'}
          </p>
        </div>

        {hasWatchedVideo ? (
          <VideoCheckpointQuiz
            quizTitle="AI Recognition Cycle Video Quiz"
            subtopicNumber={2}
            questions={LESSON2_VIDEO_QUIZ}
            isAlreadyCompleted={isQuizCompleted}
            onComplete={() => {
              setIsQuizCompleted(true);
            }}
          />
        ) : (
          <div className="p-8 rounded-3xl bg-[#090f1d] border border-dashed border-[#1e2f4e] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="text-base font-bold text-white">Quiz Locked Until Video is Completed</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Watch the "AI Recognition Cycle" video above to unlock the 10-question checkpoint quiz.
            </p>
            <button
              onClick={() => setHasWatchedVideo(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] cursor-pointer shadow-md"
            >
              I Have Watched the Video: Start Quiz
            </button>
          </div>
        )}
      </div>

      {/* Next Subtopic CTA - Strictly Locked until video & quiz are both completed */}
      <div className="pt-2">
        {hasWatchedVideo && isQuizCompleted ? (
          <button
            onClick={onNextLesson}
            className="w-full py-4 rounded-xl font-bold text-sm bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[0_0_20px_rgba(255,107,107,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
          >
            <span>✓ Video Watched & 10-Question Quiz Cleared • Proceed to Lesson 3: Types</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm bg-[#090f1d] text-slate-400 border border-slate-800 flex items-center justify-center gap-3">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>
              {!hasWatchedVideo 
                ? 'Step 1: Watch Video above & Step 2: Complete 10-Question Quiz to Unlock Lesson 3' 
                : 'Step 2: Complete all 10 Quiz Questions above to Unlock Lesson 3'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
