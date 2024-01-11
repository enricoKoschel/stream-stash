<script setup lang="ts">
interface Props {
  title: string;
  year: number;
  imageUrl: string;
}

const props = defineProps<Props>();

function showClickAlert() {
  alert(`Clicked on ${props.title}`);
}
</script>

<template>
  <div class="img_wrapper cursor-pointer" @click="showClickAlert()">
    <q-img :src="imageUrl" class="img_main">
      <template #error>
        <!-- TODO: Actual error image -->
        <q-img src="public/favicon.ico" class="img_main" />
      </template>
    </q-img>

    <div class="img_text flex items-center justify-center" style="">
      <p style="text-align: center">
        {{ title }} <br />
        ({{ year }})
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

$width: 8rem;
$height: 12rem;
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

  transition: opacity $transition-duration, visibility $transition-duration;
}
</style>
