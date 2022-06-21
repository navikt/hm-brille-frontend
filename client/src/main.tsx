import '@navikt/ds-css'
import { Modal } from '@navikt/ds-react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { GlobalStyle } from './GlobalStyle'
import { initMSW } from './mocks/initMSW'

initMSW().then(() => {
  const container = document.getElementById('root')!
  if (Modal.setAppElement) {
    Modal.setAppElement(container)
  }
  createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
})
