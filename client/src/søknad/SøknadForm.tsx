import { Delete } from '@navikt/ds-icons'
import { Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { BrillestyrkeForm } from './BrillestyrkeForm'

export interface SøknadFormData {
  sats: string
  virksomhet: string
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
      <Avstand paddingBottom={5} paddingTop={5}>
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
              <RadioGroup legend="Hvilken virksomhet representerer du?" {...field}>
                <Radio value="1">Brilleland</Radio>
                <Radio value="2">Synsam</Radio>
              </RadioGroup>
            )}
          />

          <TextField label="Referansenummer/ordrenummer" size="medium" {...register('referansenummer')} />

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
