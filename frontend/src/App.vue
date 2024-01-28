<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { LocalStorage } from 'quasar';

const authStore = useAuthStore();

authStore.$subscribe((mutation, state) => {
  LocalStorage.set('accessToken', state.accessToken);
});
</script>

<template>
  <suspense>
    <router-view />
  </suspense>
</template>

<style scoped lang="scss"></style>
