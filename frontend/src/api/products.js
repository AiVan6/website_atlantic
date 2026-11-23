import { getJson } from './http'

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} type      код категории (ХК, ГК, …)
 * @property {string|null} imageUrl  закодированный URL изображения
 */

// Только путь на собственном origin: «/…», но не «//host» и не «/\host» (браузер считает их внешними).
const SAME_ORIGIN_PATH = /^\/(?![/\\])/

/** Безопасный URL изображения или null — данным API клиент не доверяет вслепую. */
export function toSafeImageUrl(value) {
  return typeof value === 'string' && SAME_ORIGIN_PATH.test(value) && !value.includes('\\') ? value : null
}

/**
 * Приводит запись API к ожидаемой форме; некорректные записи отбрасываются.
 * @returns {Product|null}
 */
export function normalizeProduct(raw) {
  if (!raw || typeof raw !== 'object') return null
  const { id, name, type, imageUrl } = raw
  if (!Number.isInteger(id) || typeof name !== 'string' || !name.trim()) return null
  return {
    id,
    name: name.trim(),
    type: typeof type === 'string' ? type : '',
    imageUrl: toSafeImageUrl(imageUrl),
  }
}

/** @returns {Promise<Product[]>} */
export async function fetchProducts(options) {
  const data = await getJson('/api/products', options)
  return Array.isArray(data) ? data.map(normalizeProduct).filter(Boolean) : []
}
