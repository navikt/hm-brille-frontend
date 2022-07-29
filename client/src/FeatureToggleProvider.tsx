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

  const { data: features } = useGet<FeatureToggles>(featureTogglePath(alleFeatures))

  return <FeatureToggleContext.Provider value={features || {}}>{children}</FeatureToggleContext.Provider>
}

const featureTogglePath = (features: Feature[]): string => {
  const query = features.map((feature) => `feature=${feature}`).join('&')
  return `/features?${query}`
}