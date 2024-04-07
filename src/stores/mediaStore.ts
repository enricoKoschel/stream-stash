import { defineStore } from 'pinia';
import { Media } from 'src/models/types';
import { sleep } from 'src/models/methods';
import guestSession from 'src/models/guestSession';

// TODO: Complete overhaul

export const useMediaStore = defineStore('media', {
  state: () => ({
    allMedia: {} as Partial<Record<string, Media>>,
    numberOfUploads: 0,
  }),
  getters: {},
  actions: {
    async init(): Promise<void> {
      this.allMedia = guestSession;
      await sleep(1);
    },
    async syncToDb(media: Media): Promise<void> {
      // TODO: Batch multiple edits and send those edits to tmdb after x seconds?

      void media;

      this.numberOfUploads++;

      await sleep(1);

      this.numberOfUploads--;
    },
  },
});
