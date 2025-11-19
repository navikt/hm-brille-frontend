import { Alert, Box, Heading } from '@navikt/ds-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import ScrollToTop from '../components/ScrollToTop'
import { useApplicationContext } from '../state/ApplicationContext'
import type {
  HarLestOgGodtattVilkårResponse,
  HentInnbyggerRequest,
  HentInnbyggerResponse,
  TidligereBrukteVirksomheterResponse,
} from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { logSkjemaStartet } from '../utils/amplitude'
import { Barn } from './Barn/Barn'
import { Brukervilkår } from './Brukervilkår'
import { HentBarnForm } from './HentBarnForm'
import { IkkeFunnet } from './IkkeFunnet'
import { KravForm } from './KravForm'
import { KravSteg } from './KravSteg'
import { VirksomhetForm } from './VirksomhetForm'
import { Bedrift } from './Bedrift/Bedrift'

export function Krav() {
  const { t } = useTranslation()
  const { appState, setAppState } = useApplicationContext()
  const { post: hentBruker, data: hentBrukerData } = usePost<HentInnbyggerRequest, HentInnbyggerResponse>(
    '/innbyggere/sok'
  )
  const {
    data: lestOgGodtattVilkår,
    isValidating: brukerVilkårLoading,
    mutate,
  } = useGet<HarLestOgGodtattVilkårResponse>('/innsendere')
  const { post: godtaBrukervilkår } = usePost('/innsendere')
  const { data: tidligereBrukteVirksomheter } = useGet<TidligereBrukteVirksomheterResponse>('/virksomheter')

  useEffect(() => {
    if (hentBrukerData) {
      setAppState((prev) => ({
        ...prev,
        barnNavn: hentBrukerData.navn,
        barnAlder: hentBrukerData.alder,
        barnFnr: hentBrukerData.fnr,
      }))
    }
  }, [hentBrukerData])

  useEffect(() => {
    if (lestOgGodtattVilkår && lestOgGodtattVilkår.godtatt) {
      logSkjemaStartet()
    }
  }, [lestOgGodtattVilkår])

  const harValgtVirksomhet = appState.orgnr !== ''

  if (!lestOgGodtattVilkår || !lestOgGodtattVilkår.godtatt) {
    return (
      <Brukervilkår
        loading={brukerVilkårLoading}
        onGodta={async () => {
          await godtaBrukervilkår({})
          await mutate()
        }}
      />
    )
  }

  return (
    <KravSteg>
      <ScrollToTop />
      <Avstand marginBottom={5}>
        <Alert inline variant="info">
          <Heading size="small">{t('info.satsendring.tittel')}</Heading>
          {t('info.satsendring.tekst')} <a href="https://www.nav.no/samarbeidspartner/briller-til-barn#hvor-mye">{t('info.satsendring.lenketekst')}</a>
        </Alert>
      </Avstand>
      {!harValgtVirksomhet ? (
        <Box.New padding="4" borderRadius="large">
          <Heading level="2" size="medium" spacing>
            {t('krav.overskrift_foretak')}
          </Heading>
          <VirksomhetForm tidligereBrukteVirksomheter={tidligereBrukteVirksomheter?.tidligereBrukteOrganisasjoner} />
        </Box.New>
      ) : (
        <>
          <Bedrift
            orgnr={appState?.orgnr}
            orgNavn={appState?.orgNavn}
            orgAdresse={appState?.orgAdresse}
            onByttBedrift={() => {
              setAppState((prev) => ({
                ...prev,
                orgnr: '',
                orgNavn: '',
                orgAdresse: '',
              }))
            }}
          />
          <Box.New marginBlock="8" padding="4">
            <Heading level="2" size="medium" spacing>
              {t('krav.overskrift_om_barnet')}
            </Heading>
            <HentBarnForm
              onValid={async ({ fnr }) => {
                await hentBruker({ fnr })
              }}
            />
            {hentBrukerData &&
              (hentBrukerData.fnr ? (
                <Avstand marginTop={2} marginBottom={5}>
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
          </Box.New>
        </>
      )}
    </KravSteg>
  )
}
