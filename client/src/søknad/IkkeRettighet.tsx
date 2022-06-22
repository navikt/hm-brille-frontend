import { Alert } from '@navikt/ds-react'

export function IkkeRettighet() {
  return (
    <Alert variant="warning">
      Barnet har ikke rett til å få brillestøtte. Du kan ikke sende inn direkteoppgjør for barnebriller til dette
      barnet.
    </Alert>
  )
}
