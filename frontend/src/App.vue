<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';
import { LocalStorage } from 'quasar';

const authStore = useAuthStore();

const initialSessionId = LocalStorage.getItem<string>('sessionId');
if (
  initialSessionId &&
  initialSessionId !== 'undefined' &&
  initialSessionId !== 'null'
) {
  authStore.sessionId = initialSessionId;
}

authStore.$subscribe((mutation, state) => {
  LocalStorage.set('sessionId', state.sessionId);
});
</script>

<template>
  <!-- TODO: Popup error, global error value in separate error store -->
  <suspense>
    <router-view />
  </suspense>
</template>

<style scoped lang="scss"></style>
