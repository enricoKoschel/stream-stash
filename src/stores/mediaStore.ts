import { defineStore } from 'pinia';
import { Media } from 'src/models/types';
import { v4GetListDetails } from 'src/models/tmdbApi';
import { parseMedia } from 'src/models/methods';

export const useMediaStore = defineStore('media', {
  state: () => ({
    allMedia: {} as Partial<Record<string, Media>>,
  }),
  getters: {},
  actions: {
    async init(): Promise<void> {
      // TODO: Get/create list from logged in user
      const result = await v4GetListDetails(8286408);

      if (result.success) {
        this.allMedia = parseMedia(result.value);
      }
    },
  },
});
