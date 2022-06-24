import { Heading, Panel } from '@navikt/ds-react'
import styled from 'styled-components'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { SjekkKanSøkeResponse } from '../types'

export interface BarnProps {
  sjekkKanSøke: SjekkKanSøkeResponse
}

export function Barn(props: BarnProps) {
  const { sjekkKanSøke } = props
  const { fnr, navn, alder } = sjekkKanSøke
  return (
    <PersonPanel>
      <Heading level="3" size="small">
        {`${navn} (${alder} år)`}
      </Heading>
      <Data>
        <Datum label="Fødselsnummer:">{fnr}</Datum>
      </Data>
    </PersonPanel>
  )
}

const PersonPanel = styled(Panel)`
  background-color: var(--navds-global-color-gray-50);
`
