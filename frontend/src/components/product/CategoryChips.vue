<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'

/** Фильтр по категориям. Пустая строка — «Все». На узких экранах — горизонтальная прокрутка. */
const model = defineModel({ type: String, default: '' })

defineProps({
  categories: { type: Array, required: true },
  total: { type: Number, required: true },
})
</script>

<template>
  <div class="chips" role="group" aria-label="Категории">
    <button type="button" class="chip" :aria-pressed="model === ''" @click="model = ''">
      <BaseIcon name="grid" :size="16" />
      Все
      <span class="chip__count">{{ total }}</span>
    </button>
    <button
      v-for="category in categories"
      :key="category.type"
      type="button"
      class="chip"
      :aria-pressed="model === category.type"
      @click="model = category.type"
    >
      <BaseIcon :name="category.icon" :size="16" />
      {{ category.label }}
      <span class="chip__count">{{ category.count }}</span>
    </button>
  </div>
</template>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.chip {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-2);
  min-height: 42px;
  padding: 0 var(--space-3) 0 var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--gray-700);
  font-size: var(--text-sm);
  font-weight: 500;
  white-space: nowrap;
  transition:
    background-color var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out),
    color var(--duration) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

.chip:hover {
  border-color: var(--gray-400);
  color: var(--navy-900);
}

.chip[aria-pressed='true'] {
  border-color: var(--navy-800);
  background: var(--navy-800);
  color: var(--white);
}

.chip__count {
  min-width: 26px;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  background: var(--gray-100);
  color: var(--gray-600);
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.chip[aria-pressed='true'] .chip__count {
  background: rgb(255 255 255 / 0.16);
  color: var(--white);
}

@media (max-width: 899px) {
  .chips {
    flex-wrap: nowrap;
    margin-inline: calc(var(--gutter) * -1);
    padding: 2px var(--gutter);
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
    mask-image: linear-gradient(to right, transparent 0, #000 var(--gutter), #000 calc(100% - var(--gutter)), transparent 100%);
  }

  .chips::-webkit-scrollbar {
    display: none;
  }

  .chip {
    scroll-snap-align: start;
  }
}
</style>
