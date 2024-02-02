<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
import { Media, WatchState, watchStateArray } from 'src/models/types';
import { useMediaStore } from 'stores/mediaStore';
import { capitalizeFirstLetter } from 'src/models/methods';

// Typescript can not resolve defineModel() for some reason
// eslint-disable-next-line no-undef
const model = defineModel<Media>('media', { required: true });

const mediaStore = useMediaStore();

function ratingColor(star: number): string {
  return model.value.rating >= star ? 'blue' : 'white';
}

async function ratingClicked(star: number): Promise<void> {
  if (model.value.rating === star) {
    await mediaStore.updateMediaComment(model.value, { rating: 0 });
  } else {
    await mediaStore.updateMediaComment(model.value, { rating: star });
  }
}

async function watchStateChanged(watchState: WatchState): Promise<void> {
  await mediaStore.updateMediaComment(model.value, {
    watchState,
  });
}
</script>

<template>
  <q-page class="row">
    <ImageWithFallback
      :src="model.backdropUrl"
      fallback-icon-size="300px"
      style="position: absolute; z-index: -1; opacity: 10%; height: 100%"
    />

    <div class="offset-2" style="width: 12rem; height: 18rem; margin-top: 5vh">
      <ImageWithFallback
        :src="model.posterUrl"
        fallback-icon-size="50px"
        style="border-radius: 5px; width: 12rem"
      />

      <q-select
        dense
        item-aligned
        hide-dropdown-icon
        popup-content-style="text-align: center;"
        :option-label="capitalizeFirstLetter"
        :model-value="model.watchState"
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
            {{ capitalizeFirstLetter(model.watchState) }}
          </span>
        </template>
      </q-select>
    </div>

    <div style="width: 65%; margin-top: 10vh; margin-left: 2vw">
      <p class="text-h6" style="margin: 0">
        {{ model.title }}
        <span style="opacity: 50%; font-size: 80%; margin-left: 0.3rem">
          {{ model.date.slice(0, 4) }}
        </span>
      </p>

      <div
        style="
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          width: 130px;
        "
      >
        <q-btn
          v-for="i in 5"
          :key="i"
          icon="star"
          :color="ratingColor(i)"
          flat
          size="0.8rem"
          style="padding: 0"
          @click="ratingClicked(i)"
        />
      </div>

      <p>{{ model.overview }}</p>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
