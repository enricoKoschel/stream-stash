<template>
  <q-page class="row items-baseline">
    <media-card v-for="item in media" :key="item.title" v-bind="item" />
  </q-page>
</template>

<script setup lang="ts">
import MediaCard from 'components/MediaCard.vue';

const media = [
  {
    title: 'Harry Potter',
    imageUrl:
      'https://m.media-amazon.com/images/I/51TFQYub8mL._AC_UF894,1000_QL80_.jpg',
  },
  {
    title: 'Indiana Jones',
    imageUrl: 'https://media1.jpc.de/image/w1155/front/0/4010884528381.jpg',
  },
  {
    title: 'Breaking Bad',
    imageUrl:
      'https://m.media-amazon.com/images/I/81CblaI0DuL._AC_UF894,1000_QL80_.jpg',
  },
  {
    title: 'Attack on Titan',
    imageUrl:
      'https://m.media-amazon.com/images/I/611RuT7PJ1L._AC_UF1000,1000_QL80_.jpg',
  },
];
</script>
