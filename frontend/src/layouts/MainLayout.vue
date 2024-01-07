<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-dark">
        <q-toolbar-title>Stream Stash</q-toolbar-title>

        <!-- TODO: Center in toolbar -->
        <q-input
          v-model="searchText"
          label="Search"
          clearable
          dense
          style="width: 30rem"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />

        <!-- TODO: Dropdown with login and profile, etc. -->
        <q-btn flat dense round icon="menu" />
      </q-toolbar>
      <q-toolbar class="bg-dark">
        <q-tabs v-model="selectedTab" no-caps>
          <q-tab name="all" label="All" />
          <q-tab name="watching" label="Watching" />
          <q-tab name="planning" label="Planning" />
          <q-tab name="watched" label="Watched" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue';

const searchText = ref('');
const selectedTab = ref('all');
</script>
