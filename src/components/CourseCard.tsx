import React from 'react';
import { Course } from '../types/course';
import { Star, Clock, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  progressPercent?: number;
  onSelectCourse: (course: Course) => void;
  onEnroll: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled,
  progressPercent = 0,
  onSelectCourse,
  onEnroll,
}) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-[#0a1324] hover:border-cyan-500/50 hover:shadow-[0_4px_25px_rgba(6,182,212,0.12)] transition-all duration-200 overflow-hidden">
      
      {/* Thumbnail Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onSelectCourse(course)}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1324] via-transparent to-transparent opacity-80" />

        {/* Level Tag Overlay */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-slate-700/60 text-slate-200 text-[11px] font-medium px-2 py-0.5 rounded">
          {course.level}
        </div>

        {/* Popular / Featured Marker */}
        {course.featured && (
          <div className="absolute top-3 right-3 bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-[11px] font-semibold px-2 py-0.5 rounded">
            CAP Core Track
          </div>
        )}

        {/* Enrolled Progress Bar Overlay */}
        {isEnrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5 space-y-3.5">
        
        {/* Anti-Slop Unboxed Metadata Line with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-cyan-400">{course.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-500" />
            {course.durationHours}h total
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{course.lessonsCount} lessons</span>
        </div>

        {/* Course Title */}
        <h3 
          onClick={() => onSelectCourse(course)}
          className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 cursor-pointer leading-snug"
        >
          {course.title}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {course.tagline}
        </p>

        {/* Key Skills snippet */}
        <div className="pt-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Focus Areas:</p>
          <div className="flex flex-wrap gap-1.5">
            {course.skillsGained.slice(0, 3).map((skill, i) => (
              <span 
                key={i} 
                className="text-[11px] text-slate-300 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded"
              >
                {skill.split('(')[0].trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Instructor & Rating */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="h-6 w-6 rounded-full object-cover border border-slate-700"
            />
            <span className="text-slate-300 font-medium truncate max-w-[120px]">
              {course.instructor.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-400 font-semibold text-xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{course.rating.toFixed(1)}</span>
            <span className="text-slate-500 font-normal">({course.reviewsCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Footer Actions & Price */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {isEnrolled ? (
              <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                {progressPercent === 100 ? 'Completed' : `${progressPercent}% Complete`}
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-white">{course.price}</span>
                {course.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">{course.originalPrice}</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCourse(course)}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition cursor-pointer flex items-center gap-1"
            >
              <span>{isEnrolled ? 'Open Classroom' : 'Syllabus'}</span>
              <ArrowRight className="h-3 w-3" />
            </button>

            {!isEnrolled && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEnroll(course.id);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition cursor-pointer"
              >
                Enroll Free
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
