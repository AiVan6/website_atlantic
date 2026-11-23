<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { getCategoryLabel } from '@/config/categories'

/** Просмотр фото товара с переключением между товарами текущего списка (кнопки и стрелки клавиатуры). */
const props = defineProps({
  products: { type: Array, required: true },
})

const index = defineModel('index', { type: Number, default: -1 })
const emit = defineEmits(['order'])

const withImages = computed(() => props.products.filter((product) => product.imageUrl))
const current = computed(() => props.products[index.value] ?? null)
const position = computed(() => withImages.value.indexOf(current.value))
const hasSiblings = computed(() => withImages.value.length > 1)

const open = computed({
  get: () => current.value !== null,
  set: (value) => {
    if (!value) index.value = -1
  },
})

function step(delta) {
  const list = withImages.value
  if (list.length < 2 || position.value < 0) return
  const next = list[(position.value + delta + list.length) % list.length]
  index.value = props.products.indexOf(next)
}

function onKeydown(event) {
  if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
}

function order() {
  const product = current.value
  open.value = false
  emit('order', product)
}
</script>

<template>
  <BaseDialog v-model:open="open" :title="current?.name ?? ''" size="lg" @keydown="onKeydown">
    <div v-if="current" class="lightbox">
      <figure class="lightbox__figure">
        <img :key="current.id" :src="current.imageUrl" :alt="current.name" class="lightbox__img" />
        <button
          v-if="hasSiblings"
          type="button"
          class="lightbox__nav lightbox__nav--prev"
          aria-label="Предыдущий товар"
          @click="step(-1)"
        >
          <BaseIcon name="arrow-left" :size="22" />
        </button>
        <button
          v-if="hasSiblings"
          type="button"
          class="lightbox__nav lightbox__nav--next"
          aria-label="Следующий товар"
          @click="step(1)"
        >
          <BaseIcon name="arrow-right" :size="22" />
        </button>
      </figure>
    </div>

    <template #footer>
      <div v-if="current" class="lightbox__footer">
        <div class="lightbox__meta">
          <span class="lightbox__category">{{ getCategoryLabel(current.type) }}</span>
          <span v-if="hasSiblings" class="lightbox__counter">{{ position + 1 }} / {{ withImages.length }}</span>
        </div>
        <BaseButton icon="message" @click="order">Как заказать?</BaseButton>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>
.lightbox__figure {
  position: relative;
  display: grid;
  place-items: center;
  margin: 0;
  height: min(62vh, 620px);
  border-radius: var(--radius-md);
  background: var(--white);
}

.lightbox__img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  animation: fade-in var(--duration-slow) var(--ease-out);
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: rgb(255 255 255 / 0.92);
  color: var(--navy-900);
  box-shadow: var(--shadow-md);
  transform: translateY(-50%);
  transition:
    background-color var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.lightbox__nav:hover {
  background: var(--white);
  transform: translateY(-50%) scale(1.06);
}

.lightbox__nav--prev {
  left: 0;
}

.lightbox__nav--next {
  right: 0;
}

.lightbox__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.lightbox__meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.lightbox__category {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  background: var(--aqua-50);
  color: var(--blue-600);
  font-size: var(--text-sm);
  font-weight: 600;
}

.lightbox__counter {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 599px) {
  .lightbox__figure {
    height: min(52vh, 460px);
  }

  .lightbox__nav {
    width: 40px;
    height: 40px;
  }

  .lightbox__footer :deep(.btn) {
    width: 100%;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}
</style>
