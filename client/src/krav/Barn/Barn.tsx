import { Box, Heading, HGrid, Label } from '@navikt/ds-react'
import { BrillebarnComponent } from '../../resources/svg/BrillebarnComponent'
import { t } from 'i18next'
import styles from './Barn.module.css'


export interface BarnProps {
  fnr: string
  navn: string
  alder?: number
}

export function Barn(props: BarnProps) {
  const { fnr, navn, alder } = props
  let alderTekst = typeof alder === 'number' ? ` (${alder} år)` : ''
  return (
    <Box.New paddingInline="6" paddingBlock="6 0" background="brand-blue-moderate" borderRadius="large" marginBlock="0 5" width={{ xs: "95%", sm: "auto" }}>
      <HGrid columns={{ xs: "1fr", sm: "auto 1fr" }} gap="12" align='center' className={styles.barnGrid}>
        <BrillebarnComponent />
        <div role="alert">
          <Heading level="3" size="xsmall">
            {`${navn}${alderTekst}`}
          </Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
            <Label as="div">{`${t('krav.ledetekst_fnr')}`}</Label>
            <div style={{ paddingLeft: '0.5rem' }}>{fnr}</div>
          </div>
        </div>
      </HGrid>
    </Box.New>
  )
}
