<script setup lang="ts">
import { ref } from 'vue';
import { useMediaStore } from 'stores/mediaStore';
import { getUserInfo, googleLogin, logout } from 'src/models/backendApi';

const searchText = ref('');

const mediaStore = useMediaStore();

const userInfo = await getUserInfo();

// TODO: Have skeleton loader so page doesn't jump around when toolbar is loaded

async function loginClicked(): Promise<void> {
  const response = await googleLogin();

  // TODO: Make sure user checks all boxes
  // TODO: Save current page in state query param and navigate back there after redirect
  if (response.success) {
    window.location.href = response.value;
  }
}

async function logoutClicked(): Promise<void> {
  await logout();
  location.reload();
}
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
      <q-spinner v-if="mediaStore.numberOfUploads !== 0" size="35px" />

      <div v-if="userInfo.success && userInfo.value.loggedIn" class="row">
        <q-btn label="Profile" flat no-caps :to="{ name: 'profilePage' }" />

        <q-separator vertical />

        <q-btn label="Logout" flat no-caps @click="logoutClicked()" />
      </div>
      <div v-else class="row">
        <q-btn label="Login" flat no-caps @click="loginClicked()" />
      </div>
    </div>
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
