<script setup lang="ts">
import MediaCard from 'components/MediaCard.vue';
import { api, imageUrl } from 'boot/axios';

const media: { title: string; year: number; imageUrl: string }[] = [];

try {
  // TODO: Get/create list from logged in user
  const response = await api.get('/4/list/8286408');
  const data = response.data;

  for (const item of data.results) {
    const commentIndex = `${item['media_type']}:${item['id']}`;
    const comments = JSON.parse(data.comments[commentIndex]);
    console.log(comments);

    media.push({
      title: item['name'] || item['title'],
      year: parseInt(
        (item['first_air_date'] || item['release_date']).slice(0, 4)
      ),
      imageUrl: `${imageUrl}/${item['poster_path']}`,
    });
  }
} catch (e) {
  console.error(e);
}
</script>

<template>
  <q-page class="row items-baseline">
    <media-card v-for="item in media" :key="item.title" v-bind="item" />
  </q-page>
</template>

<style scoped lang="scss"></style>
