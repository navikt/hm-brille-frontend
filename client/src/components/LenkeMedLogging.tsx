import { Link, LinkProps } from '@navikt/ds-react'
import { logNavigeringLenke } from '../utils/amplitude'

export function LenkeMedLogging(props: LinkProps) {
  const { href, children, ...rest } = props
  return (
    <Link
      onClick={() => { logNavigeringLenke(href || '') }} {...rest}>
      {children}
    </Link>
  )
}