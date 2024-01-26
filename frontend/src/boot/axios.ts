import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from 'stores/authStore';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: 'https://api.themoviedb.org',
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${process.env.TMDB_ACCESS_TOKEN}`;

  try {
    const authStore = useAuthStore();

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
