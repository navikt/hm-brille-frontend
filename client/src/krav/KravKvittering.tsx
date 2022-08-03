import { Alert, BodyLong, Heading, Button } from '@navikt/ds-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { Beløp } from '../components/Beløp'
import { Data } from '../components/Data'
import { Dato } from '../components/Dato'
import { Datum } from '../components/Datum'
import { organisasjonsnummer } from '../components/organisasjonsnummer'
import ScrollToTop from '../components/ScrollToTop'
import { useApplicationContext } from '../state/ApplicationContext'
import { OpprettKravResponse } from '../types'
import { useLocationState } from '../useLocationState'
import { KravSteg } from './KravSteg'
import { HotjarTrigger } from '../components/hotjar-trigger'
import { useReactToPrint } from 'react-to-print'
import styled from 'styled-components'
import { Print } from '@navikt/ds-icons'
import { LenkeMedLogging } from '../components/LenkeMedLogging'
import { baseUrl } from '../http'
import { logPrintÅpnet } from '../utils/amplitude'

export function KravKvittering() {
  const { resetAppState } = useApplicationContext()
  const state = useLocationState<OpprettKravResponse>()

  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforePrint: () => logPrintÅpnet(),
    documentTitle: state?.bestillingsreferanse ? `kvittering_${state.bestillingsreferanse}` : undefined,
  })

  HotjarTrigger({ timeout: 500 })

  useEffect(() => {
    resetAppState()
  }, [])

  if (!state) {
    return null
  }
  const { id, orgnr, bestillingsreferanse, beløp, opprettet } = state

  return (
    <div ref={printRef}>
      <KravSteg>
        <ScrollToTop />
        <Alert variant="success">Kravet er registrert</Alert>
        <Avstand marginBottom={5} />
        <BodyLong spacing>
          Kravet om direkte oppgjør er automatisk registrert. NAV utbetaler stønaden til firmaets kontonummer senest 30
          dager etter at kravet er registrert.
        </BodyLong>

        <Heading level="2" size="medium">
          Kvittering
        </Heading>
        <Data labelColumnWidth={150}>
          <Datum label="Org. nummer">{organisasjonsnummer(orgnr)}</Datum>
          <Datum label="Innsendt dato">
            <Dato verdi={opprettet}></Dato>
          </Datum>
          <Datum label="Beløp til utbetaling">
            <Beløp verdi={beløp} />
          </Datum>
          <Datum label="Deres referansenr.">{bestillingsreferanse}</Datum>
          <Datum label="NAVs referansenr.">{id}</Datum>
        </Data>
        <Knapperad>
          <Button variant="secondary" onClick={handlePrint}>
            <Print aria-hidden />
            Skriv ut kvittering
          </Button>
          <LenkeMedLogging href={baseUrl('/')}>Til forsiden</LenkeMedLogging>
        </Knapperad>
      </KravSteg>
    </div>
  )
}

const Knapperad = styled.div`
  display: flex;
  gap: var(--navds-spacing-4);
  align-items: center;
  @media print {
    display: none;
  }
`
