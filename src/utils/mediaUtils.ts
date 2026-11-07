/**
 * Media Utilities for embedding videos and audio in Class IX DTI learning modules.
 * Automatically formats Google Drive, YouTube, Vimeo, and direct video links.
 */

export interface FormattedMedia {
  type: 'video' | 'iframe';
  src: string;
}

export function formatVideoEmbedUrl(url?: string): FormattedMedia {
  if (!url || !url.trim()) {
    return { type: 'iframe', src: '' };
  }

  const trimmed = url.trim();

  // Direct video file formats
  if (
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed) ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:video/')
  ) {
    return { type: 'video', src: trimmed };
  }

  // YouTube watch, short, or embed URL
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytMatch) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0` };
  }

  // Google Drive sharing link
  const gDriveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (gDriveMatch) {
    return { type: 'iframe', src: `https://drive.google.com/file/d/${gDriveMatch[1]}/preview` };
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  if (vimeoMatch) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  return { type: 'iframe', src: trimmed };
}
