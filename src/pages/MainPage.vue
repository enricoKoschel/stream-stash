<script setup lang="ts">
import MediaCard from 'components/MediaCard.vue';
import { Media, WatchState } from 'src/models/types';
import { computed, ComputedRef } from 'vue';
import { useMediaStore } from 'stores/mediaStore';

interface Props {
  watchState: WatchState;
}

const props = defineProps<Props>();

const mediaStore = useMediaStore();

const filteredMedia: ComputedRef<Media[]> = computed(() => {
  // as Media[] is safe because of the check for elem in filter()
  return Object.values(mediaStore.allMedia).filter((elem) => {
    return elem && elem.watchState === props.watchState;
  }) as Media[];
});
</script>

<template>
  <q-page class="row items-baseline">
    <media-card v-for="item in filteredMedia" :key="item.key" :media="item" />
  </q-page>
</template>

<style scoped lang="scss"></style>
