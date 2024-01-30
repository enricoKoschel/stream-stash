<script setup lang="ts">
import MainToolbar from 'components/MainToolbar.vue';
import MainFooter from 'components/MainFooter.vue';
import GuestSessionBanner from 'components/GuestSessionBanner.vue';
import { useAuthStore } from 'stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <MainToolbar />
      <GuestSessionBanner v-if="!authStore.loggedIn" />
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
