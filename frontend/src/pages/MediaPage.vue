<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
import { Media } from 'src/models/types';

// Typescript can not resolve defineModel() for some reason
// eslint-disable-next-line no-undef
const model = defineModel<Media>('media', { required: true });

function ratingColor(star: number): string {
  return model.value.rating >= star ? 'blue' : 'white';
}

function ratingClicked(star: number): void {
  if (model.value.rating === star) {
    model.value.rating = 0;
  } else {
    model.value.rating = star;
  }
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

      <div class="row justify-center" style="margin-top: 1rem">
        <q-btn
          v-for="i in 5"
          :key="i"
          icon="star"
          :color="ratingColor(i)"
          flat
          style="max-width: calc(12rem / 5); flex-grow: 1"
          @click="ratingClicked(i)"
        />
      </div>
    </div>

    <div style="width: 65%; margin-top: 10vh; margin-left: 2vw">
      <p class="text-h6">
        {{ model.title }}
        <span style="opacity: 50%; font-size: 80%; margin-left: 0.3rem">
          {{ model.date.slice(0, 4) }}
        </span>
      </p>
      <p>{{ model.overview }}</p>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
