<script setup>
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { orderSteps } from '@/config/site'

defineProps({
  /** compact — вертикальный список для модального окна. */
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <ol class="steps" :class="{ 'steps--compact': compact }">
    <li v-for="(step, index) in orderSteps" :key="step.title" class="step">
      <span class="step__marker">
        <BaseIcon :name="step.icon" :size="compact ? 20 : 24" />
        <span class="step__number" aria-hidden="true">{{ index + 1 }}</span>
      </span>
      <div class="step__body">
        <h3 class="step__title">{{ step.title }}</h3>
        <p class="step__text">{{ step.text }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: var(--space-5);
  counter-reset: step;
}

.step {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-4);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition:
    box-shadow var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.step:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.step__marker {
  position: relative;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius-md);
  background: var(--aqua-50);
  color: var(--blue-600);
}

.step__number {
  position: absolute;
  top: -8px;
  right: -8px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-surface);
  border-radius: var(--radius-full);
  background: var(--navy-800);
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 700;
}

.step__title {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--navy-900);
}

.step__text {
  margin-top: var(--space-1);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

/* Компактный вариант: вертикальная лента шагов */
.steps--compact {
  grid-template-columns: 1fr;
  gap: 0;
}

.steps--compact .step {
  grid-template-columns: auto 1fr;
  gap: var(--space-4);
  padding: 0 0 var(--space-5);
  border: 0;
  border-radius: 0;
  background: none;
}

.steps--compact .step:hover {
  box-shadow: none;
  transform: none;
}

.steps--compact .step:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 48px;
  bottom: 4px;
  left: 21px;
  width: 2px;
  border-radius: 2px;
  background: var(--aqua-100);
}

.steps--compact .step__marker {
  width: 44px;
  height: 44px;
}

.steps--compact .step__number {
  display: none;
}

.steps--compact .step__title {
  font-size: var(--text-base);
}
</style>
