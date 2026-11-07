export interface Instructor {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  avatar: string;
  rating: number;
  studentsCount: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'lab' | 'quiz' | 'reading';
  summary: string;
  videoUrl?: string;
  posterImage?: string;
  contentMarkdown?: string;
  codeSnippet?: {
    language: string;
    code: string;
    output: string;
  };
  quiz?: QuizQuestion[];
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: 'Computer Vision' | 'Biometrics & Facial AI' | 'Real-Time Detection' | 'Edge AI & Embedded' | 'Deep Learning Core';
  thumbnail: string;
  instructor: Instructor;
  durationHours: number;
  lessonsCount: number;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  prerequisites: string[];
  skillsGained: string[];
  modules: Module[];
  featured?: boolean;
  isPopular?: boolean;
  price: string;
  originalPrice?: string;
  certificateProvided: boolean;
}

export interface EnrolledCourseProgress {
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  lastLessonId: string;
  completedLessonIds: string[];
  completedAt?: string;
  quizScores: Record<string, number>;
}

export interface DiscussionThread {
  id: string;
  lessonId: string;
  author: string;
  authorAvatar: string;
  timestamp: string;
  content: string;
  upvotes: number;
  replies: {
    id: string;
    author: string;
    authorAvatar: string;
    isInstructor?: boolean;
    timestamp: string;
    content: string;
  }[];
}
