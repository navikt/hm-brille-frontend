import { Button, Heading } from '@navikt/ds-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { hotjar_event, HotjarTrigger } from '../components/hotjar-trigger'
import { Knapper } from '../components/Knapper'
import { Tekstfelt } from '../components/Tekstfelt'
import { dato } from '../dato'
import { useApplicationContext } from '../state/ApplicationContext'
import { Brilleseddel } from '../types'
import { logSkjemastegFullfoert, SkjemaSteg } from '../utils/amplitude'
import { DATO_FOR_LANSERING, validator, validering } from '../validering'
import { AvbrytKrav } from './AvbrytKrav'
import { BrillestyrkeForm } from './BrillestyrkeForm'

export interface KravFormData {
  brillestyrke: Brilleseddel
  bestillingsdato: string
  brillepris: string
  bestillingsreferanse: string
}

export function KravForm() {
  const { t } = useTranslation()
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
    setValue,
    formState: { errors },
  } = methods

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
          <Avstand paddingBottom={3} paddingTop={3}>
            <Avstand marginBottom={3}>
              <Tekstfelt
                id="bestillingsdato"
                label={t('krav.ledetekst_bestillingsdato')}
                description="DD.MM.ÅÅÅÅ"
                error={errors.bestillingsdato?.message}
                {...methods.register('bestillingsdato', {
                  required: t('krav.validering_bestillingsdato_påkrevd'),
                  validate: {
                    gyldig: validator(validering.dato, t('krav.validering_bestillingsdato_ugyldig')),
                    ikkeIFremtiden: validator(
                      validering.ikkeIFremtiden,
                      t('krav.validering_bestillingsdato_ikke_i_fremtiden')
                    ),
                    ikkeFørLansering: validator(
                      validering.ikkeDatoFørLansering,
                      t('krav.validering_bestillingsdato_ikke_før_lansering', {
                        datoForLansering: DATO_FOR_LANSERING,
                      })
                    ),
                    ikkeMerEnnSeksMånederSiden: validator(
                      validering.ikkeMerEnnSeksMånederSiden,
                      t('krav.validering_bestillingsdato_ikke_mer_enn_seks_måneder_siden')
                    ),
                  },
                })}
              />
              <Avstand marginTop={3}>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setValue('bestillingsdato', dato.nå(), { shouldValidate: true })}
                >
                  {t('krav.knapp_i_dag')}
                </Button>
              </Avstand>
            </Avstand>
            <Avstand marginBottom={3}>
              <Tekstfelt
                id="brillepris"
                label={t('krav.ledetekst_brillepris')}
                error={errors.brillepris?.message}
                {...methods.register('brillepris', {
                  required: t('krav.validering_brillepris_påkrevd'),
                  validate: validator(validering.beløp, t('krav.validering_brillepris_ugyldig')),
                })}
              />
            </Avstand>
            <Avstand marginBottom={3}>
              <Tekstfelt
                id="bestillingsreferanse"
                label={t('krav.ledetekst_bestillingsreferanse')}
                error={errors.bestillingsreferanse?.message}
                {...methods.register('bestillingsreferanse', {
                  required: t('krav.validering_bestillingsreferanse_påkrevd'),
                  validate: validator(
                    validering.bestillingsreferanse,
                    t(
                      'krav.validering_bestillingsreferanse_ugyldig_spesialtegn',
                      'Ugyldig spesialtegn i bestillingsreferanse.'
                    )
                  ),
                })}
              />
            </Avstand>
            <Knapper>
              <Button variant="primary" type="submit" loading={methods.formState.isSubmitting}>
                {t('krav.knapp_beregn')}
              </Button>
              <AvbrytKrav />
            </Knapper>
          </Avstand>
        </form>
      </FormProvider>
    </>
  )
}
