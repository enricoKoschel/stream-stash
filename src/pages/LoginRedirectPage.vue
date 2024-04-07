<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { finishLogin } from 'src/models/backendApi';
import { createErrorDialog } from 'src/models/methods';

const router = useRouter();
const route = useRoute();

const query = route.query;

if ('code' in query) {
  await finishLogin(query.code as string);
} else if ('error' in query) {
  createErrorDialog(
    `An error occurred while logging in with Google: ${query.error as string}`,
  );
}

// Awaiting router.push() seems to not perform the navigation correctly for some reason
void router.push({ name: 'indexPage' });
</script>

<template>
  You will be redirected shortly...<br />
  If not please click
  <router-link :to="{ name: 'indexPage' }">here</router-link>
</template>

<style scoped lang="scss"></style>
