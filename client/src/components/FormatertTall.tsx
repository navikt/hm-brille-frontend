interface FormatertTallProps {
  verdi?: number | string
}

export function FormatertTall(props: FormatertTallProps) {
  const tall = props.verdi
  return <>{props.verdi && formatter.format(Number(props.verdi))}</>
}

const formatter = new Intl.NumberFormat('nb', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
