import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { App } from './App'
import './i18n'

describe('App', () => {
  test('render', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Krav om direkte oppgjør av briller for barn')).toBeDefined()
  })
})
