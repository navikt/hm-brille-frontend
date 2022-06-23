import { Heading, Panel } from '@navikt/ds-react'
import { useState } from 'react'
import { Avstand } from '../components/Avstand'
import { Nullable, Person } from '../types'
import { Barn } from './Barn'
import { HentPersonForm } from './HentPersonForm'
import { IkkeRettighet } from './IkkeRettighet'
import { SøknadForm } from './SøknadForm'

export interface SøknadProps {}

export function Søknad(props: SøknadProps) {
  const {} = props
  const [person, setPerson] = useState<Nullable<Person>>(null)
  return (
    <Panel>
      <Heading level="2" size="large" spacing>
        Informasjon om barnet
      </Heading>
      <HentPersonForm onPersonHentet={(person) => setPerson(person)} />
      {person && (
        <Avstand marginTop={5} marginBottom={5}>
          <Barn person={person} />
          {!person.kanSøke ? (
            <Avstand marginTop={5} marginBottom={5}>
              <IkkeRettighet />
            </Avstand>
          ) : (
            <SøknadForm />
          )}
        </Avstand>
      )}
    </Panel>
  )
}
