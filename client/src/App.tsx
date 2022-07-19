import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { ApplicationProvider } from './state/ApplicationContext'
import { Krav } from './krav/Krav'
import { KravKvittering } from './krav/KravKvittering'
import { KravOppsummering } from './krav/KravOppsummering'

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
          <Route path="/" element={<Krav />} />
          <Route path="/krav" element={<Krav />} />
          <Route path="/krav/oppsummering" element={<KravOppsummering />} />
          <Route path="/krav/kvittering" element={<KravKvittering />} />
          <Route path="*" element={<Feilside status={404} />} />
        </Routes>
      </ApplicationProvider>
    </ErrorBoundary>
  )
}
