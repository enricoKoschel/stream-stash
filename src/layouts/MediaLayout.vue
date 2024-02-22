<script setup lang="ts">
import MainToolbar from 'components/MainToolbar.vue';
import MainFooter from 'components/MainFooter.vue';
import GuestSessionBanner from 'components/GuestSessionBanner.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <MainToolbar />
      <GuestSessionBanner />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <MainFooter />
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss"></style>
