import { useErrorHandler } from 'react-error-boundary'
import useSWR, { SWRResponse } from 'swr'
import type { HttpError } from './error'

export function useGet<T>(url: string | null): SWRResponse<T, HttpError> {
  const resultat = useSWR<T, HttpError>(url)
  useErrorHandler(resultat.error)
  return resultat
}
