<script setup lang="ts">
import { ref } from 'vue';

const searchText = ref('');
</script>

<template>
  <q-toolbar class="bg-dark">
    <!-- TODO: Replace with logo -->
    <q-btn flat dense round icon="home" :to="{ name: 'indexPage' }" />

    <q-toolbar-title>Stream Stash</q-toolbar-title>

    <!-- TODO: Center in toolbar -->
    <q-input
      v-model="searchText"
      label="Search"
      clearable
      dense
      style="width: 30rem"
    >
      <template #prepend>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-space />

    <!-- TODO: Dropdown with login, profile, about(TMDB credit) etc. -->
    <q-btn flat dense round icon="menu" />
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
