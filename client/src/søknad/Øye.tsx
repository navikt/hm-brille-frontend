import { Select } from '@navikt/ds-react'
import { Control, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { FormatertTall } from '../components/FormatertTall'
import { BrillestyrkeFormData } from './BrillestyrkeForm'

export function Øye(props: { control: Control<BrillestyrkeFormData>; type: 'venstre' | 'høyre' }) {
  const { control, type } = props
  return (
    <Grid>
      <Controller
        name={`${type}Sfære`}
        control={control}
        render={({ field }) => (
          <Select label="Sfære (SPH)" size="medium" {...field}>
            {range(1, 15).map((it) => (
              <option key={it} value={it}>
                <FormatertTall verdi={it} />
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
            {range(1, 10).map((it) => (
              <option key={it} value={-it}>
                <FormatertTall verdi={-it} />
              </option>
            ))}
          </Select>
        )}
      />
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--navds-spacing-3);
`

const range = (start: number, stop: number, step: number = 0.25) => {
  const størrelse = (stop - start) * 4 + 1
  const padding = 1 / step
  const a = Array(størrelse + padding)
    .fill(step)
    .map((x, y) => x * y)
    .slice(padding)

  return a
}
