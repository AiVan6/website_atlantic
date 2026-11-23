<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  /** Уровень заголовка (2 для секций страницы, 1 для заголовка страницы). */
  level: { type: Number, default: 2 },
  align: { type: String, default: 'left', validator: (value) => ['left', 'center'].includes(value) },
  inverse: { type: Boolean, default: false },
  titleId: { type: String, default: undefined },
})
</script>

<template>
  <div class="heading" :class="[`heading--${align}`, { 'heading--inverse': inverse }]">
    <p v-if="eyebrow" class="heading__eyebrow">{{ eyebrow }}</p>
    <component :is="`h${level}`" :id="titleId" class="heading__title">{{ title }}</component>
    <div v-if="$slots.default" class="heading__text">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.heading {
  display: grid;
  gap: var(--space-3);
  max-width: 720px;
}

.heading--center {
  margin-inline: auto;
  text-align: center;
  justify-items: center;
}

.heading__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--blue-500);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.heading__eyebrow::before {
  content: '';
  width: 24px;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  opacity: 0.6;
}

.heading__title {
  font-size: var(--text-3xl);
  color: var(--navy-900);
}

.heading__text {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
}

.heading--inverse .heading__eyebrow {
  color: var(--aqua-300);
}

.heading--inverse .heading__title {
  color: var(--white);
}

.heading--inverse .heading__text {
  color: var(--color-text-inverse-muted);
}
</style>
