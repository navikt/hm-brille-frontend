import { Heading } from '@navikt/ds-react'
import { ReactNode } from 'react'
import { Banner } from '../components/Banner'

export interface KravStegProps {
  children: ReactNode
}

export function InnsynHeader(props: KravStegProps) {
  const { children } = props
  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            Innsyn i innsendte krav
          </Heading>
        </Banner>
      </header>
      <main>{children}</main>
    </>
  )
}
