import styled from 'styled-components'

export const Data = styled.dl<{ labelColumnWidth?: number }>`
  display: grid;
  grid-template-columns: ${(props) => (props.labelColumnWidth ? `${props.labelColumnWidth}px` : '140px')} auto;
  gap: var(--navds-spacing-1);
`
