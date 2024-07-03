<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
import { Media } from 'src/models/types';

interface Props {
  media: Media;
}

const props = defineProps<Props>();
</script>

<template>
  <q-card>
    <q-card-section class="row">
      <ImageWithFallback
        :src="props.media.posterUrl"
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

        <div class="ellipsis-3-lines" style="-webkit-line-clamp: 5">
          {{ media.overview }}
        </div>
      </div>

      <div class="col-2 flex flex-center">
        <!-- TODO: When media is already in stash or after pressing, change to "Open details" button that opens media page -->
        <q-btn>+ Add to Stash</q-btn>
      </div>
    </q-card-section>
  </q-card>

  <!-- <router-link
    class="img_wrapper"
    :to="{
      name: 'mediaPage',
      params: { id: props.media.id, mediaType: props.media.mediaType },
    }"
  >
    <div class="img_text flex flex-center" style="">
      <p style="text-align: center">
        {{ props.media.title }} <br />
        ({{ props.media.date.slice(0, 4) }})
      </p>
    </div>
  </router-link> -->
</template>

<style scoped lang="scss"></style>
