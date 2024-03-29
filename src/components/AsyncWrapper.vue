<script setup lang="ts">
import { useMediaStore } from 'stores/mediaStore';

// This component is needed because async/await cannot be used in App.vue

const mediaStore = useMediaStore();
await mediaStore.init();
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss"></style>
