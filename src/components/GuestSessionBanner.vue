<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <q-banner
    v-if="authStore.data === undefined"
    style="background-color: #f2c037; color: black"
  >
    <div style="font-size: 1.2rem">
      You are currently in a read-only guest session, please log in for the full
      experience.
    </div>
  </q-banner>
</template>

<style scoped lang="scss"></style>
