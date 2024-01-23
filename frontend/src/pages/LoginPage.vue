<script setup lang="ts">
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';
import { ref, Ref } from 'vue';

const route = useRoute();

const query = route.query;
const approved = query['approved'];
const token = query['request_token'];

let data: Ref<{ [x: string]: string }>, error;
if (approved && token) {
  try {
    const response = await api.post('/3/authentication/session/new', {
      request_token: token,
    });
    data = ref(response.data);
    console.log(data);
  } catch (e) {
    // TODO: Actual error handling
    console.error(e);
  }
} else {
  // TODO: Actual error handling
  error = true;
}

async function logout() {
  try {
    const response = await api.delete('/3/authentication/session', {
      data: {
        session_id: data.value['session_id'],
      },
    });
    data = ref(response.data);
    console.log(data);
  } catch (e) {
    // TODO: Actual error handling
    console.error(e);
  }
}
</script>

<template>
  data: {{ data }} error: {{ error }}
  <q-btn @click="logout()">logout</q-btn>
</template>

<style scoped lang="scss"></style>
