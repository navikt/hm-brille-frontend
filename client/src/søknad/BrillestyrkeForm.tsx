import { Calculator } from '@navikt/ds-icons'
import { BodyLong, Button, Heading } from '@navikt/ds-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Avstand } from '../components/Avstand'
import { BeregnSatsRequest, BeregnSatsResponse } from '../types'
import { usePost } from '../usePost'
import { Brillestyrke } from './Brillestyrke'
import { SøknadFormData } from './SøknadForm'
import { Øye } from './Øye'

export interface BrillestyrkeFormData {
  høyreSfære: string
  høyreSylinder: string
  venstreSfære: string
  venstreSylinder: string
}

export function BrillestyrkeForm() {
  const { getValues } = useFormContext<SøknadFormData>()

  const { post, data } = usePost<BeregnSatsRequest, BeregnSatsResponse>('/beregn-sats')
  const [editMode, setEditMode] = useState(true)

  // Spinner og lokal feilhåndtering?

  const beregnSats = async () => {
    const brillestyrke = getValues('brillestyrke')
    await post(brillestyrke)
    setEditMode(false)
  }

  const brillestyrke = getValues('brillestyrke')

  return !editMode && data ? (
    <Brillestyrke {...brillestyrke} sats={data} onSetEditMode={setEditMode} />
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
