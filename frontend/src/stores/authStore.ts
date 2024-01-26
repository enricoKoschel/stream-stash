import { defineStore } from 'pinia';
import {
  wwwAuthenticateToken,
  v3CreateSession,
  v3deleteSession,
  v3NewToken,
} from 'src/models/tmdbApi';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionId: '',
  }),
  getters: {
    loggedIn(state): boolean {
      return state.sessionId.length !== 0;
    },
  },
  actions: {
    async logout(): Promise<void> {
      if (!this.loggedIn) return;

      // sessionId should be cleared, regardless of if the deletion succeeded
      await v3deleteSession(this.sessionId);

      this.sessionId = '';
    },
    async login(): Promise<void> {
      const newTokenResult = await v3NewToken();
      if (!newTokenResult.success) return;

      const requestToken = newTokenResult.value.request_token;

      const windowOpened = await wwwAuthenticateToken(requestToken);
      if (!windowOpened) return;

      const createSessionResult = await v3CreateSession(requestToken);
      if (!createSessionResult.success) return;

      this.sessionId = createSessionResult.value.session_id;
    },
  },
});
