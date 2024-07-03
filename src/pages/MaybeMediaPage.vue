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

if (media === undefined) {
  // Awaiting router.push() seems to not perform the navigation correctly for some reason
  void router.push({ name: 'errorNotFound' });
}
</script>

<template>
  <MediaPage v-if="media !== undefined" v-model="media" />
</template>

<style scoped lang="scss"></style>
