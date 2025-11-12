import { Box } from '@navikt/ds-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface BannerProps {
  children?: React.ReactNode
}

export function Banner(props: BannerProps) {
  const { t } = useTranslation()

  return (
    <BannerContainer>
      <Box.New background='neutral-soft' padding="4" width="100%" style={{ textAlign: 'center' }}>{props.children}</Box.New>
    </BannerContainer>
  )
}

export const BannerContainer = styled.div`
  display: grid;
  place-items: center;
`

export const FeilBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--ax-space-8);
`
