import React from 'react'
import { BodyLong, Box, Heading, LinkCard, List } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { LenkeMedLogging } from './components/LenkeMedLogging'
import { InnsendteKravIkon, SendKravIkon } from './resources/ikoner/Ikon'
import { useApplicationContext } from './state/ApplicationContext'

export function Forside() {
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
        <div style={{ marginTop: "2rem" }}>
          <LinkCard tabIndex={0}>
            <Box.New asChild borderRadius="large">
              <LinkCard.Icon>
                <SendKravIkon />
              </LinkCard.Icon>
            </Box.New>
            <LinkCard.Title>
              <LinkCard.Anchor asChild>
                <Link to="/krav"> {t('forside.overskrift_send_krav')} </Link>
              </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
              {t('forside.overskrift_send_krav.beskrivelse')}
            </LinkCard.Description>
          </LinkCard>
        </div>
        <div style={{ marginTop: "2rem" }}>
          <LinkCard tabIndex={0}>
            <Box.New asChild borderRadius="large">
              <LinkCard.Icon>
                <InnsendteKravIkon />
              </LinkCard.Icon>
            </Box.New>
            <LinkCard.Title>
              <LinkCard.Anchor asChild>
                <Link to="/oversikt">{t('forside.overskrift_innsendte_krav')}</Link>
              </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
              {t('forside.overskrift_innsendte_krav.beskrivelse1')} <br />{' '}
              {t('forside.overskrift_innsendte_krav.beskrivelse2')}
            </LinkCard.Description>
          </LinkCard>
        </div>
        <Box.New marginBlock="8 0" background='default' padding="4" borderRadius="xlarge" borderWidth='1' borderColor='neutral-subtleA'>
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
        </Box.New>
      </main>
    </div>
  )
}
