import { BaseError, Result } from 'src/models/types';
import { api } from 'boot/axios';
import {
  createErrorDialog,
  ensureError,
  resultErr,
  resultOk,
  sleep,
} from 'src/models/methods';

type ApiResult<T> = Result<T, BaseError>;

interface v4NewRequestTokenRes {
  request_token: string;
  status_code: number;
  status_message: string;
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
    const error = ensureError(e);

    // TODO: Better error message
    createErrorDialog('v4NewRequestToken - ' + error.toString());

    return resultErr(error);
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

  // TODO: Open dialog while waiting
  while (!authWindow.closed) {
    await sleep(2000);
  }

  return true;
}

interface v4NewAccessTokenRes {
  access_token: string;
  account_id: string;
  status_code: number;
  status_message: string;
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

interface v4DeleteAccessTokenRes {
  access_token: string;
  account_id: string;
  status_code: number;
  status_message: string;
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
    const error = ensureError(e);

    // TODO: Better error message
    createErrorDialog('v4DeleteAccessToken - ' + error.toString());

    return resultErr(error);
  }
}
