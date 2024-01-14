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

function likeColor(btn: 'like' | 'dislike') {
  return comments.value['like_state'] === btn ? 'blue' : 'white';
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
        style="border-radius: 5px"
      />

      <div class="row justify-center" style="margin-top: 1rem">
        <q-btn
          icon="thumb_up"
          :color="likeColor('like')"
          flat
          style="width: 4rem"
          @click="comments['like_state'] = 'like'"
        />
        <q-btn
          icon="thumb_down"
          :color="likeColor('dislike')"
          flat
          style="width: 4rem"
          @click="comments['like_state'] = 'dislike'"
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
