import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { IkkeAutorisert } from './IkkeAutorisert'
import { Forside } from './Forside'
import { Oversikt } from './oversikt/Oversikt'
import { OversiktDetaljer } from './oversikt/OversiktDetaljer'
import { Krav } from './krav/Krav'
import { KravKvittering } from './krav/KravKvittering'
import { KravOppsummering } from './krav/KravOppsummering'
import { ApplicationProvider } from './state/ApplicationContext'
import Breadcrumbs from './components/Breadcrumbs'
import { useTranslation } from 'react-i18next'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export function App() {
  return (
    <FeilGrense erInnsendingFeil={false}>
      <Breadcrumbs />
      <ApplicationProvider>
        <HelmetProvider>
          <Routes>
            <Route
              path="/"
              element={
                <SettTittel title="helmet.title.forside">
                  <Forside />
                </SettTittel>
              }
            />
            <Route
              path="/krav"
              element={
                <SettTittel title="helmet.title.krav">
                  <Krav />
                </SettTittel>
              }
            />
            <Route
              path="/krav/oppsummering"
              element={
                <SettTittel title="helmet.title.krav_oppsummering">
                  <FeilGrense erInnsendingFeil={true}>
                    <KravOppsummering />
                  </FeilGrense>
                </SettTittel>
              }
            />
            <Route
              path="/krav/kvittering"
              element={
                <SettTittel title="helmet.title.krav_kvittering">
                  <KravKvittering />
                </SettTittel>
              }
            />
            <Route
              path="/oversikt"
              element={
                <SettTittel title="helmet.title.krav_oversikt">
                  <Oversikt />
                </SettTittel>
              }
            />
            <Route
              path="/oversikt/:vedtakId"
              element={
                <SettTittel title="helmet.title.kravdetaljer">
                  <OversiktDetaljer />
                </SettTittel>
              }
            />
            <Route
              path="*"
              element={
                <SettTittel title="helmet.title.feilside">
                  <Feilside status={404} />
                </SettTittel>
              }
            />
          </Routes>
        </HelmetProvider>
      </ApplicationProvider>
    </FeilGrense>
  )
}

const SettTittel = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  const { t } = useTranslation()
  return (
    <>
      <Helmet htmlAttributes={{ lang: 'no' }}>
        <title>{t(title)}</title>
      </Helmet>
      {children}
    </>
  )
}

const FeilGrense = ({ erInnsendingFeil, children }: { erInnsendingFeil: Boolean; children?: React.ReactNode }) => {
  const { t } = useTranslation()
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (isHttpError(error)) {
          if (error.status === 403) {
            return <IkkeAutorisert />
          } else return <Feilside status={error.status} error={error} erInnsendingFeil={erInnsendingFeil} />
        } else {
          return <Feilside status={500} error={error} erInnsendingFeil={erInnsendingFeil} />
        }
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
