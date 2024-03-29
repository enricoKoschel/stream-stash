<script setup lang="ts">
import { getUserInfo } from 'src/models/backendApi';

const userInfo = await getUserInfo();
</script>

<template>
  <q-banner
    v-if="!userInfo.success || !userInfo.value.loggedIn"
    style="background-color: #f2c037; color: black"
  >
    <div style="font-size: 1.2rem">
      You are currently in a read-only guest session, please log in for the full
      experience.
    </div>
  </q-banner>
</template>

<style scoped lang="scss"></style>
