const DEFAULT_TIMEOUT_MS = 10_000

export class ApiError extends Error {
  constructor(message, { status = 0, cause } = {}) {
    super(message, { cause })
    this.name = 'ApiError'
    this.status = status
  }
}

function messageForStatus(status) {
  if (status >= 500) return 'Сервер временно недоступен. Попробуйте обновить страницу чуть позже.'
  if (status === 404) return 'Запрошенные данные не найдены.'
  return 'Не удалось загрузить данные.'
}

/**
 * GET-запрос к API с таймаутом и единообразными ошибками.
 * @returns {Promise<any>} разобранный JSON
 */
export async function getJson(path, { timeout = DEFAULT_TIMEOUT_MS, fetchImpl = globalThis.fetch } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  let response
  try {
    response = await fetchImpl(path, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
  } catch (error) {
    const message =
      error?.name === 'AbortError'
        ? 'Сервер слишком долго не отвечает. Проверьте подключение и попробуйте снова.'
        : 'Нет соединения с сервером. Проверьте подключение к интернету.'
    throw new ApiError(message, { cause: error })
  } finally {
    clearTimeout(timer)
  }

  if (!response.ok) {
    throw new ApiError(messageForStatus(response.status), { status: response.status })
  }

  try {
    return await response.json()
  } catch (error) {
    throw new ApiError('Получен некорректный ответ сервера.', { status: response.status, cause: error })
  }
}
