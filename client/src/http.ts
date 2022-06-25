import { HttpError } from './error'
import type { Resultat } from './types'

export const BASE_API_URL = '/api'

async function handleResponse<T>(url: string, response: Response): Promise<Resultat<T>> {
  if (response.ok) {
    const data = await response.json()
    return { data }
  }
  if (response.status === 404) {
    return { data: null }
  }
  return HttpError.kallFeilet(url, response)
}

export const http = {
  async get<T>(url: string): Promise<Resultat<T>> {
    try {
      const response = await fetch(BASE_API_URL + url, {
        method: 'get',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
      })
      return handleResponse(url, response)
    } catch (err: unknown) {
      return HttpError.wrap(err)
    }
  },
  async post<B, T>(url: string, body: B): Promise<Resultat<T>> {
    try {
      const response = await fetch(BASE_API_URL + url, {
        method: 'post',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      return handleResponse(url, response)
    } catch (err: unknown) {
      return HttpError.wrap(err)
    }
  },
}
