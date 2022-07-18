import { BodyLong, Heading, Panel } from '@navikt/ds-react'
import { useEffect, useState } from 'react'
import { Avstand } from '../components/Avstand'
import { useApplicationContext } from '../state/ApplicationContext'
import type {
  HarLestOgGodtattVilkårResponse,
  HentBrukerRequest,
  HentBrukerResponse,
  TidligereBrukteVirksomheterResponse,
  VirksomhetResponse,
} from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { Barn } from './Barn'
import { Brukervilkår } from './Brukervilkår'
import { HentBrukerForm } from './HentBrukerForm'
import { IkkeFunnet } from './IkkeFunnet'
import { SøknadForm } from './SøknadForm'
import { SøknadSteg } from './SøknadSteg'
import { Virksomhet } from './Virksomhet'
import { VirksomhetForm } from './VirksomhetForm'
import ScrollToTop from "../components/ScrollToTop";

export function Søknad() {
  const { appState, setAppState } = useApplicationContext()
  const { post: hentBruker, data: hentBrukerData } = usePost<HentBrukerRequest, HentBrukerResponse>('/innbyggere/sok')
  const { data: virksomhet } = useGet<VirksomhetResponse>(appState.orgnr ? `/virksomheter/${appState.orgnr}` : null)
  const { data: lestOgGodtattVilkår, isValidating: brukerVilkårLoading, mutate } =
    useGet<HarLestOgGodtattVilkårResponse>('/innsendere')
  const { post: godtaBrukervilkår } = usePost('/innsendere')
  const { data: tidligereBrukteVirksomheter } = useGet<TidligereBrukteVirksomheterResponse>('/virksomheter')

  const [valgtVirksomhet, setValgtVirksomhet] = useState(tidligereBrukteVirksomheter?.sistBrukteOrganisasjon || {})

  // TODO: kan nok rydde opp i hvordan vi gjør requests og oppdaterer appState
  useEffect(() => {
    if (tidligereBrukteVirksomheter) {
      const sistBrukteOrg = tidligereBrukteVirksomheter?.sistBrukteOrganisasjon
      if (sistBrukteOrg) {
        setAppState((prev) => ({
          ...prev,
          orgnr: sistBrukteOrg.orgnr,
          orgNavn: sistBrukteOrg.navn,
          orgAdresse: sistBrukteOrg.beliggenhetsadresse || sistBrukteOrg.forretningsadresse!, // vi vet at en av disse alltid vil være satt
        }))
      }
    }
  }, [tidligereBrukteVirksomheter])

  useEffect(() => {
    if (virksomhet) {
      setAppState((prev) => ({ ...prev, orgNavn: virksomhet.orgNavn }))
    }
  }, [virksomhet])

  useEffect(() => {
    if (hentBrukerData) {
      setAppState((prev) => ({
        ...prev,
        innbyggerNavn: hentBrukerData.navn,
        innbyggerAlder: hentBrukerData.alder,
        innbyggerFnr: hentBrukerData.fnr,
      }))
    }
  }, [hentBrukerData])

  if (!lestOgGodtattVilkår || !lestOgGodtattVilkår.godtatt) {
    return (
      <Brukervilkår
        loading={brukerVilkårLoading}
        onGodta={() => {
          godtaBrukervilkår({})
          mutate()
        }}
      />
    )
  }

  return (
    <SøknadSteg>
      <ScrollToTop/>
      {tidligereBrukteVirksomheter?.tidligereBrukteOrganisasjoner?.length == 0 ||
      !tidligereBrukteVirksomheter?.sistBrukteOrganisasjon  ? (
        <Panel>
          <Heading level="2" size="medium" spacing>
            Foretak som skal ha direkte oppgjør
          </Heading>
          <VirksomhetForm
            onValid={({ orgnr }) => {
              setAppState((prev) => ({ ...prev, orgnr }))
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
            <BodyLong>{`${tidligereBrukteVirksomheter?.sistBrukteOrganisasjon?.navn}, org. nr. ${tidligereBrukteVirksomheter?.sistBrukteOrganisasjon?.orgnr}`}</BodyLong>
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
                  <Barn {...hentBrukerData} />
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
    </SøknadSteg>
  )
}
