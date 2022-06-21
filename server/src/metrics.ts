import { collectDefaultMetrics, Registry } from 'prom-client'

export function setupMetrics(): Registry {
  const register = new Registry()
  collectDefaultMetrics({ register })
  return register
}
