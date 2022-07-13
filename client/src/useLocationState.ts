import { useLocation } from 'react-router-dom'

export function useLocationState<T = unknown>(): T {
  const { state } = useLocation()
  return state as T
}
