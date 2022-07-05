import { Alert } from '@navikt/ds-react'

export function IkkeRettighetGenerisk() {
  return (
    <Alert variant="warning">
      Barnet har ikke rett til å få brillestøtte. Du kan ikke sende inn direkteoppgjør for barnebriller til dette
      barnet.
    </Alert>
  )
}

export function IkkeRettighetAlder() {
  return (
    <Alert variant="warning">
      Barnet har ikke rett til å få brillestøtte fordi barnet er over 18 år. Du kan ikke sende inn direkteoppgjør for
      barnebriller til dette barnet.
    </Alert>
  )
}
