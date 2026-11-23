import { describe, expect, it, vi } from 'vitest'
import { ApiError, getJson } from '@/api/http'

const jsonResponse = (body, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
})

describe('getJson', () => {
  it('возвращает разобранный JSON', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse([{ id: 1 }]))
    await expect(getJson('/api/products', { fetchImpl })).resolves.toEqual([{ id: 1 }])
    expect(fetchImpl).toHaveBeenCalledWith('/api/products', expect.objectContaining({ signal: expect.any(AbortSignal) }))
  })

  it('превращает ошибку сервера в понятное сообщение', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(jsonResponse({}, 503))
    const error = await getJson('/api/products', { fetchImpl }).catch((e) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error.status).toBe(503)
    expect(error.message).toMatch(/Сервер временно недоступен/)
  })

  it('сообщает об отсутствии соединения', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(getJson('/api/products', { fetchImpl })).rejects.toThrow(/Нет соединения/)
  })

  it('прерывает запрос по таймауту', async () => {
    const fetchImpl = (url, { signal }) =>
      new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })))
      })
    await expect(getJson('/api/products', { fetchImpl, timeout: 10 })).rejects.toThrow(/слишком долго/)
  })
})
