import { HttpError } from './error'
import type { Resultat } from './types'

export const BASE_URL = '/api'
export const CONTENT_TYPE_APPLICATION_JSON = 'application/json'

async function handleResponse<T>(url: string, response: Response): Promise<Resultat<T>> {
  if (response.ok) {
    const data = await response.json()
    return { data }
  }
  return HttpError.kallFeilet(url, response)
}

export const http = {
  async get<T>(url: string): Promise<Resultat<T>> {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'get',
        headers: {
          Accept: CONTENT_TYPE_APPLICATION_JSON,
        },
      })
      return handleResponse(url, response)
    } catch (error: unknown) {
      return HttpError.wrap(error)
    }
  },
  async post<B, T>(url: string, body: B): Promise<Resultat<T>> {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'post',
        headers: {
          Accept: CONTENT_TYPE_APPLICATION_JSON,
          'Content-Type': CONTENT_TYPE_APPLICATION_JSON,
        },
        body: JSON.stringify(body),
      })
      return handleResponse(url, response)
    } catch (error: unknown) {
      return HttpError.wrap(error)
    }
  },
}
