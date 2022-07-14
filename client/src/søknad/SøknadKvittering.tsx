import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { SøknadResponse } from '../types'
import { useLocationState } from '../useLocationState'
import { SøknadSteg } from './SøknadSteg'

export interface SøknadKvitteringProps {}

export function SøknadKvittering(props: SøknadKvitteringProps) {
  const {} = props
  const { vedtakId } = useLocationState<SøknadResponse>()
  return (
    <SøknadSteg>
      <Alert variant="success">Søknaden er godkjent</Alert>
      <Heading level='2' size="medium">Hva skjer nå?</Heading>
      <BodyLong>Søknaden om direkte oppgjør er automatisk godkjent. NAV vil utbetale bølpet til din virksomhet innen 30 dager.</BodyLong>
      <Data>
        <Datum label="Saksreferanse">{vedtakId}</Datum>
      </Data>
      <Link to="/">Til forsiden</Link>
    </SøknadSteg>
  )
}
