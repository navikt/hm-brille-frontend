import { Cancel, SaveFile } from '@navikt/ds-icons'
import { BodyLong, Button, Heading } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Øye } from './Øye'
import { usePost } from '../usePost'
import { BeregnSatsRequest, BeregnSatsResponse } from '../types'
import { useState } from 'react'
import { Brillestyrke } from './Brillestyrke'
import { Avstand } from '../components/Avstand'

export interface BrillestyrkeFormData {
  høyreSfære: string
  høyreSylinder: string
  venstreSfære: string
  venstreSylinder: string
}

const defaultBrillestyrke = { høyreSfære: '1', høyreSylinder: '-1', venstreSfære: '1', venstreSylinder: '-1' }

export function BrillestyrkeForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<BrillestyrkeFormData>({
    defaultValues: defaultBrillestyrke,
  })
  const [brillestyrke, setBrillestyrke] = useState<BeregnSatsRequest>(defaultBrillestyrke)
  const { post, data } = usePost<BeregnSatsRequest, BeregnSatsResponse>('/beregn-sats')
  const [editMode, setEditMode] = useState(true)

  // Spinner og lokal feilhåndtering?

  return !editMode && data ? (
    <Brillestyrke brillestyrke={brillestyrke} sats={data} onSetEditMode={setEditMode} />
  ) : (
    <form
      onSubmit={handleSubmit(async (data) => {
        await post(data)
        setBrillestyrke(data)
        setEditMode(false)
      })}
    >
      <Avstand paddingBottom={5} paddingTop={5}>
        <Heading level="2" size="medium">
          Brillestyrke
        </Heading>
        <BodyLong>Du trenger kun å legge inn sfære og sylinder for å se hvilken støttesats barnet kan få.</BodyLong>
        <Øye type="høyre" control={control} />

        <Øye type="venstre" control={control} />
      </Avstand>

      <Button variant="secondary" size="medium">
        <SaveFile /> Lagre styrke
      </Button>
    </form>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-3);
`
