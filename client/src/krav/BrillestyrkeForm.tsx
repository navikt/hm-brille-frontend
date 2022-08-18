import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Avstand } from '../components/Avstand'
import { SatsType } from '../types'
import { logSkjemavalideringFeilet } from '../utils/amplitude'
import { useBeregning } from './useBeregning'
import { Øye } from './Øye'

export function BrillestyrkeForm() {
  const beregning = useBeregning()

  const vilkårOmStyrkeIkkeOppfylt = 'Vilkår om brillestyrke og/eller sylinderstyrke er ikke oppfylt'
  useEffect(() => {
    if (beregning && beregning.sats === SatsType.INGEN) {
      logSkjemavalideringFeilet([vilkårOmStyrkeIkkeOppfylt])
    }
  }, [beregning])

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
      {beregning && (
        <Avstand paddingBottom={5} paddingTop={5}>
          {beregning.sats === SatsType.INGEN ? (
            <Alert variant="warning">
              <BodyLong>{vilkårOmStyrkeIkkeOppfylt}</BodyLong>
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
