import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { useAuthStore } from 'stores/authStore';
import axiosRateLimit from 'axios-rate-limit';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axiosRateLimit(
  axios.create({
    baseURL: 'https://api.themoviedb.org',
    headers: {
      Accept: 'application/json',
    },
  }),
  { maxRPS: 5 }
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
  }
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

api.interceptors.request.use(async function (config) {
  config.headers.Authorization = `Bearer ${
    process.env.TMDB_ACCESS_TOKEN ?? ''
  }`;

  try {
    const authStore = useAuthStore();
    // Call init() here because we are outside vue.js code and the init() from app.vue hasn't been called yet
    authStore.init();

    if (authStore.loggedIn) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
  } catch (e) {
    /* empty */
  }

  return config;
});

const posterUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
const backdropUrl = 'https://image.tmdb.org/t/p/w1920_and_h1080_bestv2';

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, posterUrl, backdropUrl };
