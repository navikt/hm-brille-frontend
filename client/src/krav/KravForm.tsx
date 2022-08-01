import { Button, Heading } from '@navikt/ds-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { Knapper } from '../components/Knapper'
import { Tekstfelt } from '../components/Tekstfelt'
import { useApplicationContext } from '../state/ApplicationContext'
import { Brilleseddel } from '../types'
import { logSkjemastegFullfoert, SkjemaSteg } from '../utils/amplitude'
import { validator, validering } from '../validering'
import { AvbrytKrav } from './AvbrytKrav'
import { BrillestyrkeForm } from './BrillestyrkeForm'

export interface KravFormData {
  brillestyrke: Brilleseddel
  bestillingsdato: string
  brillepris: string
  bestillingsreferanse: string
}

export function KravForm() {
  const { setAppState, appState } = useApplicationContext()
  const navigate = useNavigate()

  const methods = useForm<KravFormData>({
    defaultValues: {
      brillestyrke: appState.brillestyrke,
      bestillingsdato: appState.bestillingsdato,
      bestillingsreferanse: appState.bestillingsreferanse,
      brillepris: appState.brillepris,
    },
  })

  const {
    formState: { errors },
  } = methods

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            logSkjemastegFullfoert(SkjemaSteg.KRAV)
            setAppState((prev) => ({
              ...prev,
              ...data,
            }))
            navigate('/krav/oppsummering')
          })}
          autoComplete="off"
        >
          <Avstand paddingBottom={5} paddingTop={5}>
            <BrillestyrkeForm />
          </Avstand>
          <Heading level="2" size="medium">
            Om brillen
          </Heading>
          <Avstand paddingBottom={3} paddingTop={3}>
            <Avstand marginBottom={3}>
              <Tekstfelt
                id="bestillingsdato"
                label="Hvilken dato ble brillen bestilt?"
                description="DD.MM.ÅÅÅÅ"
                error={errors.bestillingsdato?.message}
                {...methods.register('bestillingsdato', {
                  required: 'Du må oppgi en bestillingsdato',
                  validate: validator(validering.dato, 'Ugyldig bestillingsdato'),
                })}
              />
            </Avstand>
            <Avstand marginBottom={3}>
              <Tekstfelt
                id="brillepris"
                label="Brillepris (glass og innfatning inkl. mva)"
                error={errors.brillepris?.message}
                {...methods.register('brillepris', {
                  required: 'Du må oppgi en brillepris',
                  validate: validator(validering.beløp, 'Ugyldig brillepris'),
                })}
              />
            </Avstand>
            <Avstand marginBottom={3}>
              <Tekstfelt
                id="bestillingsreferanse"
                label="Bestillingsreferanse"
                error={errors.bestillingsreferanse?.message}
                {...methods.register('bestillingsreferanse', {
                  required: 'Du må oppgi en bestillingsreferanse',
                })}
              />
            </Avstand>
            <Knapper>
              <Button variant="primary" type="submit" loading={methods.formState.isSubmitting}>
                Beregn
              </Button>
              <AvbrytKrav />
            </Knapper>
          </Avstand>
        </form>
      </FormProvider>
    </>
  )
}
