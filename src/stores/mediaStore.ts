import { defineStore } from 'pinia';
import { Media } from 'src/models/types';
import { v4GetListDetails } from 'src/models/tmdbApi';
import { parseMedia } from 'src/models/methods';
import { useAuthStore } from 'stores/authStore';
import guestSessionMedia from 'src/models/guestSession';

export const useMediaStore = defineStore('media', {
  state: () => ({
    allMedia: {} as Partial<Record<string, Media>>,
  }),
  getters: {},
  actions: {
    async init(): Promise<void> {
      const authStore = useAuthStore();
      // Call init() here because we are outside vue.js code and the init() from app.vue hasn't been called yet
      authStore.init();

      if (!authStore.loggedIn) {
        this.allMedia = guestSessionMedia;
        return;
      }

      // TODO: Get/create list from logged in user
      const result = await v4GetListDetails(8286408);

      if (result.success) {
        this.allMedia = parseMedia(result.value);
      } else {
        this.allMedia = {};
      }
    },
  },
});
