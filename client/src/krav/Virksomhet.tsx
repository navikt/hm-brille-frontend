import { Alert, BodyLong, Box, Button, Heading } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { organisasjonsnummer } from '../components/organisasjonsnummer'
import { VirksomhetResponse } from '../types'
import React from 'react'
import { Buildings2Icon, FloppydiskIcon } from '@navikt/aksel-icons'

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
      <Box.New background='neutral-soft' marginBlock="0 5" padding="4" borderRadius="large">
        <Heading level="3" size="small">
          <Buildings2Icon /> {`${navn}`}
        </Heading>
        <Data>
          <Datum label="krav.ledetekst_orgnr">{organisasjonsnummer(orgnr)}</Datum>
          {adresse && <Datum label="krav.ledetekst_adresse">{adresse}</Datum>}
        </Data>
      </Box.New>
      <Button variant="primary" onClick={() => onLagre({ orgnr, navn })} icon={<FloppydiskIcon aria-hidden />}>
        {t('krav.knapp_bruk')}
      </Button>
    </>
  )
}
