import { computed, readonly, ref, shallowRef } from 'vue'
import { fetchProducts } from '@/api/products'
import { buildCategories } from '@/utils/catalog'

/**
 * Общее (на всё приложение) хранилище каталога.
 * Данные загружаются один раз и переиспользуются главной страницей и каталогом;
 * параллельные вызовы load() разделяют один запрос.
 */
export function createProductStore(loader = fetchProducts) {
  const products = shallowRef([])
  const status = ref('idle') // idle | loading | success | error
  const error = ref(null)
  let pending = null

  async function load({ force = false } = {}) {
    if (pending) return pending
    if (status.value === 'success' && !force) return products.value

    status.value = 'loading'
    error.value = null

    pending = loader()
      .then((data) => {
        products.value = data
        status.value = 'success'
        return data
      })
      .catch((err) => {
        error.value = err?.message || 'Не удалось загрузить каталог.'
        status.value = 'error'
        return products.value
      })
      .finally(() => {
        pending = null
      })

    return pending
  }

  const categories = computed(() => buildCategories(products.value))
  const isLoading = computed(() => status.value === 'idle' || status.value === 'loading')

  return {
    products: readonly(products),
    categories,
    status: readonly(status),
    error: readonly(error),
    isLoading,
    load,
  }
}

const store = createProductStore()

export function useProducts() {
  store.load()
  return store
}
