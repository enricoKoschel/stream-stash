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

// TODO: Show unwatched seasons of watched shows in planning
// TODO: Add sort by option (a-z, z-a, newest added, oldest added, newest released, oldest released, newest watched, oldest watched)
</script>

<template>
  <q-page class="row">
    <template v-if="filteredMedia.length > 0">
      <!-- FIXME: Gap between rows -->
      <MediaCard v-for="item in filteredMedia" :key="item.key" :media="item" />
    </template>
    <div v-else class="flex justify-center" style="width: 100%; margin-top: 1%">
      <div class="text-h5">No media in {{ props.watchState }}</div>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
