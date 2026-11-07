import React, { useState, useMemo } from 'react';
import { Course, EnrolledCourseProgress } from '../types/course';
import { CourseCard } from './CourseCard';
import { Filter, SlidersHorizontal, Sparkles, Search } from 'lucide-react';

interface CourseCatalogProps {
  courses: Course[];
  enrolledProgress: Record<string, EnrolledCourseProgress>;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCourse: (course: Course) => void;
  onEnroll: (courseId: string) => void;
}

const CATEGORIES = [
  'All Tracks',
  'Biometrics & Facial AI',
  'Real-Time Detection',
  'Edge AI & Embedded',
  'Deep Learning Core',
  'Computer Vision',
];

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  enrolledProgress,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectCourse,
  onEnroll,
}) => {
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'duration'>('popular');

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Category filter
        if (selectedCategory !== 'All Tracks' && course.category !== selectedCategory) {
          return false;
        }
        // Level filter
        if (levelFilter !== 'All' && course.level !== levelFilter) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = course.title.toLowerCase().includes(q);
          const matchTagline = course.tagline.toLowerCase().includes(q);
          const matchSkills = course.skillsGained.some((s) => s.toLowerCase().includes(q));
          const matchInstructor = course.instructor.name.toLowerCase().includes(q);
          return matchTitle || matchTagline || matchSkills || matchInstructor;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'duration') return b.durationHours - a.durationHours;
        return 0;
      });
  }, [courses, selectedCategory, levelFilter, searchQuery, sortBy]);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Industrial Curriculum & Syllabi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Explore AI Recognition Courses
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Hands-on architectures designed with rigorous mathematical foundations and edge deployment.
          </p>
        </div>

        {/* Total stats readout */}
        <div className="text-xs text-slate-400 flex items-center gap-3">
          <span>Showing <strong className="text-white font-bold">{filteredCourses.length}</strong> of {courses.length} courses</span>
        </div>
      </div>

      {/* Category Tabs (Segmented Button Control) */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 no-scrollbar" role="tablist">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Subbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 mb-8">
        
        {/* Level Filters */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-cyan-400" />
            <span>Experience:</span>
          </span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer ${
                levelFilter === lvl
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
            <span>Sort by:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-md px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="duration">Duration (Longest)</option>
          </select>
        </div>

      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const progress = enrolledProgress[course.id];
            const isEnrolled = !!progress;
            return (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={isEnrolled}
                progressPercent={progress?.progressPercent || 0}
                onSelectCourse={onSelectCourse}
                onEnroll={onEnroll}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-[#091222] p-12 text-center">
          <Search className="mx-auto h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-white">No courses match your filter criteria</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, difficulty level, or selecting "All Tracks" to view the full curriculum.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All Tracks');
              setLevelFilter('All');
              onSearchChange('');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-900 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
