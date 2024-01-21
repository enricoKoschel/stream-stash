<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
</script>

<template>
  <div class="fullscreen text-white q-pa-md flex text-center">
    <div style="width: 100vw">
      <div style="font-size: 3rem">About</div>

      <div class="row justify-center items-center">
        <ImageWithFallback
          src="public/logos/TMDB.svg"
          fallback-icon-size="20px"
          style="width: 3rem; margin-right: 1rem"
        />

        <div>
          This product uses the <a href="https://themoviedb.org">TMDB</a> API
          but is not endorsed or certified by
          <a href="https://themoviedb.org">TMDB</a>.
        </div>
      </div>

      <q-btn
        text-color="blue"
        :to="{ name: 'indexPage' }"
        label="Go Home"
        flat
        no-caps
        class="q-mt-xl bg-dark"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
