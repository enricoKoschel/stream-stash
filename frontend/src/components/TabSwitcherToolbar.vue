<script setup lang="ts">
import { ref } from 'vue';

const selectedTab = ref('watching');
</script>

<template>
  <q-toolbar class="bg-dark">
    <!-- TODO: Use q-route-tab with dynamic route matching /:mediaState being watching, planning or watched -->
    <q-tabs v-model="selectedTab" no-caps>
      <q-tab name="watching" label="Watching" />
      <q-tab name="planning" label="Planning" />
      <q-tab name="watched" label="Watched" />
    </q-tabs>
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
