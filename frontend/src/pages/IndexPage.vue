<template>
  <q-page class="row items-baseline">
    <media-card v-for="item in media" :key="item.title" v-bind="item" />
  </q-page>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import MediaCard from 'components/MediaCard.vue';

const media = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    year: 2001,
    imageUrl:
      'https://m.media-amazon.com/images/I/51TFQYub8mL._AC_UF894,1000_QL80_.jpg',
  },
  {
    title: 'Raiders of the Lost Ark',
    year: 1981,
    imageUrl:
      'https://c8.alamy.com/compde/ryj00r/harrison-ford-dvd-cover-indiana-jones-und-die-jager-des-verlorenen-schatzes-1981-ryj00r.jpg',
  },
  {
    title: 'Breaking Bad',
    year: 2008,
    imageUrl:
      'https://m.media-amazon.com/images/I/81CblaI0DuL._AC_UF894,1000_QL80_.jpg',
  },
  {
    title: 'Attack on Titan',
    year: 2013,
    imageUrl:
      'https://m.media-amazon.com/images/I/611RuT7PJ1L._AC_UF1000,1000_QL80_.jpg',
  },
];
</script>
