import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { sleep } from 'src/models/methods';

async function createSession(requestToken: string): Promise<string | null> {
  try {
    // TODO: Check if success
    const response = await api.post('/3/authentication/session/new', {
      request_token: requestToken,
    });
    const data = response.data;

    const sessionId = data['session_id'];
    // TODO: Check this at api level?
    /*if (data['success'] !== 'true' || !sessionId) {
      // TODO: Actual error handling
      console.error('Error while creating new session');
      return;
    }*/

    return sessionId;
  } catch (e) {
    // TODO: Actual error handling
    console.error(e);
  }

  return null;
}

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

      try {
        // TODO: Check if success
        const response = await api.delete('/3/authentication/session', {
          data: {
            session_id: this.sessionId,
          },
        });
        const data = response.data;

        this.sessionId = '';
      } catch (e) {
        // TODO: Actual error handling
        console.error(e);
      }
    },
    async login(): Promise<void> {
      try {
        // TODO: Check if success
        const response = await api.get('/3/authentication/token/new');
        const data = response.data;

        const requestToken = data['request_token'];

        // TODO: Check this at api level?
        /*if (data['success'] !== 'true' || !requestToken) {
          // TODO: Actual error handling
          console.error('Error while acquiring new request token');
          return;
        }*/

        const url = `https://www.themoviedb.org/authenticate/${requestToken}`;
        const authWindow = window.open(url, '_blank');

        // TODO: Actual error handling
        if (!authWindow) return;

        authWindow.focus();

        // TODO: Open modal while waiting
        while (!authWindow.closed) {
          await sleep(2000);
        }

        console.log('window closed');
        const sessionId = await createSession(requestToken);

        // TODO: Actual error handling
        if (!sessionId) return;

        this.sessionId = sessionId;
      } catch (e) {
        // TODO: Actual error handling
        console.error(e);
      }
    },
  },
});
