import { Search } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'

interface SearchFormData {
  fnr: string
}

export function SearchForm() {
  const { handleSubmit, control } = useForm<SearchFormData>({ defaultValues: { fnr: '' } })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data.fnr)
      })}
    >
      <Controller<SearchFormData>
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
