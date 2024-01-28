import { defineStore } from 'pinia';
import { Media } from 'src/models/types';
import { v4GetListDetails } from 'src/models/tmdbApi';
import { parseMedia } from 'src/models/methods';

interface State {
  allMedia: Media[];
}

async function init(): Promise<State> {
  const state: State = {
    allMedia: [],
  };

  // TODO: Get/create list from logged in user
  const result = await v4GetListDetails(8286408);

  if (result.success) {
    state.allMedia = parseMedia(result.value);
  }

  return state;
}

export const useMediaStore = async () => {
  const useInnerMediaStore = defineStore('media', {
    state: () => ({
      allMedia: [] as Media[],
    }),
    getters: {},
    actions: {
      getMediaByKey(key: string): Media | undefined {
        return this.allMedia.find((elem) => elem.key === key);
      },
      mediaKeyExists(key: string): boolean {
        return this.getMediaByKey(key) !== undefined;
      },
    },
  });

  const store = useInnerMediaStore();

  const state = await init();
  store.allMedia = state.allMedia;

  return store;
};
