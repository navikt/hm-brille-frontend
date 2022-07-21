import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import type { Brilleseddel } from '../types'

export interface AppState {
  orgnr: string
  orgNavn: string
  orgAdresse: string
  barnFnr: string
  barnNavn: string
  barnAlder?: number
  brillestyrke: Brilleseddel
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
  barnFnr: '',
  barnNavn: '',
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
