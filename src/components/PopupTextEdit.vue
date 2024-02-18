<script setup lang="ts">
// Typescript can not resolve defineModel() for some reason
// eslint-disable-next-line no-undef
const model = defineModel<string>({ required: true });

interface Props {
  textClass?: string;
}

const props = withDefaults(defineProps<Props>(), { textClass: '' });
</script>

<template>
  <div class="flex cursor-pointer">
    <div :class="`flex items-center ${props.textClass}`">
      {{ model }}
      <q-icon name="edit" class="q-mb-xs q-ml-sm" />
    </div>

    <q-popup-edit v-slot="scope" v-model="model" auto-save>
      <q-input
        v-model="scope.value"
        dense
        autofocus
        @keyup.enter="scope.set"
        @focus="(input) => input.target.select()"
      />
    </q-popup-edit>
  </div>
</template>

<style scoped lang="scss"></style>
