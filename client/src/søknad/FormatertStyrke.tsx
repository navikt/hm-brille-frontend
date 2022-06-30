import { MAX_STYRKE, MIN_STYRKE } from './config'

interface FormatertStyrkeProps {
  verdi?: number | string
  max: number
  minus?: boolean
}

export function FormatertStyrke(props: FormatertStyrkeProps) {
  const tall = Number(props.verdi)
  const minus = props.minus ? '-' : ''
  if (Math.abs(tall) === MIN_STYRKE) {
    return (
      <>
        Under {minus}
        {formatter.format(1)}
      </>
    )
  }
  if (Math.abs(tall) === MAX_STYRKE) {
    return (
      <>
        Over {minus}
        {formatter.format(props.max)}
      </>
    )
  }
  return <>{tall && formatter.format(tall)}</>
}

const formatter = new Intl.NumberFormat('nb', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
