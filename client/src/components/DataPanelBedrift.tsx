import { Box } from '@navikt/ds-react'
import styled from 'styled-components'
import { enhet } from '../enhet'

export const DataPanelBedrift = styled(Box.New)`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 3em;
  border-radius: 10px;
  border-color: black;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-inline: 1rem;
  margin: var(--a-spacing-5);
  border: 1px solid black;


  @media ${enhet.mobil} {
    grid-template-columns: 1fr;
    row-gap: 10px;
    justify-items: center;
  }
`
