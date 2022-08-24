import { Print } from '@navikt/ds-icons'
import { Alert, BodyLong, Button, Heading } from '@navikt/ds-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { Beløp } from '../components/Beløp'
import { Data } from '../components/Data'
import { Dato } from '../components/Dato'
import { Datum } from '../components/Datum'
import { hotjar_event, HotjarTrigger } from '../components/hotjar-trigger'
import { LenkeMedLogging } from '../components/LenkeMedLogging'
import { organisasjonsnummer } from '../components/organisasjonsnummer'
import ScrollToTop from '../components/ScrollToTop'
import { baseUrl } from '../http'
import { useApplicationContext } from '../state/ApplicationContext'
import { OpprettKravResponse } from '../types'
import { useLocationState } from '../useLocationState'
import { logPrintKvitteringÅpnet } from '../utils/amplitude'
import { KravSteg } from './KravSteg'

export function KravKvittering() {
  const { t } = useTranslation()
  const { resetAppState } = useApplicationContext()
  const state = useLocationState<OpprettKravResponse>()

  HotjarTrigger({ timeout: 500 }, hotjar_event.KVITTERING)

  useEffect(() => {
    resetAppState()
  }, [])

  if (!state) {
    return null
  }

  const { id, orgnr, bestillingsreferanse, beløp, opprettet } = state

  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onBeforePrint: () => logPrintKvitteringÅpnet(),
    documentTitle: `kvittering_${bestillingsreferanse}`,
  })

  return (
    <div ref={printRef}>
      <KravSteg>
        <ScrollToTop />
        <Alert variant="success">{t('krav.kravet_er_registrert')}</Alert>
        <Avstand marginBottom={5} />
        <BodyLong spacing>{t('krav.kravet_er_registrert_forklaring')}</BodyLong>
        <Heading level="2" size="medium">
          {t('krav.overskrift_kvittering')}
        </Heading>
        <Data labelColumnWidth={150}>
          <Datum label="krav.ledetekst_orgnr">{organisasjonsnummer(orgnr)}</Datum>
          <Datum label="krav.ledetekst_innsendt_dato">
            <Dato verdi={opprettet}></Dato>
          </Datum>
          <Datum label="krav.ledetekst_beløp_til_utbetaling">
            <Beløp verdi={beløp} />
          </Datum>
          <Datum label="krav.ledetekst_deres_referansenr">{bestillingsreferanse}</Datum>
          <Datum label="krav.ledetekst_navs_referansenr">{id}</Datum>
        </Data>
        <Knapperad>
          <Button variant="secondary" onClick={handlePrint} icon={<Print aria-hidden />}>
            {t('krav.knapp_skriv_ut_kvittering')}
          </Button>
          <LenkeMedLogging href={baseUrl('/')}>{t('krav.lenke_til_forsiden')}</LenkeMedLogging>
        </Knapperad>
      </KravSteg>
    </div>
  )
}

const Knapperad = styled.div`
  display: flex;
  gap: var(--navds-spacing-4);
  @media print {
    display: none;
  }
`
