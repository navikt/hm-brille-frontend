import { Button, Alert, Heading, Loader } from '@navikt/ds-react'
import { useEffect } from 'react'
import { useApplicationContext } from '../state/ApplicationContext'
import {
  VilkårsgrunnlagRequest,
  VilkårsgrunnlagResponse,
  VilkårsgrunnlagResultat,
  SøknadRequest,
  SøknadResponse,
} from '../types'
import { usePost } from '../usePost'
import { Banner } from '../components/Banner'

export const Vilkårsgrunnlag = () => {
  const { appState } = useApplicationContext()
  const {
    post: sjekkVilkårsgrunnlag,
    data: vilkårsgrunnlagData,
    loading: vilkårsgrunnlagLoading,
  } = usePost<VilkårsgrunnlagRequest, VilkårsgrunnlagResponse>('/vilkarsgrunnlag')

  const {
    post: sendInnSøknad,
    data: sendInnSøknadData,
    loading: sendInnSøknadLoading,
  } = usePost<SøknadRequest, SøknadResponse>('/soknad')

  const formaterDato = (datoString: string): string => {
    const [day, month, year] = datoString.split('.')
    return `${year}-${month}-${day}`
  }

  const vilkårsgrunnlag: VilkårsgrunnlagRequest = {
    orgnr: appState.orgnummer,
    fnrBruker: appState.fodselsnummer,
    beregnSats: appState.brillestyrke,
    bestillingsdato: formaterDato(appState.bestillingsdato),
    brillepris: parseFloat(appState.brillepris),
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    sjekkVilkårsgrunnlag(vilkårsgrunnlag)
  }, [])

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
        <div>
          <pre>{JSON.stringify(vilkårsgrunnlag, null, 2)}</pre>
        </div>
        {!vilkårsgrunnlagData && vilkårsgrunnlagLoading ? (
          <Loader />
        ) : (
          <>
            {vilkårsgrunnlagData && (
              <>
                {vilkårsgrunnlagData.resultat === VilkårsgrunnlagResultat.JA && (
                  <>
                    <Alert variant="info">Du kan søke!</Alert>
                    <Button
                      loading={sendInnSøknadLoading}
                      onClick={async () => {
                        await sendInnSøknad({
                          ...vilkårsgrunnlag,
                          bestillingsreferanse: appState.bestillingsreferanse,
                        })
                        console.log('sendInnSøknadData:', sendInnSøknadData)
                        // TODO: redirect til /kvittering e.l.
                      }}
                    >
                      Send inn søknad
                    </Button>
                  </>
                )}
                {vilkårsgrunnlagData.resultat === VilkårsgrunnlagResultat.KANSKJE && (
                  <Alert variant="warning">Du kan kanskje søke!</Alert>
                )}
                {vilkårsgrunnlagData.resultat === VilkårsgrunnlagResultat.NEI && (
                  <Alert variant="error">Du kan ikke søke :(</Alert>
                )}
              </>
            )}
          </>
        )}
      </main>
    </>
  )
}

export default Vilkårsgrunnlag
