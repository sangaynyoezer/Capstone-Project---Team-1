import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, CheckCircle2, X, 
  Camera, FileText, Check, RotateCcw,
  Sparkles, Maximize2, ExternalLink, HelpCircle, Hand, Smile, BookOpen
} from 'lucide-react';
import { COURSE_MATERIALS } from '../../materialsConfig';
import { ambientMusic } from '../../utils/ambientAudio';

interface ActivitiesScreenProps {
  onActivityComplete: (actId: string) => void;
  completedActivities: string[];
}

interface EmbeddedActivityItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  badge: string;
  description: string;
  url: string;
  features: string[];
  accentColor: string;
  icon: string;
}

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({
  onActivityComplete,
  completedActivities,
}) => {
  const audioData = COURSE_MATERIALS.audio.activityVoiceOver;

  // The two user-specified interactive activities
  const embeddedActivities: EmbeddedActivityItem[] = [
    {
      id: 'act-facial-recognition',
      title: 'AI Facial Expression Recognition',
      subtitle: 'REAL-TIME CAMERA VISION & SCENARIO CHALLENGE',
      duration: '15 Mins',
      badge: 'ACTIVITY 01 • FACIAL AI',
      description: 'Start your camera to analyze facial expressions in real-time. Test Free Play, try the Scenario Challenge to see if AI agrees with how you feel, or beat the Quick Mirror timer!',
      url: '/assets/aistudio/Facial_activity_-_scenarios_d6d9af08.html',
      features: [
        'Real-time facial blendshape tracking with MediaPipe',
        '3 Game Modes: Free Play, Scenario Challenge, Quick Mirror',
        'Neutral face calibration & local camera processing'
      ],
      accentColor: '#00f5c4',
      icon: '😊',
    },
    {
      id: 'act-hand-gesture',
      title: 'Hand Gesture Activity',
      subtitle: 'MAGIC WAND POINTER QUIZ • MEDIAPIPE HANDS',
      duration: '15 Mins',
      badge: 'ACTIVITY 02 • GESTURE CONTROL',
      description: 'Point your index finger in the air like a magic wand to hover over and select answers! A live camera 10-question quiz testing your knowledge of AI Recognition System types.',
      url: '/assets/aistudio/Quiz__2__4cb863b4.html',
      features: [
        'Live hand & finger landmark tracking via MediaPipe',
        'Air-hover magic wand answer selection',
        'Instant sound effects & final score celebration'
      ],
      accentColor: '#ff85a2',
      icon: '🪄',
    },
  ];

  // Embedded activity modal state
  const [activeActivity, setActiveActivity] = useState<EmbeddedActivityItem | null>(null);
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Audio state for recorded voice instruction
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<string>(audioData.audioUrl || '/assets/aistudio/Voice_instruction_32219017.m4a');
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle Audio Play/Pause with soft ambient background music
  const togglePlayAudio = () => {
    if (audioSource) {
      if (!audioRef.current) return;
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
        ambientMusic.stop();
      } else {
        audioRef.current.play().then(() => {
          setIsPlayingAudio(true);
          ambientMusic.start(0.08);
        }).catch((err) => {
          console.warn('Audio play error:', err);
        });
      }
      return;
    }

    // Fallback: Web Speech Synthesis for immediate voice instructions
    if ('speechSynthesis' in window) {
      if (isPlayingAudio || isSynthesizing) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        setIsSynthesizing(false);
        ambientMusic.stop();
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(audioData.transcript);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        
        utterance.onstart = () => {
          setIsPlayingAudio(true);
          setIsSynthesizing(true);
          ambientMusic.start(0.08);
        };
        utterance.onend = () => {
          setIsPlayingAudio(false);
          setIsSynthesizing(false);
          ambientMusic.stop();
        };
        utterance.onerror = () => {
          setIsPlayingAudio(false);
          setIsSynthesizing(false);
          ambientMusic.stop();
        };
        
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      ambientMusic.stop();
    };
  }, []);



  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#070b16] py-12 px-6 sm:px-12 text-white">
      {/* Hidden Native Audio Element */}
      {audioSource && (
        <audio
          ref={audioRef}
          src={audioSource}
          muted={isMuted}
          onTimeUpdate={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
          onEnded={() => {
            setIsPlayingAudio(false);
            setCurrentTime(0);
            ambientMusic.stop();
          }}
        />
      )}



      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#ff6b6b] uppercase">
            <span>DTI LAB SESSIONS</span>
            <span>•</span>
            <span>INTERACTIVE CAMERA EXPERIENCES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Interactive AI Activities
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Test cutting-edge computer vision directly in your browser. Use your webcam to experience facial emotion detection or point your finger in the air to answer quiz questions with hand gesture tracking!
          </p>
        </div>

        {/* ----------------- TWO FEATURED EMBEDDED ACTIVITIES ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {embeddedActivities.map((act) => {
            const isCompleted = completedActivities.includes(act.id);

            return (
              <div
                key={act.id}
                className="p-7 sm:p-8 rounded-3xl bg-[#0c1426] border-2 border-[#1d2d4c] hover:border-[#00f5c4]/60 transition-all flex flex-col justify-between space-y-6 shadow-2xl relative group overflow-hidden"
              >
                {/* Glow accent in top corner */}
                <div 
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: act.accentColor }}
                />

                <div className="space-y-5">
                  {/* Badges & Status */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
                      style={{ 
                        color: act.accentColor, 
                        borderColor: `${act.accentColor}40`,
                        backgroundColor: `${act.accentColor}15`
                      }}
                    >
                      {act.badge}
                    </span>

                    {isCompleted ? (
                      <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Webcam Powered</span>
                      </span>
                    )}
                  </div>

                  {/* Header Title with Icon */}
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border flex-shrink-0 shadow-lg"
                      style={{ 
                        borderColor: `${act.accentColor}50`,
                        backgroundColor: '#070c17'
                      }}
                    >
                      {act.icon}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                        {act.subtitle}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {act.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {act.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-2 pt-1 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {act.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#00f5c4] mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => {
                      setActiveActivity(act);
                      setIframeKey(prev => prev + 1);
                    }}
                    className="w-full py-4 rounded-xl font-bold text-sm bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_20px_rgba(0,245,196,0.3)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>Launch {act.title}</span>
                  </button>

                  <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
                    <span>Est. Duration: {act.duration}</span>
                    <button
                      onClick={() => onActivityComplete(act.id)}
                      className="hover:text-emerald-400 cursor-pointer underline flex items-center gap-1"
                    >
                      {isCompleted ? '✓ Marked Done' : 'Mark as Done'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ----------------- VOICE INSTRUCTION AUDIO PLAYER CARD ----------------- */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1426] border border-[#1d2d4c] shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00f5c4] flex-shrink-0">
                <Volume2 className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {audioData.title}
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-full">
                    Voice Guide Available
                  </span>
                </div>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  Narrated by {audioData.speaker} ({duration ? formatTime(duration) : audioData.duration}).
                  Listen to vocal walkthrough instructions for completing hands-on recognition tasks.
                </p>
              </div>
            </div>

            {/* Audio Action Buttons: Play Voice Instruction & Instruction */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={togglePlayAudio}
                className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-[#00f5c4] text-[#070b16] hover:bg-[#00e0b3] shadow-[0_0_20px_rgba(0,245,196,0.25)] flex items-center justify-center gap-2 whitespace-nowrap transition-transform active:scale-95 cursor-pointer"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause Voice Instruction</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Play Voice Instruction</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className={`px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-colors cursor-pointer flex items-center gap-2 ${
                  showTranscript 
                    ? 'bg-purple-950/40 border-purple-500/50 text-purple-300' 
                    : 'bg-[#111c34] hover:bg-[#182849] border-slate-700 text-slate-300'
                }`}
                title="View activity instructions"
              >
                <BookOpen className="w-4 h-4" />
                <span>Instruction</span>
              </button>
            </div>
          </div>

          {audioSource && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    className="hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  </button>
                  <span>{formatTime(duration || 0)}</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCurrentTime(val);
                  if (audioRef.current) {
                    audioRef.current.currentTime = val;
                  }
                }}
                className="w-full accent-[#00f5c4] h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          )}

          {isPlayingAudio && (
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-[#00f5c4]/40 flex items-center justify-between text-xs font-mono text-[#00f5c4] animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f5c4] animate-ping" />
                <span>
                  {isSynthesizing 
                    ? `Live Speech Synthesizer: ${audioData.speaker} (Transcribing Audio)`
                    : `Now Playing: Voice Instruction (${audioData.speaker})`
                  }
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[40, 70, 20, 90, 50, 80, 30, 100, 60, 40, 80, 50].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1 bg-[#00f5c4] rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          )}

          {showTranscript && (
            <div className="p-4 rounded-2xl bg-[#080d19] border border-purple-500/30 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-mono text-purple-300">
                <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  INSTRUCTION
                </span>
                <span className="text-slate-500">Class IX DTI Voice Guide</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-purple-950/20 p-4 rounded-xl border border-purple-900/40 whitespace-pre-line space-y-2">
                {audioData.transcript}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ----------------- FULLSCREEN INTERACTIVE EMBEDDED ACTIVITY MODAL ----------------- */}
      {activeActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-6xl h-[94vh] bg-[#090f1d] border-2 border-cyan-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#060b17] border-b border-[#1b2b48]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeActivity.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                    <span>{activeActivity.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-[#00f5c4] border border-cyan-500/30">
                      LIVE AI VISION
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400 hidden sm:block">
                    Camera access runs locally in your browser session. Please click "Allow" on camera prompt if asked.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIframeKey(k => k + 1)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reload activity"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reload</span>
                </button>

                <button
                  onClick={() => {
                    onActivityComplete(activeActivity.id);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Done</span>
                </button>

                <button
                  onClick={() => setActiveActivity(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded iFrame with camera & microphone permissions */}
            <div className="flex-1 w-full bg-black relative">
              <iframe
                key={iframeKey}
                src={activeActivity.url}
                title={activeActivity.title}
                allow="camera *; microphone *; autoplay *; fullscreen *"
                className="w-full h-full border-0"
              />
            </div>

            {/* Bottom Status Bar */}
            <div className="px-5 py-2.5 bg-[#060b17] border-t border-[#1b2b48] flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>MediaPipe & WebRTC Camera Ready</span>
              </div>
              <button
                onClick={() => setActiveActivity(null)}
                className="hover:text-white underline cursor-pointer"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
