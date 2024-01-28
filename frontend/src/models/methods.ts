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

export function parseMedia(details: v4GetListDetailsRes): Media[] {
  const defaultComment: MediaComment = {
    watchState: 'planning',
    rating: 0,
  };

  const media: Media[] = [];

  for (const item of details.results) {
    const key = constructMediaKey(item.media_type, item.id);

    const commentString = details.comments[key] ?? '';
    // TODO: commentString is user editable on TMDB, so verify that it actually is a MediaComment
    const comment = safeJsonParse<MediaComment>(commentString) ?? {
      ...defaultComment,
    };

    media.push({
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
    });
  }

  return media;
}
