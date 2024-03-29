import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRateLimit from 'axios-rate-limit';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const backendUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.stream-stash.com'
    : 'http://localhost:8080';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axiosRateLimit(
  axios.create({
    baseURL: backendUrl,
    headers: {
      Accept: 'application/json',
    },
    withCredentials: true,
  }),
  { maxRPS: 2 },
);

let rateLimited = false;

api.interceptors.response.use(
  function (response) {
    // Any status codes that lie within the range of 2xx cause this function to trigger
    return response;
  },
  function (error: AxiosError) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger

    if (error.response?.status === 429) {
      // TMDB API is rate limiting us, disable request for a few seconds
      rateLimited = true;

      setTimeout(() => {
        rateLimited = false;
      }, 5000);
    }

    return Promise.reject(error);
  },
);

api.interceptors.request.use(function (config) {
  const controller = new AbortController();

  if (rateLimited) {
    controller.abort();
  }

  return {
    ...config,
    signal: controller.signal,
  };
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
