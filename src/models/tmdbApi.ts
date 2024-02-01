import { BaseError, Result } from 'src/models/types';
import { api } from 'boot/axios';
import {
  createErrorDialog,
  createWaitingDialog,
  ensureError,
  resultErr,
  resultOk,
  sleep,
} from 'src/models/methods';
import { AxiosResponse } from 'axios';

type ApiResult<T> = Result<T, BaseError>;

function genericApiError<T>(e: unknown, functionName: string): ApiResult<T> {
  const error = ensureError(e);

  createErrorDialog(`${functionName} - ` + error.toString());

  return resultErr(error);
}

export interface v4NewRequestTokenRes {
  status_message: string;
  request_token: string;
  success: boolean;
  status_code: number;
}

export async function v4NewRequestToken(): Promise<
  ApiResult<v4NewRequestTokenRes>
> {
  try {
    const response = await api.post<v4NewRequestTokenRes>(
      '/4/auth/request_token'
    );

    return resultOk(response.data);
  } catch (e) {
    return genericApiError(e, 'v4NewRequestToken');
  }
}

export async function wwwAuthenticateV4RequestToken(
  requestToken: string
): Promise<boolean> {
  const url = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`;
  const authWindow = window.open(url, '_blank');

  if (!authWindow) {
    createErrorDialog(
      'The login page could not be opened. Please make sure you allow popups from Stream Stash.'
    );

    return false;
  }

  authWindow.focus();

  const hide = createWaitingDialog('Waiting for login...');

  while (!authWindow.closed) {
    await sleep(2000);
  }

  hide();

  return true;
}

export interface v4NewAccessTokenRes {
  account_id: string;
  access_token: string;
  success: boolean;
  status_message: string;
  status_code: number;
}

export async function v4NewAccessToken(
  requestToken: string
): Promise<ApiResult<v4NewAccessTokenRes>> {
  try {
    const response = await api.post<v4NewAccessTokenRes>(
      '/4/auth/access_token',
      { request_token: requestToken }
    );

    return resultOk(response.data);
  } catch (e) {
    const error = ensureError(e);

    createErrorDialog(
      'A secure connection to TMDB could not be established. Please make sure to allow Stream Stash access to your account.'
    );

    return resultErr(error);
  }
}

export interface v4DeleteAccessTokenRes {
  status_message: string;
  success: boolean;
  status_code: number;
}

export async function v4DeleteAccessToken(
  accessToken: string
): Promise<ApiResult<v4DeleteAccessTokenRes>> {
  try {
    const response = await api.delete<v4DeleteAccessTokenRes>(
      '/4/auth/access_token',
      { data: { access_token: accessToken } }
    );

    return resultOk(response.data);
  } catch (e) {
    return genericApiError(e, 'v4DeleteAccessToken');
  }
}

export interface v4GetListDetailsRes {
  average_rating: number;
  backdrop_path: string | null;
  results: (
    | {
        adult: boolean;
        backdrop_path: string | null;
        id: number;
        original_language: string;
        overview: string;
        poster_path: string | null;
        genre_ids: number[];
        popularity: number;
        vote_average: number;
        vote_count: number;
      } & (
        | {
            media_type: 'movie';
            title: string;
            original_title: string;
            release_date: string;
            video: boolean;
          }
        | {
            media_type: 'tv';
            first_air_date: string;
            name: string;
            origin_country: string[];
            original_name: string;
          }
      )
  )[];
  comments: Partial<Record<string, string | null>>;
  created_by: {
    avatar_path: string | null;
    gravatar_hash: string;
    id: string;
    name: string;
    username: string;
  };
  description: string;
  id: number;
  iso_3166_1: string;
  iso_639_1: string;
  item_count: number;
  name: string;
  object_ids: Record<string, never>;
  page: number;
  poster_path: string | null;
  public: boolean;
  revenue: number;
  runtime: number;
  sort_by: string;
  total_pages: number;
  total_results: number;
}

export async function v4GetListDetails(
  listId: number
): Promise<ApiResult<v4GetListDetailsRes>> {
  try {
    //TODO: multiple pages
    const response: AxiosResponse<v4GetListDetailsRes> = await api.get(
      `/4/list/${listId}`
    );

    return resultOk(response.data);
  } catch (e) {
    return genericApiError(e, 'v4GetListDetails');
  }
}

export interface v3GetAllListsRes {
  page: number;
  results: {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: string | null;
  }[];
  total_pages: number;
  total_results: number;
}

export async function v3GetAllLists(): Promise<ApiResult<v3GetAllListsRes>> {
  try {
    // TODO: Multiple pages
    // Account ID of 0 in the URL means the account that opened the session is used
    const response = await api.get<v3GetAllListsRes>('/3/account/0/lists');

    return resultOk(response.data);
  } catch (e) {
    return genericApiError(e, 'v3GetAllLists');
  }
}

export interface v4CreateListRes {
  status_message: string;
  id: number;
  success: boolean;
  status_code: number;
}

export async function v4CreateList(
  description: string,
  name: string,
  iso31661: string,
  iso6391: string
): Promise<ApiResult<v4CreateListRes>> {
  try {
    const response = await api.post<v4CreateListRes>('/4/list', {
      description,
      name,
      iso_3166_1: iso31661,
      iso_639_1: iso6391,
      // The API is bugged, the value here does not matter, the list is always create publicly
      public: true,
    });

    return resultOk(response.data);
  } catch (e) {
    return genericApiError(e, 'v4CreateList');
  }
}

export interface v4UpdateListRes {
  success: boolean;
  status_code: number;
  status_message: string;
}

export async function v4UpdateList(
  listId: number,
  description: string | undefined,
  name: string | undefined,
  isPublic: boolean | undefined,
  sortBy: string | undefined
): Promise<ApiResult<v4UpdateListRes>> {
  try {
    const response = await api.put<v4UpdateListRes>(`/4/list/${listId}`, {
      ...(description !== undefined && { description }),
      ...(name !== undefined && { name }),
      ...(isPublic !== undefined && { public: isPublic }),
      ...(sortBy !== undefined && { sort_by: sortBy }),
    });

    return resultOk(response.data);
  } catch (e) {
    return genericApiError(e, 'v4UpdateList');
  }
}
