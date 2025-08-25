import React from 'react'
import { BodyLong, Heading, LinkPanel, List, Panel } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { LenkeMedLogging } from './components/LenkeMedLogging'
import styled from 'styled-components'
import { InnsendteKravIkon, SendKravIkon } from './resources/ikoner/Ikon'
import { useApplicationContext } from './state/ApplicationContext'

const Grid = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--a-spacing-8);
  align-items: center;
`

export function Forside() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Ikke husk krav hvis man går tilbake til forsiden (selv om man ikke bruker avbryt-knappen)
  const { resetAppState } = useApplicationContext()
  resetAppState()

  return (
    <div className="gray-background">
      <main>
        <Heading level="1" size="xlarge" style={{ textAlign: 'center' }}>
          {t('forside.overskrift')}
        </Heading>
        <div style={{ cursor: 'pointer', marginTop: '2rem' }}>
          <LinkPanel
            tabIndex={0}
            onClick={() => navigate('/krav')}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                navigate('/krav')
              }
            }}
            border={false}
          >
            <Grid>
              <SendKravIkon />
              <div>
                <LinkPanel.Title>{t('forside.overskrift_send_krav')}</LinkPanel.Title>
                <LinkPanel.Description>{t('forside.overskrift_send_krav.beskrivelse')}</LinkPanel.Description>
              </div>
            </Grid>
          </LinkPanel>
        </div>
        <div style={{ cursor: 'pointer', marginTop: '2rem' }}>
          <LinkPanel
            tabIndex={0}
            onClick={() => navigate('/oversikt')}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                navigate('/oversikt')
              }
            }}
            border={false}
          >
            <Grid>
              <InnsendteKravIkon />
              <div>
                <LinkPanel.Title>{t('forside.overskrift_innsendte_krav')}</LinkPanel.Title>
                <LinkPanel.Description>
                  {t('forside.overskrift_innsendte_krav.beskrivelse1')} <br />{' '}
                  {t('forside.overskrift_innsendte_krav.beskrivelse2')}
                </LinkPanel.Description>
              </div>
            </Grid>
          </LinkPanel>
        </div>
        <Panel style={{ marginTop: '2rem' }}>
          <Heading level="2" size="large" spacing={true} style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {t('forside.overskrift_om_ordningen')}
          </Heading>
          <BodyLong spacing={true}>{t('forside.overskrift_om_ordningen.beskrivelse1')}</BodyLong>

          <List as="ul" size="small" title={t('forside.overskrift_om_ordningen.abonnement1')}>
            <List.Item>{t('forside.overskrift_om_ordningen.abonnement2')}</List.Item>
            <List.Item>{t('forside.overskrift_om_ordningen.abonnement3')}</List.Item>
          </List>
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
    </div>
  )
}
