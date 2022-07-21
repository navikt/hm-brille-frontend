import { Search } from '@navikt/ds-react'
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { validator, validering } from '../validering'

export interface HentBarnFormData {
  fnr: string
}

export interface HentBarnFormProps {
  onValid: SubmitHandler<HentBarnFormData>
  onInvalid?: SubmitErrorHandler<HentBarnFormData>
}

export function HentBarnForm(props: HentBarnFormProps) {
  const { onValid, onInvalid } = props
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HentBarnFormData>({ defaultValues: { fnr: '' } })
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} role="search">
      <Controller
        control={control}
        name="fnr"
        rules={{
          required: 'Du må oppgi et fødselsnummer',
          validate: validator(validering.fnr, 'Ugyldig fødselsnummer'),
        }}
        render={({ field }) => (
          <Søkefelt>
            <Search
              label="Barnets fødselsnummer (11 siffer)"
              hideLabel={false}
              maxLength={11}
              size="medium"
              error={errors.fnr?.message}
              {...field}
            >
              <Search.Button type="submit" loading={isSubmitting} />
            </Search>
          </Søkefelt>
        )}
      />
    </form>
  )
}

const Søkefelt = styled.div`
  max-width: 330px;
`
