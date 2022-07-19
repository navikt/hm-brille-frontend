import { Alert } from '@navikt/ds-react'

export function IkkeRettighetGenerisk() {
  return (
    <Alert variant="warning">
      Barnet har ikke rett til å få brillestøtte. Du kan ikke sende inn direkte oppgjør av briller til dette barnet.
    </Alert>
  )
}

export function IkkeRettighetAlder() {
  return (
    <Alert variant="warning">
      Personen har ikke rett til å få brillestøtte fordi personen er over 18 år. Du kan ikke sende inn direkte oppgjør
      for briller til denne personen.
    </Alert>
  )
}
