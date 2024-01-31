<script setup lang="ts">
import BrokenImage from 'components/BrokenImage.vue';

interface Props {
  src: string | undefined;
  fallbackIconSize: string;
}

const props = defineProps<Props>();
</script>

<template>
  <q-img v-if="props.src" :src="props.src">
    <template #error>
      <BrokenImage :fallback-icon-size="props.fallbackIconSize" />
    </template>
  </q-img>
  <BrokenImage v-else :fallback-icon-size="props.fallbackIconSize" />
</template>

<style scoped lang="scss"></style>
