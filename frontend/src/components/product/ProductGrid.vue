<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import StateMessage from '@/components/ui/StateMessage.vue'
import ProductCard from './ProductCard.vue'
import ProductLightbox from './ProductLightbox.vue'
import { useOrderDialog } from '@/composables/useOrderDialog'

/**
 * Сетка товаров с состояниями загрузки, ошибки и пустого результата.
 * Пустое состояние настраивается через слот #empty.
 */
const props = defineProps({
  products: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
  skeletonCount: { type: Number, default: 8 },
  /** Сколько первых карточек грузить без lazy (первый экран). */
  eagerCount: { type: Number, default: 4 },
})

const emit = defineEmits(['retry'])

const { open: openOrder } = useOrderDialog()
const previewIndex = ref(-1)

function preview(product) {
  previewIndex.value = props.products.indexOf(product)
}
</script>

<template>
  <div class="grid-wrap" :aria-busy="loading">
    <ul v-if="loading" class="grid" aria-hidden="true">
      <li v-for="n in skeletonCount" :key="n" class="skeleton">
        <div class="skeleton__media"></div>
        <div class="skeleton__body">
          <span class="skeleton__line skeleton__line--short"></span>
          <span class="skeleton__line"></span>
          <span class="skeleton__button"></span>
        </div>
      </li>
    </ul>

    <StateMessage v-else-if="error" tone="error" icon="refresh" title="Не удалось загрузить каталог">
      {{ error }}
      <template #actions>
        <BaseButton icon="refresh" @click="emit('retry')">Повторить</BaseButton>
      </template>
    </StateMessage>

    <slot v-else-if="products.length === 0" name="empty">
      <StateMessage title="Товаров пока нет" icon="package" />
    </slot>

    <TransitionGroup v-else tag="ul" name="grid" class="grid">
      <li v-for="(product, index) in products" :key="product.id">
        <ProductCard
          :product="product"
          :eager="index < eagerCount"
          @preview="preview"
          @order="openOrder"
        />
      </li>
    </TransitionGroup>

    <ProductLightbox v-model:index="previewIndex" :products="products" @order="openOrder" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 230px), 1fr));
  gap: var(--space-5);
}

.grid > li {
  min-width: 0;
}

@media (max-width: 599px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-3);
  }
}

/* Анимация появления карточек при фильтрации */
.grid-enter-active {
  transition:
    opacity var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.grid-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

/* Скелетоны */
.skeleton {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.skeleton__media,
.skeleton__line,
.skeleton__button {
  background: linear-gradient(100deg, var(--gray-100) 30%, var(--gray-50) 50%, var(--gray-100) 70%) 0 0 / 300% 100%;
  animation: shimmer 1.4s linear infinite;
}

.skeleton__media {
  aspect-ratio: 1 / 1;
}

.skeleton__body {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
}

.skeleton__line {
  height: 14px;
  border-radius: 6px;
}

.skeleton__line--short {
  width: 45%;
  height: 10px;
}

.skeleton__button {
  height: 40px;
  margin-top: var(--space-3);
  border-radius: var(--radius-full);
}

@keyframes shimmer {
  to {
    background-position: -150% 0;
  }
}
</style>
