<script setup lang="ts">
import MediaSearchEntry from 'src/components/MediaSearchEntry.vue';
import { movieSearch, tvSearch } from 'src/models/backendApi';
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

interface Props {
  query: string;
}

const props = defineProps<Props>();

const moviePage = ref(1);
const tvPage = ref(1);

const loading = ref(false);

let movies = await movieSearch(props.query, moviePage.value);
let tvs = await tvSearch(props.query, tvPage.value);

async function nextMoviePage(totalPages: number): Promise<void> {
  if (moviePage.value >= totalPages) return;

  moviePage.value++;

  loading.value = true;
  movies = await movieSearch(props.query, moviePage.value);
  loading.value = false;
}

async function previousMoviePage(): Promise<void> {
  if (moviePage.value <= 1) return;

  moviePage.value--;

  loading.value = true;
  movies = await movieSearch(props.query, moviePage.value);
  loading.value = false;
}

async function nextTvPage(totalPages: number): Promise<void> {
  if (tvPage.value >= totalPages) return;

  tvPage.value++;

  loading.value = true;
  tvs = await tvSearch(props.query, tvPage.value);
  loading.value = false;
}

async function previousTvPage(): Promise<void> {
  if (tvPage.value <= 1) return;

  tvPage.value--;

  loading.value = true;
  tvs = await tvSearch(props.query, tvPage.value);
  loading.value = false;
}

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
      <div class="col column">
        <p class="col-1 text-h4 text-bold text-center content-center q-mb-none">
          Movies
        </p>

        <div v-if="movies.value.results.length !== 0" class="col column">
          <q-scroll-area class="col">
            <MediaSearchEntry
              v-for="(movie, index) in movies.value.results"
              :key="JSON.stringify(movie)"
              :media="movie"
              :class="
                index === 0 || index === movies.value.results.length - 1
                  ? 'q-my-xs q-mx-md'
                  : 'q-ma-md'
              "
            />
          </q-scroll-area>

          <div class="text-h6 text-center">
            <q-btn class="q-pa-sm text-h6" @click="previousMoviePage()">
              &lt;
            </q-btn>
            Page {{ moviePage }} of {{ movies.value.totalPages }}
            <q-btn
              class="q-pa-sm text-h6"
              @click="nextMoviePage(movies.value.totalPages)"
              >&gt;</q-btn
            >
          </div>
        </div>

        <div v-else class="text-h5 text-center">No Movies found</div>
      </div>

      <q-separator vertical size="4px" />

      <div class="col column">
        <p class="col-1 text-h4 text-bold text-center content-center q-mb-none">
          TV Shows
        </p>

        <div v-if="tvs.value.results.length !== 0" class="col column">
          <q-scroll-area class="col">
            <MediaSearchEntry
              v-for="(tv, index) in tvs.value.results"
              :key="JSON.stringify(tv)"
              :media="tv"
              :class="
                index === 0 || index === tvs.value.results.length - 1
                  ? 'q-my-xs q-mx-md'
                  : 'q-ma-md'
              "
            />
          </q-scroll-area>

          <div class="text-h6 text-center">
            <q-btn class="q-pa-sm text-h6" @click="previousTvPage()">
              &lt;
            </q-btn>
            Page {{ tvPage }} of {{ tvs.value.totalPages }}
            <q-btn
              class="q-pa-sm text-h6"
              @click="nextTvPage(tvs.value.totalPages)"
              >&gt;</q-btn
            >
          </div>
        </div>

        <div v-else class="text-h5 text-center">No TV Shows found</div>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
