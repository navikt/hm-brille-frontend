import { Heading, Select } from '@navikt/ds-react'
import { Control, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { capitalize } from '../common/stringFormating'
import { BrillestyrkeFormData } from './BrillestyrkeForm'
import { MAX_SFÆRE, MAX_STYRKE, MAX_SYLINDER, MIN_STYRKE } from './config'
import { FormatertStyrke } from './FormatertStyrke'

export function Øye(props: { control: Control<BrillestyrkeFormData>; type: 'venstre' | 'høyre' }) {
  const { control, type } = props
  return (
    <Grid>
      <ØyeEtikett>
        <Heading level="3" size="small">
          {`${capitalize(type)} øye`}
        </Heading>
      </ØyeEtikett>
      <Controller
        name={`${type}Sfære`}
        control={control}
        render={({ field }) => (
          <Select label="Sfære (SPH)" size="medium" {...field}>
            {range(1, MAX_SFÆRE).map((it) => (
              <option key={it} value={it}>
                <FormatertStyrke verdi={it} max={MAX_SFÆRE} />
              </option>
            ))}
          </Select>
        )}
      />
      <Controller
        name={`${type}Sylinder`}
        control={control}
        render={({ field }) => (
          <Select label="Sylinder (CYL)" size="medium" {...field}>
            {range(1, MAX_SYLINDER).map((it) => (
              <option key={it} value={it}>
                <FormatertStyrke verdi={-it} max={MAX_SYLINDER} minus />
              </option>
            ))}
          </Select>
        )}
      />
    </Grid>
  )
}

const ØyeEtikett = styled.div`
  justify-items: auto;
  align-self: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--navds-spacing-3);
  padding-top: var(--navds-spacing-3);
  padding-bottom: var(--navds-spacing-3);
`

const range = (start: number, stop: number, step: number = 0.25) => {
  const størrelse = (stop - start) * 4 + 1
  const padding = 1 / step
  const valg = Array(størrelse + padding)
    .fill(step)
    .map((x, y) => x * y)
    .slice(padding)
  return [MIN_STYRKE, ...valg, MAX_STYRKE]
}
