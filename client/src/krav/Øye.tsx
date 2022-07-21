import { Heading, Select } from '@navikt/ds-react'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { capitalize } from '../common/stringFormating'
import type { BrillestyrkeFormData } from './BrillestyrkeForm'
import { MAX_SFÆRE, MAX_STYRKE, MAX_SYLINDER, MIN_STYRKE } from './config'
import { FormatertStyrke } from './FormatertStyrke'

export function Øye(props: { type: 'venstre' | 'høyre' }) {
  const { type } = props
  const {
    control,
    formState: { errors },
  } = useFormContext<{ brillestyrke: BrillestyrkeFormData }>()
  return (
    <Grid>
      <ØyeEtikett>
        <Heading level="3" size="small">
          {`${capitalize(type)} øye`}
        </Heading>
      </ØyeEtikett>
      <Controller
        name={`brillestyrke.${type}Sfære`}
        control={control}
        rules={{
          required: 'Du må oppgi en verdi',
        }}
        render={({ field }) => (
          <Select label="Sfære (SPH)" size="medium" error={errors.brillestyrke?.[`${type}Sfære`]?.message} {...field}>
            <option value="">Velg sfære</option>
            {range(1, MAX_SFÆRE).map((it) => (
              <option key={it} value={it}>
                <FormatertStyrke verdi={it} max={MAX_SFÆRE} />
              </option>
            ))}
          </Select>
        )}
      />
      <Controller
        name={`brillestyrke.${type}Sylinder`}
        control={control}
        rules={{
          required: 'Du må oppgi en verdi',
        }}
        render={({ field }) => (
          <Select
            label="Sylinder (CYL)"
            size="medium"
            error={errors.brillestyrke?.[`${type}Sylinder`]?.message}
            {...field}
          >
            <option value="">Velg sylinder</option>
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
  grid-template-columns: 120px 180px 180px;
  gap: var(--navds-spacing-5);
  padding-top: var(--navds-spacing-3);
  padding-bottom: var(--navds-spacing-3);
  align-items: start;
`

function range(start: number, stop: number, step: number = 0.25): number[] {
  const size = (stop - start) * 4 + 1
  const padding = 1 / step
  const valg = Array(size + padding)
    .fill(step)
    .map((x, y) => x * y)
    .slice(padding)
  return [MIN_STYRKE, ...valg, MAX_STYRKE]
}
