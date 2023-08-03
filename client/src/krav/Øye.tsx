import { Heading, Select } from '@navikt/ds-react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { enhet } from '../enhet'
import type { Brilleseddel } from '../types'
import {
    MAX_NEGATIV_SFÆRE,
    MAX_SFÆRE,
    MAX_STYRKE,
    MAX_SYLINDER,
    MIN_NEGATIV_SFÆRE,
    MIN_STYRKE
} from './config'
import { FormatertStyrke } from './FormatertStyrke'

export function Øye(props: { type: 'venstre' | 'høyre' }) {
  const { type } = props
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
  } = useFormContext<{ brillestyrke: Brilleseddel }>()
  return (
    <Grid>
      <ØyeEtikett>
        <Heading level="3" size="small">
          {t(`krav.${type}_øye`)}
        </Heading>
      </ØyeEtikett>
      <Controller
        name={`brillestyrke.${type}Sfære`}
        control={control}
        rules={{
          required: t('krav.validering_øye'),
        }}
        render={({ field }) => (
          <Select
            style={{ maxWidth: '330px' }}
            label={t('krav.ledetekst_sfære')}
            size="medium"
            error={errors.brillestyrke?.[`${type}Sfære`]?.message}
            aria-label={`${type}Sfære`}
            {...field}
          >

              {rangeV2(0, 6).reverse().map((it) => (
                  <option key={it} value={it}>
                      <FormatertStyrke verdi={it} type="sfære"/>
                  </option>
              ))}
              <option value="" disabled>{t('krav.velg_sfære')}</option>
              {rangeV2(-12, -0.25).reverse().map((it) => (
                  <option key={it} value={it}>
                      <FormatertStyrke verdi={it} type="sfære" />
                  </option>
              ))}


          </Select>
        )}
      />
      <Controller
        name={`brillestyrke.${type}Sylinder`}
        control={control}
        rules={{
          required: t('krav.validering_øye'),
        }}
        render={({ field }) => (
          <Select
            style={{ maxWidth: '330px' }}
            label={t('krav.ledetekst_sylinder')}
            size="medium"
            error={errors.brillestyrke?.[`${type}Sylinder`]?.message}
            aria-label={`${type}Sylinder`}
            {...field}
          >
            <option value="" disabled>{t('krav.velg_sylinder')}</option>
            {range(1, MAX_SYLINDER).map((it) => (
              <option key={it} value={it}>
                <FormatertStyrke verdi={it} type="sylinder" />
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
  gap: var(--a-spacing-5);
  padding-top: var(--a-spacing-3);
  padding-bottom: var(--a-spacing-3);
  align-items: start;
  @media ${enhet.mobil} {
    grid-template-columns: 100%;
  }
`

function range(start: number, stop: number, step: number = 0.25): number[] {
  const size = (stop - start) * 4 + 1
  const padding = 0 / step
  const valg = Array(size + padding)
    .fill(step)
    .map((x, y) => x * y)
    .slice(padding)
  return [...valg]
}

const rangeV2 = (start: number, end: number, step: number = 0.25) => {
    let output = [];
    if (typeof end === 'undefined') {
        end = start;
        start = 0;
    }
    for (let i = start; i < end + step; i += step) {
        output.push(i);
    }
    return output;
};
