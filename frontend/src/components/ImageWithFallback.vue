<script setup lang="ts">
interface Props {
  src: string;
}

const props = defineProps<Props>();
</script>

<template>
  <q-img :src="props.src">
    <template #error>
      <div
        class="row items-center justify-center"
        style="width: 100%; height: 100%"
      >
        <q-icon name="broken_image" size="50px" />
      </div>
    </template>
  </q-img>
</template>

<style scoped lang="scss"></style>
