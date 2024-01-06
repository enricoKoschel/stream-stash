<template>
  <q-card
    flat
    @click="showClickAlert()"
    style="margin: 0.5rem; width: 10rem; height: 17rem"
  >
    <q-card-section>
      <q-img :src="imageUrl" style="width: 8rem; height: 12rem" />
    </q-card-section>

    <div class="text-h6" style="text-align: center">{{ title }}</div>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  imageUrl: string;
}

const props = defineProps<Props>();

function showClickAlert() {
  alert(`Clicked on ${props.title}`);
}
</script>
