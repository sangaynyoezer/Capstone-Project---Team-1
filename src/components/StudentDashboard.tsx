import React from 'react';
import { Course, EnrolledCourseProgress } from '../types/course';
import { 
  Flame, 
  BookOpen, 
  Award, 
  Clock, 
  CheckCircle2, 
  Play, 
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

interface StudentDashboardProps {
  courses: Course[];
  enrolledProgress: Record<string, EnrolledCourseProgress>;
  studentName: string;
  onSelectCourse: (course: Course) => void;
  onOpenCertificate: (course: Course) => void;
  onExploreCourses: () => void;
  onLaunchLab: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  courses,
  enrolledProgress,
  studentName,
  onSelectCourse,
  onOpenCertificate,
  onExploreCourses,
  onLaunchLab,
}) => {
  const enrolledCourses = courses.filter((c) => enrolledProgress[c.id]);
  const totalCompletedLessons = Object.values(enrolledProgress).reduce(
    (acc, curr) => acc + curr.completedLessonIds.length,
    0
  );
  const totalCompletedCourses = Object.values(enrolledProgress).filter(
    (p) => p.progressPercent === 100
  ).length;

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#0a1835] via-[#09152b] to-[#060e20] p-6 sm:p-8 shadow-[0_0_40px_rgba(6,182,212,0.12)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <Flame className="h-4 w-4 text-amber-400" />
              <span>Learner Headquarters</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Welcome back, <span className="text-cyan-300">{studentName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              You are actively enrolled in {enrolledCourses.length} AI Recognition system courses. Keep up your momentum to unlock accredited credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onLaunchLab}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-950 font-semibold text-xs transition cursor-pointer flex items-center gap-2"
            >
              <Zap className="h-4 w-4 text-emerald-400" />
              <span>Open Vision Lab</span>
            </button>
            <button
              onClick={onExploreCourses}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>Browse Catalog</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Flame className="h-4 w-4 text-amber-400" />
              <span>Learning Streak</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">14 Days 🔥</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Completed Lessons</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{totalCompletedLessons}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>Hours Studied</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">28.5 hrs</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Verified Certs</span>
            </div>
            <p className="text-2xl font-bold text-amber-300 font-mono">
              {totalCompletedCourses > 0 ? totalCompletedCourses : 1}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Enrolled Courses & Skills Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Enrolled Courses List (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-400" />
              <span>My Enrolled Courses ({enrolledCourses.length})</span>
            </h2>
            <button
              onClick={onExploreCourses}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              + Enroll in More
            </button>
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const prog = enrolledProgress[course.id];
                const percent = prog?.progressPercent || 0;
                const isComplete = percent === 100;

                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-xl border border-slate-800 bg-[#0a1324] hover:border-cyan-500/40 transition flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-20 w-32 object-cover rounded-lg border border-slate-800 shrink-0"
                      />
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                          {course.category} · {course.level}
                        </span>
                        <h3 
                          onClick={() => onSelectCourse(course)}
                          className="text-sm font-bold text-white hover:text-cyan-300 transition cursor-pointer truncate"
                        >
                          {course.title}
                        </h3>
                        
                        {/* Progress Bar */}
                        <div className="space-y-1 pt-1 max-w-sm">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Progress</span>
                            <span className="font-mono text-cyan-300 font-bold">{percent}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                      {isComplete && (
                        <button
                          onClick={() => onOpenCertificate(course)}
                          className="px-3 py-2 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                        >
                          <Award className="h-3.5 w-3.5 text-amber-400" />
                          <span>Certificate</span>
                        </button>
                      )}

                      <button
                        onClick={() => onSelectCourse(course)}
                        className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Play className="h-3.5 w-3.5 fill-slate-950" />
                        <span>{percent === 0 ? 'Start Course' : 'Resume Learning'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-slate-800 bg-[#091222] text-center space-y-3">
              <BookOpen className="h-10 w-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-200">You haven't enrolled in any courses yet</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore the CAP course catalog to start learning facial recognition, YOLO detection, and edge neural networks.
              </p>
              <button
                onClick={onExploreCourses}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition"
              >
                Browse All Courses
              </button>
            </div>
          )}

        </div>

        {/* Right Column: Skills Mastery & System Badges (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Skills Breakdown */}
          <div className="rounded-2xl border border-slate-800 bg-[#091222] p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="h-4 w-4 text-cyan-400" />
              <span>AI Skills Mastery Index</span>
            </h3>

            <div className="space-y-3 pt-1 text-xs">
              {[
                { name: 'Facial Landmark Alignment & Warping', level: 92, color: 'from-cyan-400 to-blue-500' },
                { name: 'ArcFace Angular Margin Embeddings', level: 86, color: 'from-indigo-400 to-purple-500' },
                { name: 'YOLOv11 Object Detection & NMS', level: 78, color: 'from-emerald-400 to-teal-500' },
                { name: 'DeepSORT Multi-Target State Tracking', level: 64, color: 'from-sky-400 to-cyan-500' },
                { name: 'TensorRT & Edge FP16 Quantization', level: 71, color: 'from-amber-400 to-orange-500' },
              ].map((skill, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="font-medium">{skill.name}</span>
                    <span className="font-mono text-cyan-300 font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              Evaluated through hands-on lab code execution and end-of-module assessment checkpoints.
            </div>
          </div>

          {/* System Certifications Callout */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 p-5 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <Award className="h-4.5 w-4.5 text-amber-400" />
              <span>Certified AI Systems Engineer</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every completed course unlocks an accredited, cryptographically verifiable certificate with your custom student credential ID.
            </p>
            <button
              onClick={() => onOpenCertificate(courses[0])}
              className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition cursor-pointer"
            >
              Generate / Preview My Certificate
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
