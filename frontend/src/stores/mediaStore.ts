import { defineStore } from 'pinia';
import { Media } from 'src/models/types';
import { v4GetListDetails } from 'src/models/tmdbApi';
import { parseMedia } from 'src/models/methods';

export const useMediaStore = defineStore('media', {
  state: () => ({
    allMedia: [] as Media[],
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
    getMediaByKey(key: string): Media | undefined {
      return this.allMedia.find((elem) => elem.key === key);
    },
    mediaKeyExists(key: string): boolean {
      return this.getMediaByKey(key) !== undefined;
    },
  },
});
