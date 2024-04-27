import { defineStore } from 'pinia';
import { MediaRecord } from 'src/models/types';
import guestSession from 'src/models/guestSession';
import { getMedia, getUserInfo, updateMedia } from 'src/models/backendApi';

// TODO: Complete overhaul

export const useMediaStore = defineStore('media', {
  state: () => ({
    allMedia: {} as MediaRecord,
    numberOfUploads: 0,
  }),
  getters: {},
  actions: {
    async init(): Promise<void> {
      const userInfo = await getUserInfo();

      if (!userInfo.success || !userInfo.value.loggedIn) {
        this.allMedia = guestSession;
        return;
      }

      const media = await getMedia();

      if (!media.success) {
        this.allMedia = guestSession;
        return;
      }

      this.allMedia = media.value;
    },
    async syncToDb(): Promise<void> {
      // TODO: Batch multiple edits and send those edits to backend after x seconds?
      this.numberOfUploads++;

      await updateMedia(this.allMedia);

      this.numberOfUploads--;
    },
  },
});
