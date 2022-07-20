import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react'
import { useEffect, useState } from 'react'
import { Avstand } from '../components/Avstand'
import ScrollToTop from '../components/ScrollToTop'
import { useApplicationContext } from '../state/ApplicationContext'
import type {
  HarLestOgGodtattVilkårResponse,
  HentInnbyggerRequest,
  HentInnbyggerResponse,
  TidligereBrukteVirksomheterResponse,
  VirksomhetResponse,
} from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { Barn } from './Barn'
import { Brukervilkår } from './Brukervilkår'
import { HentBrukerForm } from './HentBrukerForm'
import { IkkeFunnet } from './IkkeFunnet'
import { KravForm } from './KravForm'
import { KravSteg } from './KravSteg'
import { Virksomhet } from './Virksomhet'
import { VirksomhetForm } from './VirksomhetForm'

export function Krav() {
  const { appState, setAppState } = useApplicationContext()
  const { post: hentBruker, data: hentBrukerData } = usePost<HentInnbyggerRequest, HentInnbyggerResponse>(
    '/innbyggere/sok'
  )
  const { data: virksomhet } = useGet<VirksomhetResponse>(appState.orgnr ? `/virksomheter/${appState.orgnr}` : null)
  const {
    data: lestOgGodtattVilkår,
    isValidating: brukerVilkårLoading,
    mutate,
  } = useGet<HarLestOgGodtattVilkårResponse>('/innsendere')
  const { post: godtaBrukervilkår } = usePost('/innsendere')
  const { data: tidligereBrukteVirksomheter } = useGet<TidligereBrukteVirksomheterResponse>('/virksomheter')

  const harValgtVirksomhet = appState.orgnr !== ''

  useEffect(() => {
    const sistBrukteOrg = tidligereBrukteVirksomheter?.sistBrukteOrganisasjon

    if (sistBrukteOrg) {
      setAppState((prev) => ({
        ...prev,
        orgnr: sistBrukteOrg.orgnr,
        orgNavn: sistBrukteOrg.navn,
        orgAdresse: sistBrukteOrg.adresse || '',
      }))
    }
  }, [tidligereBrukteVirksomheter])

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
    <KravSteg>
      <ScrollToTop />
      {!harValgtVirksomhet ? (
        <Panel>
          <Heading level="2" size="medium" spacing>
            Foretak som skal ha direkte oppgjør
          </Heading>
          <VirksomhetForm />
        </Panel>
      ) : (
        <>
          <Panel border>
            <Heading size="small" spacing>
              Foretaket som skal ha direkte oppgjør
            </Heading>
            <BodyLong>{`${appState?.orgNavn}, org. nr. ${appState?.orgnr}`}</BodyLong>
            <Button
              variant="tertiary"
              onClick={() => {
                setAppState((prev) => ({
                  ...prev,
                  orgnr: '',
                  orgNavn: '',
                  orgAdresse: '',
                }))
              }}
            >
              Velg annen virksomhet
            </Button>
          </Panel>
          <Panel>
            <Heading level="2" size="medium" spacing>
              Om barnet
            </Heading>
            <HentBrukerForm
              onValid={async ({ fnr }) => {
                await hentBruker({ fnr })
              }}
            />
            {hentBrukerData &&
              (hentBrukerData.fnr ? (
                <Avstand marginTop={5} marginBottom={5}>
                  <Barn {...hentBrukerData} />
                  <Avstand marginTop={5}>
                    <KravForm />
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
    </KravSteg>
  )
}
