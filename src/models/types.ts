export type MediaType = 'tv' | 'movie';

export const watchStateArray = ['watching', 'planning', 'watched'] as const;
export type WatchState = (typeof watchStateArray)[number];

type Jsonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | readonly Jsonable[]
  | {
      readonly [key: string]: Jsonable;
    }
  | { toJSON(): Jsonable };

export class BaseError extends Error {
  public readonly context?: Jsonable;

  constructor(
    message: string,
    options: { cause?: Error; context?: Jsonable } = {},
  ) {
    const { cause, context } = options;

    super(message, { cause });
    this.name = this.constructor.name;

    this.context = context;
  }
}

export type Result<T, E extends BaseError> =
  | { success: true; value: T }
  | { success: false; error: E };

export interface MediaHistory {
  rating: number;
  startDate: string;
  endDate: string;
  name: string;
}

export interface MediaComment {
  watchState: WatchState;
  history: MediaHistory[];
}

export interface Media {
  id: number;
  mediaType: MediaType;
  key: string;
  title: string;
  originalTitle: string;
  overview: string;
  date: string;
  posterUrl: string | null;
  backdropUrl: string | null;
}

export type MediaWithComment = Media & MediaComment;

export interface SearchResult {
  page: number;
  results: Media[];
  totalPages: number;
  totalResults: number;
}

export type UserInfo = { loggedIn: false } | { loggedIn: true; email: string };

export type MediaRecord = Partial<Record<string, MediaWithComment>>;
