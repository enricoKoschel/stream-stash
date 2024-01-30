import {
  BaseError,
  Media,
  MediaComment,
  MediaType,
  Result,
} from 'src/models/types';
import { Dialog } from 'quasar';
import { v4GetListDetailsRes } from 'src/models/tmdbApi';
import { backdropUrl, posterUrl } from 'boot/axios';
import router from 'src/router';
import { useMediaStore } from 'stores/mediaStore';

export function sleep(ms: number): Promise<never> {
  return new Promise((r) => setTimeout(r, ms));
}

export function ensureError(value: unknown): Error {
  if (value instanceof Error) return value;

  let valueString = '[Unable to stringify the thrown value]';
  try {
    valueString = JSON.stringify(value);
  } catch {
    /* empty */
  }

  return new Error(
    `This value was thrown as is, not through an Error: ${valueString}`
  );
}

export function resultOk<T, E extends BaseError>(value: T): Result<T, E> {
  return { success: true, value };
}

export function resultErr<T, E extends BaseError>(error: E): Result<T, E> {
  return { success: false, error };
}

export function createErrorDialog(msg: string): void {
  Dialog.create({
    title: 'Error',
    dark: true,
    message: msg,
    persistent: true,
    color: 'white',
    style: 'background-color: #c10015',
  });
}

export function createWaitingDialog(msg: string): () => void {
  const dialog = Dialog.create({
    title: 'Info',
    dark: true,
    message: msg,
    progress: true,
    persistent: true,
    ok: false,
    color: 'white',
    style: 'background-color: #1976d2',
  });

  return () => {
    dialog.hide();
  };
}

export function safeJsonParse<T>(str: string): T | undefined {
  try {
    return JSON.parse(str) as T;
  } catch {
    return undefined;
  }
}

export function constructMediaKey(mediaType: MediaType, id: number): string {
  return `${mediaType}:${id}`;
}

export function parseMedia(
  details: v4GetListDetailsRes
): Partial<Record<string, Media>> {
  const defaultComment: MediaComment = {
    watchState: 'planning',
    rating: 0,
  };

  const media: Partial<Record<string, Media>> = {};

  for (const item of details.results) {
    const key = constructMediaKey(item.media_type, item.id);

    const commentString = details.comments[key] ?? '';

    // TODO: Check for all fields that should be present on a comment and set default values for those that aren't
    const comment = safeJsonParse<MediaComment>(commentString) ?? {
      ...defaultComment,
    };

    media[key] = {
      id: item.id,
      mediaType: item.media_type,
      key: key,
      title: item.media_type === 'tv' ? item.name : item.title,
      overview: item.overview,
      date: item.media_type === 'tv' ? item.first_air_date : item.release_date,
      posterUrl: `${posterUrl}/${item.poster_path}`,
      backdropUrl: `${backdropUrl}/${item.backdrop_path}`,
      watchState: comment.watchState,
      rating: comment.rating,
    };
  }

  return media;
}

export async function resetApp(): Promise<void> {
  const mediaStore = useMediaStore();

  await router.push({ name: 'indexPage' });
  await mediaStore.init();
}
