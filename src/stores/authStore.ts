import { defineStore } from 'pinia';
import {
  v3GetUserDetails,
  v4DeleteAccessToken,
  v4NewAccessToken,
  v4NewRequestToken,
  wwwAuthenticateV4RequestToken,
} from 'src/models/tmdbApi';
import { LocalStorage } from 'quasar';
import { resetApp } from 'src/models/methods';
import { useMediaStore } from 'stores/mediaStore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
    username: '',
  }),
  getters: {
    loggedIn(state): boolean {
      return state.accessToken.length !== 0;
    },
  },
  actions: {
    async init(noApi = false): Promise<void> {
      const accessToken = LocalStorage.getItem<string>('accessToken');

      if (
        accessToken &&
        accessToken !== 'undefined' &&
        accessToken !== 'null'
      ) {
        this.accessToken = accessToken;

        if (noApi) return;

        const result = await v3GetUserDetails();

        this.username = result.success ? result.value.username : '';
      } else {
        this.accessToken = '';
      }
    },
    async logout(): Promise<void> {
      if (!this.loggedIn) return;

      await v4DeleteAccessToken(this.accessToken);

      this.accessToken = '';

      const mediaStore = useMediaStore();
      mediaStore.dbListId = undefined;

      await resetApp();
    },
    async login(): Promise<void> {
      const newRequestTokenResult = await v4NewRequestToken();
      if (!newRequestTokenResult.success) return;

      const requestToken = newRequestTokenResult.value.request_token;

      const windowOpened = await wwwAuthenticateV4RequestToken(requestToken);
      if (!windowOpened) return;

      const newAccessTokenResult = await v4NewAccessToken(requestToken);
      if (!newAccessTokenResult.success) return;

      this.accessToken = newAccessTokenResult.value.access_token;

      await resetApp();
    },
  },
});
