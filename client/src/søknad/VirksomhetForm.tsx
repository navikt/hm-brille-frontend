import { Button } from '@navikt/ds-react'
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Tekstfelt } from '../components/Tekstfelt'

export interface VirksomhetFormData {
  orgnr: string
  orgNavn: string
}

export interface VirksomhetFormProps {
  onValid: SubmitHandler<VirksomhetFormData>
  onInvalid?: SubmitErrorHandler<VirksomhetFormData>
}

export function VirksomhetForm(props: VirksomhetFormProps) {
  const { onValid, onInvalid } = props
  const { control, handleSubmit } = useForm<VirksomhetFormData>({ defaultValues: { orgnr: '' } })
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)} role="search">
      <SøkContainer>
        <Controller<VirksomhetFormData>
          name="orgnr"
          control={control}
          render={({ field }) => (
            <Tekstfelt label="Organisasjonsnummer" size="medium" hideLabel={false} {...field} maxLength={9} />
          )}
        />
        <Button type="submit" variant="secondary">
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
