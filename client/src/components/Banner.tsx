import { Box } from '@navikt/ds-react'
import React from 'react'

interface BannerProps {
  children?: React.ReactNode
}

export function Banner(props: BannerProps) {

  return (<Box background='neutral-soft' padding="space-16" width="100%" style={{ textAlign: 'center' }}>{props.children}</Box>);
}