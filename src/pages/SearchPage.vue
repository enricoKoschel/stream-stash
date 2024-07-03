<script setup lang="ts">
import MediaSearchEntry from 'src/components/MediaSearchEntry.vue';
import { movieSearch, tvSearch } from 'src/models/backendApi';
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

interface Props {
  query: string;
}

const props = defineProps<Props>();

let movies = await movieSearch(props.query, 1);
let tvs = await tvSearch(props.query, 1);
const loading = ref(false);

onBeforeRouteUpdate(async (to) => {
  loading.value = true;

  const query = to.params.query as string;

  movies = await movieSearch(query, 1);
  tvs = await tvSearch(query, 1);

  loading.value = false;
});
</script>

<template>
  <q-page class="flex">
    <div
      v-if="movies.success && tvs.success && !loading"
      class="row full-width"
    >
      <div class="col column q-mt-md">
        <p class="col-1 text-h4 text-bold text-center q-mb-none">Movies</p>

        <q-scroll-area class="col">
          <MediaSearchEntry
            v-for="(movie, index) in movies.value.results"
            :key="JSON.stringify(movie)"
            :media="movie"
            :class="
              index === 0 || index === movies.value.results.length - 1
                ? 'q-mx-md'
                : 'q-ma-md'
            "
          />
        </q-scroll-area>

        Page 1/{{ movies.value.totalPages }}
      </div>

      <q-separator vertical size="4px" />

      <div class="col column q-mt-md">
        <p class="col-1 text-h4 text-bold text-center q-mb-none">TV Shows</p>

        <q-scroll-area class="col">
          <MediaSearchEntry
            v-for="tv in tvs.value.results"
            :key="JSON.stringify(tv)"
            :media="tv"
            class="q-mb-md q-mx-md"
          />
        </q-scroll-area>

        Page 1/{{ movies.value.totalPages }}
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
