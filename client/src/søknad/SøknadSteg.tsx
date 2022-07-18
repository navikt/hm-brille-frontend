import { Heading } from '@navikt/ds-react'
import { ReactNode } from 'react'
import { Banner } from '../components/Banner'

export interface SøknadStegProps {
  children: ReactNode
}

export function SøknadSteg(props: SøknadStegProps) {
  const { children } = props
  return (
    <>
      <header>
        <Banner>
          <Heading level="1" size="large">
            Krav om direkte oppgjør av briller for barn
          </Heading>
        </Banner>
      </header>
      <main>{children}</main>
    </>
  )
}
