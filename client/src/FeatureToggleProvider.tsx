import React, { createContext } from 'react'
import { useGet } from './useGet'

export enum Feature {
  TekniskFeilBanner = 'hm.brille.feilbanner',
}

export const alleFeatures = Object.values(Feature)

export interface FeatureToggles {
  [toggles: string]: boolean
}

export const FeatureToggleContext = createContext<FeatureToggles>({})

export function FeatureToggleProvider({ children }: { children: React.ReactNode }) {
  const { data: features } = useGet<FeatureToggles>(featureTogglePath(alleFeatures))

  return <FeatureToggleContext.Provider value={features || {}}>{children}</FeatureToggleContext.Provider>
}

function featureTogglePath(features: Feature[]): string {
  const query = features.map((feature) => `feature=${feature}`).join('&')
  return `/features?${query}`
}
