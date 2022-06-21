import { Delete } from '@navikt/ds-icons'
import { Button, Heading, Panel, Radio, RadioGroup, Search, TextField } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { SearchForm } from './SearchForm'

interface SøknadFormData {
  sats: string
  referanseNummer: string
}

export function App() {
  const { register, handleSubmit, control } = useForm<SøknadFormData>()

  return (
    <main>
      <Panel>
        <Heading level="1" size="xlarge">
          Søknad om direkteoppgjør til barnebriller
        </Heading>
        <Heading level="2" size="large">
          Informasjon om barnet
        </Heading>
        <SearchForm />
        <form onSubmit={handleSubmit(async (data) => {
        console.log(data)
      })}>
  <Controller<SøknadFormData>
        name="sats"
        control={control}
        defaultValue="sats1"
        render={({ field }) => (
            <RadioGroup
            legend="Synet til barnet"
            {...field}
          >
            <Radio value="sats1">Enstyrkebriller med styrker ≤ 4 D</Radio>
            <Radio value="sats2" >Enstyrkebriller med styrker ≥ 4,25 D ≤ 6,00 D</Radio>
            <Radio value="sats3">
              Sfærisk styrke på minst ett glass ≥ 6,25 D ≤ 8,0 D og/eller cylinderstyrke ≥ 4,25 D ≤ 6,0 D
            </Radio>
            <Radio value="sats4">
              Sfærisk styrke på minst ett glass ≥ 8,25 D ≤ 10,0 D og eventuelt cylinderstyrke ≤ 6,0 D
            </Radio>
            <Radio value="sats5" >
              Sfærisk styrke på minst ett glass ≥ 10,25 D og/eller flerstyrkebriller med sfærisk styrke på minst ett
              glass ≥ 8,25 D og/eller cylinderstyrke ≥6,25
            </Radio>
          </RadioGroup>

        )}
      />

          
          <Heading level="2" size="large">
            Informajon om optiker/virksomhet
          </Heading>

          <RadioGroup
            legend="Hvilken virksomhet representerer du?"
            //value={state}
            //onChange={(v) => setState(v)}
          >
            <Radio value="1">Brilleland ANB</Radio>
            <Radio value="2">Briller 123</Radio>
          </RadioGroup>

          <TextField label="Referansenummer/ordrenummer" size="medium"/>

          <Button variant="primary" type="submit">
            Send inn
          </Button>
          <Button variant="secondary">
            <Delete />
            Slett utkast
          </Button>
        </form>
      </Panel>
    </main>
  )
}
