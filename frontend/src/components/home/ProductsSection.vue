<script setup>
import { computed } from 'vue'
import CategoryTiles from './CategoryTiles.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import StateMessage from '@/components/ui/StateMessage.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import { priceDisclaimer } from '@/config/site'
import { useProducts } from '@/composables/useProducts'

const FEATURED_COUNT = 4

const { products, categories, isLoading, error, load } = useProducts()
const featured = computed(() => products.value.slice(0, FEATURED_COUNT))
</script>

<template>
  <section id="products" class="section products" aria-labelledby="products-title">
    <div class="container">
      <div class="products__head">
        <SectionHeading eyebrow="Ассортимент" title="Продукция" title-id="products-title">
          Копчёная, солёная и вяленая рыба, салаты и снеки — выберите категорию, чтобы перейти в каталог.
        </SectionHeading>
        <p class="products__note">
          <BaseIcon name="info" :size="18" />
          {{ priceDisclaimer }}
        </p>
      </div>

      <StateMessage v-if="error" tone="error" icon="refresh" title="Не удалось загрузить каталог">
        {{ error }}
        <template #actions>
          <BaseButton icon="refresh" @click="load({ force: true })">Повторить</BaseButton>
        </template>
      </StateMessage>

      <template v-else>
        <CategoryTiles :categories="categories" :loading="isLoading" />

        <div class="products__featured">
          <h3 class="products__subtitle">Популярные позиции</h3>
          <ProductGrid :products="featured" :loading="isLoading" :skeleton-count="FEATURED_COUNT" :eager-count="0" />
        </div>
      </template>

      <div class="products__more">
        <BaseButton :to="{ name: 'catalog' }" size="lg" icon-right="arrow-right">Смотреть весь каталог</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-5);
  margin-bottom: var(--space-7);
}

.products__note {
  display: flex;
  gap: var(--space-2);
  max-width: 360px;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--amber-100);
  color: #6b4a17;
  font-size: var(--text-sm);
}

.products__note .icon {
  margin-top: 2px;
}

.products__featured {
  margin-top: var(--space-8);
}

.products__subtitle {
  margin-bottom: var(--space-5);
  font-size: var(--text-2xl);
  color: var(--navy-900);
}

.products__more {
  display: flex;
  justify-content: center;
  margin-top: var(--space-7);
}

@media (max-width: 599px) {
  .products__more > * {
    width: 100%;
  }
}
</style>
