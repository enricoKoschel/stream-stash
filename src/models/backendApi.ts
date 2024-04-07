import { BaseError, Result, UserInfo } from 'src/models/types';
import {
  createErrorDialog,
  ensureError,
  resultErr,
  resultOk,
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
    username: string;
  }

  try {
    const response = await api.get<Response>('/v1/userInfo');

    if (response.data.logged_in) {
      return resultOk({ loggedIn: true, username: response.data.username });
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
