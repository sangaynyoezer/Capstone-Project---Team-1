import { createClient } from '@supabase/supabase-js';
import type { TeacherMaterial } from '../materialsConfig';

export interface CourseProgress {
  unlockedLessons: string[];
  completedLessons: string[];
  completedActivities: string[];
  reviewedNotes: number[];
}

export interface TutorChatTurn {
  role: 'user' | 'bot';
  content: string;
}

export interface TutorReply {
  reply: string;
  source: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const isValidSupabaseUrl = (() => {
  if (!supabaseUrl) return false;
  try {
    const url = new URL(supabaseUrl);
    return url.protocol === 'https:' || (
      url.protocol === 'http:' &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1')
    );
  } catch {
    return false;
  }
})();
const hasPlaceholderConfig =
  !isValidSupabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes('YOUR_PROJECT_ID') ||
  supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY';

export const supabase = hasPlaceholderConfig
  ? null
  : createClient(supabaseUrl, supabaseAnonKey);

export async function askStudyBuddy(
  message: string,
  history: TutorChatTurn[],
): Promise<TutorReply> {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase.functions.invoke<TutorReply>('study-buddy', {
    body: { message, history },
  });
  if (error) {
    let message = error.message;
    if ('context' in error && error.context instanceof Response) {
      const payload: unknown = await error.context.clone().json().catch(() => null);
      if (
        typeof payload === 'object' &&
        payload !== null &&
        'error' in payload &&
        typeof payload.error === 'string'
      ) {
        message = payload.error;
      }
    }
    throw new Error(message);
  }
  if (!data || typeof data.reply !== 'string' || typeof data.source !== 'string') {
    throw new Error('The AI tutor returned an invalid response.');
  }
  return data;
}

export const MAX_RESOURCE_FILE_SIZE = 20 * 1024 * 1024;
const RESOURCE_BUCKET = 'course-resources';

const resourceFileTypes = {
  pdf: {
    fileType: 'PDF',
    contentType: 'application/pdf',
  },
  docx: {
    fileType: 'DOCX',
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  pptx: {
    fileType: 'PPTX',
    contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
} as const;

type ResourceCategory = TeacherMaterial['category'];
type UploadedFileType = keyof typeof resourceFileTypes;

interface CourseResourceRow {
  id: string;
  uploaded_by: string;
  title: string;
  category: ResourceCategory;
  description: string;
  file_type: TeacherMaterial['fileType'];
  file_size: number;
  storage_path: string;
}

function getUploadedFileType(file: File): UploadedFileType {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !(extension in resourceFileTypes)) {
    throw new Error('Choose a PDF, DOCX, or PPTX file.');
  }

  const fileType = resourceFileTypes[extension as UploadedFileType];
  if (file.type && file.type !== fileType.contentType) {
    throw new Error('The selected file type does not match its file extension.');
  }
  if (file.size === 0 || file.size > MAX_RESOURCE_FILE_SIZE) {
    throw new Error('Choose a non-empty file that is no larger than 20 MB.');
  }

  return extension as UploadedFileType;
}

function formatFileSize(size: number): string {
  return size >= 1024 * 1024
    ? `${(size / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(size / 1024))} KB`;
}

function mapCourseResource(row: CourseResourceRow): TeacherMaterial {
  if (!supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { data } = supabase.storage.from(RESOURCE_BUCKET).getPublicUrl(row.storage_path);
  const downloadUrl = new URL(data.publicUrl);
  downloadUrl.searchParams.set('download', `${row.title}.${row.file_type.toLowerCase()}`);
  return {
    id: row.id,
    uploadedBy: row.uploaded_by,
    title: row.title,
    category: row.category,
    description: row.description,
    downloadUrl: downloadUrl.toString(),
    storagePath: row.storage_path,
    fileSize: formatFileSize(row.file_size),
    fileType: row.file_type,
    badge: 'TEACHER RESOURCE',
    tags: ['Class IX DTI', row.category],
  };
}

export async function loadTeacherResources(): Promise<TeacherMaterial[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('course_resources')
    .select('id, uploaded_by, title, category, description, file_type, file_size, storage_path')
    .order('created_at', { ascending: false });

  if (error) {
    if (error.code === 'PGRST205' || error.code === '42P01') {
      throw new Error('The shared resources table is missing. Run supabase/schema.sql in the Supabase SQL Editor.');
    }
    throw new Error(error.message);
  }
  return (data as CourseResourceRow[]).map(mapCourseResource);
}

export async function uploadTeacherResource(
  file: File,
  userId: string,
  details: {
    title: string;
    category: ResourceCategory;
    description: string;
  },
): Promise<TeacherMaterial> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Configure its URL and publishable key before uploading.');
  }
  if (!userId) throw new Error('Sign in with a teacher account before uploading files.');

  const extension = getUploadedFileType(file);
  const { contentType, fileType } = resourceFileTypes[extension];
  const storagePath = `${userId}/${crypto.randomUUID()}.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from(RESOURCE_BUCKET)
    .upload(storagePath, file, { contentType, upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data, error: insertError } = await supabase
    .from('course_resources')
    .insert({
      uploaded_by: userId,
      title: details.title.trim(),
      category: details.category,
      description: details.description.trim(),
      file_type: fileType,
      file_size: file.size,
      storage_path: storagePath,
    })
    .select('id, uploaded_by, title, category, description, file_type, file_size, storage_path')
    .single();

  if (insertError) {
    const { error: cleanupError } = await supabase.storage
      .from(RESOURCE_BUCKET)
      .remove([storagePath]);
    if (cleanupError) {
      throw new Error(`${insertError.message} The uploaded file also could not be cleaned up: ${cleanupError.message}`);
    }
    throw new Error(insertError.message);
  }

  return mapCourseResource(data as CourseResourceRow);
}

export async function deleteTeacherResource(
  resourceId: string,
  storagePath: string,
  userId: string,
): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured.');

  const { data, error } = await supabase
    .from('course_resources')
    .delete()
    .eq('id', resourceId)
    .eq('uploaded_by', userId)
    .select('id')
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('The resource could not be removed. You can only remove resources you uploaded.');

  const { error: storageError } = await supabase.storage
    .from(RESOURCE_BUCKET)
    .remove([storagePath]);
  if (storageError) {
    throw new Error(`The resource entry was removed, but its stored file could not be deleted: ${storageError.message}`);
  }
}

function stringArray(value: unknown, fallback: string[] = []): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
    ? value
    : fallback;
}

function numberArray(value: unknown): number[] {
  return Array.isArray(value) && value.every((item) => Number.isInteger(item))
    ? value
    : [];
}

export async function loadCourseProgress(userId: string): Promise<CourseProgress | null> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the required VITE_SUPABASE environment variables.');
  }

  const { data, error } = await supabase
    .from('course_progress')
    .select('unlocked_lessons, completed_lessons, completed_activities, reviewed_notes')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    if (error.code === 'PGRST205' || error.code === '42P01') {
      throw new Error('The course progress table is missing. Run supabase/schema.sql in the Supabase SQL Editor.');
    }
    throw new Error(error.message);
  }
  if (!data) return null;

  return {
    unlockedLessons: stringArray(data.unlocked_lessons, ['lesson-1']),
    completedLessons: stringArray(data.completed_lessons),
    completedActivities: stringArray(data.completed_activities),
    reviewedNotes: numberArray(data.reviewed_notes),
  };
}

export async function saveCourseProgress(
  userId: string,
  progress: CourseProgress,
): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the required VITE_SUPABASE environment variables.');
  }

  const { error } = await supabase.from('course_progress').upsert(
    {
      user_id: userId,
      unlocked_lessons: progress.unlockedLessons,
      completed_lessons: progress.completedLessons,
      completed_activities: progress.completedActivities,
      reviewed_notes: progress.reviewedNotes,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );

  if (error) throw new Error(error.message);
}
