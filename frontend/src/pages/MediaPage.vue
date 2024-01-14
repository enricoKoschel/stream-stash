<script setup lang="ts">
import { MediaType } from 'src/models/types';
import { api, backdropUrl } from 'boot/axios';
import ImageWithFallback from 'components/ImageWithFallback.vue';

interface Props {
  id: number;
  mediaType: MediaType;
}

const props = defineProps<Props>();

let details, comments, fullBackdropUrl;
try {
  // TODO: Get/create list from logged in user
  const response = await api.get('/4/list/8286408');
  const data = response.data;

  details = data['results'].find(
    (elem: { [x: string]: string }) =>
      Number(elem['id']) === props.id && elem['media_type'] === props.mediaType
  );
  comments = JSON.parse(
    data['comments'][`${props.mediaType}:${props.id}`] || '{}'
  );
  fullBackdropUrl = `${backdropUrl}/${details['backdrop_path']}`;
} catch (e) {
  console.error(e);
}
</script>

<template>
  <q-page class="row items-baseline">
    <ImageWithFallback
      :src="fullBackdropUrl"
      fallback-icon-size="300px"
      style="position: absolute; z-index: -1; opacity: 10%"
    />

    <p>Details: {{ details }}</p>
    <br />
    <p>Comments: {{ comments }}</p>
  </q-page>
</template>

<style scoped lang="scss"></style>
