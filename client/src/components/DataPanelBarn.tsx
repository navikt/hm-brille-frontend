import {Panel} from '@navikt/ds-react'
import styled from 'styled-components'
import {enhet} from "../enhet";

export const DataPanelBarn = styled(Panel)`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 3em;
  margin-bottom: var(--navds-spacing-5);
  background-color: #E6F0FF;
  border-radius: 5px;
  align-items: center;
  padding-top: 1.5rem;
  padding-bottom: 0;


  @media ${enhet.mobil} {
    width: 95%;
    grid-template-columns: 1fr;
    row-gap: 10px;
    justify-items: center;
  }
  
`
