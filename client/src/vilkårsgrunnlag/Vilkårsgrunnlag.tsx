import { Alert, Heading, Loader } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Banner } from '../components/Banner'
import { SendInnSøknad } from '../components/SendInnSøknad'
import { useApplicationContext } from '../state/ApplicationContext'
import { VilkårsgrunnlagRequest, VilkårsgrunnlagResponse, VilkårsgrunnlagResultat } from '../types'
import { usePost } from '../usePost'

export const Vilkårsgrunnlag = () => {
  const { appState } = useApplicationContext()
  const {
    post: sjekkVilkårsgrunnlag,
    data: vilkårsgrunnlagData,
    loading: vilkårsgrunnlagLoading,
  } = usePost<VilkårsgrunnlagRequest, VilkårsgrunnlagResponse>('/vilkarsgrunnlag')

  const formaterDato = (datoString: string): string => {
    const [day, month, year] = datoString.split('.')
    return `${year}-${month}-${day}`
  }

  const vilkårsgrunnlag: VilkårsgrunnlagRequest = {
    orgnr: appState.orgnummer,
    fnrBruker: appState.fodselsnummer,
    brilleseddel: appState.brillestyrke,
    bestillingsdato: formaterDato(appState.bestillingsdato),
    brillepris: parseFloat(appState.brillepris),
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    sjekkVilkårsgrunnlag(vilkårsgrunnlag)
  }, [])

  const erProd = window.appSettings.MILJO === 'prod-gcp'

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
                {/* Vis send inn-knapp uavhengig av svar fra vilkårssjekk i alt annet enn prod  */}
                {!erProd ? (
                  <>
                    <Alert variant="info">
                      Respons fra vilkårssjekk var {vilkårsgrunnlagData.resultat}. Du kan søke uansett siden du ikke er
                      i prod.
                    </Alert>
                    <SendInnSøknad vilkårsgrunnlag={vilkårsgrunnlag} />
                  </>
                ) : (
                  <>
                    {vilkårsgrunnlagData.resultat === VilkårsgrunnlagResultat.JA && (
                      <>
                        <Alert variant="info">Du kan søke!</Alert>
                        <SendInnSøknad vilkårsgrunnlag={vilkårsgrunnlag} />
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
          </>
        )}
      </main>
    </>
  )
}

export default Vilkårsgrunnlag
