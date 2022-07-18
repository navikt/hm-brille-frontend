import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { Data } from '../components/Data'
import { Dato } from '../components/Dato'
import { Datum } from '../components/Datum'
import { SøknadResponse } from '../types'
import { useLocationState } from '../useLocationState'
import { SøknadSteg } from './SøknadSteg'
import ScrollToTop from "../components/ScrollToTop";

export interface SøknadKvitteringProps {}

export function SøknadKvittering(props: SøknadKvitteringProps) {
  const {} = props
  const { id, orgnr, bestillingsreferanse, beløp, opprettet } = useLocationState<SøknadResponse>()
  return (
    <SøknadSteg>
      <ScrollToTop/>
      <Alert variant="success">Søknaden er godkjent</Alert>
      <Avstand marginBottom={5} />
      <BodyLong spacing>
        Søknaden om direkte oppgjør er automatisk godkjent. NAV vil utbetale bølpet til din virksomhet innen 30 dager.
      </BodyLong>
      <Heading level="2" size="medium">
        Kvittering
      </Heading>
      <Data labelColumnWidth={150}>
        <Datum label="Org. nummer">{orgnr}</Datum>
        <Datum label="Innsendt dato">
          <Dato verdi={opprettet}></Dato>
        </Datum>
        <Datum label="Beløp til utbetaling">{`${beløp} kr`}</Datum>
        <Datum label="Deres referansenr.">{bestillingsreferanse}</Datum>
        <Datum label="NAVs referansenr.">{id}</Datum>
      </Data>
      <Link to="/">Til forsiden</Link>
    </SøknadSteg>
  )
}
