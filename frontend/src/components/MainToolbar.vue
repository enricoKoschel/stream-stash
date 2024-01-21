<script setup lang="ts">
import { ref } from 'vue';

const searchText = ref('');
const loggedIn = ref(false);
</script>

<template>
  <q-toolbar class="bg-dark">
    <div class="row items-center" style="width: 100vw">
      <!-- TODO: Replace with logo -->
      <q-btn flat dense round icon="home" :to="{ name: 'indexPage' }" />

      <q-toolbar-title shrink>Stream Stash</q-toolbar-title>
    </div>

    <div>
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
    </div>

    <div class="row justify-end" style="width: 100vw">
      <div v-if="loggedIn" class="row">
        <q-btn label="Profile" flat no-caps />

        <q-separator vertical />

        <q-btn label="Logout" flat no-caps @click="loggedIn = false" />
      </div>
      <div v-else class="row">
        <q-btn label="Login" flat no-caps @click="loggedIn = true" />
      </div>
    </div>
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
