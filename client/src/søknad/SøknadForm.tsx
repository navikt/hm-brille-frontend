import { Calender, Delete } from '@navikt/ds-icons'
import { Button, ConfirmationPanel, Heading, Panel, Radio, RadioGroup, TextField } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { BrillestyrkeForm } from './BrillestyrkeForm'

export interface SøknadFormData {
  fnrBarn: string
  brillestyrke: any
  kjøpsdato: string
  brillepris: string
  sats: string
  virksomhet: string
  nyVirksomhet: string
  referansenummer: string
}

export function SøknadForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SøknadFormData>({
    defaultValues: {
      sats: '',
      virksomhet: '',
      referansenummer: '',
    },
  })

  return (
    <>
      <Avstand paddingBottom={5} paddingTop={5}>
        <BrillestyrkeForm />
      </Avstand>
      <Heading level="2" size="medium">
        Om brillen
      </Heading>
      <TextField label="Hvilken dato ble brillen bestilt?" description="DD.MM.ÅÅÅÅ" {...register('kjøpsdato')} />
      <TextField label="Bestillingsreferanse" {...register('referansenummer')} />
      <Avstand paddingBottom={5} paddingTop={5}>
      <ConfirmationPanel checked={false} size="medium" label="Ja, jeg bekrefter dette.">
        Brillen er ikke av type solbrille eller sportsbrille
      </ConfirmationPanel>
      </Avstand>
      <Avstand paddingBottom={3} paddingTop={3}>
      <ConfirmationPanel checked={false} size="medium" label="Ja, jeg bekrefter dette.">
        Brillen skal ikke brukes i behandling eller forebygging av amblyopi.
      </ConfirmationPanel>
      </Avstand>
      <Avstand paddingBottom={3} paddingTop={3}>
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data)
          })}
        >
          <Heading level="2" size="large" spacing>
            Informasjon om optiker/virksomhet
          </Heading>

          <Controller<SøknadFormData>
            name="virksomhet"
            control={control}
            render={({ field }) => (
              <RadioGroup legend="Hvilken virksomhet representerer du?"  {...field}>
                <Radio value="1" checked={true}>Brilleland Sandaker</Radio>
                <Radio value="Annen"  >Annen</Radio>

              </RadioGroup>
            )}
          />
          <TextField label="Annet org. nummer" {...register('nyVirksomhet')} />

          <Knapper>
            <Button variant="primary" type="submit" loading={isSubmitting}>
              Send inn
            </Button>
            <Button variant="secondary">
              <Delete />
              Slett utkast
            </Button>
          </Knapper>
        </form>
      </Avstand>
    </>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-3);
`
