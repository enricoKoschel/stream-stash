<script setup lang="ts"></script>

<template>
  <q-toolbar class="bg-dark">
    <q-tabs no-caps>
      <q-route-tab
        label="Watching"
        :to="{ name: 'overviewPage', params: { watchState: 'watching' } }"
      />
      <q-route-tab
        label="Planning"
        :to="{ name: 'overviewPage', params: { watchState: 'planning' } }"
      />
      <q-route-tab
        label="Watched"
        :to="{ name: 'overviewPage', params: { watchState: 'watched' } }"
      />
    </q-tabs>
  </q-toolbar>
</template>

<style scoped lang="scss"></style>
