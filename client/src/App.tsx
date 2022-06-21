import { Route, Routes } from 'react-router-dom'
import { Søknad } from './søknad/Søknad'

export function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Søknad />} />
      </Routes>
    </main>
  )
}
