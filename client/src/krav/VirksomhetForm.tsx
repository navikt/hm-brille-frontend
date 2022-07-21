import { BodyLong, Button, Heading } from '@navikt/ds-react'
import { useState } from 'react'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { organisasjonsnummer } from '../components/organisasjonsnummer'
import { Tekstfelt } from '../components/Tekstfelt'
import { http } from '../http'
import { useApplicationContext } from '../state/ApplicationContext'
import { Virksomhet as VirksomhetType, VirksomhetResponse } from '../types'
import { Virksomhet } from './Virksomhet'

export interface VirksomhetFormData {
  orgnr: string
  orgNavn: string
}

interface TidligereBrukteVirksomheterProps {
  tidligereBrukteVirksomheter?: VirksomhetType[]
}

export function VirksomhetForm(props: TidligereBrukteVirksomheterProps) {
  const [virksomhet, setVirksomhet] = useState<VirksomhetResponse | null>(null)
  const [orgnummer, setOrgnummer] = useState('')
  const { setAppState, appState } = useApplicationContext()
  const { tidligereBrukteVirksomheter } = props
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
              const virksomhet: VirksomhetResponse = await http.get(`/virksomheter/${orgnummer}`)
              if (virksomhet !== null) {
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
      {tidligereBrukteVirksomheter && tidligereBrukteVirksomheter?.length > 0 && (
        <Avstand marginTop={7}>
          <Heading level="3" size="small" spacing>
            Tidligere brukte virksomheter
          </Heading>
          {tidligereBrukteVirksomheter.map((it) => (
            <VirksomhetPanel key={it.orgnr}>
              <Button variant="tertiary" type="button" onClick={() => velgVirksomhet(it)}>
                Bruk
              </Button>
              <BodyLong>{`${organisasjonsnummer(it.orgnr)} ${it.navn}`}</BodyLong>
            </VirksomhetPanel>
          ))}
        </Avstand>
      )}
    </>
  )
}

export const VirksomhetPanel = styled.div`
  display: flex;
  align-items: center;
  gap: var(--navds-spacing-5);
`

const SøkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--navds-spacing-3);
  align-items: flex-end;
`
