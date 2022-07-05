import React, { useContext, useState, Dispatch, SetStateAction, useEffect } from 'react'
import { BrillestyrkeFormData } from '../søknad/Brillestyrke'

export interface AppState {
  orgnummer: string
  fodselsnummer: string
  brillestyrke: BrillestyrkeFormData
  bestillingsdato: string
  bestillingsreferanse: string
  brillepris: string
}

interface IApplicationContext {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

const initialAppState: AppState = {
  orgnummer: '',
  fodselsnummer: '',
  bestillingsreferanse: '',
  brillestyrke: {
    høyreSfære: '1',
    høyreSylinder: '1',
    venstreSfære: '1',
    venstreSylinder: '1',
  },
  bestillingsdato: '',
  brillepris: '',
}

const ApplicationContext = React.createContext<IApplicationContext>({
  appState: initialAppState,
  setAppState: () => {},
})

export const ApplicationProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState(initialAppState)

  useEffect(() => {
    // TODO: gjør initielle sjekker som trengs
  }, [])

  return <ApplicationContext.Provider value={{ appState, setAppState }}>{children}</ApplicationContext.Provider>
}

export const useApplicationContext = (): IApplicationContext => useContext(ApplicationContext)
