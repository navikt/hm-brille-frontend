import React, {useContext} from 'react'
import {Alert, Panel} from '@navikt/ds-react'
import styled from 'styled-components'
import {Feature, FeatureToggleContext} from "../FeatureToggleProvider";

interface BannerProps {
    children?: React.ReactNode
}

export function Banner(props: BannerProps) {

    const featureToggleContext = useContext(FeatureToggleContext)
    const visFeilBanner = featureToggleContext[Feature.TekniskFeilBanner]

    return (
        <BannerContainer>
            <BannerPanel>
                {props.children}
            </BannerPanel>
            {visFeilBanner && (
                <FeilBanner>
                    <Alert variant="error" size="medium">
                        Vi har dessverre tekniske problemer nå. Det kan derfor være problemer med å sende inn krav.
                    </Alert>
                </FeilBanner>
            )}
        </BannerContainer>
    )
}

export const BannerContainer = styled.div`
  display: grid;
  place-items: center;
`

export const BannerPanel = styled(Panel)`
  background-color: var(--navds-global-color-gray-50);
  text-align: center;
  width: 100vw;
`

export const FeilBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--navds-spacing-2);
`