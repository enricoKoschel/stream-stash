<script setup lang="ts">
import { MediaType } from 'src/models/types';
import ImageWithFallback from 'components/ImageWithFallback.vue';
import { constructMediaKey } from 'src/models/methods';
import { useMediaStore } from 'stores/mediaStore';

interface Props {
  id: number;
  mediaType: MediaType;
}

const props = defineProps<Props>();

const mediaStore = await useMediaStore();

// Media definitely exists because of the route guard in routes.ts
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const media = mediaStore.getMediaByKey(
  constructMediaKey(props.mediaType, props.id)
)!;

function ratingColor(star: number): string {
  return media.rating >= star ? 'blue' : 'white';
}

function ratingClicked(star: number): void {
  if (media.rating === star) {
    media.rating = 0;
  } else {
    media.rating = star;
  }
}
</script>

<template>
  <q-page class="row">
    <ImageWithFallback
      :src="media.backdropUrl"
      fallback-icon-size="300px"
      style="position: absolute; z-index: -1; opacity: 10%; height: 100%"
    />

    <div class="offset-2" style="width: 12rem; height: 18rem; margin-top: 5vh">
      <ImageWithFallback
        :src="media.posterUrl"
        fallback-icon-size="50px"
        style="border-radius: 5px; width: 12rem"
      />

      <div class="row justify-center" style="margin-top: 1rem">
        <q-btn
          v-for="i in 3"
          :key="i"
          icon="star"
          :color="ratingColor(i)"
          flat
          style="max-width: calc(12rem / 3); flex-grow: 1"
          @click="ratingClicked(i)"
        />
      </div>
    </div>

    <div style="width: 65%; margin-top: 10vh; margin-left: 2vw">
      <p class="text-h6">
        {{ media.title }}
        <span style="opacity: 50%; font-size: 80%; margin-left: 0.3rem">
          {{ media.date.slice(0, 4) }}
        </span>
      </p>
      <p>{{ media.overview }}</p>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
