import { Alert } from '@navikt/ds-react'
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
      <Alert variant="success">Søknaden er mottatt</Alert>
      <Data>
        <Datum label="Saksreferanse">{vedtakId}</Datum>
      </Data>
      <Link to="/">Til forsiden</Link>
    </SøknadSteg>
  )
}
