import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { ApplicationProvider } from './state/ApplicationContext'
import { Søknad } from './søknad/Søknad'
import { SøknadKvittering } from './søknad/SøknadKvittering'
import { SøknadOppsummering } from './søknad/SøknadOppsummering'

export function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (isHttpError(error)) {
          return <Feilside status={error.status} error={error} />
        } else {
          return <Feilside status={500} error={error} />
        }
      }}
    >
      <ApplicationProvider>
        <Routes>
          <Route path="/" element={<Søknad />} />
          <Route path="/soknad" element={<Søknad />} />
          <Route path="/soknad/oppsummering" element={<SøknadOppsummering />} />
          <Route path="/soknad/kvittering" element={<SøknadKvittering />} />
          <Route path="*" element={<Feilside status={404} />} />
        </Routes>
      </ApplicationProvider>
    </ErrorBoundary>
  )
}
