import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Avstand } from '../components/Avstand'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType } from '../types'
import { usePost } from '../usePost'
import { Øye } from './Øye'

export interface BrillestyrkeFormData {
  høyreSfære: number | ''
  høyreSylinder: number | ''
  venstreSfære: number | ''
  venstreSylinder: number | ''
}

export function BrillestyrkeForm() {
  const { watch } = useFormContext<{ brillestyrke: BrillestyrkeFormData }>()
  const høyreSfære = watch('brillestyrke.høyreSfære')
  const høyreSylinder = watch('brillestyrke.høyreSylinder')
  const venstreSfære = watch('brillestyrke.venstreSfære')
  const venstreSylinder = watch('brillestyrke.venstreSylinder')

  const { post: beregnSats, data: beregning } = usePost<BeregnSatsRequest, BeregnSatsResponse>('/brillesedler')
  const [visBeregning, setVisBeregning] = useState(false)

  useEffect(() => {
    if (høyreSfære && høyreSylinder && venstreSfære && venstreSylinder) {
      beregnSats({
        høyreSfære,
        høyreSylinder,
        venstreSfære,
        venstreSylinder,
      })
        .then(() => {
          setVisBeregning(true)
        })
        .catch((err: unknown) => {
          console.error(err)
          setVisBeregning(false)
        })
    } else if (visBeregning) {
      setVisBeregning(false)
    }
  }, [høyreSfære, høyreSylinder, venstreSfære, venstreSylinder])

  return (
    <>
      <Avstand paddingBottom={5} paddingTop={5}>
        <Heading level="2" size="medium">
          Brillestyrke
        </Heading>
        <BodyLong>Du trenger bare å legge inn sfære og sylinder for å se hvilken støttesats barnet kan få.</BodyLong>
        <Øye type="høyre" />
        <Øye type="venstre" />
      </Avstand>
      {visBeregning && beregning && (
        <Avstand paddingBottom={5} paddingTop={5}>
          {beregning.sats === SatsType.INGEN ? (
            <Alert variant="warning">
              <BodyLong>Vilkår om brillestyrke og/eller sylinderstyrke er ikke oppfylt</BodyLong>
            </Alert>
          ) : (
            <Alert variant="info">
              <Heading
                level="2"
                spacing
                size="small"
              >{`Brillestøtte på opp til ${beregning.satsBeløp} kroner`}</Heading>
              <BodyLong>
                {`Barnet kan få støtte fra sats ${beregning.sats.replace('SATS_', '')}: ${beregning.satsBeskrivelse}`}
              </BodyLong>
            </Alert>
          )}
        </Avstand>
      )}
    </>
  )
}
