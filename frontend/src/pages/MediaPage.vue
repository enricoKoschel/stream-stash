<script setup lang="ts">
interface Props {
  id: number;
}

const props = defineProps<Props>();
</script>

<template>
  <p>MediaPage params: {{ props }}</p>
</template>

<style scoped lang="scss"></style>
