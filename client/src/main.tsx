import '@navikt/ds-css/darkside'
import { Theme } from '@navikt/ds-react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig, SWRConfiguration } from 'swr'
import { App } from './App'
import { GlobalStyle } from './GlobalStyle'
import { baseUrl, http } from './http'
import './i18n'
import { initMSW } from './mocks/initMSW'
import { initAmplitude } from './utils/amplitude'
import './stylesheet/styles.scss'
import { initSentry } from './utils/sentry'

const swrConfig: SWRConfiguration = {
  async fetcher(url: string) {
    return http.get(url)
  },
}

initAmplitude()
initSentry()

initMSW().then(() => {
  const container = document.getElementById('root')!

  createRoot(container).render(
    <React.StrictMode>
      <GlobalStyle />
      <SWRConfig value={swrConfig}>
        <BrowserRouter basename={baseUrl()}>
          <Theme>
            <App />
          </Theme>
        </BrowserRouter>
      </SWRConfig>
    </React.StrictMode>
  )
})
