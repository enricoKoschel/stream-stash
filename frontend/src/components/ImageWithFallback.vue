<script setup lang="ts">
interface Props {
  src: string;
  fallbackIconSize: string;
}

const props = defineProps<Props>();
</script>

<template>
  <q-img :src="props.src">
    <template #error>
      <div
        class="row justify-center content-center"
        style="width: 100%; height: 100%"
      >
        <q-icon
          name="broken_image"
          :style="{ 'font-size': fallbackIconSize }"
        />
      </div>
    </template>
  </q-img>
</template>

<style scoped lang="scss"></style>
