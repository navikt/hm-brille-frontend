import { Alert, Heading, Panel } from '@navikt/ds-react'
import { useState } from 'react'
import { Avstand } from '../components/Avstand'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { Nullable, Person } from '../types'
import { HentPersonForm } from './HentPersonForm'
import { SøknadForm } from './SøknadForm'

export interface SøknadProps {}

export function Søknad(props: SøknadProps) {
  const {} = props
  const [person, setPerson] = useState<Nullable<Person>>(null)
  return (
    <Panel>
      <Heading level="1" size="xlarge" spacing>
        Søknad om direkteoppgjør til barnebriller
      </Heading>
      <Heading level="2" size="large" spacing>
        Informasjon om barnet
      </Heading>
      <HentPersonForm onPersonHentet={(person) => setPerson(person)} />
      {person && (
        <Avstand marginTop={5} marginBottom={5}>
          <Alert variant="success">
            <Heading level="3" size="small">
              {`${person.fornavn} ${person.etternavn}`}
            </Heading>
            <Data>
              <Datum label="Fødselsnummer:">{person.fnr}</Datum>
            </Data>
          </Alert>
        </Avstand>
      )}
      <SøknadForm />
    </Panel>
  )
}
