import { Heading, Panel } from '@navikt/ds-react'
import styled from 'styled-components'
import { Data } from '../components/Data'
import { DataPanel } from '../components/DataPanel'
import { Datum } from '../components/Datum'
import { HentBrukerResponse } from '../types'

export interface BarnProps {
  data: HentBrukerResponse
}

export function Barn(props: BarnProps) {
  const { fnr, navn, alder } = props.data

  return (
    <DataPanel>
      <Heading level="3" size="small">
        {`${navn} (${alder} år)`}
      </Heading>
      <Data>
        <Datum label="Fødselsnummer:">{fnr}</Datum>
      </Data>
    </DataPanel>
  )
}
