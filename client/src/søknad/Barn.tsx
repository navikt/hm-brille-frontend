import { Heading } from '@navikt/ds-react'
import { Data } from '../components/Data'
import { DataPanel } from '../components/DataPanel'
import { Datum } from '../components/Datum'

export interface BarnProps {
  fnr: string
  navn: string
  alder?: number
}

export function Barn(props: BarnProps) {
  const { fnr, navn, alder } = props
  let alderTekst = typeof alder === 'number' ? ` (${alder} år)` : ''
  return (
    <DataPanel>
      <Heading level="3" size="small">
        {`${navn}${alderTekst}`}
      </Heading>
      <Data>
        <Datum label="Fødselsnummer:">{fnr}</Datum>
      </Data>
    </DataPanel>
  )
}
