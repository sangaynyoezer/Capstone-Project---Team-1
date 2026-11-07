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
import { LoginModal } from './components/proto/LoginModal';
import { LoginPage } from './components/proto/LoginPage';

interface StoredProgress {
  userLoggedIn: boolean;
  studentName: string;
  studentId: string;
  studentEmail?: string;
  studentUsername?: string;
  unlockedLessons: string[];
  completedLessons: string[];
  completedActivities: string[];
  reviewedNotes: number[];
}

const STORAGE_KEY = 'recognai_course_v1_progress';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'lessons' | 'activities' | 'notes' | 'tutor' | 'assessment' | 'login'>('home');
  const [currentLessonSubView, setCurrentLessonSubView] = useState<LessonSubView>('overview');

  // Modals state
  const [isCreatorsOpen, setIsCreatorsOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  // User state: default NOT logged in for a first-time visitor
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).userLoggedIn || false;
    } catch {}
    return false;
  });

  const [studentName, setStudentName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).studentName || '';
    } catch {}
    return '';
  });

  const [studentId, setStudentId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).studentId || '';
    } catch {}
    return '';
  });

  const [studentEmail, setStudentEmail] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).studentEmail || '';
    } catch {}
    return '';
  });

  const [studentUsername, setStudentUsername] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved).studentUsername || '';
    } catch {}
    return '';
  });

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

  // Save to localStorage whenever progress changes
  useEffect(() => {
    const data: StoredProgress = {
      userLoggedIn,
      studentName,
      studentId,
      studentEmail,
      studentUsername,
      unlockedLessons,
      completedLessons,
      completedActivities,
      reviewedNotes,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [userLoggedIn, studentName, studentId, studentEmail, studentUsername, unlockedLessons, completedLessons, completedActivities, reviewedNotes]);

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
    } catch {}
  };

  const handleLoginSuccess = (name: string, id: string) => {
    setUserLoggedIn(true);
    setStudentName(name);
    setStudentId(id);
  };

  const handleLogout = () => {
    setUserLoggedIn(false);
    setStudentName('');
    setStudentId('');
    setStudentEmail('');
    setStudentUsername('');
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

      {/* Main Tab Screen Content */}
      <main className="flex-1">
        {activeTab === 'login' && (
          <LoginPage
            onLoginSuccess={(email, username, name) => {
              setUserLoggedIn(true);
              setStudentEmail(email);
              setStudentUsername(username);
              setStudentName(name);
              setStudentId(username);
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
            }}
            onLogout={handleLogout}
            onResetProgress={handleResetProgress}
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

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
        userLoggedIn={userLoggedIn}
        onLogout={handleLogout}
        onResetProgress={handleResetProgress}
        currentName={studentName}
        currentId={studentId}
      />
    </div>
  );
}
