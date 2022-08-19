import ScrollToTop from './components/ScrollToTop'
import React from 'react'
import { Heading, LinkPanel, Panel, BodyLong, Link } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'

export function Forside() {
  const navigate = useNavigate()

  return (
    <>
      <ScrollToTop />
      <main>
        <Heading level="1" size="xlarge" style={{ textAlign: 'center' }}>
          Briller til barn
        </Heading>
        <div style={{ cursor: 'pointer', marginTop: '2rem' }}>
          <LinkPanel onClick={() => navigate('/krav')} border>
            <LinkPanel.Title>Send krav</LinkPanel.Title>
            <LinkPanel.Description>
              Fyll ut skjema for å sende inn krav om direkte oppgjør for briller til barn.
            </LinkPanel.Description>
          </LinkPanel>
        </div>
        <div style={{ cursor: 'pointer', marginTop: '2rem' }}>
          <LinkPanel onClick={() => navigate('/oversikt')} border>
            <LinkPanel.Title>Innsendte krav</LinkPanel.Title>
            <LinkPanel.Description>Se krav du har sendt inn til NAV de siste 6 månedene.</LinkPanel.Description>
          </LinkPanel>
        </div>
        <Panel style={{ marginTop: '2rem' }} border>
          <Heading level="2" size="large" spacing={true} style={{ textAlign: 'center' }}>
            Om ordningen
          </Heading>
          <BodyLong spacing={true}>
            Vi kan bruke denne plassen til å informere om relevante ting om ordningen og løsningene.
          </BodyLong>
          <BodyLong spacing={true}>
            <Link href="https://www.nav.no/hjelpemidler/brillekalkulator/" target="_blank">
              Brillekalkulatoren
            </Link>{' '}
            er tilgjengelig for alle som ønsker å se om de kan få støtte til briller til barn.
          </BodyLong>
        </Panel>
      </main>
    </>
  )
}
