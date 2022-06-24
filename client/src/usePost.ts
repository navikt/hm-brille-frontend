import { useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { http } from './http'
import { Resultat } from './types'

export function usePost<B, T>(url: string): { post(body: B): Promise<void> } & Resultat<T> {
  const [resultat, setResultat] = useState<Resultat<T>>({})
  useErrorHandler(resultat.error)
  return {
    async post(body) {
      setResultat(await http.post<B, T>(url, body))
    },
    ...resultat,
  }
}
