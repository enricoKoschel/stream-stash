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

const DEFAULT_USERNAME = '[No username set]';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    data: undefined as
      | undefined
      | {
          accessToken: string;
          username: string;
        },
  }),
  getters: {},
  actions: {
    async init(noApi = false): Promise<void> {
      const accessToken = LocalStorage.getItem<string>('accessToken');

      if (
        accessToken &&
        accessToken !== 'undefined' &&
        accessToken !== 'null'
      ) {
        this.data = { accessToken, username: DEFAULT_USERNAME };

        if (noApi) return;

        const result = await v3GetUserDetails();

        if (result.success) {
          this.data.username = result.value.username;
        }
      } else {
        this.data = undefined;
      }
    },
    async logout(): Promise<void> {
      if (this.data === undefined) return;

      await v4DeleteAccessToken(this.data.accessToken);

      this.data = undefined;

      const mediaStore = useMediaStore();
      mediaStore.dbListId = undefined;

      await resetApp();
    },
    async login(): Promise<void> {
      if (this.data !== undefined) return;

      const newRequestTokenResult = await v4NewRequestToken();
      if (!newRequestTokenResult.success) return;

      const requestToken = newRequestTokenResult.value.request_token;

      const windowOpened = await wwwAuthenticateV4RequestToken(requestToken);
      if (!windowOpened) return;

      const newAccessTokenResult = await v4NewAccessToken(requestToken);
      if (!newAccessTokenResult.success) return;

      this.data = {
        accessToken: newAccessTokenResult.value.access_token,
        username: DEFAULT_USERNAME,
      };

      const result = await v3GetUserDetails();

      if (result.success) {
        this.data.username = result.value.username;
      }

      await resetApp();
    },
  },
});
