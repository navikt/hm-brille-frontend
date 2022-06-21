import { Label } from '@navikt/ds-react'
import { ReactNode } from 'react'
import { Nullable } from '../types'

export interface DatumProps {
  label: string
  children?: Nullable<ReactNode>
}

export function Datum(props: DatumProps) {
  const { label, children } = props
  return (
    <>
      <dt>
        <Label>{label}</Label>
      </dt>
      <dd>{children}</dd>
    </>
  )
}
