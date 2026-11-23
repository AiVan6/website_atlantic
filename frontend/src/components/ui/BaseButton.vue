<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseIcon from './BaseIcon.vue'

/**
 * Единая кнопка: рендерится как <RouterLink> (to), внешняя ссылка <a> (href) или <button>.
 */
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost', 'light', 'outline-light'].includes(value),
  },
  size: { type: String, default: 'md', validator: (value) => ['sm', 'md', 'lg'].includes(value) },
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  iconRight: { type: String, default: '' },
  block: { type: Boolean, default: false },
})

const isExternal = computed(() => Boolean(props.href) && /^https?:/.test(props.href))

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const attrs = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) {
    return isExternal.value ? { href: props.href, target: '_blank', rel: 'noopener noreferrer' } : { href: props.href }
  }
  return { type: props.type }
})

const iconSize = computed(() => (props.size === 'sm' ? 16 : 18))
</script>

<template>
  <component
    :is="tag"
    v-bind="attrs"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`, { 'btn--block': block }]"
  >
    <BaseIcon v-if="icon" :name="icon" :size="iconSize" />
    <span><slot /></span>
    <BaseIcon v-if="iconRight" :name="iconRight" :size="iconSize" class="btn__icon-right" />
  </component>
</template>

<style scoped>
.btn {
  --btn-bg: var(--color-primary);
  --btn-fg: var(--white);
  --btn-border: transparent;
  --btn-bg-hover: var(--color-primary-hover);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 48px;
  padding: 0 var(--space-5);
  border: 1px solid var(--btn-border);
  border-radius: var(--radius-full);
  background: var(--btn-bg);
  color: var(--btn-fg);
  font-weight: 600;
  font-size: var(--text-base);
  line-height: 1;
  white-space: nowrap;
  transition:
    background-color var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out),
    color var(--duration) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration) var(--ease-out);
  -webkit-tap-highlight-color: transparent;
}

.btn:hover {
  background: var(--btn-bg-hover);
}

.btn:active {
  transform: scale(0.98);
}

.btn__icon-right {
  transition: transform var(--duration) var(--ease-out);
}

.btn:hover .btn__icon-right {
  transform: translateX(3px);
}

.btn--sm {
  min-height: 40px;
  padding: 0 var(--space-4);
  font-size: var(--text-sm);
}

.btn--lg {
  min-height: 56px;
  padding: 0 var(--space-6);
  font-size: var(--text-lg);
}

.btn--block {
  display: flex;
  width: 100%;
}

.btn--secondary {
  --btn-bg: var(--aqua-50);
  --btn-fg: var(--blue-600);
  --btn-border: var(--aqua-100);
  --btn-bg-hover: var(--aqua-100);
}

.btn--ghost {
  --btn-bg: transparent;
  --btn-fg: var(--color-primary);
  --btn-border: var(--color-border);
  --btn-bg-hover: var(--gray-100);
}

.btn--light {
  --btn-bg: var(--white);
  --btn-fg: var(--navy-900);
  --btn-bg-hover: var(--aqua-100);

  box-shadow: 0 8px 24px -10px rgb(0 0 0 / 0.45);
}

.btn--outline-light {
  --btn-bg: rgb(255 255 255 / 0.06);
  --btn-fg: var(--white);
  --btn-border: rgb(255 255 255 / 0.4);
  --btn-bg-hover: rgb(255 255 255 / 0.16);

  backdrop-filter: blur(6px);
}
</style>
