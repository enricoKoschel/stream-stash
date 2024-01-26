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

interface v3CreateSessionRes {
  session_id: string;
}

export async function v3CreateSession(
  requestToken: string
): Promise<ApiResult<v3CreateSessionRes>> {
  try {
    const response = await api.post<v3CreateSessionRes>(
      '/3/authentication/session/new',
      {
        request_token: requestToken,
      }
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

interface v3NewTokenRes {
  expires_at: string;
  request_token: string;
}

export async function v3NewToken(): Promise<ApiResult<v3NewTokenRes>> {
  try {
    const response = await api.get<v3NewTokenRes>(
      '/3/authentication/token/new'
    );

    return resultOk(response.data);
  } catch (e) {
    const error = ensureError(e);

    // TODO: Better error message
    createErrorDialog('v3NewToken - ' + error.toString());

    return resultErr(error);
  }
}

export async function wwwAuthenticateToken(
  requestToken: string
): Promise<boolean> {
  const url = `https://www.themoviedb.org/authenticate/${requestToken}`;
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

// Empty response
type v3deleteSessionRes = Record<string, never>;

export async function v3deleteSession(
  sessionId: string
): Promise<ApiResult<v3deleteSessionRes>> {
  try {
    const response = await api.delete<v3deleteSessionRes>(
      '/3/authentication/session',
      {
        data: {
          session_id: sessionId,
        },
      }
    );

    return resultOk(response.data);
  } catch (e) {
    const error = ensureError(e);

    // TODO: Better error message
    createErrorDialog('v3deleteSession - ' + error.toString());

    return resultErr(error);
  }
}
