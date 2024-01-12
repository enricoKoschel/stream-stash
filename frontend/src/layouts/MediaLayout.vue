<script setup lang="ts">
import MainToolbar from 'components/MainToolbar.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <MainToolbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss"></style>
