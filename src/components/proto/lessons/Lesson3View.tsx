import React, { useState } from 'react';
import { 
  Scan, Mic2, Fingerprint, Camera, FileText, ArrowRight, Play, Pause, 
  ExternalLink, Layers, Lock, Check, CheckCircle2
} from 'lucide-react';
import { COURSE_MATERIALS } from '../../../materialsConfig';
import { formatVideoEmbedUrl } from '../../../utils/mediaUtils';
import { VideoCheckpointQuiz } from './VideoCheckpointQuiz';
import { LESSON3_VIDEO_QUIZ } from './videoQuizData';

interface Lesson3ViewProps {
  onNextLesson: () => void;
}

export const Lesson3View: React.FC<Lesson3ViewProps> = ({
  onNextLesson,
}) => {
  const videoData = COURSE_MATERIALS.videos.lesson3Categories;
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [selectedTypeModal, setSelectedTypeModal] = useState<string | null>(null);
  // USER REQUIREMENT: Students can't move to next lesson without completing video and 10-question quiz
  const [hasWatchedVideo, setHasWatchedVideo] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const recognitionTypes = [
    {
      id: 'face',
      title: 'Facial Recognition',
      desc: 'Analyzes nodal coordinate geometries of cheekbones, eyes, and jaws.',
      icon: Scan,
      details: 'Measures 68 key landmark anchors. Compares Euclidean distances invariant to slight tilt and lighting.',
    },
    {
      id: 'voice',
      title: 'Voice Recognition',
      desc: 'Isolates individual pitch patterns, frequency cycles, and wave shapes.',
      icon: Mic2,
      details: 'Converts analog acoustic pressure into Fast Fourier Transform (FFT) spectrograms to isolate vocal timbre.',
    },
    {
      id: 'fingerprint',
      title: 'Fingerprint Verification',
      desc: 'Compares ridge points, bifurcations, and valley vectors on fingertips.',
      icon: Fingerprint,
      details: 'Maps minutiae coordinates (ridge endings and bifurcations) onto a cryptographic hash vector.',
    },
    {
      id: 'image',
      title: 'Image Recognition',
      desc: 'Traces pixel boundaries to segment objects like apples or cars.',
      icon: Camera,
      details: 'Applies bounding box regressions and semantic segmentation masks to classify multiple foreground objects.',
    },
    {
      id: 'ocr',
      title: 'Text Recognition (OCR)',
      desc: 'Transforms handwritten character shapes into digital ASCII parameters.',
      icon: FileText,
      details: 'Scans raster glyph strokes and applies spatial convolution kernels to match recognized font glyphs.',
    },
  ];

  const matrixData = [
    {
      type: 'Facial',
      rawInput: 'High fidelity JPG pixel camera matrices',
      coreUseCase: 'Phone gate biometric access',
      example: 'iPhone FaceID gateway',
    },
    {
      type: 'Voice',
      rawInput: 'Acoustic frequency amplitude pressure waves',
      coreUseCase: 'Smart virtual home assistant commands',
      example: 'Google Home wake word',
    },
    {
      type: 'Fingerprint',
      rawInput: 'Dermal friction ridge valley maps',
      coreUseCase: 'Secure physical terminal gate locks',
      example: 'Office lab gate entry',
    },
    {
      type: 'Image',
      rawInput: 'General digital photo datasets',
      coreUseCase: 'Automated road hazard detection',
      example: 'Tesla self-drive camera',
    },
  ];

  return (
    <div className="py-8 px-6 sm:px-12 max-w-7xl mx-auto space-y-12 text-white">
      {/* ----------------- TOP LESSON PROGRESS HEADER ----------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#18253d]">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            SUBTOPIC 03 / CHAPTER 10
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Types of AI Recognition Systems
          </h1>
        </div>

        {/* Progress Bar Container */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-semibold text-[#00f5c4] whitespace-nowrap">
            PROGRESS: LESSON 3 of 6
          </div>
          <div className="w-40 sm:w-56 h-2 bg-[#121c2e] rounded-full overflow-hidden border border-[#21355a]">
            <div className="h-full bg-[#00f5c4] rounded-full w-[60%] shadow-[0_0_8px_#00f5c4]" />
          </div>
          <div className="text-xs font-mono text-slate-400 whitespace-nowrap">
            60% DONE
          </div>
        </div>
      </div>

      {/* ----------------- TOP ROW: 5 CATEGORIES CARDS ----------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {recognitionTypes.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedTypeModal(item.title)}
              className="p-5 rounded-2xl bg-[#0b1122] border border-[#1b2b48] hover:border-[#00f5c4]/60 transition-all flex flex-col justify-between space-y-4 group cursor-pointer shadow-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00f5c4] group-hover:scale-110 transition-transform">
                <IconComp className="w-5 h-5" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white group-hover:text-[#00f5c4] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#00f5c4] group-hover:underline">
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ----------------- MIDDLE: VIDEO CLIP SECTION ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0b1122] border border-[#1d2d4c] p-6 sm:p-8 rounded-3xl shadow-xl">
        {/* Left Video Text & CTA */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
              {videoData.subtitle}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {videoData.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {videoData.description}
          </p>

          <button
            onClick={onNextLesson}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-[#ff6b6b] text-white hover:bg-[#ff5252] shadow-[0_0_20px_rgba(255,107,107,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Large Video Player (Slot) */}
        <div className="lg:col-span-7">
          {videoData.embedUrl ? (
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-[#23385c] bg-black">
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
            <div className="relative aspect-[16/9] rounded-2xl bg-[#070b16] border border-[#23385c] overflow-hidden flex items-center justify-center shadow-2xl group">
              {/* Sci-Fi Lab Command Center background graphic */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#050914] via-[#09152b] to-[#122448] opacity-90" />
              
              {/* Simulated Holographic Screens */}
              <div className="absolute inset-8 rounded-xl border border-cyan-500/20 bg-cyan-950/20 flex items-center justify-around p-4 opacity-75">
                <div className="w-20 h-20 rounded-lg border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-mono text-[10px] text-center p-1">
                  FACE MESH 407
                </div>
                <div className="w-24 h-16 rounded-lg border border-indigo-400/40 flex items-center justify-center text-indigo-300 font-mono text-[10px] text-center p-1">
                  OCR MATRIX
                </div>
                <div className="w-20 h-20 rounded-lg border border-rose-400/40 flex items-center justify-center text-rose-300 font-mono text-[10px] text-center p-1">
                  WAVE SPECTRUM
                </div>
              </div>

              {/* Glowing Coral Play Button */}
              <button
                onClick={() => {
                  setIsPlayingVideo(!isPlayingVideo);
                  setHasWatchedVideo(true);
                }}
                className="relative z-10 w-20 h-20 rounded-full bg-[#ff6b6b] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,107,107,0.5)] group-hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                aria-label="Play Lecture Clip"
              >
                {isPlayingVideo ? (
                  <Pause className="w-8 h-8 fill-current" />
                ) : (
                  <Play className="w-8 h-8 fill-current ml-1" />
                )}
              </button>

              {/* Video Playing Notification */}
              {isPlayingVideo && (
                <div className="absolute top-4 left-4 bg-black/80 border border-[#00f5c4] px-3 py-1 rounded text-xs font-mono text-[#00f5c4] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f5c4] animate-ping" />
                  <span>PLAYING 5-CATEGORY VISUALIZER</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ----------------- BOTTOM: AT-A-GLANCE SYSTEM MATRIX TABLE ----------------- */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white tracking-tight">
          At-A-Glance System Matrix
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-[#1b2b48] bg-[#0b1122]">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1b2b48] bg-[#070e1c] text-[#00f5c4] font-mono text-[11px] uppercase tracking-wider">
                <th className="py-4 px-6">RECOGNITION TYPE</th>
                <th className="py-4 px-6">RAW INPUT FORMAT</th>
                <th className="py-4 px-6">CORE USE CASE</th>
                <th className="py-4 px-6">EVERYDAY EXAMPLE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#15233d]">
              {matrixData.map((row, i) => (
                <tr key={i} className="hover:bg-[#0f172a]/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">
                    {row.type}
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    {row.rawInput}
                  </td>
                  <td className="py-4 px-6 text-slate-300">
                    {row.coreUseCase}
                  </td>
                  <td className="py-4 px-6 text-[#ff6b6b] font-medium">
                    {row.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------- 10-QUESTION VIDEO CHECKPOINT QUIZ ----------------- */}
      <div className="space-y-4 pt-6 border-t border-[#18253d]">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00f5c4] uppercase">
            MANDATORY VIDEO CHECKPOINT QUIZ
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Subtopic 3 Comprehension: Types of AI Recognition Systems
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {hasWatchedVideo 
              ? 'Answer all 10 questions (MCQ, Modality Matching, and Fill in the Blanks) based on the video to unlock Lesson 4.'
              : 'Please watch the "Types of Recognition Systems" video above first to activate this 10-question checkpoint quiz.'}
          </p>
        </div>

        {hasWatchedVideo ? (
          <VideoCheckpointQuiz
            quizTitle="Types of Recognition Systems Video Quiz"
            subtopicNumber={3}
            questions={LESSON3_VIDEO_QUIZ}
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
              Watch the "Types of Recognition Systems" video above to unlock the 10-question checkpoint quiz.
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
            className="w-full py-4 rounded-xl font-bold text-sm bg-[#00f5c4] text-slate-950 hover:bg-[#00dbb0] shadow-[0_0_20px_rgba(0,245,196,0.35)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
          >
            <span>✓ Video Watched & 10-Question Quiz Cleared • Proceed to Lesson 4: Real-World Applications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-full py-4 rounded-xl font-bold text-xs sm:text-sm bg-[#090f1d] text-slate-400 border border-slate-800 flex items-center justify-center gap-3">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>
              {!hasWatchedVideo 
                ? 'Step 1: Watch Video above & Step 2: Complete 10-Question Quiz to Unlock Lesson 4' 
                : 'Step 2: Complete all 10 Quiz Questions above to Unlock Lesson 4'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
