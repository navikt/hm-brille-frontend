import { Alert, Button, Heading, HelpText, HGrid, HStack, TextField } from '@navikt/ds-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { hotjar_event, HotjarTrigger } from '../components/hotjar-trigger'
import { useApplicationContext } from '../state/ApplicationContext'
import { Brilleseddel } from '../types'
import { logSkjemastegFullfoert, SkjemaSteg } from '../utils/amplitude'
import { validator, validering } from '../validering'
import { AvbrytKrav } from './AvbrytKrav'
import { BrillestyrkeForm } from './BrillestyrkeForm'
import { useDatepicker } from '@navikt/ds-react'
import { Bestillingsdato } from './Bestillingsdato'

export interface KravFormData {
  brillestyrke: Brilleseddel
  bestillingsdato: Date
  brillepris: string
  bestillingsreferanse: string
}

export function KravForm() {
  const { t } = useTranslation()
  const { setAppState, appState } = useApplicationContext()
  const navigate = useNavigate()
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    onDateChange: console.log,
  })

  const methods = useForm<KravFormData>({
    defaultValues: {
      brillestyrke: appState.brillestyrke,
      bestillingsdato: appState.bestillingsdato,
      bestillingsreferanse: appState.bestillingsreferanse,
      brillepris: appState.brillepris,
    },
  })

  const {
    setValue,
    watch,
    formState: { errors },
  } = methods

  const watchedBrillepris = parseInt(watch('brillepris'))
  const brilleprisWarning = !isNaN(watchedBrillepris) && watchedBrillepris >= 20000

  HotjarTrigger({ timeout: 500 }, hotjar_event.SKJEMA)

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
            {t('krav.overskrift_om_brillen')}
          </Heading>
          <Avstand paddingBottom={3} paddingTop={4}>
            <Avstand paddingTop={4} marginBottom={8}>
              <Bestillingsdato />
            </Avstand>
            <Avstand marginBottom={8}>
              <TextField
                id="brillepris"
                label={t('krav.ledetekst_brillepris')}
                description={t('krav.ledetekst_brillepris_desc')}
                htmlSize={15}
                error={errors.brillepris?.message}
                style={{ maxWidth: '330px' }}
                {...methods.register('brillepris', {
                  required: t('krav.validering_brillepris_påkrevd'),
                  validate: validator(validering.beløp, t('krav.validering_brillepris_ugyldig')),
                })}
              />
              {errors.brillepris == null && brilleprisWarning && (
                <Avstand marginTop={4}>
                  <Alert variant="warning" size="small">
                    {t('krav.ledetekst_brillepris_advarsel_hoypris')}
                  </Alert>
                </Avstand>
              )}
            </Avstand>
            <Avstand marginBottom={10}>
              <TextField
                id="bestillingsreferanse"
                label={
                  <HGrid columns="auto auto" gap="3" align="start" paddingBlock="3 0">
                    {t('krav.ledetekst_deres_referansenr')}
                    <HelpText title="Hvor kommer dette fra?" placement="right">
                      {t('krav.hjelpetekst_referansenr')}
                    </HelpText>
                  </HGrid>
                }
                description={t('krav.ledetekst_bestillingsreferanse_desc')}
                error={errors.bestillingsreferanse?.message}
                style={{ maxWidth: '330px' }}
                {...methods.register('bestillingsreferanse', {
                  required: t('krav.validering_bestillingsreferanse_påkrevd'),
                  validate: validator(
                    validering.bestillingsreferanse,
                    t(
                      'krav.validering_bestillingsreferanse_ugyldig_spesialtegn',
                      'Ugyldig spesialtegn eller for mange karakterer'
                    )
                  ),
                })}
              />
            </Avstand>
            <HStack gap="3" justify="start" marginBlock="4 0">
              <Button variant="primary" type="submit" loading={methods.formState.isSubmitting}>
                {t('krav.knapp_beregn')}
              </Button>
              <AvbrytKrav />
            </HStack>
          </Avstand>
        </form>
      </FormProvider>
    </>
  )
}