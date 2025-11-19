import { BodyLong, BodyShort, Box, Button, HGrid, Label } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import { organisasjonsnummer } from '../../components/organisasjonsnummer'
import { Buildings2Icon } from '@navikt/aksel-icons'
import styles from './Bedrift.module.css'

export interface BedriftProps {
  orgnr?: string
  orgNavn?: string
  orgAdresse?: string
  onByttBedrift(): void
}

export function Bedrift(props: BedriftProps) {
  const { t } = useTranslation()
  const { orgnr, orgNavn } = props

  return (
    <Box.New marginInline="5" paddingInline="4" paddingBlock="6" borderRadius="large" marginBlock="0 5" width={{ xs: "95%", sm: "auto" }} borderWidth="1">
      <HGrid columns={{ xs: "1fr", sm: "1fr auto" }} gap="12" align='center' className={styles.bedriftGrid}>
        <div>
          <div style={{ marginLeft: '0.6rem' }}>
            <BodyShort spacing style={{ fontSize: '1.2rem' }}>
              {t('krav.overskrift_foretaket')}
            </BodyShort>
            <Label size="medium">{` ${orgNavn}`}</Label>
            <BodyLong size="small">{`org. nr. ${organisasjonsnummer(orgnr)}`}</BodyLong>
          </div>
          <Button
            size="small"
            variant="tertiary"
            onClick={() => {
              props.onByttBedrift()
            }}
          >
            {t('krav.knapp_velg_annen_virksomhet')}
          </Button>
        </div>
        <Buildings2Icon fontSize="3rem" style={{ marginRight: '3rem' }} />
      </HGrid>
    </Box.New>
  )
}
