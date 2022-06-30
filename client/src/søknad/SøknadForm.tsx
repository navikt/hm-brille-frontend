import { Delete } from '@navikt/ds-icons'
import { Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react'
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
      <Avstand paddingBottom={3} paddingTop={3}>
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data)
          })}
        >
          <Avstand marginBottom={3}>
            <TextField label="Hvilken dato ble brillen bestilt?" description="DD.MM.ÅÅÅÅ" {...register('kjøpsdato')} />
          </Avstand>
          <Avstand marginBottom={3}>
            <TextField
              label="Hvilken dato ble synsundersøkelse gjennomført?"
              description="DD.MM.ÅÅÅÅ"
              {...register('kjøpsdato')}
            />
          </Avstand>
          <Avstand marginBottom={3}>
            <TextField label="Bestillingsreferanse" {...register('referansenummer')} />
          </Avstand>

          <Heading level="2" size="large" spacing>
            Informasjon om optiker/virksomhet
          </Heading>

          <Controller<SøknadFormData>
            name="virksomhet"
            control={control}
            render={({ field }) => (
              <RadioGroup legend="Hvilken virksomhet representerer du?" {...field}>
                <Radio value="1" checked={true}>
                  Brilleland Sandaker
                </Radio>
                <Radio value="Annen">Annen</Radio>
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
