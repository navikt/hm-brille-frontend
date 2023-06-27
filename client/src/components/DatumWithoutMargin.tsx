import { Label } from '@navikt/ds-react'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Nullable } from '../types'

export interface DatumWithoutMarginProps {
  label: string
  children?: Nullable<ReactNode>
}

export function DatumWithoutMargin(props: DatumWithoutMarginProps) {
  const { label, children } = props
  const { t } = useTranslation()
  return (
    <>
      <Label as="dt">{t(label)}</Label>
      <dd style={{marginLeft: '0px'}}>{children}</dd>
    </>
  )
}
