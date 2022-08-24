import { Office1, SaveFile } from '@navikt/ds-icons'
import { Alert, BodyLong, Button, Heading } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { Data } from '../components/Data'
import { DataPanel } from '../components/DataPanel'
import { Datum } from '../components/Datum'
import { organisasjonsnummer } from '../components/organisasjonsnummer'
import { VirksomhetResponse } from '../types'

export interface VirksomhetProps {
  virksomhet: VirksomhetResponse
  onLagre: Function
}

export function Virksomhet(props: VirksomhetProps) {
  const { virksomhet, onLagre } = props
  const { t } = useTranslation()
  const { orgnr, navn, adresse, aktiv } = virksomhet

  if (!aktiv) {
    return (
      <Alert variant="warning">
        <Heading size="small">{t('krav.overskrift_mangler_avtale')}</Heading>
        <BodyLong>
          {t('krav.mangler_avtale', {
            navn,
          })}
        </BodyLong>
      </Alert>
    )
  }

  return (
    <>
      <DataPanel>
        <Heading level="3" size="small">
          <Office1 /> {`${navn}`}
        </Heading>
        <Data>
          <Datum label="krav.ledetekst_orgnr">{organisasjonsnummer(orgnr)}</Datum>
          {adresse && <Datum label="krav.ledetekst_adresse">{adresse}</Datum>}
        </Data>
      </DataPanel>
      <Button variant="primary" onClick={() => onLagre({ orgnr, navn })} icon={<SaveFile aria-hidden />}>
        {t('krav.knapp_bruk')}
      </Button>
    </>
  )
}
