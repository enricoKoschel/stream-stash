<script setup lang="ts">
import { MediaType } from 'src/models/types';
import { api } from 'boot/axios';

interface Props {
  id: number;
  mediaType: MediaType;
}

const props = defineProps<Props>();

let details, comments;
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
} catch (e) {
  console.error(e);
}
</script>

<template>
  <p>Details: {{ details }}</p>
  <br />
  <p>Comments: {{ comments }}</p>
</template>

<style scoped lang="scss"></style>
