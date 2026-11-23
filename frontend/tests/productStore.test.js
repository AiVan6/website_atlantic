import { describe, expect, it, vi } from 'vitest'
import { createProductStore } from '@/composables/useProducts'

describe('createProductStore', () => {
  it('загружает данные один раз и разделяет параллельные запросы', async () => {
    const loader = vi.fn().mockResolvedValue([{ id: 1, name: 'Кета', type: 'ХК', imageUrl: null }])
    const store = createProductStore(loader)

    expect(store.isLoading.value).toBe(true)
    await Promise.all([store.load(), store.load()])
    await store.load()

    expect(loader).toHaveBeenCalledTimes(1)
    expect(store.status.value).toBe('success')
    expect(store.products.value).toHaveLength(1)
    expect(store.categories.value[0]).toMatchObject({ type: 'ХК', count: 1 })
  })

  it('сохраняет ошибку и позволяет повторить загрузку', async () => {
    const loader = vi
      .fn()
      .mockRejectedValueOnce(new Error('Нет соединения'))
      .mockResolvedValueOnce([{ id: 2, name: 'Лещ', type: 'ГК', imageUrl: null }])
    const store = createProductStore(loader)

    await store.load()
    expect(store.status.value).toBe('error')
    expect(store.error.value).toBe('Нет соединения')

    await store.load({ force: true })
    expect(store.status.value).toBe('success')
    expect(store.error.value).toBeNull()
    expect(store.products.value[0].name).toBe('Лещ')
  })
})
