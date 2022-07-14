import { Button } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Knapper } from '../components/Knapper'
import { useApplicationContext } from '../state/ApplicationContext'
import { SøknadRequest, SøknadResponse, Vilkårsgrunnlag } from '../types'
import { usePost } from '../usePost'
import { AvbrytSøknad } from './AvbrytSøknad'

export interface SendInnSøknadProps {
  vilkårsgrunnlag: Vilkårsgrunnlag
}

export function SendInnSøknad(props: SendInnSøknadProps) {
  const { appState } = useApplicationContext()
  const navigate = useNavigate()

  const {
    post: sendInnSøknad,
    data: sendInnSøknadData,
    loading: sendInnSøknadLoading,
  } = usePost<SøknadRequest, SøknadResponse>('/soknader')

  useEffect(() => {
    if (sendInnSøknadData) {
      navigate(`/soknad/kvittering`, {
        state: sendInnSøknadData,
      })
    }
  }, [sendInnSøknadData])

  return (
    <Knapper>
      <Button
        loading={sendInnSøknadLoading}
        onClick={async () => {
          return await sendInnSøknad({
            vilkårsgrunnlag: props.vilkårsgrunnlag,
            bestillingsreferanse: appState.bestillingsreferanse,
            brukersNavn: appState.innbyggerNavn,
            orgNavn: appState.orgNavn,
            orgAdresse: appState.orgAdresse,
          })
        }}
      >
        Send inn søknad
      </Button>
      <AvbrytSøknad />
    </Knapper>
  )
}
