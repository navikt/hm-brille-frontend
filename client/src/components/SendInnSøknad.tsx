import { Button } from '@navikt/ds-react'
import { useApplicationContext } from '../state/ApplicationContext'
import { SøknadRequest, SøknadResponse, VilkårsgrunnlagRequest } from '../types'
import { usePost } from '../usePost'

interface Props {
  vilkårsgrunnlag: VilkårsgrunnlagRequest
}

export const SendInnSøknad = (props: Props) => {
  const { appState } = useApplicationContext()

  const {
    post: sendInnSøknad,
    data: sendInnSøknadData,
    loading: sendInnSøknadLoading,
  } = usePost<SøknadRequest, SøknadResponse>('/soknad')

  return (
    <Button
      loading={sendInnSøknadLoading}
      onClick={async () => {
        await sendInnSøknad({
          vilkårsgrunnlag: props.vilkårsgrunnlag,
          bestillingsreferanse: appState.bestillingsreferanse,
          brukersNavn: appState.brukersNavn,
          orgNavn: appState.orgNavn,
          orgAdresse: appState.orgAdresse,
        })
        console.log('sendInnSøknadData:', sendInnSøknadData)
        // TODO: redirect til /kvittering e.l.
      }}
    >
      Send inn søknad
    </Button>
  )
}
