import { Search } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { http } from './http'
import { HentPersonRequest, Person } from './types'

interface HentPersonFormData {
  fnr: string
}

interface HentPersonFormProps {
  onPersonHentet(person: Person): void
}

export function HentPersonForm(props: HentPersonFormProps) {
  const { onPersonHentet } = props
  const { handleSubmit, control } = useForm<HentPersonFormData>({ defaultValues: { fnr: '' } })

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data.fnr)
        const { fnr } = data
        const { data: person, error } = await http.post<HentPersonRequest, Person>('/hent-person', { fnr })
        if (person) {
          onPersonHentet(person)
        } else {
          // feilhåndter
        }
      })}
    >
      <Controller<HentPersonFormData>
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
