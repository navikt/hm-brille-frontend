import { Calculator } from '@navikt/ds-icons'
import { BodyLong, Button, Heading } from '@navikt/ds-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { BeregnSatsRequest, BeregnSatsResponse } from '../types'
import { usePost } from '../usePost'
import { Brillestyrke } from './Brillestyrke'
import { Øye } from './Øye'

export interface BrillestyrkeFormData {
  høyreSfære: string
  høyreSylinder: string
  venstreSfære: string
  venstreSylinder: string
}

export function BrillestyrkeForm() {
  const { getValues } = useFormContext()

  const { post, data } = usePost<BeregnSatsRequest, BeregnSatsResponse>('/beregn-sats')
  const [editMode, setEditMode] = useState(true)

  // Spinner og lokal feilhåndtering?

  const beregnSats = async () => {
    const brillestyrke = getValues('brillestyrke')
    await post(brillestyrke)
    setEditMode(false)
  }

  return !editMode && data ? (
    <Brillestyrke sats={data} onSetEditMode={setEditMode} />
  ) : (
    <>
      <Avstand paddingBottom={5} paddingTop={5}>
        <Heading level="2" size="medium">
          Brillestyrke
        </Heading>
        <BodyLong>Du trenger kun å legge inn sfære og sylinder for å se hvilken støttesats barnet kan få.</BodyLong>
        <Øye type="høyre" />
        <Øye type="venstre" />
      </Avstand>

      <Button type="button" variant="secondary" size="medium" onClick={beregnSats}>
        <Calculator /> Beregn sats
      </Button>
    </>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-3);
`
