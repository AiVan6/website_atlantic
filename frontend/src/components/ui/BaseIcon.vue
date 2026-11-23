<script setup>
import { computed } from 'vue'
import { ICONS } from './icons'

const props = defineProps({
  name: { type: String, required: true, validator: (value) => value in ICONS },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 1.75 },
  /** Подпись для скринридеров. Без неё иконка считается декоративной. */
  label: { type: String, default: '' },
})

const elements = computed(() => ICONS[props.name] ?? [])
</script>

<template>
  <svg
    class="icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  >
    <component :is="tag" v-for="([tag, attrs], index) in elements" :key="index" v-bind="attrs" />
  </svg>
</template>

<style scoped>
.icon {
  flex-shrink: 0;
}
</style>
