import { usePersistentState } from './usePersistentState';

export interface VideoCheckpointProgress {
  hasWatchedVideo: boolean;
  isQuizCompleted: boolean;
  reviewRequired: boolean;
  lastScore: number | null;
  lastTotal: number | null;
}

const initialProgress: VideoCheckpointProgress = {
  hasWatchedVideo: false,
  isQuizCompleted: false,
  reviewRequired: false,
  lastScore: null,
  lastTotal: null,
};

function isVideoCheckpointProgress(value: unknown): value is VideoCheckpointProgress {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;

  const progress = value as Record<string, unknown>;
  return typeof progress.hasWatchedVideo === 'boolean' &&
    typeof progress.isQuizCompleted === 'boolean' &&
    typeof progress.reviewRequired === 'boolean' &&
    (progress.lastScore === null ||
      (typeof progress.lastScore === 'number' && Number.isInteger(progress.lastScore) && progress.lastScore >= 0)) &&
    (progress.lastTotal === null ||
      (typeof progress.lastTotal === 'number' && Number.isInteger(progress.lastTotal) && progress.lastTotal >= 0));
}

export function useVideoCheckpointProgress(lessonNumber: number) {
  return usePersistentState(
    `video-checkpoint-v1-lesson-${lessonNumber}`,
    initialProgress,
    isVideoCheckpointProgress,
  );
}
