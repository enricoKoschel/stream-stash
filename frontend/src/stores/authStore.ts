import { defineStore } from 'pinia';
import {
  v4DeleteAccessToken,
  v4NewAccessToken,
  v4NewRequestToken,
  wwwAuthenticateV4RequestToken,
} from 'src/models/tmdbApi';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '',
  }),
  getters: {
    loggedIn(state): boolean {
      return state.accessToken.length !== 0;
    },
  },
  actions: {
    async logout(): Promise<void> {
      if (!this.loggedIn) return;

      await v4DeleteAccessToken(this.accessToken);

      this.accessToken = '';
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
    },
  },
});
