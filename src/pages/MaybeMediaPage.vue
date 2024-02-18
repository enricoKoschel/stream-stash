<script setup lang="ts">
import { MediaType } from 'src/models/types';
import { constructMediaKey } from 'src/models/methods';
import { useMediaStore } from 'stores/mediaStore';
import MediaPage from 'pages/MediaPage.vue';
import { useRouter } from 'vue-router';

interface Props {
  id: number;
  mediaType: MediaType;
}

const props = defineProps<Props>();

const router = useRouter();

const mediaStore = useMediaStore();

const media = mediaStore.allMedia[constructMediaKey(props.mediaType, props.id)];

const mediaExists = media !== undefined;

if (!mediaExists) {
  /* Awaiting the promise gives the following error:
   *   Cannot read properties of null (reading 'subTree')
   * Not awaiting here is not problematic
   */
  void router.push({ name: 'errorNotFound' });
}
</script>

<template>
  <MediaPage v-if="mediaExists" v-model="media" />
</template>

<style scoped lang="scss"></style>
