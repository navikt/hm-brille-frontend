import { Button, Alert } from '@navikt/ds-react'
import { useEffect } from 'react'
import { useApplicationContext } from '../state/ApplicationContext'
import { VilkårsgrunnlagRequest, VilkårsgrunnlagResponse } from '../types'
import { usePost } from '../usePost'

export const Vilkårsgrunnlag = () => {
  const { appState } = useApplicationContext()
  const { post: sjekkVilkårsgrunnlag, data: vilkårsgrunnlagData } = usePost<
    VilkårsgrunnlagRequest,
    VilkårsgrunnlagResponse
  >('/vilkarsgrunnlag')

  const { post: sendInnSøknad, data: sendInnSøknadData } = usePost<VilkårsgrunnlagRequest, {}>('/soknad')

  useEffect(() => {
    sjekkVilkårsgrunnlag(appState)
  }, [])

  console.log('vilkårsgrunnlagData:', vilkårsgrunnlagData)

  return (
    <>
      <h1>Vilkårsgrunnlag</h1>
      <div>
        <pre>{JSON.stringify(appState, null, 2)}</pre>
      </div>
      {vilkårsgrunnlagData && (
        <>
          {vilkårsgrunnlagData.kanSøke ? (
            <>
              <Alert variant="info">Du kan søke!</Alert>
              <Button
                onClick={async () => {
                  await sendInnSøknad(appState)
                  // TODO: redirect til /kvittering e.l.
                }}
              >
                Send inn søknad
              </Button>
            </>
          ) : (
            <Alert variant="error">Denne søknaden oppfyller ikke de følgende vilkårene:</Alert>
            // TODO: add vilkår
          )}
        </>
      )}
    </>
  )
}

export default Vilkårsgrunnlag
