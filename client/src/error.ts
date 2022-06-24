import type { Resultat } from './types'

export class HttpError extends Error {
  static kallFeilet<T>(url: string, response: Response): Resultat<T> {
    return {
      error: new HttpError(`Kall mot url: '${url}' feilet, status: ${response.status}`, response.status),
    }
  }

  static wrap<T>(error: unknown): Resultat<T> {
    let wrapped: HttpError
    if (error instanceof Error) {
      wrapped = new HttpError(error.message, 500, { cause: error })
    } else if (typeof error === 'string') {
      wrapped = new HttpError(error, 500)
    } else {
      wrapped = new HttpError('Ukjent feil', 500)
    }
    return {
      error: wrapped,
    }
  }

  constructor(message: string, readonly status: number, options?: ErrorOptions) {
    super(message, options)
  }

  private statusIs = (status: number) => (): boolean => this.status === status
  is400 = this.statusIs(400)
  is401 = this.statusIs(401)
  is404 = this.statusIs(404)
  is500 = this.statusIs(500)
}

export function isError(value: unknown): value is Error {
  return value instanceof Error
}

export function isHttpError(value: unknown): value is HttpError {
  return value instanceof HttpError
}

export function hentUtviklerinformasjon(error?: Error): string {
  if (!isError(error)) {
    return ''
  }
  if (isError(error.cause)) {
    return `${error.stack}\nCaused by:\n${hentUtviklerinformasjon(error.cause)}`
  }
  return error.stack || ''
}
