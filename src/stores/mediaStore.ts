import { defineStore } from 'pinia';
import { Media, MediaComment } from 'src/models/types';
import { v4GetListDetails, v4UpdateListItems } from 'src/models/tmdbApi';
import { getOrCreateDbList, parseMedia } from 'src/models/methods';
import { useAuthStore } from 'stores/authStore';
import guestSessionMedia from 'src/models/guestSession';

export const useMediaStore = defineStore('media', {
  state: () => ({
    allMedia: {} as Partial<Record<string, Media>>,
    dbListId: undefined as number | undefined,
    numberOfUploads: 0,
  }),
  getters: {},
  actions: {
    async init(): Promise<void> {
      const authStore = useAuthStore();
      // Call init() here because we are outside vue.js code and the init() from app.vue hasn't been called yet
      await authStore.init();

      if (!authStore.loggedIn) {
        this.allMedia = guestSessionMedia;
        return;
      }

      this.dbListId = await getOrCreateDbList();

      if (this.dbListId === undefined) {
        this.allMedia = {};
        return;
      }

      const result = await v4GetListDetails(this.dbListId);

      if (result.success) {
        this.allMedia = parseMedia(result.value);
      } else {
        this.allMedia = {};
      }
    },
    async updateMediaComment(
      media: Media,
      newComment: Partial<MediaComment>
    ): Promise<void> {
      // TODO: Batch multiple edits and send those edits to tmdb after x seconds?

      if (Object.keys(newComment).length === 0) return;

      if (newComment.watchState !== undefined)
        media.watchState = newComment.watchState;

      if (newComment.rating !== undefined) media.rating = newComment.rating;

      if (this.dbListId === undefined) return;

      this.numberOfUploads++;

      await v4UpdateListItems(this.dbListId, [
        {
          media_type: media.mediaType,
          media_id: media.id,
          comment: JSON.stringify({
            watchState: media.watchState,
            rating: media.rating,
          }),
        },
      ]);

      this.numberOfUploads--;
    },
  },
});
