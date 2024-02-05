<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { LocalStorage } from 'quasar';
import { useMediaStore } from 'stores/mediaStore';

// This component is needed because async/await cannot be used in App.vue

const mediaStore = useMediaStore();
await mediaStore.init();

const authStore = useAuthStore();
await authStore.init();

authStore.$subscribe((mutation, state) => {
  LocalStorage.set('accessToken', state.accessToken);
});
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss"></style>
