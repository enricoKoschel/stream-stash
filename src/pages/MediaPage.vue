<script setup lang="ts">
import ImageWithFallback from 'components/ImageWithFallback.vue';
import {
  Media,
  MediaHistory,
  WatchState,
  watchStateArray,
} from 'src/models/types';
import { useMediaStore } from 'stores/mediaStore';
import { capitalizeFirstLetter, createConfirmDialog } from 'src/models/methods';
import { computed } from 'vue';
import PopupTextEdit from 'components/PopupTextEdit.vue';

// Typescript can not resolve defineModel() for some reason
// eslint-disable-next-line no-undef
const model = defineModel<Media>({ required: true });

const mediaStore = useMediaStore();

const media = model.value;

const sortedHistory = computed(() => {
  // Preserve number as key type
  const entries = Object.entries(media.history) as unknown as [
    number,
    MediaHistory,
  ][];

  entries.sort((a, b) => {
    return b[0] - a[0];
  });

  return entries;
});

function ratingColor(star: number, item: MediaHistory): string {
  return item.rating >= star ? 'primary' : 'white';
}

async function ratingClicked(star: number, item: MediaHistory): Promise<void> {
  if (item.rating === star) {
    item.rating = 0;
  } else {
    item.rating = star;
  }

  await mediaStore.syncToDb(media);
}

async function watchStateChanged(watchState: WatchState): Promise<void> {
  media.watchState = watchState;

  await mediaStore.syncToDb(media);
}

async function addHistory(): Promise<void> {
  const id = Object.keys(media.history).length;

  media.history[id] = {
    rating: 0,
    startDate: '??.??.????',
    endDate: '??.??.????',
    name: 'Unnamed',
  };

  await mediaStore.syncToDb(media);
}

function removeHistory(id: number): void {
  createConfirmDialog('Do you really want to delete?', async () => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete media.history[id];

    await mediaStore.syncToDb(media);
  });
}

async function historyNameChanged(
  name: string,
  item: MediaHistory,
): Promise<void> {
  item.name = name;

  await mediaStore.syncToDb(media);
}

async function historyDateChanged(
  date: string,
  dateType: 'start' | 'end',
  item: MediaHistory,
): Promise<void> {
  if (dateType === 'start') {
    item.startDate = date;
  } else {
    item.endDate = date;
  }

  await mediaStore.syncToDb(media);
}
</script>

<template>
  <q-page>
    <ImageWithFallback
      :src="media.backdropUrl"
      fallback-icon-size="300px"
      style="position: absolute; z-index: -1; opacity: 10%; height: 100%"
    />

    <div class="row">
      <div class="offset-2" style="margin-top: 5vh">
        <ImageWithFallback
          :src="media.posterUrl"
          fallback-icon-size="50px"
          style="border-radius: 5px; width: 12rem; height: 18rem"
        />

        <q-select
          dense
          item-aligned
          hide-dropdown-icon
          popup-content-style="text-align: center;"
          :option-label="capitalizeFirstLetter"
          :model-value="media.watchState"
          :options="watchStateArray"
          style="
            font-size: 1.2rem;
            width: 12rem;
            padding-left: 0;
            padding-right: 0;
          "
          @update:model-value="watchStateChanged"
        >
          <template #selected>
            <span class="flex justify-center" style="width: 100%">
              {{ capitalizeFirstLetter(media.watchState) }}
            </span>
          </template>
        </q-select>
      </div>

      <div style="width: 65%; margin-top: 10vh; margin-left: 2vw">
        <p class="text-h6" style="margin: 0">
          {{ media.title }}
          <span style="opacity: 50%; font-size: 80%; margin-left: 0.3rem">
            {{ media.date.slice(0, 4) }}
          </span>
        </p>

        <p>{{ media.overview }}</p>
      </div>
    </div>

    <div class="row" style="margin-top: 5vh">
      <div
        class="offset-4"
        style="overflow-y: auto; overflow-x: hidden; height: 450px"
      >
        <q-card style="width: 40rem; margin: 1rem">
          <q-btn
            icon="add"
            flat
            style="width: 100%; height: 100%"
            @click="addHistory()"
          />
        </q-card>

        <q-card
          v-for="[id, item] in sortedHistory"
          :key="item"
          style="width: 40rem; margin: 1rem"
        >
          <q-card-section class="row">
            <div class="col-3">
              <div class="flex justify-between">
                <q-btn
                  v-for="star in 5"
                  :key="star"
                  icon="star"
                  :color="ratingColor(star, item)"
                  flat
                  style="padding: 0"
                  @click="ratingClicked(star, item)"
                />
              </div>
            </div>

            <PopupTextEdit
              :model-value="item.name"
              text-class="text-h6"
              class="col-3 offset-2"
              @update:model-value="
                (val: string) => historyNameChanged(val, item)
              "
            />

            <q-btn
              icon="delete_forever"
              flat
              class="col-1 offset-3 text-negative no-padding"
              @click="removeHistory(id)"
            />
          </q-card-section>

          <q-card-section
            v-if="media.mediaType === 'tv'"
            class="flex justify-between"
          >
            <PopupTextEdit
              :model-value="item.startDate"
              @update:model-value="
                (val: string) => historyDateChanged(val, 'start', item)
              "
            />
            -
            <PopupTextEdit
              :model-value="item.endDate"
              @update:model-value="
                (val: string) => historyDateChanged(val, 'end', item)
              "
            />
          </q-card-section>
          <q-card-section v-else>
            <PopupTextEdit
              :model-value="item.endDate"
              @update:model-value="
                (val: string) => historyDateChanged(val, 'end', item)
              "
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped lang="scss"></style>
