import { Office1, SaveFile } from '@navikt/ds-icons'
import { Alert, BodyLong, Button, Heading } from '@navikt/ds-react'
import styled from 'styled-components'
import { Data } from '../components/Data'
import { DataPanel } from '../components/DataPanel'
import { Datum } from '../components/Datum'
import { VirksomhetResponse } from '../types'

export interface VirksomhetProps {
  data: VirksomhetResponse
  onLagre: Function
}

const IkonContainer = styled.div`
  padding-right: 1rem;
`

export function Virksomhet(props: VirksomhetProps) {
  const { data, onLagre } = props
  const { organisasjonsnummer, orgnavn, forretningsadresse, harNavAvtale } = data

  if (!harNavAvtale) {
    return (
      <Alert variant="warning">
        <Heading size="small">Mangler avtale med NAV</Heading>
        <BodyLong>{`"${orgnavn}" har ikke ingått avtale med NAV om direkteoppgjør enda. Det er ikke mulig å søke om direkteoppgjør enda.`}</BodyLong>
      </Alert>
    )
  }

  return (
    <>
      <DataPanel>
        <Heading level="3" size="small">
          <Office1 /> {`${orgnavn}`}
        </Heading>
        <Data>
          <Datum label="Org. nummer:">{organisasjonsnummer}</Datum>
          {forretningsadresse && (
            <Datum label="forretningsadresse:">
              {forretningsadresse.adresse.map((a) => a)}, {forretningsadresse.postnummer} {forretningsadresse.poststed}
            </Datum>
          )}
        </Data>
      </DataPanel>
      <Button variant="tertiary" size="medium" onClick={() => onLagre({ organisasjonsnummer, orgnavn })}>
        <SaveFile />
        Lagre
      </Button>
    </>
  )
}
