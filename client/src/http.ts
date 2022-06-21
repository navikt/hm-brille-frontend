import { Resultat } from './types'

export const BASE_URL = '/api'

export const http = {
  async get<T>(url: string): Promise<Resultat<T>> {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      })
      if (response.ok) {
        const data = await response.json()
        return { data }
      }
      return {
        error: new Error(`Kall mot url: ${url} feilet, status: ${response.status}`),
      }
    } catch (error: unknown) {
      return { error: wrapError(error) }
    }
  },
  async post<B, T>(url: string, body: B): Promise<Resultat<T>> {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'post',
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
        error: new Error(`Kall mot url: ${url} feilet, status: ${response.status}`),
      }
    } catch (error: unknown) {
      return { error: wrapError(error) }
    }
  },
}

function wrapError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }
  if (typeof error === 'string') {
    return new Error(error)
  }
  return new Error('Ukjent feil')
}
