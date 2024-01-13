<script setup lang="ts">
import MainToolbar from 'components/MainToolbar.vue';
import WatchStateToolbar from 'components/WatchStateToolbar.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <MainToolbar />
      <WatchStateToolbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss"></style>
