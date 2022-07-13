import { Button } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import { useApplicationContext } from '../state/ApplicationContext'
import { SøknadRequest, SøknadResponse, VilkårsgrunnlagRequest } from '../types'
import { usePost } from '../usePost'

export interface SendInnSøknadProps {
  vilkårsgrunnlag: VilkårsgrunnlagRequest
}

export function SendInnSøknad(props: SendInnSøknadProps) {
  const { appState } = useApplicationContext()
  const navigate = useNavigate()

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
        return navigate('/soknad/kvittering')
      }}
    >
      Send inn søknad
    </Button>
  )
}
