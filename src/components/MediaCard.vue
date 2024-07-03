<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
import { Media } from 'src/models/types';

interface Props {
  media: Media;
}

const props = defineProps<Props>();
</script>

<template>
  <router-link
    class="img_wrapper"
    :to="{
      name: 'mediaPage',
      params: { id: props.media.id, mediaType: props.media.mediaType },
    }"
  >
    <ImageWithFallback
      :src="props.media.posterUrl"
      fallback-icon-size="50px"
      class="img_main"
    />

    <div class="img_text flex flex-center">
      <p style="text-align: center">
        {{ props.media.title }} <br />
        ({{ props.media.date.slice(0, 4) }})
      </p>
    </div>
  </router-link>
</template>

<!-- TODO: Complete style overhaul, don't specify size or margin in here, specify where MediaCard is used -->
<style scoped lang="scss">
@import 'src/css/quasar.variables';

$width: 12rem;
$height: 18rem;
$border-radius: 5px;
$transition-duration: 0.2s;
$background-color: rgba($dark, 0.75);
$text-color: #fff;

.img_wrapper {
  width: $width;
  height: $height;
  margin: 1rem;
  position: relative;

  &:hover .img_text {
    visibility: visible;
    opacity: 1;
  }
}

.img_main,
.img_text {
  width: $width;
  height: $height;
  border-radius: $border-radius;
}

.img_text {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: $background-color;
  color: $text-color;

  visibility: hidden;
  opacity: 0;

  transition:
    opacity $transition-duration,
    visibility $transition-duration;
}
</style>
