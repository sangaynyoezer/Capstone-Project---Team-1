/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ProtoNavbar } from './components/proto/ProtoNavbar';
import { ProtoFooter } from './components/proto/ProtoFooter';
import { HomeScreen } from './components/proto/HomeScreen';
import { LessonsScreen, LessonSubView } from './components/proto/LessonsScreen';
import { ActivitiesScreen } from './components/proto/ActivitiesScreen';
import { NotesScreen } from './components/proto/NotesScreen';
import { AITutorScreen } from './components/proto/AITutorScreen';
import { AssessmentScreen } from './components/proto/AssessmentScreen';
import { CreatorsModal } from './components/proto/CreatorsModal';
import { LoginPage } from './components/proto/LoginPage';
import { loadCourseProgress, saveCourseProgress, supabase, type CourseProgress } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

const STORAGE_KEY = 'recognai_course_v1_progress';

function getAccountType(user: User | null): 'student' | 'teacher' {
  return user?.app_metadata.role === 'teacher' ||
    user?.user_metadata.account_type === 'teacher'
    ? 'teacher'
    : 'student';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'lessons' | 'activities' | 'notes' | 'tutor' | 'assessment' | 'login'>('home');
  const [currentLessonSubView, setCurrentLessonSubView] = useState<LessonSubView>('overview');

  // Modals state
  const [isCreatorsOpen, setIsCreatorsOpen] = useState<boolean>(false);

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [selectedAccountType, setSelectedAccountType] = useState<'student' | 'teacher'>('student');
  const [authError, setAuthError] = useState<string>('');
  const [loadedProgressUserId, setLoadedProgressUserId] = useState<string | null>(null);
  const [isProgressLoading, setIsProgressLoading] = useState<boolean>(false);
  const userLoggedIn = Boolean(authUser) || isGuest;
  const userMetadata = authUser?.user_metadata ?? {};
  const studentName = typeof userMetadata.full_name === 'string'
    ? userMetadata.full_name
    : isGuest ? 'Guest Learner' : '';
  const studentEmail = authUser?.email ?? '';
  const studentUsername = typeof userMetadata.username === 'string'
    ? userMetadata.username
    : isGuest ? 'guest' : '';
  const studentId = typeof userMetadata.student_id === 'string'
    ? userMetadata.student_id
    : isGuest ? 'guest' : studentUsername;
  const teacherApproved = authUser?.app_metadata.role === 'teacher';

  // Real course progress state: for first-time login, only Lesson 1 is unlocked, 0 completed!
  const [unlockedLessons, setUnlockedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && JSON.parse(saved).unlockedLessons) {
        return JSON.parse(saved).unlockedLessons;
      }
    } catch {}
    return ['lesson-1'];
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && JSON.parse(saved).completedLessons) {
        return JSON.parse(saved).completedLessons;
      }
    } catch {}
    return [];
  });

  const [completedActivities, setCompletedActivities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && JSON.parse(saved).completedActivities) {
        return JSON.parse(saved).completedActivities;
      }
    } catch {}
    return [];
  });

  const [reviewedNotes, setReviewedNotes] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && JSON.parse(saved).reviewedNotes) {
        return JSON.parse(saved).reviewedNotes;
      }
    } catch {}
    return [];
  });

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setAuthUser(session?.user ?? null);
        setSelectedAccountType(getAccountType(session?.user ?? null));
        setAuthError('');
      }
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setAuthError(`Could not restore your sign-in session: ${error.message}`);
        return;
      }
      setAuthUser(data.session?.user ?? null);
      setSelectedAccountType(getAccountType(data.session?.user ?? null));
    }).catch((error: unknown) => {
      if (active) {
        setAuthError(error instanceof Error ? error.message : 'Could not restore your sign-in session.');
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!authUser) {
      setLoadedProgressUserId(null);
      setIsProgressLoading(false);
      return;
    }

    let active = true;
    setLoadedProgressUserId(null);
    setIsProgressLoading(true);

    void loadCourseProgress(authUser.id).then((progress) => {
      if (!active) return;

      const savedProgress: CourseProgress = progress ?? {
        unlockedLessons: ['lesson-1'],
        completedLessons: [],
        completedActivities: [],
        reviewedNotes: [],
      };
      setUnlockedLessons(savedProgress.unlockedLessons);
      setCompletedLessons(savedProgress.completedLessons);
      setCompletedActivities(savedProgress.completedActivities);
      setReviewedNotes(savedProgress.reviewedNotes);
      setLoadedProgressUserId(authUser.id);
      setAuthError('');
    }).catch((error: unknown) => {
      if (active) {
        setAuthError(error instanceof Error ? error.message : 'Could not load your course progress.');
      }
    }).finally(() => {
      if (active) setIsProgressLoading(false);
    });

    return () => {
      active = false;
    };
  }, [authUser?.id]);

  // Save progress locally and, for signed-in users, to their private database row.
  useEffect(() => {
    const progress: CourseProgress = {
      unlockedLessons,
      completedLessons,
      completedActivities,
      reviewedNotes,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      setAuthError(error instanceof Error ? `Could not save local progress: ${error.message}` : 'Could not save local progress.');
    }

    if (!authUser || loadedProgressUserId !== authUser.id) return;

    void saveCourseProgress(authUser.id, progress).then(() => {
      setAuthError('');
    }).catch((error: unknown) => {
      setAuthError(error instanceof Error ? `Could not save your course progress: ${error.message}` : 'Could not save your course progress.');
    });
  }, [authUser, loadedProgressUserId, unlockedLessons, completedLessons, completedActivities, reviewedNotes]);

  // Handle lesson progression: completing a module unlocks the next one!
  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
    // Unlock next lesson in syllabus sequence
    const order = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4', 'lesson-5', 'lesson-6'];
    const currentIdx = order.indexOf(lessonId);
    if (currentIdx !== -1 && currentIdx < order.length - 1) {
      const nextLesson = order[currentIdx + 1];
      if (!unlockedLessons.includes(nextLesson)) {
        setUnlockedLessons((prev) => [...prev, nextLesson]);
      }
    }
  };

  const handleActivityComplete = (actId: string) => {
    if (!completedActivities.includes(actId)) {
      setCompletedActivities((prev) => [...prev, actId]);
    }
  };

  const handleToggleNote = (id: number) => {
    setReviewedNotes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset progress back to clean 0% state for testing or new student onboarding
  const handleResetProgress = () => {
    setUnlockedLessons(['lesson-1']);
    setCompletedLessons([]);
    setCompletedActivities([]);
    setReviewedNotes([]);
    setCurrentLessonSubView('overview');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      setAuthError(error instanceof Error ? `Could not clear local progress: ${error.message}` : 'Could not clear local progress.');
    }
  };

  const handleLoginSuccess = (user: User) => {
    setIsGuest(false);
    setAuthUser(user);
    setSelectedAccountType(getAccountType(user));
    setAuthError('');
  };

  const handleLogout = async () => {
    if (isGuest && !authUser) {
      setIsGuest(false);
      setSelectedAccountType('student');
      setActiveTab('home');
      return;
    }
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(`Could not sign out: ${error.message}`);
      return;
    }
    setAuthUser(null);
    setSelectedAccountType('student');
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-[#070b16] text-slate-100 flex flex-col font-sans selection:bg-[#00f5c4] selection:text-[#070b16]">
      {/* Navbar (Matches Figma Header) */}
      <ProtoNavbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLogin={() => {
          setActiveTab('login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userLoggedIn={userLoggedIn}
        studentName={studentName}
        studentId={studentId}
      />

      {authError && (
        <div role="alert" className="mx-auto mt-4 w-[min(90%,48rem)] rounded-xl border border-rose-500/50 bg-rose-950/60 px-4 py-3 text-sm text-rose-200">
          {authError}
        </div>
      )}

      {/* Main Tab Screen Content */}
      <main className={`flex-1 ${authUser && isProgressLoading ? 'pointer-events-none' : ''}`}>
        {authUser && isProgressLoading && (
          <div role="status" className="mx-auto mt-6 w-fit rounded-xl border border-cyan-500/30 bg-cyan-950/50 px-4 py-3 text-sm text-cyan-200">
            Loading your saved course progress...
          </div>
        )}
        {activeTab === 'login' && (
          <LoginPage
            onLoginSuccess={(user) => {
              handleLoginSuccess(user);
              setActiveTab('lessons');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToCourse={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            userLoggedIn={userLoggedIn}
            currentUser={{
              email: studentEmail,
              username: studentUsername,
              name: studentName,
              accountType: selectedAccountType,
              teacherApproved,
            }}
            onLogout={handleLogout}
            onResetProgress={handleResetProgress}
            isGuest={isGuest}
            onContinueAsGuest={() => {
              setIsGuest(true);
              setActiveTab('lessons');
            }}
          />
        )}

        {activeTab === 'home' && (
          <HomeScreen
            onStartLearning={() => {
              if (!userLoggedIn) {
                setActiveTab('login');
              } else {
                setActiveTab('lessons');
                setCurrentLessonSubView('overview');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCreators={() => setIsCreatorsOpen(true)}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'lessons' && (
          <LessonsScreen
            currentSubView={currentLessonSubView}
            setCurrentSubView={(sub) => {
              setCurrentLessonSubView(sub);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCompleteChapter={() => {
              setActiveTab('assessment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            unlockedLessons={unlockedLessons}
            completedLessons={completedLessons}
            markLessonComplete={markLessonComplete}
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesScreen
            onActivityComplete={handleActivityComplete}
            completedActivities={completedActivities}
          />
        )}

        {activeTab === 'notes' && (
          <NotesScreen
            reviewedNotes={reviewedNotes}
            onToggleNote={handleToggleNote}
          />
        )}

        {activeTab === 'tutor' && <AITutorScreen />}

        {activeTab === 'assessment' && (
          <AssessmentScreen
            lessonsCompletedCount={completedLessons.length}
            totalLessons={6}
            activitiesCompletedCount={completedActivities.length}
            totalActivities={2}
            notesReviewedCount={reviewedNotes.length}
            totalNotes={8}
            studentName={studentName || 'Class IX Student'}
          />
        )}
      </main>

      {/* Footer (Matches Figma RecognAI footer) */}
      <ProtoFooter
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <CreatorsModal
        isOpen={isCreatorsOpen}
        onClose={() => setIsCreatorsOpen(false)}
      />
    </div>
  );
}
