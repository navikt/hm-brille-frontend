import { Data } from '@navikt/ds-icons'
import { Alert, BodyLong, Heading, Panel } from '@navikt/ds-react'
import { useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import { Avstand } from '../components/Avstand'
import type { SjekkKanSøkeRequest, SjekkKanSøkeResponse } from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { Barn } from './Barn'
import { IkkeFunnet } from './IkkeFunnet'
import { SjekkKanSøkeForm } from './SjekkKanSøkeForm'
import { SøknadForm } from './SøknadForm'
import { Virksomhet } from './Virksomhet'
import { VirksomhetForm } from './VirksomhetForm'

export function Søknad() {
  const [organisasjonsnummer, setOrganisasjonsnummer] = useState<string | null>(null)
  const { data: sjekkKanSøke, ...http } = usePost<SjekkKanSøkeRequest, SjekkKanSøkeResponse>('/sjekk-kan-soke')
  const { data: virksomhet } = useSWR(organisasjonsnummer ? `/enhetsregisteret/enheter/${organisasjonsnummer}` : null)
  const { data: tidligereBrukteVirksomheter } = useSWR('/orgnr')
  const [valgtVirksomhet, setValgtVirksomhet] = useState(tidligereBrukteVirksomheter?.data?.sistBrukteOrganisasjon || {})

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
        {tidligereBrukteVirksomheter?.data?.tidligereBrukteOrganisasjoner?.length == 0 ||
        !tidligereBrukteVirksomheter?.data?.sistBrukteOrganisasjon ? (
          <Panel>
            <Heading level="2" size="medium" spacing>
              Foretak som skal ha direkteoppgjør
            </Heading>
            <VirksomhetForm
              onValid={({ orgnummer }) => {
                setOrganisasjonsnummer(orgnummer)
              }}
            />
            {virksomhet?.data && (
              <Avstand paddingTop={5}>
                <Virksomhet data={virksomhet?.data} onLagre={setValgtVirksomhet} />
              </Avstand>
            )}
          </Panel>
        ) : (
          <>
            <Panel>
              <Panel>
                <Heading size="small">Foretaket som skal ha direkteoppgjør</Heading>
                <BodyLong>{`${tidligereBrukteVirksomheter?.data?.sistBrukteOrganisasjon?.navn}, org. nr. ${tidligereBrukteVirksomheter?.data?.sistBrukteOrganisasjon?.orgnummer}`}</BodyLong>
              </Panel>
            </Panel>
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
                  <Avstand marginTop={5}>
                    <SøknadForm />
                  </Avstand>
                </Avstand>
              )}
            </Panel>
          </>
        )}
      </main>
    </>
  )
}

const Banner = styled(Panel)`
  background-color: var(--navds-global-color-gray-50);
  text-align: center;
`
