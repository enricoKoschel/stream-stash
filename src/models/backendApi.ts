import {
  BaseError,
  MediaRecord,
  MediaType,
  Result,
  SearchResult,
  UserInfo,
} from 'src/models/types';
import {
  createErrorDialog,
  ensureError,
  resultErr,
  resultOk,
  safeJsonParse,
} from 'src/models/methods';
import { api } from 'boot/axios';

type ApiResult<T> = Result<T, BaseError>;

function genericApiError<T>(e: unknown, functionName: string): ApiResult<T> {
  const error = ensureError(e);

  createErrorDialog(`${functionName} - ` + error.toString());

  return resultErr(error);
}

export async function getUserInfo(): Promise<ApiResult<UserInfo>> {
  interface Response {
    logged_in: boolean;
    email: string;
  }

  try {
    const response = await api.get<Response>('/v1/userInfo');

    if (response.data.logged_in) {
      return resultOk({ loggedIn: true, email: response.data.email });
    } else {
      return resultOk({ loggedIn: false });
    }
  } catch (e) {
    return genericApiError(e, 'getUserInfo');
  }
}

export async function googleLogin(): Promise<ApiResult<string>> {
  interface Response {
    google_auth_url: string;
  }

  try {
    const response = await api.get<Response>('/v1/googleLogin');

    return resultOk(response.data.google_auth_url);
  } catch (e) {
    return genericApiError(e, 'login');
  }
}

export async function finishLogin(code: string): Promise<ApiResult<void>> {
  try {
    await api.post<never>('/v1/finishLogin', {
      code,
    });

    return resultOk(undefined);
  } catch (e) {
    return genericApiError(e, 'login');
  }
}

export async function logout(): Promise<ApiResult<void>> {
  try {
    await api.delete<never>('/v1/logout');

    return resultOk(undefined);
  } catch (e) {
    return genericApiError(e, 'logout');
  }
}

export async function updateMedia(
  media: MediaRecord,
): Promise<ApiResult<void>> {
  try {
    await api.post<never>('/v1/updateMedia', { media: JSON.stringify(media) });

    return resultOk(undefined);
  } catch (e) {
    return genericApiError(e, 'updateMedia');
  }
}

export async function getMedia(): Promise<ApiResult<MediaRecord>> {
  interface Response {
    media: string;
  }

  try {
    const response = await api.get<Response>('/v1/getMedia');

    // Parsing twice is intended here because of weirdness happening in the backend
    const json = safeJsonParse<MediaRecord>(
      safeJsonParse<string>(response.data.media) ?? '',
    );

    if (json === undefined) {
      throw new BaseError('Invalid JSON received from /v1/getMedia endpoint');
    }

    return resultOk(json);
  } catch (e) {
    return genericApiError(e, 'getMedia');
  }
}

export async function movieSearch(
  query: string,
  page: number,
): Promise<ApiResult<SearchResult>> {
  interface Response {
    page: number;
    results: {
      id: number;
      media_type: MediaType;
      key: string;
      title: string;
      original_title: string;
      overview: string;
      date: string;
      poster_url: string | null;
      backdrop_url: string | null;
    }[];
    total_pages: number;
    total_results: number;
  }

  try {
    const response = await api.get<Response>('/v1/movieSearch', {
      params: {
        query,
        page,
      },
    });

    const results = response.data.results.map((movie) => {
      return {
        id: movie.id,
        mediaType: movie.media_type,
        key: movie.key,
        title: movie.title,
        originalTitle: movie.original_title,
        overview: movie.overview,
        date: movie.date,
        posterUrl: movie.poster_url,
        backdropUrl: movie.backdrop_url,
      };
    });

    return resultOk({
      page: response.data.page,
      results,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    });
  } catch (e) {
    return genericApiError(e, 'movieSearch');
  }
}

export async function tvSearch(
  query: string,
  page: number,
): Promise<ApiResult<SearchResult>> {
  interface Response {
    page: number;
    results: {
      id: number;
      media_type: MediaType;
      key: string;
      title: string;
      original_title: string;
      overview: string;
      date: string;
      poster_url: string | null;
      backdrop_url: string | null;
    }[];
    total_pages: number;
    total_results: number;
  }

  try {
    const response = await api.get<Response>('/v1/tvSearch', {
      params: {
        query,
        page,
      },
    });

    const results = response.data.results.map((tv) => {
      return {
        id: tv.id,
        mediaType: tv.media_type,
        key: tv.key,
        title: tv.title,
        originalTitle: tv.original_title,
        overview: tv.overview,
        date: tv.date,
        posterUrl: tv.poster_url,
        backdropUrl: tv.backdrop_url,
      };
    });

    return resultOk({
      page: response.data.page,
      results,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    });
  } catch (e) {
    return genericApiError(e, 'tvSearch');
  }
}
