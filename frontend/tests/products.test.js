import { describe, expect, it } from 'vitest'
import { normalizeProduct, toSafeImageUrl } from '@/api/products'

describe('toSafeImageUrl', () => {
  it('пропускает пути собственного origin', () => {
    expect(toSafeImageUrl('/img/products/%D0%A5%D0%9A/a.jpg')).toBe('/img/products/%D0%A5%D0%9A/a.jpg')
  })

  it.each([
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'https://evil.example/a.png',
    '//evil.example/a.png',
    '/\\evil.example/a.png',
    '/img\\..\\a.png',
    'img/a.png',
    '',
    null,
    42,
  ])('отбрасывает %s', (value) => {
    expect(toSafeImageUrl(value)).toBeNull()
  })
})

describe('normalizeProduct', () => {
  it('сохраняет корректную запись, обрезая пробелы', () => {
    expect(normalizeProduct({ id: 1, name: ' Кета ', type: 'ХК', imageUrl: '/img/a.jpg', extra: 'x' })).toEqual({
      id: 1,
      name: 'Кета',
      type: 'ХК',
      imageUrl: '/img/a.jpg',
    })
  })

  it('обезвреживает небезопасный URL, но оставляет товар', () => {
    expect(normalizeProduct({ id: 2, name: 'Лещ', type: 'ГК', imageUrl: 'javascript:alert(1)' }).imageUrl).toBeNull()
  })

  it.each([null, 'str', {}, { id: '1', name: 'a' }, { id: 1, name: '  ' }, { id: 1, name: 5 }])(
    'отбрасывает некорректную запись %j',
    (raw) => {
      expect(normalizeProduct(raw)).toBeNull()
    },
  )

  it('заменяет нестроковую категорию пустой строкой', () => {
    expect(normalizeProduct({ id: 3, name: 'Икра', type: { $ne: 1 } }).type).toBe('')
  })
})
