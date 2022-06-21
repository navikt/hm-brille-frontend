import { Delete } from '@navikt/ds-icons'
import { Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'

interface SøknadFormData {
  sats: string
  virksomhet: string
  referansenummer: string
}

export interface SøknadFormProps {}

export function SøknadForm(props: SøknadFormProps) {
  const { register, handleSubmit, control } = useForm<SøknadFormData>({
    defaultValues: {
      sats: '',
      virksomhet: '',
      referansenummer: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data)
      })}
    >
      <Controller<SøknadFormData>
        name="sats"
        control={control}
        render={({ field }) => (
          <RadioGroup legend="Synet til barnet" {...field}>
            <Radio value="sats1">Enstyrkebriller med styrker ≤ 4 D</Radio>
            <Radio value="sats2">Enstyrkebriller med styrker ≥ 4,25 D ≤ 6,00 D</Radio>
            <Radio value="sats3">
              Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D
            </Radio>
            <Radio value="sats4">
              Sfærisk styrke på minst ett glass ≥ 8,25 D ≤ 10,0 D og eventuelt cylinderstyrke ≤ 6,0 D
            </Radio>
            <Radio value="sats5">
              Sfærisk styrke på minst ett glass ≥ 10,25 D og/eller flerstyrkebriller med sfærisk styrke på minst ett
              glass ≥ 8,25 D og/eller cylinderstyrke ≥6,25
            </Radio>
          </RadioGroup>
        )}
      />

      <Heading level="2" size="large" spacing>
        Informajon om optiker/virksomhet
      </Heading>

      <Controller<SøknadFormData>
        name="virksomhet"
        control={control}
        render={({ field }) => (
          <RadioGroup legend="Hvilken virksomhet representerer du?" {...field}>
            <Radio value="1">Brilleland ANB</Radio>
            <Radio value="2">Briller 123</Radio>
          </RadioGroup>
        )}
      />

      <TextField label="Referansenummer/ordrenummer" size="medium" {...register('referansenummer')} />

      <Knapper>
        <Button variant="primary" type="submit">
          Send inn
        </Button>
        <Button variant="secondary">
          <Delete />
          Slett utkast
        </Button>
      </Knapper>
    </form>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-3);
`
