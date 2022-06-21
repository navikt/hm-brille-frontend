import { Heading, Panel } from '@navikt/ds-react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HentPersonForm } from './HentPersonForm'
import { SøknadForm } from './SøknadForm'
import { Nullable, Person } from './types'

export function App() {
  const [person, setPerson] = useState<Nullable<Person>>(null)

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <Panel>
              <Heading level="1" size="xlarge" spacing>
                Søknad om direkteoppgjør til barnebriller
              </Heading>
              <Heading level="2" size="large" spacing>
                Informasjon om barnet
              </Heading>
              <HentPersonForm onPersonHentet={(person) => setPerson(person)} />
              <SøknadForm person={person} />
            </Panel>
          }
        />
      </Routes>
    </main>
  )
}
