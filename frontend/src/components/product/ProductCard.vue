<script setup>
import { computed } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import ProductImage from './ProductImage.vue'
import { getCategoryLabel } from '@/config/categories'

const props = defineProps({
  product: { type: Object, required: true },
  eager: { type: Boolean, default: false },
})

const emit = defineEmits(['preview', 'order'])

const categoryLabel = computed(() => getCategoryLabel(props.product.type))
</script>

<template>
  <article class="card">
    <button
      type="button"
      class="card__media"
      :disabled="!product.imageUrl"
      :aria-label="`Увеличить фото: ${product.name}`"
      @click="emit('preview', product)"
    >
      <ProductImage :src="product.imageUrl" :alt="product.name" :eager="eager" />
      <span v-if="product.imageUrl" class="card__zoom" aria-hidden="true">
        <BaseIcon name="zoom" :size="18" />
      </span>
    </button>

    <div class="card__body">
      <p class="card__category">{{ categoryLabel }}</p>
      <h3 class="card__title">{{ product.name }}</h3>
      <BaseButton variant="secondary" size="sm" block class="card__action" @click="emit('order', product)">
        Как заказать?
      </BaseButton>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition:
    box-shadow var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out),
    border-color var(--duration) var(--ease-out);
}

.card:hover {
  border-color: transparent;
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.card__media {
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  padding: var(--space-4);
  border: 0;
  background: var(--white);
  cursor: zoom-in;
}

.card__media:disabled {
  cursor: default;
}

.card__media :deep(.pimg__img) {
  transform-origin: center;
}

.card:hover .card__media :deep(.pimg__img) {
  transform: scale(1.04);
}

.card__zoom {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: rgb(255 255 255 / 0.92);
  color: var(--navy-800);
  box-shadow: var(--shadow-sm);
  opacity: 0;
  transform: scale(0.9);
  transition:
    opacity var(--duration) var(--ease-out),
    transform var(--duration) var(--ease-out);
}

.card__media:hover .card__zoom,
.card__media:focus-visible .card__zoom {
  opacity: 1;
  transform: none;
}

.card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4);
  border-top: 1px solid var(--gray-100);
}

.card__category {
  overflow: hidden;
  color: var(--blue-500);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.card__title {
  display: -webkit-box;
  min-height: 2.6em;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  line-height: 1.3;
  color: var(--navy-900);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.card__title {
  margin-bottom: var(--space-3);
}

.card__action {
  margin-top: auto;
}

@media (hover: none) {
  .card__zoom {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 479px) {
  .card__media {
    padding: var(--space-3);
  }

  .card__body {
    padding: var(--space-3);
  }

  .card__title {
    font-size: var(--text-sm);
  }

  .card__category {
    font-size: 0.6875rem;
    letter-spacing: 0.03em;
  }

  .card__zoom {
    width: 32px;
    height: 32px;
  }
}
</style>
