import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { Søknad } from './søknad/Søknad'
import { Vilkårsgrunnlag } from './vilkårsgrunnlag/Vilkårsgrunnlag'
import { ApplicationProvider } from './state/ApplicationContext'

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
          <Route path="/vilkarsgrunnlag" element={<Vilkårsgrunnlag />} />
          <Route path="*" element={<Feilside status={404} />} />
        </Routes>
      </ApplicationProvider>
    </ErrorBoundary>
  )
}
