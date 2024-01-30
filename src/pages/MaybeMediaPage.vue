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
  await router.replace({ name: 'errorNotFound' });
}
</script>

<template>
  <MediaPage v-if="mediaExists" v-model:media="media" />
</template>

<style scoped lang="scss"></style>
