<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/authStore';
import { useMediaStore } from 'stores/mediaStore';

const searchText = ref('');

const authStore = useAuthStore();

const mediaStore = useMediaStore();
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
      <q-spinner v-if="mediaStore.uploadTime !== undefined" size="35px" />

      <div v-if="authStore.loggedIn" class="row">
        <!-- TODO: Show username -->
        <q-btn label="Profile" flat no-caps :to="{ name: 'profilePage' }" />

        <q-separator vertical />

        <q-btn label="Logout" flat no-caps @click="authStore.logout()" />
      </div>
      <div v-else class="row">
        <q-btn label="Login" flat no-caps @click="authStore.login()" />
      </div>
    </div>
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
