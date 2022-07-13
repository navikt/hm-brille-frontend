import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { BrillestyrkeFormData } from '../søknad/BrillestyrkeForm'

export interface AppState {
  orgnummer: string
  orgNavn: string
  orgAdresse: string
  fodselsnummer: string
  brukersNavn: string
  brukersAlder?: number
  brillestyrke: BrillestyrkeFormData
  bestillingsdato: string
  bestillingsreferanse: string
  brillepris: string
}

interface IApplicationContext {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>
}

export const initialAppState: AppState = {
  orgnummer: '',
  orgNavn: '',
  orgAdresse: '',
  fodselsnummer: '',
  brukersNavn: '',
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
