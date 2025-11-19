import { BodyLong, Button, Checkbox, CheckboxGroup, Heading, HStack, Loader } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Avstand } from '../components/Avstand'
import { LenkeMedLogging } from '../components/LenkeMedLogging'
import { KravSteg } from './KravSteg'

export interface BrukervilkårProps {
  loading: boolean

  onGodta(): Promise<void>
}

export function Brukervilkår(props: BrukervilkårProps) {
  const { loading, onGodta } = props
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<{ godtatt: boolean }>({
    defaultValues: {
      godtatt: false,
    },
  })
  const godtatt = watch('godtatt')

  let dataColor = 'warning'
  if (errors.godtatt?.message) {
    dataColor = 'danger'
  } else if (godtatt) {
    dataColor = 'success'
  }

  if (loading) {
    return (
      <HStack justify="center">
        <Avstand paddingBottom={5} paddingTop={5}>
          <Loader />
        </Avstand>
      </HStack>
    )
  }

  return (
    <KravSteg>
      <Heading level="2" size="medium">
        {t('brukervilkår.overskrift')}
      </Heading>
      <BodyLong spacing>
        <Trans t={t} i18nKey="brukervilkår.ingress">
          {''}
          <LenkeMedLogging href="https://nav.no/barnebriller">nav.no</LenkeMedLogging>
        </Trans>
      </BodyLong>
      {t('brukervilkår.vilkår')}:
      <ul>
        <li>{t('brukervilkår.vilkår_1')}</li>
        <li>{t('brukervilkår.vilkår_2')}</li>
        <li>{t('brukervilkår.vilkår_3')}</li>
      </ul>
      <BodyLong spacing>{t('brukervilkår.forklaring')}</BodyLong>
      <form onSubmit={handleSubmit(async () => onGodta())}>
        <Controller
          control={control}
          name="godtatt"
          rules={{
            validate(value) {
              return value || t('brukervilkår.validering_godtatt')
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <div data-color={dataColor}>
              <div className="aksel-confirmation-panel__inner">
                <CheckboxGroup legend={t('felles.duMåBekreftefølgende')} hideLegend error={errors.godtatt?.message}>
                  <Checkbox
                    onBlur={onBlur}
                    checked={value}
                    onChange={onChange}>
                    {t('brukervilkår.ledetekst_godtatt')}
                  </Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          )}
        />
        <Avstand marginBottom={5} />
        <HStack gap="3" justify="start" marginBlock="4 0">
          <Button type="submit" loading={isSubmitting}>
            {t('brukervilkår.knapp_godta')}
          </Button>
          <Button
            variant="tertiary"
            type="button"
            onClick={() => {
              window.location.href = 'https://nav.no/barnebriller'
            }}
          >
            {t('brukervilkår.knapp_avbryt')}
          </Button>
        </HStack>
      </form>
    </KravSteg>
  )
}
