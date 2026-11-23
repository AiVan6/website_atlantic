<script setup>
import { useId, useTemplateRef } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'

const model = defineModel({ type: String, default: '' })

defineProps({
  placeholder: { type: String, default: 'Поиск…' },
  label: { type: String, default: 'Поиск' },
})

const inputId = useId()
const input = useTemplateRef('input')

function clear() {
  model.value = ''
  input.value?.focus()
}
</script>

<template>
  <div class="search" role="search">
    <label class="visually-hidden" :for="inputId">{{ label }}</label>
    <BaseIcon name="search" :size="20" class="search__icon" />
    <input
      :id="inputId"
      ref="input"
      v-model="model"
      type="search"
      class="search__input"
      :placeholder="placeholder"
      autocomplete="off"
      enterkeyhint="search"
      maxlength="80"
      @keydown.esc="clear"
    />
    <button v-if="model" type="button" class="search__clear" aria-label="Очистить поиск" @click="clear">
      <BaseIcon name="close" :size="18" />
    </button>
  </div>
</template>

<style scoped>
.search {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search__icon {
  position: absolute;
  left: var(--space-4);
  color: var(--gray-400);
  pointer-events: none;
}

.search__input {
  width: 100%;
  height: 52px;
  padding: 0 52px 0 48px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  font-size: var(--text-base);
  transition:
    border-color var(--duration) var(--ease-out),
    box-shadow var(--duration) var(--ease-out);
  appearance: none;
}

.search__input::placeholder {
  color: var(--gray-400);
}

.search__input::-webkit-search-cancel-button {
  display: none;
}

.search__input:hover {
  border-color: var(--gray-400);
}

.search__input:focus {
  border-color: var(--blue-500);
  outline: none;
  box-shadow: 0 0 0 4px rgb(36 112 174 / 0.14);
}

.search__clear {
  position: absolute;
  right: var(--space-2);
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--gray-600);
}

.search__clear:hover {
  background: var(--gray-100);
}
</style>
