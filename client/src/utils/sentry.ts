import * as Sentry from '@sentry/react'
import { browserTracingIntegration } from "@sentry/react";

const NAIS_CLUSTER_NAME = window.appSettings?.NAIS_CLUSTER_NAME
const USE_MSW = window.appSettings?.USE_MSW

export function initSentry() {
  Sentry.init({
    dsn: 'https://2c6044e4012c41f8b7b6000569dbf08d@sentry.gc.nav.no/165',
    integrations: [browserTracingIntegration()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    // tracesSampleRate: 1.0,
    denyUrls: [
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      // Safari extensions
      /^safari-extension:/i,
      // external scripts
      /psplugin/,
      /dekoratoren\/client/,
    ],
    enabled: (NAIS_CLUSTER_NAME === 'dev-gcp' && USE_MSW === false) || NAIS_CLUSTER_NAME === 'prod-gcp',
    environment: NAIS_CLUSTER_NAME,
  })
}
