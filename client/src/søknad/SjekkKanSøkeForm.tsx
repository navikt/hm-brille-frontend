import { Button, Search, TextField } from '@navikt/ds-react'
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Tekstfelt } from '../components/Tekstfelt'

export interface SjekkKanSøkeFormData {
  fnr: string
}

export interface SjekkKanSøkeFormProps {
  onValid: SubmitHandler<SjekkKanSøkeFormData>
  onInvalid?: SubmitErrorHandler<SjekkKanSøkeFormData>
}

export function SjekkKanSøkeForm(props: SjekkKanSøkeFormProps) {
  const { onValid, onInvalid } = props
  const { control, handleSubmit, formState } = useForm<SjekkKanSøkeFormData>({ defaultValues: { fnr: '' } })
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} role="search">
      <SøkContainer>
        <Controller<SjekkKanSøkeFormData>
          name="fnr"
          control={control}
          render={({ field }) => (
            <Tekstfelt
              label="Barnets fødselsnummer (11 siffer)"
              size="medium"
              hideLabel={false}
              {...field}
              maxLength={11}
            />
          )}
        />

        <Button type="submit" variant="secondary" loading={formState.isSubmitting}>
          Slå opp
        </Button>
      </SøkContainer>
    </form>
  )
}

const SøkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--navds-spacing-3);
  align-items: flex-end;
`
