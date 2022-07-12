import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react'
import { useEffect, useState } from 'react'
import { Avstand } from '../components/Avstand'
import { Banner } from '../components/Banner'
import { useApplicationContext } from '../state/ApplicationContext'
import type {
  HentBrukerRequest,
  HentBrukerResponse,
  TidligereBrukteVirksomheterResponse,
  VirksomhetResponse,
} from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { Barn } from './Barn'
import { HentBrukerForm } from './HentBrukerForm'
import { IkkeFunnet } from './IkkeFunnet'
import { SøknadForm } from './SøknadForm'
import { Virksomhet } from './Virksomhet'
import { VirksomhetForm } from './VirksomhetForm'

export function Søknad() {
  const { appState, setAppState } = useApplicationContext()
  const { post: hentBruker, data: hentBrukerData } = usePost<HentBrukerRequest, HentBrukerResponse>('/hent-bruker')
  const { data: virksomhet } = useGet<{ data: VirksomhetResponse }>(
    appState.orgnummer ? `/virksomhet/${appState.orgnummer}` : null
  )
  const { data: tidligereBrukteVirksomheter } = useGet<TidligereBrukteVirksomheterResponse>('/orgnr')

  const [valgtVirksomhet, setValgtVirksomhet] = useState(tidligereBrukteVirksomheter?.sistBrukteOrganisasjon || {})

  useEffect(() => {
    if (tidligereBrukteVirksomheter) {
      const sistBruktOrgnummer = tidligereBrukteVirksomheter?.sistBrukteOrganisasjon?.orgnummer || ''
      setAppState((prev) => ({ ...prev, orgnummer: sistBruktOrgnummer }))
    }
  }, [tidligereBrukteVirksomheter])

  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            Søknad om direkteoppgjør for barnebriller
          </Heading>
        </Banner>
      </header>
      <main>
        {tidligereBrukteVirksomheter?.tidligereBrukteOrganisasjoner?.length == 0 ||
        !tidligereBrukteVirksomheter?.sistBrukteOrganisasjon ? (
          <Panel>
            <Heading level="2" size="medium" spacing>
              Foretak som skal ha direkteoppgjør
            </Heading>
            <VirksomhetForm
              onValid={({ orgnummer }) => {
                setAppState((prev) => ({ ...prev, orgnummer }))
              }}
            />
            {virksomhet && (
              <Avstand paddingTop={5}>
                  
                <Virksomhet virksomhet={virksomhet.data} onLagre={setValgtVirksomhet} />
              </Avstand>
            )}
          </Panel>
        ) : (
          <>
            <Panel border>
                <Heading size="small" spacing>Foretaket som skal ha direkteoppgjør</Heading>
                <BodyLong>{`${tidligereBrukteVirksomheter?.sistBrukteOrganisasjon?.navn}, org. nr. ${tidligereBrukteVirksomheter?.sistBrukteOrganisasjon?.orgnummer}`}</BodyLong>
                <Button variant="tertiary">Jeg skal søke for et annet foretak</Button>
              </Panel>
            <Panel>
              <Heading level="2" size="medium" spacing>
                Om barnet
              </Heading>
              <HentBrukerForm
                onValid={async ({ fnr }) => {
                  await hentBruker({ fnr })
                  setAppState((prev) => ({ ...prev, fodselsnummer: fnr }))
                }}
              />
              {hentBrukerData === null && (
                <Avstand marginTop={5} marginBottom={5}>
                  <IkkeFunnet />
                </Avstand>
              )}
              {hentBrukerData && (
                <Avstand marginTop={5} marginBottom={5}>
                  <Barn data={hentBrukerData} />
                  <Avstand marginTop={5}>
                    <SøknadForm />
                  </Avstand>
                </Avstand>
              )}
            </Panel>
          </>
        )}
      </main>
    </>
  )
}
