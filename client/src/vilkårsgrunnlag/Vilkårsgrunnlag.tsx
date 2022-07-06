import { Button, Alert } from '@navikt/ds-react'
import { useEffect } from 'react'
import { useApplicationContext } from '../state/ApplicationContext'
import { VilkårsgrunnlagRequest, VilkårsgrunnlagResponse, VilkårsgrunnlagResultat } from '../types'
import { usePost } from '../usePost'

export const Vilkårsgrunnlag = () => {
  const { appState } = useApplicationContext()
  const { post: sjekkVilkårsgrunnlag, data: vilkårsgrunnlagData } = usePost<
    VilkårsgrunnlagRequest,
    VilkårsgrunnlagResponse
  >('/vilkarsgrunnlag')

  const { post: sendInnSøknad, data: sendInnSøknadData } = usePost<VilkårsgrunnlagRequest, {}>('/soknad')

  useEffect(() => {
    sjekkVilkårsgrunnlag({
      orgnr: appState.orgnummer,
      fnrBruker: appState.fodselsnummer,
      beregnSats: appState.brillestyrke,
      bestillingsdato: appState.bestillingsdato,
      brillepris: appState.brillepris,
    })
  }, [])

  return (
    <>
      <h1>Vilkårsgrunnlag</h1>
      <div>
        <pre>{JSON.stringify(appState, null, 2)}</pre>
      </div>
      {vilkårsgrunnlagData && (
        <>
          {vilkårsgrunnlagData.resultat === VilkårsgrunnlagResultat.JA && (
            <>
              <Alert variant="info">Du kan søke!</Alert>
              <Button
                onClick={async () => {
                  // await sendInnSøknad(appState)
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
  )
}

export default Vilkårsgrunnlag
