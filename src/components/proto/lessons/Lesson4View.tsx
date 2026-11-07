import React, { useState } from 'react';
import { 
  Smartphone, Shield, Speaker, Lock, Image, MessageSquare, 
  ArrowRight, Play, Pause, ExternalLink, Send, Check, CheckCircle2
} from 'lucide-react';
import { COURSE_MATERIALS } from '../../../materialsConfig';
import { formatVideoEmbedUrl } from '../../../utils/mediaUtils';
import { VideoCheckpointQuiz } from './VideoCheckpointQuiz';
import { LESSON4_VIDEO_QUIZ } from './videoQuizData';

interface Lesson4ViewProps {
  onNextLesson: () => void;
}

export const Lesson4View: React.FC<Lesson4ViewProps> = ({
  onNextLesson,
}) => {
  const videoData = COURSE_MATERIALS.videos.lesson4RolePlay;
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  // USER REQUIREMENT: Students can't move to next lesson without completing video and 10-question quiz
  const [hasWatchedVideo, setHasWatchedVideo] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState<boolean>(false);
  const [discussionInput, setDiscussionInput] = useState<string>('');
  const [discussionPosts, setDiscussionPosts] = useState<string[]>([
    'During morning attendance gate scan in high school building.',
    'At the metro turnstile NFC + face identity matching terminal.',
  ]);

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;
    setDiscussionPosts((prev) => [discussionInput.trim(), ...prev]);
    setDiscussionInput('');
    setShowDiscussionModal(false);
  };

  const scenarios = [
    {
      sub: 'Facial Recognition',
      title: 'Airport Security',
      desc: 'Camera arrays capture facial geometries at high-frequency gates to automatically clear ticket manifests.',
      icon: Shield,
    },
    {
      sub: 'Voice Assistant',
      title: 'Smart Home',
      desc: 'Interactive speakers continuous-scan local acoustic pressure waveforms to identify target owner wake words.',
      icon: Speaker,
    },
    {
      sub: 'Fingerprint Login',
      title: 'Banking App',
      desc: 'Sensors extract unique valley ridge metrics to instantly verify database authorization parameters.',
      icon: Lock,
    },
    {
      sub: 'Image Recognition',
      title: 'Google Photos',
      desc: 'Neural meshes categorize raw photo datasets into custom tags (cats, mountains, friends) automatically.',
      icon: Image,
    },
  ];

  return (
    <div className="py-8 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-white">
      {/* ----------------- TOP LESSON PROGRESS HEADER ----------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#18253d]">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            SUBTOPIC 04 / CHAPTER 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Recognition in the Real World
          </h1>
        </div>

        {/* Progress Bar Container */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-semibold text-[#00f5c4] whitespace-nowrap">
            PROGRESS: LESSON 4 of 6
          </div>
          <div className="w-40 sm:w-56 h-2 bg-[#121c2e] rounded-full overflow-hidden border border-[#21355a]">
            <div className="h-full bg-[#00f5c4] rounded-full w-[80%] shadow-[0_0_8px_#00f5c4]" />
          </div>
          <div className="text-xs font-mono text-slate-400 whitespace-nowrap">
            80% DONE
          </div>
        </div>
      </div>

      {/* ----------------- TOP BANNER: TRACING BIOMETRIC INTERACTIONS ----------------- */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-[#00f5c4] bg-[#00f5c4]/10 border border-[#00f5c4]/30 uppercase">
            EVERYDAY SIMULATION
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tracing Biometric Interactions
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            In our daily routine, we interact with AI systems without even noticing. From unlocking smartphones with facial matrices to querying voice-activated home pods, we live alongside active pattern recognition neural networks.
          </p>
        </div>

        {/* Right Phone Mockup Graphic */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-56 aspect-[9/16] rounded-[2.5rem] bg-[#050914] border-4 border-[#243552] p-3 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Phone Speaker Notch */}
            <div className="w-20 h-4 bg-[#142033] mx-auto rounded-full mb-2" />

            {/* Scanning Face Interface */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-3 relative">
              <div className="w-28 h-28 rounded-full border-2 border-[#00f5c4] flex items-center justify-center relative shadow-[0_0_20px_#00f5c4]">
                <div className="absolute inset-0 border border-dashed border-[#00f5c4]/50 rounded-full animate-spin" />
                <span className="text-4xl">🧑‍💻</span>
              </div>
              <span className="text-[11px] font-mono text-[#00f5c4] tracking-widest animate-pulse bg-black/60 px-2 py-0.5 rounded border border-[#00f5c4]/30">
                SCANNING FACE...
              </span>
            </div>

            {/* Phone Home Button */}
            <div className="w-8 h-8 rounded-full border-2 border-[#243552] mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* ----------------- BOTTOM GRID: SCENARIO GALLERY (LEFT) vs ROLE-PLAY & DISCUSSION (RIGHT) ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Scenario Gallery 2x2 */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
              FIELD CASE STUDIES
            </span>
            <h3 className="text-2xl font-bold text-white">
              Scenario Gallery
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {scenarios.map((sc, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#0b1122] border border-[#1b2b48] hover:border-[#00f5c4]/50 transition-all space-y-3 group shadow-md"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#ff6b6b] font-semibold">
                    {sc.sub}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-[#00f5c4] transition-colors">
                    {sc.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {sc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Role-Play Video Slot & Discussion Corner */}
        <div className="lg:col-span-5 space-y-6">
          {/* Role-Play Simulator Video Slot Card */}
          <div className="p-6 rounded-2xl bg-[#0b1122] border border-[#1e2f4e] shadow-xl space-y-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
                {videoData.subtitle}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {videoData.title}
            </h3>

            {/* Video Player */}
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
              <div className="relative aspect-video rounded-xl bg-[#060b17] border border-[#23385c] overflow-hidden flex items-center justify-center shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                
                {/* Simulated Computer Lab Background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <span className="text-6xl select-none">🏫 💻 👥</span>
                </div>

                {/* Cyan Play Button */}
                <button
                  onClick={() => {
                    setIsPlayingVideo(!isPlayingVideo);
                    setHasWatchedVideo(true);
                  }}
                  className="relative z-20 w-16 h-16 rounded-full bg-[#00f5c4] text-[#070b16] flex items-center justify-center shadow-[0_0_25px_#00f5c4] group-hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                  aria-label="Play Role-Play Video"
                >
                  {isPlayingVideo ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                {isPlayingVideo && (
                  <div className="absolute top-3 left-3 z-20 bg-black/80 border border-[#00f5c4] px-3 py-1 rounded text-xs font-mono text-[#00f5c4] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-ping" />
                    <span>PLAYING CLASS IX LAB DAY</span>
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
                  <div className="font-semibold text-white">Lesson 4 Role-Play Video Activity</div>
                  <div className="text-[11px] text-slate-400">
                    {hasWatchedVideo ? 'Explored high-school biometric roleplay simulation' : 'Click play on video to watch & unlock Lesson 5'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono uppercase font-bold ${hasWatchedVideo ? 'text-emerald-400' : 'text-amber-400'}`}>
                {hasWatchedVideo ? 'COMPLETED' : 'PENDING'}
              </span>
            </div>

            {/* Checkpoint Status Pill */}
            <div className="p-3.5 rounded-xl bg-[#090f1d] border border-[#1b2b48] text-xs flex items-center justify-between text-slate-400">
              <span>Checkpoint Status:</span>
              <span className={`font-mono font-bold ${isQuizCompleted ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isQuizCompleted ? '✓ QUIZ CLEARED' : 'QUIZ REQUIRED BELOW'}
              </span>
            </div>
          </div>

          {/* Discussion Corner (Coral Border) */}
          <div className="p-6 rounded-2xl bg-[#0f101f] border-2 border-[#ff6b6b]/60 shadow-[0_0_20px_rgba(255,107,107,0.12)] space-y-4">
            <div className="flex items-center gap-2.5 text-[#ff6b6b] font-bold text-base">
              <MessageSquare className="w-5 h-5 flex-shrink-0" />
              <span>Discussion Corner</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Identify three moments during your school commute where an AI recognition system could live. Share your results with your computer lab peers on the Class IX discussion board.
            </p>

            <button
              onClick={() => setShowDiscussionModal(true)}
              className="w-full py-2.5 rounded-lg font-bold text-xs bg-[#ff6b6b] text-white hover:bg-[#ff5252] transition-colors shadow-md cursor-pointer"
            >
              Post to Discussion Board
            </button>
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
            Subtopic 4 Comprehension: AI Recognition in the Real World
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {hasWatchedVideo 
              ? 'Answer all 10 questions (MCQ, Industrial Matching, and Fill in the Blanks) based on the video to unlock Lesson 5.'
              : 'Please watch the "AI Recognition in the Real World" video above first to activate this 10-question checkpoint quiz.'}
          </p>
        </div>

        {hasWatchedVideo ? (
          <VideoCheckpointQuiz
            quizTitle="AI Recognition in the Real World Video Quiz"
            subtopicNumber={4}
            questions={LESSON4_VIDEO_QUIZ}
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
              Watch the "AI Recognition in the Real World" video above to unlock the 10-question checkpoint quiz.
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
            <span>✓ Video Watched & 10-Question Quiz Cleared • Proceed to Lesson 5: Benefits</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm bg-[#090f1d] text-slate-400 border border-slate-800 flex items-center justify-center gap-3">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>
              {!hasWatchedVideo 
                ? 'Step 1: Watch Video above & Step 2: Complete 10-Question Quiz to Unlock Lesson 5' 
                : 'Step 2: Complete all 10 Quiz Questions above to Unlock Lesson 5'}
            </span>
          </div>
        )}
      </div>

      {/* Discussion Modal */}
      {showDiscussionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0b1122] border border-[#233556] rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#ff6b6b]" />
              Class IX Discussion Board
            </h3>

            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {discussionPosts.map((post, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#11192e] border border-[#1b2b48] text-xs text-slate-300">
                  <span className="text-[#00f5c4] font-semibold">Student #{idx + 1}: </span>
                  {post}
                </div>
              ))}
            </div>

            <form onSubmit={handlePostDiscussion} className="space-y-3">
              <textarea
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                placeholder="Share where you noticed AI recognition today..."
                className="w-full p-3 rounded-xl bg-[#070b16] border border-[#1b2b48] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00f5c4]"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDiscussionModal(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3]"
                >
                  Publish Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
