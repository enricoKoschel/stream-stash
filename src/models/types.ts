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
    options: { cause?: Error; context?: Jsonable } = {}
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

export interface TvShowHistory {
  rating: number;
  startDate: string;
  endDate: string;
  name: string;
}

export interface MovieHistory {
  rating: number;
  watchDate: string;
}

export type MediaHistory = TvShowHistory | MovieHistory;

export interface MediaComment {
  watchState: WatchState;
  history:
    | Partial<Record<number, TvShowHistory>>
    | Partial<Record<number, MovieHistory>>;
}

export interface Media extends MediaComment {
  id: number;
  mediaType: MediaType;
  key: string;
  title: string;
  overview: string;
  date: string;
  posterUrl: string | undefined;
  backdropUrl: string | undefined;
}
