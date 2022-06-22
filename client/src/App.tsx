import { Heading, Panel } from '@navikt/ds-react'
import { Route, Routes } from 'react-router-dom'
import { Søknad } from './søknad/Søknad'
import styled from 'styled-components'

const Banner = styled(Panel)`
background-color: var(--navds-global-color-gray-50);
text-align: center;
`

export function App() {
  return (
      <>
      <header><Banner><Heading level="1" size="large">Søknad om direkteoppgjør for barnebriler</Heading></Banner></header>
    <main>
      <Routes>
        <Route path="/" element={<Søknad />} />
      </Routes>
    </main>
    </>
  )
}
