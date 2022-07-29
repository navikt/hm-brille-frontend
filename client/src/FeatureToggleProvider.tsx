import React, { createContext } from 'react'
import {useGet} from "./useGet";

export enum Feature {
  TekniskFeilBanner = 'hm.brille.feilbanner',
}

export const alleFeatures = Object.values(Feature)

export interface FeatureToggles {
  [toggles: string]: boolean
}

export const FeatureToggleContext = createContext<FeatureToggles>({})

export const FeatureToggleProvider = ({ children }: { children: React.ReactNode }) => {

  const { data: features } = useGet<FeatureToggles>('/features')

  return <FeatureToggleContext.Provider value={features || {}}>{children}</FeatureToggleContext.Provider>
}