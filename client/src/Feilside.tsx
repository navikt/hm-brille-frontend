import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import styled from 'styled-components'
import { AppLink } from './components/AppLink'
import { Avstand } from './components/Avstand'
import { Pipe } from './components/Pipe'
import { hentUtviklerinformasjon } from './error'

export interface FeilsideProps {
  status: number
  error?: Error
}

export function Feilside(props: FeilsideProps) {
  const { status, error } = props
  const utviklerinformasjon = hentUtviklerinformasjon(error)
  return (
    <main>
      <Avstand paddingLeft={3} paddingRight={3}>
        <Heading level="1" size="large" spacing>
          {overskrift[status] || 'Teknisk feil'}
          <Pipe />
          <Feilkode>Feilkode {status}</Feilkode>
        </Heading>
        {{
          401: <IkkeLoggetInn />,
          404: <IkkeFunnet />,
        }[status] || <TekniskFeil />}
      </Avstand>
      {utviklerinformasjon && (
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Informasjon til utviklere</Accordion.Header>
            <Accordion.Content>
              <Code>{utviklerinformasjon}</Code>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      )}
    </main>
  )
}

function IkkeLoggetInn() {
  return (
    <>
      <BodyShort spacing>Du må logge inn for å få tilgang til systemet.</BodyShort>
      <BodyShort spacing>
        <AppLink href="/">Gå til innloggingssiden</AppLink>.
      </BodyShort>
    </>
  )
}

function IkkeFunnet() {
  return (
    <>
      <BodyShort spacing>
        Beklager, siden kan være slettet eller flyttet, eller det var en feil i lenken som førte deg hit.
      </BodyShort>
      <BodyShort spacing>
        <AppLink href="/">Gå til forsiden</AppLink>.
      </BodyShort>
    </>
  )
}

function TekniskFeil() {
  return (
    <>
      <BodyShort spacing>Beklager, det har skjedd en teknisk feil.</BodyShort>
      <BodyShort spacing>
        <AppLink href="/">Gå til forsiden</AppLink>.
      </BodyShort>
    </>
  )
}

const overskrift: Record<number, string> = {
  401: 'Ikke logget inn',
  404: 'Fant ikke siden',
}

const Feilkode = styled.small`
  font-weight: normal;
`

const Code = styled.pre`
  white-space: pre-wrap;
  font-size: 75%;
`
