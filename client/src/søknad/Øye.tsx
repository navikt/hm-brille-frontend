import { Heading, Select } from '@navikt/ds-react'
import { Control, Controller } from 'react-hook-form'
import styled from 'styled-components'
import { capitalize } from '../common/stringFormating'
import { FormatertTall } from '../components/FormatertTall'
import { BrillestyrkeFormData } from './BrillestyrkeForm'

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
            {range(1, 10).map((it) => (
              <option key={it} value={it}>
                {it === MIN ? 'Under 1,00' : it === MAX ? 'Over 10,00' : <FormatertTall verdi={it} />}
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
            {range(1, 6).map((it) => (
              <option key={it} value={it}>
                {it === MIN ? 'Under -1,00' : it === MAX ? 'Over -6,00' : <FormatertTall verdi={-it} />}
              </option>
            ))}
          </Select>
        )}
      />
    </Grid>
  )
}

const MIN = 0
const MAX = 99.99

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
  return [MIN, ...valg, MAX]
}
