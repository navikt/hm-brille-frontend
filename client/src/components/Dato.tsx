import { dato } from '../dato'

export interface DatoProps {
  verdi?: Date | number | string
}

export function Dato(props: DatoProps) {
  const { verdi } = props
  return verdi ? <>{dato.formater(verdi)}</> : null
}
