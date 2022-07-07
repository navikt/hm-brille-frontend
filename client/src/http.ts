import { HttpError } from './error'
import type { Resultat } from './types'

export const BASE_API_URL = '/api'

export const http = {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(BASE_API_URL + url, {
        method: 'get',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(HttpError.kallFeilet(url, response))
    } catch (err: unknown) {
      return Promise.reject(HttpError.wrap(err))
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
      if (response.ok) {
        const data = await response.json()
        return { data }
      }
      return {
        error: HttpError.kallFeilet(url, response),
      }
    } catch (err: unknown) {
      return {
        error: HttpError.wrap(err),
      }
    }
  },
}
