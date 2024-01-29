<script setup lang="ts">
import MediaCard from 'components/MediaCard.vue';
import { WatchState } from 'src/models/types';
import { computed } from 'vue';
import { useMediaStore } from 'stores/mediaStore';

interface Props {
  watchState: WatchState;
}

const props = defineProps<Props>();

const mediaStore = useMediaStore();

const filteredMedia = computed(() => {
  return mediaStore.allMedia.filter((elem) => {
    return elem.watchState === props.watchState;
  });
});
</script>

<template>
  <q-page class="row items-baseline">
    <media-card v-for="item in filteredMedia" :key="item.key" :media="item" />
  </q-page>
</template>

<style scoped lang="scss"></style>
