<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
import { Media } from 'src/models/types';
import { useMediaStore } from 'src/stores/mediaStore';

interface Props {
  media: Media;
}

defineProps<Props>();

const mediaStore = useMediaStore();

async function addToStash(media: Media): Promise<void> {
  mediaStore.allMedia[media.key] = {
    ...media,
    watchState: 'planning',
    history: [],
  };

  await mediaStore.syncToDb();
}

function isInStash(key: string): boolean {
  return mediaStore.allMedia[key] !== undefined;
}
</script>

<template>
  <q-card>
    <q-card-section class="row">
      <ImageWithFallback
        :src="media.posterUrl"
        fallback-icon-size="50px"
        style="width: 8em; height: 12em"
        class="q-mr-md"
      />

      <div class="col column">
        <div class="col-3">
          <p class="text-h6" style="margin: 0">
            {{ media.title }}
            <span style="opacity: 50%; font-size: 80%; margin-left: 0.3rem">
              {{ media.date.slice(0, 4) }}
            </span>
          </p>
        </div>

        <div class="ellipsis-3-lines">
          {{ media.overview }}
        </div>
      </div>

      <div class="col-2 flex flex-center">
        <q-btn v-if="!isInStash(media.key)" @click="addToStash(media)">
          + Add to Stash
        </q-btn>
        <q-btn
          v-else
          :to="{
            name: 'mediaPage',
            params: { id: media.id, mediaType: media.mediaType },
          }"
        >
          Show Details
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped lang="scss"></style>
