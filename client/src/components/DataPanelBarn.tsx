import { Box } from '@navikt/ds-react'
import styled from 'styled-components'
import { enhet } from '../enhet'

export const DataPanelBarn = styled(Box.New)`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 3em;
  margin-bottom: var(--ax-space-20);
  background-color: #e6f0ff;
  border-radius: 8px;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 0;
  padding-inline: 1.5rem;

  @media ${enhet.mobil} {
    width: 95%;
    grid-template-columns: 1fr;
    row-gap: 10px;
    justify-items: center;
  }
`
