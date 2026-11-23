import { getCategoryMeta } from '@/config/categories'

/** Нормализация для поиска: регистр, «ё», лишние пробелы. */
export function normalizeText(value) {
  return String(value ?? '')
    .toLocaleLowerCase('ru-RU')
    .replaceAll('ё', 'е')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Фильтрует товары по категории и поисковой строке.
 * Каждое слово запроса должно встречаться в названии товара или названии его категории.
 */
export function filterProducts(products, { query = '', type = '' } = {}) {
  const terms = normalizeText(query).split(' ').filter(Boolean)

  return products.filter((product) => {
    if (type && product.type !== type) return false
    if (terms.length === 0) return true

    const haystack = normalizeText(`${product.name} ${getCategoryMeta(product.type).label}`)
    return terms.every((term) => haystack.includes(term))
  })
}

/**
 * Список категорий с количеством товаров и обложкой (первый товар с фото),
 * отсортированный согласно CATEGORY_META.
 */
export function buildCategories(products) {
  const byType = new Map()

  for (const product of products) {
    const entry = byType.get(product.type)
    if (entry) {
      entry.count += 1
      entry.coverUrl ??= product.imageUrl
    } else {
      byType.set(product.type, { ...getCategoryMeta(product.type), count: 1, coverUrl: product.imageUrl ?? null })
    }
  }

  return [...byType.values()].sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, 'ru'))
}

/** Склонение: pluralize(5, ['позиция', 'позиции', 'позиций']) → «позиций». */
export function pluralize(count, [one, few, many]) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}
