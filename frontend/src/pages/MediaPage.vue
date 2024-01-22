<script setup lang="ts">
import { MediaType } from 'src/models/types';
import { api, posterUrl, backdropUrl } from 'boot/axios';
import ImageWithFallback from 'components/ImageWithFallback.vue';
import { Ref, ref } from 'vue';

interface Props {
  id: number;
  mediaType: MediaType;
}

const props = defineProps<Props>();

let details,
  comments: Ref<{ [x: string]: string }>,
  fullPosterUrl,
  fullBackdropUrl,
  releaseYear;
try {
  // TODO: Get/create list from logged in user
  const response = await api.get('/4/list/8286408');
  const data = response.data;

  details = data['results'].find(
    (elem: { [x: string]: string }) =>
      Number(elem['id']) === props.id && elem['media_type'] === props.mediaType
  );
  comments = ref(
    JSON.parse(data['comments'][`${props.mediaType}:${props.id}`] || '{}')
  );

  fullPosterUrl = `${posterUrl}/${details['poster_path']}`;
  fullBackdropUrl = `${backdropUrl}/${details['backdrop_path']}`;

  releaseYear = Number(
    (details['first_air_date'] || details['release_date']).slice(0, 4)
  );
} catch (e) {
  console.error(e);
}

function ratingColor(star: number) {
  return Number(comments.value['rating']) >= star ? 'blue' : 'white';
}

function ratingClicked(star: number) {
  const starStr = String(star);
  if (comments.value['rating'] === starStr) {
    comments.value['rating'] = '';
  } else {
    comments.value['rating'] = starStr;
  }
}
</script>

<template>
  <q-page class="row">
    <ImageWithFallback
      :src="fullBackdropUrl"
      fallback-icon-size="300px"
      style="position: absolute; z-index: -1; opacity: 10%; height: 100%"
    />

    <div class="offset-2" style="width: 12rem; height: 18rem; margin-top: 5vh">
      <ImageWithFallback
        :src="fullPosterUrl"
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
        {{ details['name'] }}
        <span style="opacity: 50%; font-size: 80%; margin-left: 0.3rem">
          {{ releaseYear }}
        </span>
      </p>
      <p>{{ details['overview'] }}</p>
    </div>

    <!--    <p>Details: {{ details }}</p>
    <br />
    <p>Comments: {{ comments }}</p>-->
  </q-page>
</template>

<style scoped lang="scss"></style>
