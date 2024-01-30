<script setup lang="ts">
import AsyncWrapper from 'components/AsyncWrapper.vue';
</script>

<template>
  <suspense>
    <!-- This component is needed because async/await cannot be used in App.vue -->
    <AsyncWrapper />
  </suspense>
</template>

<style scoped lang="scss"></style>
