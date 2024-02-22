import {
  BaseError,
  Media,
  MediaComment,
  MediaType,
  MediaHistory,
  Result,
  WatchState,
  watchStateArray,
} from 'src/models/types';
import { Dialog } from 'quasar';
import {
  v3GetAllLists,
  v4CreateList,
  v4GetListDetailsRes,
  v4UpdateList,
} from 'src/models/tmdbApi';
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
    `This value was thrown as is, not through an Error: ${valueString}`,
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
    class: 'bg-negative',
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
    class: 'bg-primary',
  });

  return () => {
    dialog.hide();
  };
}

export function createConfirmDialog(
  msg: string,
  onConfirm: () => void | Promise<void>,
): void {
  Dialog.create({
    title: 'Confirm',
    dark: true,
    message: msg,
    cancel: { label: 'No', flat: true },
    ok: {
      label: 'Yes',
      flat: true,
      class: 'text-negative',
    },
    noBackdropDismiss: true,
    color: 'primary',
    focus: 'none',
  }).onOk(() => {
    Promise.resolve(onConfirm()).catch(console.error);
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

export function isValidWatchState(value: unknown): value is WatchState {
  // @ts-expect-error to check if the value is a valid WatchState
  return typeof value === 'string' && watchStateArray.includes(value);
}

export function isValidMediaHistory(value: unknown): value is MediaHistory {
  return (
    typeof value === 'object' &&
    value !== null &&
    'rating' in value &&
    typeof value.rating === 'number' &&
    value.rating >= 0 &&
    value.rating <= 5 &&
    'startDate' in value &&
    typeof value.startDate === 'string' &&
    'endDate' in value &&
    typeof value.endDate === 'string' &&
    'name' in value &&
    typeof value.name === 'string'
  );
}

export function parseCommentWithDefaults(commentString: string): MediaComment {
  const defaultComment: MediaComment = {
    watchState: 'planning',
    history: {},
  };

  const parsedComment = safeJsonParse<unknown>(commentString);

  // Delete fields whose values are not the correct type
  if (
    parsedComment !== undefined &&
    parsedComment !== null &&
    typeof parsedComment === 'object'
  ) {
    if (
      'watchState' in parsedComment &&
      !isValidWatchState(parsedComment.watchState)
    ) {
      delete parsedComment.watchState;
    }

    if ('history' in parsedComment) {
      if (
        typeof parsedComment.history === 'object' &&
        parsedComment.history !== null
      ) {
        for (const key in parsedComment.history) {
          const entry = (parsedComment.history as Record<string, unknown>)[key];

          if (!isValidMediaHistory(entry)) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete (parsedComment.history as Record<string, unknown>)[key];
          }
        }
      } else {
        delete parsedComment.history;
      }
    }
  }

  // Keep defaults for all fields that are not present on parsedComment
  return {
    ...defaultComment,
    ...(parsedComment as Partial<MediaComment>),
  };
}

export function parseMedia(
  details: v4GetListDetailsRes,
): Partial<Record<string, Media>> {
  const media: Partial<Record<string, Media>> = {};

  for (const item of details.results) {
    const key = constructMediaKey(item.media_type, item.id);

    const commentString = details.comments[key] ?? '';
    const comment = parseCommentWithDefaults(commentString);

    media[key] = {
      id: item.id,
      mediaType: item.media_type,
      key: key,
      title: item.media_type === 'tv' ? item.name : item.title,
      overview: item.overview,
      date: item.media_type === 'tv' ? item.first_air_date : item.release_date,
      posterUrl: item.poster_path
        ? `${posterUrl}/${item.poster_path}`
        : undefined,
      backdropUrl: item.backdrop_path
        ? `${backdropUrl}/${item.backdrop_path}`
        : undefined,
      watchState: comment.watchState,
      history: comment.history,
    };
  }

  return media;
}

export async function resetApp(): Promise<void> {
  const mediaStore = useMediaStore();

  await router.push({ name: 'indexPage' });
  await mediaStore.init();
}

export async function getOrCreateDbList(): Promise<number | undefined> {
  const dbListName = '[DO NOT RENAME/EDIT/DELETE] Stream Stash DB';

  const getListsResult = await v3GetAllLists();

  if (!getListsResult.success) return undefined;

  const dbList = getListsResult.value.results.find(
    (item) => item.name === dbListName,
  );

  if (dbList) {
    return dbList.id;
  }

  const createListResult = await v4CreateList('', dbListName, 'US', 'en');

  if (!createListResult.success) return undefined;

  const dbListId = createListResult.value.id;

  // This is necessary to set the list to private
  const updateListResult = await v4UpdateList(
    dbListId,
    undefined,
    undefined,
    false,
    undefined,
  );

  if (!updateListResult.success) return undefined;

  return dbListId;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
