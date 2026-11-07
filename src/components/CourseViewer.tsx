import React, { useState, useEffect } from 'react';
import { Course, Lesson, EnrolledCourseProgress, DiscussionThread } from '../types/course';
import { INITIAL_DISCUSSIONS } from '../data/coursesData';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Code, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Download, 
  Share2, 
  Award, 
  ChevronRight, 
  ChevronDown, 
  RotateCcw,
  Send,
  ThumbsUp,
  Sparkles,
  Terminal,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CourseViewerProps {
  course: Course;
  progress?: EnrolledCourseProgress;
  onBack: () => void;
  onUpdateProgress: (progress: EnrolledCourseProgress) => void;
  onOpenCertificate: () => void;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
  course,
  progress,
  onBack,
  onUpdateProgress,
  onOpenCertificate,
}) => {
  // Find current lesson
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const initialLessonId = progress?.lastLessonId || allLessons[0]?.id || '';
  const [activeLessonId, setActiveLessonId] = useState<string>(initialLessonId);
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    progress?.completedLessonIds || []
  );

  const activeLesson: Lesson =
    allLessons.find((l) => l.id === activeLessonId) || allLessons[0];

  // Video player simulation state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'notes' | 'code' | 'quiz' | 'discussion' | 'resources'>('notes');

  // Interactive Code Sandbox state
  const [editableCode, setEditableCode] = useState<string>(
    activeLesson.codeSnippet?.code || `# Python 3.11 interactive code sandbox\nimport cv2\nimport numpy as np\n\nprint("CAP AI Recognition System initialized.")`
  );
  const [terminalOutput, setTerminalOutput] = useState<string>(
    activeLesson.codeSnippet?.output || `[System] Kernel ready. Click "Execute Script" to run.`
  );
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Discussion state
  const [discussions, setDiscussions] = useState<DiscussionThread[]>(INITIAL_DISCUSSIONS);
  const [newQuestionText, setNewQuestionText] = useState<string>('');

  // Update sandbox code when lesson changes
  useEffect(() => {
    if (activeLesson.codeSnippet) {
      setEditableCode(activeLesson.codeSnippet.code);
      setTerminalOutput(activeLesson.codeSnippet.output);
    } else {
      setEditableCode(`# Interactive Python sandbox for ${activeLesson.title}\nimport numpy as np\nprint("Ready to experiment with lesson data...")`);
      setTerminalOutput(`[Kernel] Ready for input.`);
    }
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setIsPlaying(false);
    setPlaybackTime(0);
  }, [activeLessonId]);

  // Handle Mark Lesson Complete
  const toggleCompleteLesson = (lessonId: string) => {
    let updated: string[];
    if (completedLessons.includes(lessonId)) {
      updated = completedLessons.filter((id) => id !== lessonId);
    } else {
      updated = [...completedLessons, lessonId];
    }
    setCompletedLessons(updated);

    const percent = Math.round((updated.length / allLessons.length) * 100);
    if (percent === 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    onUpdateProgress({
      courseId: course.id,
      enrolledAt: progress?.enrolledAt || new Date().toISOString(),
      progressPercent: percent,
      lastLessonId: lessonId,
      completedLessonIds: updated,
      quizScores: progress?.quizScores || {},
    });
  };

  // Run Python simulator
  const handleRunCode = () => {
    setIsExecuting(true);
    setTerminalOutput('Executing Python kernel in sandbox container...');
    setTimeout(() => {
      setIsExecuting(false);
      setTerminalOutput(
        activeLesson.codeSnippet?.output ||
          `>>> Script executed in 0.042s\n>>> Output shape: (1, 512) feature tensor\n>>> Status: 0 errors, CUDA graph verified.`
      );
    }, 600);
  };

  // Post Discussion Question
  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newThread: DiscussionThread = {
      id: `thread-${Date.now()}`,
      lessonId: activeLesson.id,
      author: 'You (Student)',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      content: newQuestionText.trim(),
      upvotes: 1,
      replies: [],
    };

    setDiscussions([newThread, ...discussions]);
    setNewQuestionText('');
  };

  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const hasNextLesson = currentLessonIndex < allLessons.length - 1;
  const hasPrevLesson = currentLessonIndex > 0;

  const goToNextLesson = () => {
    if (hasNextLesson) {
      setActiveLessonId(allLessons[currentLessonIndex + 1].id);
    }
  };

  const goToPrevLesson = () => {
    if (hasPrevLesson) {
      setActiveLessonId(allLessons[currentLessonIndex - 1].id);
    }
  };

  const progressPercent = Math.round((completedLessons.length / allLessons.length) * 100);

  return (
    <div className="min-h-screen bg-[#060c18] text-slate-100 flex flex-col">
      
      {/* Top Classroom Bar */}
      <div className="h-14 border-b border-cyan-950/80 bg-[#070e1e]/95 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Catalog</span>
          </button>

          <span className="text-slate-700">|</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white max-w-[280px] sm:max-w-md truncate">
              {course.title}
            </span>
            <span className="hidden sm:inline-block text-[11px] text-cyan-400 font-mono">
              Lesson {currentLessonIndex + 1} of {allLessons.length}
            </span>
          </div>
        </div>

        {/* Right completion bar & certificate trigger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="text-slate-400">Progress:</span>
            <div className="w-28 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-cyan-300 font-bold">{progressPercent}%</span>
          </div>

          <button
            onClick={() => toggleCompleteLesson(activeLesson.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              completedLessons.includes(activeLesson.id)
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{completedLessons.includes(activeLesson.id) ? 'Completed' : 'Mark Complete'}</span>
          </button>

          {progressPercent >= 50 && (
            <button
              onClick={onOpenCertificate}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-900/60 transition cursor-pointer"
              title="View your verified completion certificate"
            >
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Certificate</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Classroom Body: 2-Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
        
        {/* Left Column: Player & Interactive Tabs (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col border-r border-slate-800/80 overflow-y-auto">
          
          {/* Lecture Player Simulation */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden border-b border-slate-800">
            <img
              src={activeLesson.posterImage || course.thumbnail}
              alt={activeLesson.title}
              className="w-full h-full object-cover filter brightness-75"
            />

            {/* Simulated Live Detection Reticles Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Center Play / Pause Indicator */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute z-10 h-16 w-16 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] transition transform hover:scale-105 cursor-pointer"
              aria-label={isPlaying ? 'Pause lecture video' : 'Play lecture video'}
            >
              {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
            </button>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-2 z-20">
              
              {/* Scrub timeline */}
              <div className="w-full h-1.5 bg-slate-700/80 rounded-full overflow-hidden cursor-pointer">
                <div 
                  className="h-full bg-cyan-400"
                  style={{ width: isPlaying ? '45%' : '15%' }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-cyan-400 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-slate-400">
                    {isPlaying ? '08:14' : '02:30'} / {activeLesson.duration}
                  </span>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-cyan-400 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    {[1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setPlaybackRate(rate)}
                        className={`px-1.5 py-0.5 rounded cursor-pointer ${
                          playbackRate === rate ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                  <button className="hover:text-cyan-400 cursor-pointer" title="Fullscreen">
                    <Maximize2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Lesson Metadata & Navigation Header */}
          <div className="p-6 border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {course.category} · Module Lesson
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {activeLesson.title}
                </h1>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-2">
                <button
                  disabled={!hasPrevLesson}
                  onClick={goToPrevLesson}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition cursor-pointer"
                >
                  Previous
                </button>
                <button
                  disabled={!hasNextLesson}
                  onClick={goToNextLesson}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/40 text-xs font-semibold text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-900 transition cursor-pointer flex items-center gap-1"
                >
                  <span>Next Lesson</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeLesson.summary}
            </p>
          </div>

          {/* Lesson Content Tabs */}
          <div className="flex items-center border-b border-slate-800 px-6 gap-2 bg-[#091222] overflow-x-auto no-scrollbar" role="tablist">
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'notes' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Architecture & Theory</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'code' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="h-3.5 w-3.5 text-emerald-400" />
              <span>Python Code Sandbox</span>
            </button>

            {activeLesson.quiz && (
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeTab === 'quiz' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                <span>Knowledge Check</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('discussion')}
              className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'discussion' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-sky-400" />
              <span>Q&A Community ({discussions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
                activeTab === 'resources' ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="h-3.5 w-3.5 text-indigo-400" />
              <span>Weights & Datasets</span>
            </button>
          </div>

          {/* Tab Panels */}
          <div className="p-6 flex-1">
            
            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-6 max-w-3xl">
                <div className="prose prose-invert prose-cyan text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <h3 className="text-base font-bold text-white mb-2">Mathematical Formulation & Engineering Notes</h3>
                  <p>
                    In this lesson, we break down the end-to-end inference flow of the AI Recognition System.
                    Unlike traditional classification which categorizes images into static softmax buckets, metric recognition projects input images into a high-dimensional unit hypersphere:
                  </p>
                  
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1 my-4">
                    <p className="text-slate-400">// Geodesic Cosine Distance Formulation</p>
                    <p>L_ArcFace = -log( e^(s * cos(theta_yi + m)) / (e^(s * cos(theta_yi + m)) + sum(e^(s * cos(theta_j)))) )</p>
                    <p className="text-slate-500 text-[11px] pt-1">where s = 64.0 (feature scale factor), m = 0.50 (angular margin penalty)</p>
                  </div>

                  <h4 className="text-sm font-semibold text-white mt-4">Key Implementation Steps:</h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                    <li>Acquire raw sensor frame and check for lens vignetting or low-light dynamic range clipping.</li>
                    <li>Compute canonical 5-point alignment transformation (left pupil, right pupil, nose tip, mouth edges).</li>
                    <li>Execute forward pass through Inverted Residual Backbone with FP16 precision.</li>
                    <li>L2 normalize the 512-dimensional output vector and evaluate Cosine similarity against enrolled templates.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Python Code Sandbox Tab */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <Terminal className="h-4 w-4" />
                    <span>In-Browser Python 3.11 Execution Container</span>
                  </div>
                  <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)] disabled:opacity-50"
                  >
                    <Play className="h-3.5 w-3.5 fill-slate-950" />
                    <span>{isExecuting ? 'Running...' : 'Execute Script'}</span>
                  </button>
                </div>

                {/* Code editor */}
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                  <textarea
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                    rows={12}
                    className="w-full bg-transparent text-cyan-200 focus:outline-none resize-y font-mono leading-relaxed"
                    spellCheck={false}
                  />
                </div>

                {/* Terminal standard output */}
                <div className="rounded-xl border border-slate-800 bg-[#040812] p-4 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-800/80 pb-1.5">
                    <span>OUTPUT CONSOLE</span>
                    <button 
                      onClick={() => setTerminalOutput('[Console Cleared]')}
                      className="hover:text-slate-300"
                    >
                      Clear
                    </button>
                  </div>
                  <pre className="text-emerald-400 text-[11px] whitespace-pre-wrap leading-relaxed">
                    {terminalOutput}
                  </pre>
                </div>
              </div>
            )}

            {/* Knowledge Check / Quiz Tab */}
            {activeTab === 'quiz' && activeLesson.quiz && (
              <div className="space-y-6 max-w-2xl">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h3 className="text-sm font-bold text-white mb-1">Lesson Knowledge Assessment</h3>
                  <p className="text-xs text-slate-400">
                    Test your understanding of the concepts presented in this lesson to reinforce mastery.
                  </p>
                </div>

                {activeLesson.quiz.map((q, qIndex) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isAnswered = userAnswer !== undefined;
                  const isCorrect = isAnswered && userAnswer === q.correctAnswer;

                  return (
                    <div key={q.id} className="p-5 rounded-xl border border-slate-800 bg-[#091222] space-y-3">
                      <p className="text-xs font-semibold text-cyan-400">Question {qIndex + 1}:</p>
                      <p className="text-sm font-medium text-white">{q.question}</p>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt, optIndex) => {
                          const isOptionSelected = userAnswer === optIndex;
                          let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                          if (quizSubmitted) {
                            if (optIndex === q.correctAnswer) {
                              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-cyan-950 border-cyan-500 text-cyan-200';
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setSelectedAnswers({ ...selectedAnswers, [q.id]: optIndex });
                                }
                              }}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition cursor-pointer flex items-center gap-3 ${btnStyle}`}
                            >
                              <span className="font-mono text-[11px] font-bold text-slate-500">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className={`p-3 rounded-lg text-xs ${isCorrect ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/40 text-rose-300 border border-rose-500/30'}`}>
                          <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                          <p className="mt-1 text-[11px] text-slate-300">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-2">
                  {!quizSubmitted ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer disabled:opacity-40"
                    >
                      Submit Answers
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setSelectedAnswers({});
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition cursor-pointer"
                    >
                      Retake Quiz
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Q&A Discussion Tab */}
            {activeTab === 'discussion' && (
              <div className="space-y-6 max-w-2xl">
                {/* Ask Form */}
                <form onSubmit={handlePostQuestion} className="space-y-2 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <label className="text-xs font-semibold text-white block">
                    Have a question on this AI Recognition lesson?
                  </label>
                  <textarea
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Ask about vector embeddings, warping matrices, camera streams..."
                    rows={3}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!newQuestionText.trim()}
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer disabled:opacity-40"
                    >
                      <Send className="h-3 w-3" />
                      <span>Post Question</span>
                    </button>
                  </div>
                </form>

                {/* Threads */}
                <div className="space-y-4">
                  {discussions.map((thread) => (
                    <div key={thread.id} className="p-4 rounded-xl bg-[#091222] border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={thread.authorAvatar}
                            alt={thread.author}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-200">{thread.author}</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-500">{thread.timestamp}</span>
                        </div>

                        <button className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 text-xs cursor-pointer">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{thread.upvotes}</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-mono">
                        {thread.content}
                      </p>

                      {/* Replies */}
                      {thread.replies.length > 0 && (
                        <div className="pl-4 border-l-2 border-cyan-800/60 space-y-2.5 pt-2">
                          {thread.replies.map((reply) => (
                            <div key={reply.id} className="space-y-1">
                              <div className="flex items-center gap-2 text-xs">
                                <img
                                  src={reply.authorAvatar}
                                  alt={reply.author}
                                  className="h-5 w-5 rounded-full object-cover"
                                />
                                <span className="font-semibold text-cyan-300">{reply.author}</span>
                                {reply.isInstructor && (
                                  <span className="text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/80 px-1.5 rounded">
                                    INSTRUCTOR
                                  </span>
                                )}
                                <span className="text-slate-500">·</span>
                                <span className="text-slate-500 text-[11px]">{reply.timestamp}</span>
                              </div>
                              <p className="text-xs text-slate-300 pl-7 leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-sm font-bold text-white mb-2">Lesson Lab Materials & Datasets</h3>
                
                {[
                  { name: 'cap_arcface_resnet50_weights.onnx', size: '92.4 MB', type: 'Pre-trained Model Tensor' },
                  { name: 'module_01_alignment_affine.ipynb', size: '3.2 MB', type: 'Jupyter Interactive Notebook' },
                  { name: 'synthetic_lfw_sample_dataset.zip', size: '145.0 MB', type: 'Validation Benchmark Images' },
                  { name: 'cap_system_architecture_whitepaper.pdf', size: '4.8 MB', type: 'System Engineering Documentation' },
                ].map((res, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                        <Download className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200 font-mono">{res.name}</p>
                        <p className="text-[11px] text-slate-500">{res.type} · {res.size}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Starting simulated download for ${res.name}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 hover:text-cyan-300 text-xs font-medium text-slate-300 transition cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Curriculum Modules Sidebar (4 Cols) */}
        <div className="lg:col-span-4 bg-[#070e1e] border-t lg:border-t-0 flex flex-col h-full overflow-y-auto">
          
          <div className="p-4 border-b border-slate-800/80 sticky top-0 bg-[#070e1e] z-10 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Course Syllabus
              </h2>
              <p className="text-xs font-medium text-slate-200">
                {course.modules.length} Modules · {allLessons.length} Lessons
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-400 font-semibold">
              {completedLessons.length}/{allLessons.length} Done
            </div>
          </div>

          {/* Module List */}
          <div className="divide-y divide-slate-800/60 flex-1">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="py-2">
                <div className="px-4 py-2 bg-slate-900/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    {mod.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {mod.duration}
                  </span>
                </div>

                <div className="space-y-1 p-2">
                  {mod.lessons.map((lesson) => {
                    const isCurrent = lesson.id === activeLessonId;
                    const isDone = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLessonId(lesson.id)}
                        className={`w-full text-left p-2.5 rounded-lg text-xs transition cursor-pointer flex items-start gap-2.5 ${
                          isCurrent
                            ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-sm'
                            : 'text-slate-300 hover:bg-slate-900/60'
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompleteLesson(lesson.id);
                          }}
                          className="mt-0.5 text-slate-500 hover:text-cyan-400 transition"
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <Circle className="h-4 w-4" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${isDone ? 'line-through text-slate-500' : ''}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                            <span className="capitalize">{lesson.type}</span>
                            <span>·</span>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
