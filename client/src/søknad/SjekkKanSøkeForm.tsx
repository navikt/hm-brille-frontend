import { Search } from '@navikt/ds-react'
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

export interface SjekkKanSøkeFormData {
  fnr: string
}

export interface SjekkKanSøkeFormProps {
  onValid: SubmitHandler<SjekkKanSøkeFormData>
  onInvalid?: SubmitErrorHandler<SjekkKanSøkeFormData>
}

export function SjekkKanSøkeForm(props: SjekkKanSøkeFormProps) {
  const { onValid, onInvalid } = props
  const { control, handleSubmit } = useForm<SjekkKanSøkeFormData>({ defaultValues: { fnr: '' } })
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} role="search">
      <Controller<SjekkKanSøkeFormData>
        name="fnr"
        control={control}
        render={({ field }) => (
          <Search
            label="Barnets fødselsnummer (11 siffer)"
            size="medium"
            variant="primary"
            hideLabel={false}
            {...field}
          />
        )}
      />
    </form>
  )
}
