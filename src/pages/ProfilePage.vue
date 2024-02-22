<script setup lang="ts">
import { useAuthStore } from 'stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <div class="fullscreen text-white q-pa-md flex text-center">
    <div style="width: 100vw">
      <div style="font-size: 3rem">Profile</div>

      <div v-if="authStore.data !== undefined">
        <!--
          v-text is used here because {{ Mustache }} interpolations seem to not respect type narrowing
          (authStore.data remains possibly undefined)
        -->
        <div
          class="text-h6"
          style="margin-bottom: 30px"
          v-text="`You are logged in as ${authStore.data.username}`"
        />

        <div style="margin: 10px">
          <!-- TODO: Implement exporting/importing data -->
          <q-btn
            text-color="blue"
            label="Export your data"
            flat
            disable
            no-caps
            class="bg-dark"
            style="margin-right: 10px"
          />
          <q-btn
            text-color="blue"
            label="Import your data"
            flat
            disable
            no-caps
            class="bg-dark"
          />
        </div>

        <!-- TODO: Implement removing all data from TMDB -->
        <q-btn
          text-color="white"
          label="Remove all data from The Movie Database (TMDB)"
          flat
          disable
          no-caps
          class="bg-negative"
        />
      </div>
      <div v-else>
        <div class="text-h6">You are not logged in</div>
      </div>

      <q-btn
        text-color="blue"
        :to="{ name: 'indexPage' }"
        label="Go Home"
        flat
        no-caps
        class="q-mt-xl bg-dark"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
