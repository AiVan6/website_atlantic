import { describe, expect, it } from 'vitest'
import { buildCategories, filterProducts, normalizeText, pluralize } from '@/utils/catalog'
import { getCategoryLabel } from '@/config/categories'

const products = [
  { id: 1, name: 'Язь пласт', type: 'ХК', imageUrl: '/img/1.jpg' },
  { id: 2, name: 'Кета боковник', type: 'ГК', imageUrl: null },
  { id: 3, name: 'Ёрш вяленый', type: 'Вяленая', imageUrl: '/img/3.jpg' },
  { id: 4, name: 'Кета', type: 'ХК', imageUrl: '/img/4.jpg' },
  { id: 5, name: 'Салат из морской капусты', type: 'Салат', imageUrl: null },
  { id: 6, name: 'Нечто', type: 'Новинка', imageUrl: null },
]

describe('normalizeText', () => {
  it('приводит регистр, заменяет ё и схлопывает пробелы', () => {
    expect(normalizeText('  ЁРШ   Вяленый ')).toBe('ерш вяленый')
    expect(normalizeText(null)).toBe('')
  })
})

describe('filterProducts', () => {
  it('без фильтров возвращает все товары', () => {
    expect(filterProducts(products)).toHaveLength(products.length)
  })

  it('фильтрует по категории', () => {
    expect(filterProducts(products, { type: 'ХК' }).map((p) => p.id)).toEqual([1, 4])
  })

  it('ищет без учёта регистра и буквы ё', () => {
    expect(filterProducts(products, { query: 'ерш' }).map((p) => p.id)).toEqual([3])
    expect(filterProducts(products, { query: 'КЕТА' }).map((p) => p.id)).toEqual([2, 4])
  })

  it('требует совпадения всех слов и учитывает название категории', () => {
    expect(filterProducts(products, { query: 'кета горячее' }).map((p) => p.id)).toEqual([2])
    expect(filterProducts(products, { query: 'холодное' }).map((p) => p.id)).toEqual([1, 4])
  })

  it('сочетает поиск и категорию', () => {
    expect(filterProducts(products, { query: 'кета', type: 'ГК' }).map((p) => p.id)).toEqual([2])
  })
})

describe('buildCategories', () => {
  it('считает товары, выбирает обложку и сортирует по заданному порядку', () => {
    const categories = buildCategories(products)
    expect(categories.map((c) => c.type)).toEqual(['ХК', 'ГК', 'Салат', 'Вяленая', 'Новинка'])
    expect(categories[0]).toMatchObject({ label: 'Холодное копчение', count: 2, coverUrl: '/img/1.jpg' })
    expect(categories[1].coverUrl).toBeNull()
  })

  it('не теряет неизвестные категории', () => {
    expect(getCategoryLabel('Новинка')).toBe('Новинка')
    expect(getCategoryLabel('Салат')).toBe('Салаты')
  })
})

describe('pluralize', () => {
  const forms = ['позиция', 'позиции', 'позиций']
  it.each([
    [1, 'позиция'],
    [3, 'позиции'],
    [5, 'позиций'],
    [11, 'позиций'],
    [21, 'позиция'],
    [24, 'позиции'],
    [155, 'позиций'],
  ])('%i → %s', (count, expected) => {
    expect(pluralize(count, forms)).toBe(expected)
  })
})
