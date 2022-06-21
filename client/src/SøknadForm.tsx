import { Delete } from '@navikt/ds-icons'
import { Alert, Button, Heading, Label, Radio, RadioGroup, TextField } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Avstand } from './components/Avstand'
import { Nullable, Person } from './types'

interface SøknadFormData {
  sats: string
  virksomhet: string
  referanseNummer: string
}

export interface SøknadFormProps {
  person: Nullable<Person>
}

export function SøknadForm(props: SøknadFormProps) {
  const { person } = props
  const { register, handleSubmit, control } = useForm<SøknadFormData>()
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data)
      })}
    >
      {person && (
        <Avstand marginTop={5} marginBottom={5}>
          <Alert variant="success">
            <Heading level="3" size="small">
              {`${person.fornavn} ${person.etternavn}`}
            </Heading>
            <DataList>
              <dt>
                <Label>Fødselsnummer:</Label>
              </dt>
              <dd>{person.fnr}</dd>
            </DataList>
          </Alert>
        </Avstand>
      )}
      <Controller<SøknadFormData>
        name="sats"
        control={control}
        defaultValue="sats1"
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
        defaultValue=""
        render={({ field }) => (
          <RadioGroup legend="Hvilken virksomhet representerer du?" {...field}>
            <Radio value="1">Brilleland ANB</Radio>
            <Radio value="2">Briller 123</Radio>
          </RadioGroup>
        )}
      />

      <TextField label="Referansenummer/ordrenummer" size="medium" {...register('referanseNummer')} />

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
  display: flex;
  align-items: center;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-3);
`

const DataList = styled.dl`
  display: flex;
  align-items: center;
`
