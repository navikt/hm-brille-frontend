import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { BrillestyrkeFormData } from '../krav/BrillestyrkeForm'

export interface AppState {
  orgnr: string
  orgNavn: string
  orgAdresse: string
  innbyggerFnr: string
  innbyggerNavn: string
  innbyggerAlder?: number
  brillestyrke: BrillestyrkeFormData
  bestillingsdato: string
  bestillingsreferanse: string
  brillepris: string
}

interface IApplicationContext {
  appState: AppState
  setAppState: Dispatch<SetStateAction<AppState>>

  resetAppState(): void
}

export const initialAppState: AppState = {
  orgnr: '',
  orgNavn: '',
  orgAdresse: '',
  innbyggerFnr: '',
  innbyggerNavn: '',
  bestillingsreferanse: '',
  brillestyrke: {
    høyreSfære: '',
    høyreSylinder: '',
    venstreSfære: '',
    venstreSylinder: '',
  },
  bestillingsdato: '',
  brillepris: '',
}

const ApplicationContext = React.createContext<IApplicationContext>({
  appState: initialAppState,
  setAppState() {},
  resetAppState() {},
})

export function ApplicationProvider({ children }: { children: React.ReactNode }) {
  const [appState, setAppState] = useState(initialAppState)
  return (
    <ApplicationContext.Provider
      value={{
        appState,
        setAppState,
        resetAppState() {
          setAppState(initialAppState)
        },
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}

export function useApplicationContext(): IApplicationContext {
  return useContext(ApplicationContext)
}
