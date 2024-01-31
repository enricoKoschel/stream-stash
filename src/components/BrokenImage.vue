<script setup lang="ts">
interface Props {
  fallbackIconSize: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="row justify-center content-center"
    style="width: 100%; height: 100%"
  >
    <q-icon
      name="broken_image"
      :style="{ 'font-size': props.fallbackIconSize }"
    />
  </div>
</template>

<style scoped lang="scss"></style>
