import '@navikt/ds-css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { GlobalStyle } from './GlobalStyle'
import { initMSW } from './mocks/initMSW'

declare global {
  interface Window {
    appSettings: {
      GIT_COMMIT?: string
      MILJO?: 'labs-gcp' | 'dev-gcp' | 'prod-gcp'
      USE_MSW?: boolean
    }
  }
}

initMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
})
