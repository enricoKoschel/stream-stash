<script setup lang="ts">
import MediaCard from 'components/MediaCard.vue';
import { api, posterUrl } from 'boot/axios';
import { MediaType, WatchState } from 'src/models/types';
import { computed } from 'vue';

interface Props {
  watchState: WatchState;
}

const props = defineProps<Props>();

const media: {
  id: number;
  mediaType: MediaType;
  title: string;
  year: number;
  posterUrl: string;
  watchState: WatchState;
}[] = [];

try {
  // TODO: Get/create list from logged in user
  const response = await api.get('/4/list/8286408');
  const data = response.data;

  for (const item of data.results) {
    const comments = JSON.parse(
      data['comments'][`${item['media_type']}:${item['id']}`] || '{}'
    );

    media.push({
      id: item['id'],
      mediaType: item['media_type'],
      title: item['name'] || item['title'],
      year: parseInt(
        (item['first_air_date'] || item['release_date']).slice(0, 4)
      ),
      posterUrl: `${posterUrl}/${item['poster_path']}`,
      watchState: comments['watch_state'],
    });
  }
} catch (e) {
  console.error(e);
}

const filteredMedia = computed(() => {
  return media.filter((elem) => {
    return elem.watchState === props.watchState;
  });
});
</script>

<template>
  <q-page class="row items-baseline">
    <media-card v-for="item in filteredMedia" :key="item.title" v-bind="item" />
  </q-page>
</template>

<style scoped lang="scss"></style>
