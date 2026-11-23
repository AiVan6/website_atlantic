/**
 * Отображение кодов категорий из БД (поле products.type) в понятные названия.
 * Порядок массива задаёт порядок категорий в интерфейсе. Неизвестные коды
 * не теряются: они выводятся в конце списка под своим исходным названием.
 */
export const CATEGORY_META = [
  { type: 'ХК', label: 'Холодное копчение', icon: 'snowflake' },
  { type: 'ГК', label: 'Горячее копчение', icon: 'flame' },
  { type: 'Соленая', label: 'Солёная рыба', icon: 'droplet' },
  { type: 'Салат', label: 'Салаты', icon: 'leaf' },
  { type: 'Снеки', label: 'Снеки', icon: 'package' },
  { type: 'Вяленая', label: 'Вяленая рыба', icon: 'sun' },
  { type: 'Сладости', label: 'Сладости', icon: 'candy' },
  { type: 'Другое', label: 'Другое', icon: 'grid' },
]

const metaByType = new Map(CATEGORY_META.map((meta, index) => [meta.type, { ...meta, order: index }]))

export function getCategoryMeta(type) {
  return metaByType.get(type) ?? { type, label: type || 'Без категории', icon: 'grid', order: CATEGORY_META.length }
}

export function getCategoryLabel(type) {
  return getCategoryMeta(type).label
}
