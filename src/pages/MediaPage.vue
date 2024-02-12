<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
import {
  Media,
  MediaHistory,
  WatchState,
  watchStateArray,
} from 'src/models/types';
import { useMediaStore } from 'stores/mediaStore';
import { capitalizeFirstLetter } from 'src/models/methods';

// Typescript can not resolve defineModel() for some reason
// eslint-disable-next-line no-undef
const model = defineModel<Media>('media', { required: true });

const mediaStore = useMediaStore();

const media = model.value;

function ratingColor(star: number, item: MediaHistory): string {
  return item.rating >= star ? 'blue' : 'white';
}

async function ratingClicked(star: number, item: MediaHistory): Promise<void> {
  if (item.rating === star) {
    item.rating = 0;
  } else {
    item.rating = star;
  }

  await mediaStore.syncToDb(media);
}

async function watchStateChanged(watchState: WatchState): Promise<void> {
  media.watchState = watchState;

  await mediaStore.syncToDb(media);
}

async function addHistory(): Promise<void> {
  const id = Object.keys(media.history).length;

  if (media.mediaType === 'tv') {
    media.history[id] = {
      rating: 0,
      startDate: '',
      endDate: '',
      name: '',
    };
  } else {
    media.history[id] = {
      rating: 0,
      watchDate: '',
    };
  }

  await mediaStore.syncToDb(media);
}
</script>

<template>
  <q-page>
    <ImageWithFallback
      :src="media.backdropUrl"
      fallback-icon-size="300px"
      style="position: absolute; z-index: -1; opacity: 10%; height: 100%"
    />

    <div class="row">
      <div class="offset-2" style="margin-top: 5vh">
        <ImageWithFallback
          :src="media.posterUrl"
          fallback-icon-size="50px"
          style="border-radius: 5px; width: 12rem; height: 18rem"
        />

        <q-select
          dense
          item-aligned
          hide-dropdown-icon
          popup-content-style="text-align: center;"
          :option-label="capitalizeFirstLetter"
          :model-value="media.watchState"
          :options="watchStateArray"
          style="
            font-size: 1.2rem;
            width: 12rem;
            padding-left: 0;
            padding-right: 0;
          "
          @update:model-value="watchStateChanged"
        >
          <template #selected>
            <span class="flex justify-center" style="width: 100%">
              {{ capitalizeFirstLetter(media.watchState) }}
            </span>
          </template>
        </q-select>
      </div>

      <div style="width: 65%; margin-top: 10vh; margin-left: 2vw">
        <p class="text-h6" style="margin: 0">
          {{ media.title }}
          <span style="opacity: 50%; font-size: 80%; margin-left: 0.3rem">
            {{ media.date.slice(0, 4) }}
          </span>
        </p>

        <p>{{ media.overview }}</p>
      </div>
    </div>

    <div class="row" style="margin-top: 5vh">
      <div
        class="offset-4"
        style="overflow-y: auto; overflow-x: hidden; height: 450px"
      >
        <q-card style="width: 40rem; margin: 1rem">
          <q-btn
            icon="add"
            flat
            style="width: 100%; height: 100%"
            @click="addHistory()"
          />
        </q-card>

        <q-card
          v-for="item in media.history"
          :key="item"
          style="width: 40rem; margin: 1rem"
        >
          <q-card-section class="text-h6">{{ item }}</q-card-section>

          <q-card-section
            style="display: flex; justify-content: space-between; width: 150px"
          >
            <q-btn
              v-for="star in 5"
              :key="star"
              icon="star"
              :color="ratingColor(star, item)"
              flat
              size="0.8rem"
              style="padding: 0"
              @click="ratingClicked(star, item)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
