<script setup lang="ts"></script>

<template>
  <q-toolbar class="bg-dark">
    <q-tabs no-caps>
      <q-route-tab
        label="Watching"
        :to="{ name: 'mainPage', params: { watchState: 'watching' } }"
      />
      <q-route-tab
        label="Planning"
        :to="{ name: 'mainPage', params: { watchState: 'planning' } }"
      />
      <q-route-tab
        label="Watched"
        :to="{ name: 'mainPage', params: { watchState: 'watched' } }"
      />
    </q-tabs>
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
