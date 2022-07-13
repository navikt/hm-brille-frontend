import { Button, ErrorSummary, Heading, TextField } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { useApplicationContext } from '../state/ApplicationContext'
import { validerDato, validerPris } from '../validering'
import { BrillestyrkeForm, BrillestyrkeFormData } from './BrillestyrkeForm'

export interface SøknadFormData {
  brillestyrke: BrillestyrkeFormData
  bestillingsdato: string
  brillepris: string
  bestillingsreferanse: string
}

interface ValideringError {
  id: string
  melding: string
}

export function SøknadForm() {
  const [valideringErrors, setValideringErrors] = useState<ValideringError[]>([])
  const { setAppState, appState } = useApplicationContext()
  const navigate = useNavigate()

  const methods = useForm<SøknadFormData>({
    defaultValues: {
      brillestyrke: appState.brillestyrke,
      bestillingsdato: appState.bestillingsdato,
      bestillingsreferanse: appState.bestillingsreferanse,
      brillepris: appState.brillepris,
    },
  })

  // Re-valider på endringer
  useEffect(() => {
    if (methods.formState.isSubmitted) {
      const subscription = methods.watch((values) => {
        // TODO: finn ut hvorfor man får TS-feil her uten "as any"
        valider(values as any)
      })
      return () => subscription.unsubscribe()
    }
  }, [methods.formState.isSubmitted, methods.watch])

  const valider = (data: SøknadFormData): boolean => {
    const errors: ValideringError[] = []

    if (!data.bestillingsdato) {
      errors.push({ id: 'bestillingsdato', melding: 'Du må oppgi en bestillingsdato' })
    } else {
      if (!validerDato(data.bestillingsdato)) {
        errors.push({ id: 'bestillingsdato', melding: 'Ugyldig bestillingsdato' })
      }
    }

    if (!data.brillepris) {
      errors.push({ id: 'brillepris', melding: 'Du må oppgi en brillepris' })
    } else {
      if (!validerPris(data.brillepris)) {
        errors.push({ id: 'brillepris', melding: 'Ugyldig brillepris' })
      }
    }

    if (!data.bestillingsreferanse) {
      errors.push({ id: 'bestillingsreferanse', melding: 'Du må oppgi en bestillingsreferanse' })
    }

    setValideringErrors(errors)

    return errors.length === 0
  }

  const onSubmit: SubmitHandler<SøknadFormData> = (data) => {
    const erGyldig = valider(data)

    if (erGyldig) {
      setAppState((prev) => ({
        ...prev,
        bestillingsdato: data.bestillingsdato,
        brillepris: data.brillepris,
        brillestyrke: data.brillestyrke,
        bestillingsreferanse: data.bestillingsreferanse,
      }))
      navigate('/soknad/oppsummering')
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Avstand paddingBottom={5} paddingTop={5}>
            <BrillestyrkeForm />
          </Avstand>
          <Heading level="2" size="medium">
            Om brillen
          </Heading>
          <Avstand paddingBottom={3} paddingTop={3}>
            <Avstand marginBottom={3}>
              <TextField
                id="bestillingsdato"
                label="Hvilken dato ble brillen bestilt?"
                description="DD.MM.ÅÅÅÅ"
                {...methods.register('bestillingsdato')}
              />
            </Avstand>
            <Avstand marginBottom={3}>
              <TextField
                id="brillepris"
                label="Pris på brille (glass og innfatning inkl. mva)"
                {...methods.register('brillepris')}
              />
            </Avstand>
            <Avstand marginBottom={3}>
              <TextField
                id="bestillingsreferanse"
                label="Bestillingsreferanse"
                {...methods.register('bestillingsreferanse')}
              />
            </Avstand>

            {valideringErrors.length > 0 && (
              <ErrorSummary heading="Før å kunne gå videre må du rette opp i følgende:">
                {valideringErrors.map((error, i) => (
                  <ErrorSummary.Item key={`${error.id}_${i}`} href={`#${error.id}`}>
                    {error.melding}
                  </ErrorSummary.Item>
                ))}
              </ErrorSummary>
            )}

            <Knapper>
              <Button variant="primary" type="submit" loading={methods.formState.isSubmitting}>
                Beregn
              </Button>
              <Button variant="secondary" type="button">
                Avbryt
              </Button>
            </Knapper>
          </Avstand>
        </form>
      </FormProvider>
    </>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  margin-top: var(--navds-spacing-3);
`
