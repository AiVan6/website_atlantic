<script setup>
import BaseIcon from './BaseIcon.vue'

/** Сообщение для пустых результатов и ошибок. */
defineProps({
  icon: { type: String, default: 'info' },
  title: { type: String, required: true },
  tone: { type: String, default: 'neutral', validator: (value) => ['neutral', 'error'].includes(value) },
})
</script>

<template>
  <div class="state" :class="`state--${tone}`" :role="tone === 'error' ? 'alert' : 'status'">
    <span class="state__icon">
      <BaseIcon :name="icon" :size="28" />
    </span>
    <p class="state__title">{{ title }}</p>
    <p v-if="$slots.default" class="state__text"><slot /></p>
    <div v-if="$slots.actions" class="state__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.state {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  padding: var(--space-8) var(--space-5);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  text-align: center;
}

.state__icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-2);
  border-radius: var(--radius-full);
  background: var(--aqua-50);
  color: var(--blue-600);
}

.state--error .state__icon {
  background: #fbeceb;
  color: var(--color-danger);
}

.state__title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--navy-900);
}

.state__text {
  max-width: 420px;
  color: var(--color-text-muted);
}

.state__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-3);
}
</style>
