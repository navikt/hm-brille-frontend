import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { baseUrl } from './http'
import { IkkeAutorisert } from './IkkeAutorisert'
import { Forside } from './Forside'
import { Oversikt } from './oversikt/Oversikt'
import { OversiktDetaljer } from './oversikt/OversiktDetaljer'
import { Krav } from './krav/Krav'
import { KravKvittering } from './krav/KravKvittering'
import { KravOppsummering } from './krav/KravOppsummering'
import { ApplicationProvider } from './state/ApplicationContext'
import {FeatureToggleProvider} from "./FeatureToggleProvider";

export function App() {
  useEffect(() => {
    setBreadcrumbs([
      { url: 'https://www.nav.no/barnebriller', title: 'Briller til barn – optikers rolle' },
      { url: baseUrl('/'), title: 'Krav om direkte oppgjør' },
    ])
  }, [])

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (isHttpError(error)) {
          if (error.status === 403) {
            return <IkkeAutorisert />
          } else return <Feilside status={error.status} error={error} />
        } else {
          return <Feilside status={500} error={error} />
        }
      }}
    ><FeatureToggleProvider>
      <ApplicationProvider>
        <Routes>
          <Route path="/" element={<Krav />} />
          <Route path="/krav" element={<Krav />} />
          <Route path="/krav/oppsummering" element={<KravOppsummering />} />
          <Route path="/krav/kvittering" element={<KravKvittering />} />
          <Route path="/oversikt" element={<Oversikt />} />
          <Route path="/oversikt/:vedtakId" element={<OversiktDetaljer />} />
          <Route path="*" element={<Feilside status={404} />} />
        </Routes>
      </ApplicationProvider>
    </FeatureToggleProvider>
    </ErrorBoundary>
  )
}
