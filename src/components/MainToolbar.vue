<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'stores/authStore';
import { useMediaStore } from 'stores/mediaStore';
import { CallbackTypes, googleSdkLoaded } from 'vue3-google-login';

const searchText = ref('');

const authStore = useAuthStore();
const mediaStore = useMediaStore();

function googleLoginClicked(): void {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initTokenClient({
        client_id:
          '100227495150-cnu571i10u1689hgq5t08t4qi5ojrhq1.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.appdata',
        callback: googleLoginCallback,
      })
      .requestAccessToken();
  });
}

const googleLoginCallback: CallbackTypes.TokenResponseCallback = (res) => {
  //authStore.login()
  // TODO Send access_token to backend for authorization and session creation. When backend returns successfully, fully login.
  console.log('response:', res);
};
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

      <div v-if="authStore.data !== undefined" class="row">
        <q-btn label="Profile" flat no-caps :to="{ name: 'profilePage' }" />

        <q-separator vertical />

        <q-btn label="Logout" flat no-caps @click="authStore.logout()" />
      </div>
      <div v-else class="row">
        <q-btn label="Login" flat no-caps @click="googleLoginClicked()" />
      </div>
    </div>
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
