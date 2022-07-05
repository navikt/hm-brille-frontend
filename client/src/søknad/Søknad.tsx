import { Alert, Heading, Panel } from '@navikt/ds-react'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { AvvisningsType, SjekkKanSøkeRequest, SjekkKanSøkeResponse } from '../types'
import { usePost } from '../usePost'
import { Barn } from './Barn'
import { IkkeFunnet } from './IkkeFunnet'
import { IkkeRettighetGenerisk, IkkeRettighetAlder } from './IkkeRettighet'
import { SjekkKanSøkeForm } from './SjekkKanSøkeForm'
import { SøknadForm } from './SøknadForm'

export function Søknad() {
  const { data: sjekkKanSøke, ...http } = usePost<SjekkKanSøkeRequest, SjekkKanSøkeResponse>('/sjekk-kan-soke')
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
        <Panel>
          <Heading level="2" size="medium" spacing>
            Om barnet
          </Heading>
          <SjekkKanSøkeForm
            onValid={async ({ fnr }) => {
              await http.post({ fnr })
            }}
          />
          {sjekkKanSøke === null && (
            <Avstand marginTop={5} marginBottom={5}>
              <IkkeFunnet />
            </Avstand>
          )}
          {sjekkKanSøke && (
            <Avstand marginTop={5} marginBottom={5}>
              <Barn sjekkKanSøke={sjekkKanSøke} />
              {sjekkKanSøke.kanSøke ? (
                <>
                  <Avstand marginTop={5}>
                    <Alert variant="info">Barnet kan ha rett til å få brillestøtte</Alert>
                    <SøknadForm />
                  </Avstand>
                </>
              ) : (
                <Avstand marginTop={5} marginBottom={5}>
                  {sjekkKanSøke.begrunnelse === AvvisningsType.ALDER ? (
                    <IkkeRettighetAlder />
                  ) : (
                    <IkkeRettighetGenerisk />
                  )}
                </Avstand>
              )}
            </Avstand>
          )}
        </Panel>
      </main>
    </>
  )
}

const Banner = styled(Panel)`
  background-color: var(--navds-global-color-gray-50);
  text-align: center;
`
