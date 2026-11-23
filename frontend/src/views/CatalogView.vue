<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import StateMessage from '@/components/ui/StateMessage.vue'
import CategoryChips from '@/components/product/CategoryChips.vue'
import ProductGrid from '@/components/product/ProductGrid.vue'
import SearchField from '@/components/product/SearchField.vue'
import ContactLinks from '@/components/contact/ContactLinks.vue'
import { priceDisclaimer } from '@/config/site'
import { useProducts } from '@/composables/useProducts'
import { filterProducts, pluralize } from '@/utils/catalog'

const URL_SYNC_DELAY_MS = 300

const route = useRoute()
const router = useRouter()
const { products, categories, isLoading, error, load } = useProducts()

const queryParam = (value) => (typeof value === 'string' ? value : '')

// Фильтры хранятся в URL (?q=…&type=…): ссылкой на подборку можно поделиться, «назад» работает ожидаемо.
const search = ref(queryParam(route.query.q))

const selectedType = computed({
  get() {
    const type = queryParam(route.query.type)
    // Пока каталог грузится, доверяем URL; после загрузки отбрасываем несуществующие категории.
    if (isLoading.value || categories.value.some((category) => category.type === type)) return type
    return ''
  },
  set(type) {
    updateQuery({ type: type || undefined })
  },
})

function updateQuery(patch) {
  router.replace({ query: { ...route.query, ...patch } })
}

let syncTimer = 0
watch(search, (value) => {
  clearTimeout(syncTimer)
  syncTimer = setTimeout(() => updateQuery({ q: value.trim() || undefined }), URL_SYNC_DELAY_MS)
})
watch(
  () => route.query.q,
  (value) => {
    const fromUrl = queryParam(value)
    if (fromUrl !== search.value.trim()) search.value = fromUrl
  },
)
onBeforeUnmount(() => clearTimeout(syncTimer))

const filtered = computed(() => filterProducts(products.value, { query: search.value, type: selectedType.value }))
const hasFilters = computed(() => Boolean(search.value.trim() || selectedType.value))

const resultLabel = computed(() => {
  const count = filtered.value.length
  return `${count} ${pluralize(count, ['позиция', 'позиции', 'позиций'])}`
})

function resetFilters() {
  clearTimeout(syncTimer)
  search.value = ''
  router.replace({ query: {} })
}
</script>

<template>
  <PageHeader
    title="Каталог продукции"
    :breadcrumbs="[{ label: 'Главная', to: { name: 'home' } }, { label: 'Каталог' }]"
  >
    {{ priceDisclaimer }}
  </PageHeader>

  <section class="catalog" aria-label="Товары">
    <div class="catalog__toolbar">
      <div class="container catalog__toolbar-inner">
        <div class="catalog__search-row">
          <SearchField v-model="search" placeholder="Найти: кета, скумбрия, кальмар…" label="Поиск по каталогу" />
          <p class="catalog__count" aria-live="polite">
            <template v-if="!isLoading && !error">Найдено: <strong>{{ resultLabel }}</strong></template>
          </p>
        </div>
        <CategoryChips v-if="!error" v-model="selectedType" :categories="categories" :total="products.length" />
      </div>
    </div>

    <div class="container catalog__results">
      <ProductGrid :products="filtered" :loading="isLoading" :error="error" @retry="load({ force: true })">
        <template #empty>
          <StateMessage icon="search" title="Ничего не найдено">
            Попробуйте изменить запрос или выбрать другую категорию. Если нужного товара нет в каталоге — уточните
            наличие у менеджера.
            <template #actions>
              <BaseButton v-if="hasFilters" icon="refresh" @click="resetFilters">Сбросить фильтры</BaseButton>
            </template>
          </StateMessage>
        </template>
      </ProductGrid>

      <aside class="catalog__help" aria-label="Помощь с выбором">
        <div>
          <h2 class="catalog__help-title">Не нашли нужное?</h2>
          <p class="catalog__help-text">Напишите или позвоните нам — подскажем по ассортименту и наличию.</p>
        </div>
        <ContactLinks compact message="Здравствуйте! Подскажите, пожалуйста, по ассортименту." />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.catalog {
  padding-bottom: var(--section-y);
}

.catalog__toolbar {
  position: sticky;
  top: var(--header-h);
  z-index: 20;
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: rgb(245 247 250 / 0.92);
  backdrop-filter: saturate(1.4) blur(12px);
}

.catalog__toolbar-inner {
  display: grid;
  gap: var(--space-3);
}

.catalog__search-row {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.catalog__search-row > :first-child {
  flex: 0 1 560px;
}

.catalog__count {
  margin-left: auto;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  white-space: nowrap;
}

.catalog__count strong {
  color: var(--navy-900);
}

.catalog__results {
  padding-top: var(--space-6);
}

.catalog__help {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-8);
  padding: var(--space-5) var(--space-6);
  border-radius: var(--radius-lg);
  background: linear-gradient(120deg, var(--navy-800), var(--navy-700));
  color: var(--white);
}

.catalog__help-title {
  font-size: var(--text-xl);
}

.catalog__help-text {
  color: var(--color-text-inverse-muted);
}

.catalog__help :deep(.contact) {
  border: 0;
  background: none;
}

.catalog__help :deep(.contact__icon) {
  width: 48px;
  height: 48px;
  background: rgb(255 255 255 / 0.1);
  color: var(--white);
}

@media (max-width: 599px) {
  .catalog__toolbar {
    padding-block: var(--space-3);
  }

  .catalog__search-row {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2);
  }

  .catalog__search-row > :first-child {
    flex-basis: auto;
  }

  .catalog__count {
    display: none;
  }

  .catalog__results {
    padding-top: var(--space-4);
  }

  .catalog__help {
    padding: var(--space-5);
  }
}
</style>
