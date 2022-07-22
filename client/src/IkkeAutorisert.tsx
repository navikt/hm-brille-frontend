import { Alert, BodyLong } from '@navikt/ds-react'
import { Avstand } from './components/Avstand'

export function IkkeAutorisert() {
  return (
    <main>
      <Avstand paddingLeft={3} paddingRight={3}>
        <Alert variant="warning">
          <BodyLong>
            Ingen tilgang. Kun registrerte optikere i helsepersonellregisteret har tilgang til løsningen
          </BodyLong>
        </Alert>
      </Avstand>
    </main>
  )
}
