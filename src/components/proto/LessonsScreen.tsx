import React from 'react';
import { LessonsRoadmapView } from './lessons/LessonsRoadmapView';
import { Lesson1View } from './lessons/Lesson1View';
import { Lesson2View } from './lessons/Lesson2View';
import { Lesson3View } from './lessons/Lesson3View';
import { Lesson4View } from './lessons/Lesson4View';
import { Lesson5View } from './lessons/Lesson5View';
import { Lesson6View } from './lessons/Lesson6View';
import { ArrowLeft, Lock } from 'lucide-react';

export type LessonSubView = 'overview' | 'lesson-1' | 'lesson-2' | 'lesson-3' | 'lesson-4' | 'lesson-5' | 'lesson-6';

interface LessonsScreenProps {
  currentSubView: LessonSubView;
  setCurrentSubView: (view: LessonSubView) => void;
  onCompleteChapter: () => void;
  unlockedLessons: string[];
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
}

export const LessonsScreen: React.FC<LessonsScreenProps> = ({
  currentSubView,
  setCurrentSubView,
  onCompleteChapter,
  unlockedLessons,
  completedLessons,
  markLessonComplete,
}) => {
  return (
    <div className="min-h-screen bg-[#070b16] pb-24">
      {/* Sub-navigation bar when inside a specific lesson */}
      {currentSubView !== 'overview' && (
        <div className="bg-[#050812]/90 border-b border-[#142036] px-6 sm:px-12 py-2.5 flex items-center justify-between text-xs sticky top-[57px] z-30 backdrop-blur-md">
          <button
            onClick={() => setCurrentSubView('overview')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-[#00f5c4] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Visual Course Roadmap</span>
          </button>

          {/* Quick jump between unlocked lessons */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            {(['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6'] as const).map((lid, idx) => {
              const isActive = currentSubView === lid;
              const isUnlocked = unlockedLessons.includes(lid);
              const isCompleted = completedLessons.includes(lid);

              return (
                <button
                  key={lid}
                  disabled={!isUnlocked}
                  onClick={() => isUnlocked && setCurrentSubView(lid)}
                  className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-[#00f5c4]/15 text-[#00f5c4] font-bold border border-[#00f5c4]/40 shadow-[0_0_8px_rgba(0,245,196,0.2)]'
                      : isCompleted
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : isUnlocked
                      ? 'text-slate-300 hover:text-white border border-slate-700'
                      : 'text-slate-600 border border-slate-800 cursor-not-allowed opacity-50'
                  }`}
                  title={!isUnlocked ? 'Complete earlier modules to unlock' : undefined}
                >
                  <span>L0{idx + 1}</span>
                  {!isUnlocked && <Lock className="w-2.5 h-2.5 text-slate-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Render sub-view */}
      {currentSubView === 'overview' && (
        <LessonsRoadmapView
          onSelectLesson={(lid) => {
            setCurrentSubView(lid);
          }}
          unlockedLessons={unlockedLessons}
          completedLessons={completedLessons}
        />
      )}

      {currentSubView === 'lesson-1' && (
        <Lesson1View
          onNextLesson={() => {
            markLessonComplete('lesson-1');
            setCurrentSubView('lesson-2');
          }}
        />
      )}

      {currentSubView === 'lesson-2' && (
        <Lesson2View
          onNextLesson={() => {
            markLessonComplete('lesson-2');
            setCurrentSubView('lesson-3');
          }}
        />
      )}

      {currentSubView === 'lesson-3' && (
        <Lesson3View
          onNextLesson={() => {
            markLessonComplete('lesson-3');
            setCurrentSubView('lesson-4');
          }}
        />
      )}

      {currentSubView === 'lesson-4' && (
        <Lesson4View
          onNextLesson={() => {
            markLessonComplete('lesson-4');
            setCurrentSubView('lesson-5');
          }}
        />
      )}

      {currentSubView === 'lesson-5' && (
        <Lesson5View
          onNextLesson={() => {
            markLessonComplete('lesson-5');
            setCurrentSubView('lesson-6');
          }}
        />
      )}

      {currentSubView === 'lesson-6' && (
        <Lesson6View
          onCompleteChapter={() => {
            markLessonComplete('lesson-6');
            onCompleteChapter();
          }}
        />
      )}
    </div>
  );
};
