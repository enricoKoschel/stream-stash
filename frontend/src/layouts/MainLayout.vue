<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-dark">
        <q-toolbar-title>Stream Stash</q-toolbar-title>

        <!-- TODO: Center in toolbar -->
        <q-input
          v-model="searchText"
          label="Search"
          filled
          clearable
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
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchText = ref('');
</script>
