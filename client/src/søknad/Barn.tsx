import { Heading, Panel } from '@navikt/ds-react'
import styled from 'styled-components'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { Person } from '../types'

interface BarnProps {
  person: Person
}

const PersonPanel = styled(Panel)`
  background-color: var(--navds-global-color-gray-50);
`

export function Barn(props: BarnProps) {
  const { person } = props
  return (
    <PersonPanel>
      <Heading level="3" size="small">
        {`${person.navn} (${person.alder} år)`}
      </Heading>
      <Data>
        <Datum label="Fødselsnummer:">{person.fnr}</Datum>
      </Data>
    </PersonPanel>
  )
}
