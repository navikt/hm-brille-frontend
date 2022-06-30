import { Edit } from '@navikt/ds-icons'
import { Alert, BodyLong, Button, Heading, Label } from '@navikt/ds-react'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { BeregnSatsRequest, BeregnSatsResponse, SatsType } from '../types'
import { MAX_SFÆRE, MAX_SYLINDER } from './config'
import { FormatertStyrke } from './FormatertStyrke'

export interface BrillestyrkeFormData {
  høyreSfære: string
  høyreSylinder: string
  venstreSfære: string
  venstreSylinder: string
}

interface BrillestyrkeProps {
  brillestyrke: BeregnSatsRequest
  sats: BeregnSatsResponse
  onSetEditMode: Function
}

export function Brillestyrke(props: BrillestyrkeProps) {
  const { brillestyrke, sats, onSetEditMode } = props

  return (
    <>
      <Heading level="2" size="medium">
        Brillestyrke
      </Heading>

      <Grid>
        <Heading level="3" size="small">
          Høyre øye
        </Heading>
        <div>
          <Label>Sfære (SPH) </Label>
          <BodyLong>
            <FormatertStyrke verdi={brillestyrke.høyreSfære} max={MAX_SFÆRE} />
          </BodyLong>
        </div>
        <div>
          <Label>Sylinder (CYL) </Label>
          <BodyLong>
            <FormatertStyrke verdi={brillestyrke.høyreSylinder} max={MAX_SYLINDER} minus />
          </BodyLong>
        </div>

        <Heading level="3" size="small">
          Venstre øye
        </Heading>
        <div>
          <Label>Sfære (SPH) </Label>
          <BodyLong>
            <FormatertStyrke verdi={brillestyrke.venstreSfære} max={MAX_SFÆRE} />
          </BodyLong>
        </div>
        <div>
          <Label>Sylinder (CYL) </Label>
          <BodyLong>
            <FormatertStyrke verdi={brillestyrke.venstreSylinder} max={MAX_SYLINDER} minus />
          </BodyLong>
        </div>
      </Grid>
      <Avstand paddingBottom={5} paddingTop={5}>
        <Button variant="tertiary" size="small" onClick={() => onSetEditMode(true)}>
          <Edit /> Endre styrke
        </Button>
      </Avstand>
      <Avstand paddingBottom={5} paddingTop={5}>
        {sats.sats === SatsType.INGEN ? (
          <Alert variant="warning">
            <BodyLong>Vilkår om brillestyrke og/eller sylinderstyrke er ikke oppfylt</BodyLong>
          </Alert>
        ) : (
          <Alert variant="info">
            <Heading level="2" spacing size="small">{`Brillestøtte på ${sats.beløp} kroner`}</Heading>
            <BodyLong>{`Barnet kan få støtte fra sats ${sats.sats.replace('SATS_', '')}: ${
              sats.satsBeskrivelse
            }`}</BodyLong>
          </Alert>
        )}
      </Avstand>
    </>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-3);
`
