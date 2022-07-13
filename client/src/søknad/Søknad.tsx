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
  const { data: virksomhet } = useGet<VirksomhetResponse>(
    appState.orgnummer ? `/virksomhet/${appState.orgnummer}` : null
  )
  const { data: tidligereBrukteVirksomheter } = useGet<TidligereBrukteVirksomheterResponse>('/orgnr')

  const [valgtVirksomhet, setValgtVirksomhet] = useState(tidligereBrukteVirksomheter?.sistBrukteOrganisasjon || {})

  // TODO: kan nok rydde opp i hvordan vi gjør requests og oppdaterer appState
  useEffect(() => {
    if (tidligereBrukteVirksomheter) {
      const sistBrukteOrg = tidligereBrukteVirksomheter?.sistBrukteOrganisasjon
      if (sistBrukteOrg) {
        setAppState((prev) => ({
          ...prev,
          orgnummer: sistBrukteOrg.orgnummer,
          orgNavn: sistBrukteOrg.navn,
          orgAdresse: sistBrukteOrg.beliggenhetsadresse || sistBrukteOrg.forretningsadresse!, // vi vet at en av disse alltid vil være satt
        }))
      }
    }
  }, [tidligereBrukteVirksomheter])

  useEffect(() => {
    if (virksomhet) {
      setAppState((prev) => ({ ...prev, orgNavn: virksomhet.orgnavn }))
    }
  }, [virksomhet])

  useEffect(() => {
    if (hentBrukerData) {
      setAppState((prev) => ({ ...prev, brukersNavn: hentBrukerData.navn, fodselsnummer: hentBrukerData.fnr }))
    }
  }, [hentBrukerData])

  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            Søknad om direkte oppgjør av briller for barn
          </Heading>
        </Banner>
      </header>
      <main>
        {tidligereBrukteVirksomheter?.tidligereBrukteOrganisasjoner?.length == 0 ||
        !tidligereBrukteVirksomheter?.sistBrukteOrganisasjon ? (
          <Panel>
            <Heading level="2" size="medium" spacing>
              Foretak som skal ha direkte oppgjør
            </Heading>
            <VirksomhetForm
              onValid={({ orgnummer }) => {
                setAppState((prev) => ({ ...prev, orgnummer }))
              }}
            />
            {virksomhet && (
              <Avstand paddingTop={5}>
                <Virksomhet virksomhet={virksomhet} onLagre={setValgtVirksomhet} />
              </Avstand>
            )}
          </Panel>
        ) : (
          <>
            <Panel border>
              <Heading size="small" spacing>
                Foretaket som skal ha direkte oppgjør
              </Heading>
              <BodyLong>{`${tidligereBrukteVirksomheter?.sistBrukteOrganisasjon?.navn}, org. nr. ${tidligereBrukteVirksomheter?.sistBrukteOrganisasjon?.orgnummer}`}</BodyLong>
            </Panel>
            <Panel>
              <Heading level="2" size="medium" spacing>
                Om barnet
              </Heading>
              <HentBrukerForm
                onValid={async ({ fnr }) => {
                  await hentBruker({ fnr })
                  // setAppState((prev) => ({ ...prev, fodselsnummer: fnr }))
                }}
              />
              {hentBrukerData &&
                (hentBrukerData.fnr ? (
                  <Avstand marginTop={5} marginBottom={5}>
                    <Barn data={hentBrukerData} />
                    <Avstand marginTop={5}>
                      <SøknadForm />
                    </Avstand>
                  </Avstand>
                ) : (
                  <Avstand marginTop={5} marginBottom={5}>
                    <IkkeFunnet />
                  </Avstand>
                ))}
            </Panel>
          </>
        )}
      </main>
    </>
  )
}
