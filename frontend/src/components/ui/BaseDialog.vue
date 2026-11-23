<script setup>
import { onBeforeUnmount, onMounted, useId, useTemplateRef, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'

/**
 * Модальное окно на нативном <dialog>: фокус-ловушка, закрытие по Esc и
 * инертный фон браузер обеспечивает сам. Закрывается также кликом по подложке.
 */
const open = defineModel('open', { type: Boolean, default: false })

defineProps({
  title: { type: String, required: true },
  /** Скрыть заголовок визуально (остаётся доступным для скринридеров). */
  hideTitle: { type: Boolean, default: false },
  size: { type: String, default: 'md', validator: (value) => ['md', 'lg'].includes(value) },
})

const titleId = useId()
const dialog = useTemplateRef('dialog')

function sync(isOpen) {
  const el = dialog.value
  if (!el) return
  if (isOpen && !el.open) el.showModal()
  else if (!isOpen && el.open) el.close()
}

watch(open, sync, { flush: 'post' })
onMounted(() => sync(open.value))
onBeforeUnmount(() => sync(false))

function onBackdropClick(event) {
  if (event.target === dialog.value) open.value = false
}
</script>

<template>
  <dialog
    ref="dialog"
    class="dialog"
    :class="`dialog--${size}`"
    :aria-labelledby="titleId"
    @close="open = false"
    @click="onBackdropClick"
  >
    <div class="dialog__panel">
      <header class="dialog__header" :class="{ 'dialog__header--floating': hideTitle }">
        <h2 :id="titleId" class="dialog__title" :class="{ 'visually-hidden': hideTitle }">{{ title }}</h2>
        <button type="button" class="dialog__close" aria-label="Закрыть" @click="open = false">
          <BaseIcon name="close" :size="22" />
        </button>
      </header>
      <div class="dialog__body">
        <slot />
      </div>
      <footer v-if="$slots.footer" class="dialog__footer">
        <slot name="footer" />
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.dialog {
  width: min(100% - 2 * var(--space-4), 560px);
  max-height: min(100% - 2 * var(--space-4), 860px);
  padding: 0;
  border: 0;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px) scale(0.98);
  transition:
    opacity var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out),
    overlay var(--duration) allow-discrete,
    display var(--duration) allow-discrete;
}

.dialog--lg {
  width: min(100% - 2 * var(--space-4), 960px);
}

.dialog[open] {
  display: flex;
  opacity: 1;
  transform: none;
}

@starting-style {
  .dialog[open] {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
}

.dialog::backdrop {
  background: rgb(6 21 37 / 0);
  backdrop-filter: blur(0);
  transition:
    background-color var(--duration) var(--ease-out),
    backdrop-filter var(--duration) var(--ease-out),
    overlay var(--duration) allow-discrete,
    display var(--duration) allow-discrete;
}

.dialog[open]::backdrop {
  background: rgb(6 21 37 / 0.62);
  backdrop-filter: blur(4px);
}

@starting-style {
  .dialog[open]::backdrop {
    background: rgb(6 21 37 / 0);
    backdrop-filter: blur(0);
  }
}

.dialog__panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  max-height: inherit;
}

.dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-5) 0 var(--space-6);
}

.dialog__header--floating {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding: var(--space-3);
}

.dialog__title {
  font-size: var(--text-2xl);
  color: var(--navy-900);
}

.dialog__close {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-left: auto;
  border: 0;
  border-radius: var(--radius-full);
  background: var(--gray-100);
  color: var(--gray-700);
  transition:
    background-color var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.dialog__close:hover {
  background: var(--gray-200);
  transform: rotate(90deg);
}

.dialog__body {
  padding: var(--space-5) var(--space-6) var(--space-6);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.dialog__footer {
  padding: var(--space-4) var(--space-6) var(--space-6);
  border-top: 1px solid var(--color-border);
}

@media (max-width: 599px) {
  .dialog__header {
    padding: var(--space-4) var(--space-4) 0 var(--space-5);
  }

  .dialog__body {
    padding: var(--space-4) var(--space-5) var(--space-5);
  }

  .dialog__footer {
    padding: var(--space-4) var(--space-5) var(--space-5);
  }
}
</style>
