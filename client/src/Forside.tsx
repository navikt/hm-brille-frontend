import React from 'react'
import { Heading, LinkPanel, Panel, BodyLong, Link } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { LenkeMedLogging } from './components/LenkeMedLogging'

export function Forside() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <main>
        <Heading level="1" size="xlarge" style={{ textAlign: 'center' }}>
          {t('forside.overskrift')}
        </Heading>
        <div style={{ cursor: 'pointer', marginTop: '2rem' }}>
          <LinkPanel onClick={() => navigate('/krav')} border>
            <LinkPanel.Title>{t('forside.overskrift_send_krav')}</LinkPanel.Title>
            <LinkPanel.Description>{t('forside.overskrift_send_krav.beskrivelse')}</LinkPanel.Description>
          </LinkPanel>
        </div>
        <div style={{ cursor: 'pointer', marginTop: '2rem' }}>
          <LinkPanel onClick={() => navigate('/oversikt')} border>
            <LinkPanel.Title>{t('forside.overskrift_innsendte_krav')}</LinkPanel.Title>
            <LinkPanel.Description>{t('forside.overskrift_innsendte_krav.beskrivelse')}</LinkPanel.Description>
          </LinkPanel>
        </div>
        <Panel style={{ marginTop: '2rem' }} border>
          <Heading level="2" size="large" spacing={true} style={{ textAlign: 'center' }}>
            {t('forside.overskrift_om_ordningen')}
          </Heading>
          <BodyLong spacing={true}>{t('forside.overskrift_om_ordningen.beskrivelse1')}</BodyLong>
          <BodyLong spacing={true}>
            <Trans t={t} i18nKey="forside.overskrift_om_ordningen.beskrivelse2">
              <></>
              <LenkeMedLogging href="https://www.nav.no/hjelpemidler/brillekalkulator/" target="_blank">
                <></>
              </LenkeMedLogging>
              <></>
            </Trans>
          </BodyLong>
        </Panel>
      </main>
    </>
  )
}
