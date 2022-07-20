import { Button } from '@navikt/ds-react'
import { useState } from 'react'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { Tekstfelt } from '../components/Tekstfelt'
import { http } from '../http'
import { useApplicationContext } from '../state/ApplicationContext'
import { VirksomhetResponse } from '../types'
import { Virksomhet } from './Virksomhet'

export interface VirksomhetFormData {
  orgnr: string
  orgNavn: string
}

export function VirksomhetForm() {
  const [virksomhet, setVirksomhet] = useState<VirksomhetResponse | null>(null)
  const [orgnummer, setOrgnummer] = useState('')
  const { setAppState, appState } = useApplicationContext()

  const velgVirksomhet = (virksomhet: VirksomhetResponse) =>
    setAppState((prev) => ({
      ...prev,
      orgnr: virksomhet.orgnr,
      orgNavn: virksomhet.navn,
    }))

  return (
    <>
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <SøkContainer>
          <Tekstfelt
            label="Organisasjonsnummer"
            size="medium"
            hideLabel={false}
            value={orgnummer}
            onChange={(e) => setOrgnummer(e.target.value)}
          />
          <Button
            onClick={async () => {
              const virksomhet : VirksomhetResponse = await http.get(`/virksomheter/${orgnummer}`)
              if(virksomhet !== null) {
                setVirksomhet(virksomhet)
              }
            }}
            variant="secondary"
          >
            Slå opp
          </Button>
        </SøkContainer>
      </form>
      {virksomhet && (
        <Avstand paddingTop={5}>
          <Virksomhet virksomhet={virksomhet} onLagre={velgVirksomhet} />
        </Avstand>
      )}
    </>
  )
}

const SøkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--navds-spacing-3);
  align-items: flex-end;
`
