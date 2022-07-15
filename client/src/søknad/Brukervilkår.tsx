import { BodyLong, Button, ConfirmationPanel, Heading, Link, Loader } from '@navikt/ds-react'
import { Avstand } from '../components/Avstand'
import { Knapper } from '../components/Knapper'
import { SøknadSteg } from './SøknadSteg'
import { Controller, useForm } from 'react-hook-form'

export interface BrukervilkårProps {
  loading: boolean
  onGodta: Function
}

export function Brukervilkår(props: BrukervilkårProps) {
  const { loading, onGodta } = props

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ godtatt: boolean }>({
    defaultValues: {
      godtatt: false,
    },
  })

  if (loading) {
    return <Loader />
  }

  return (
    <SøknadSteg>
      <Heading level="2" size="medium">
        Brukervilkår
      </Heading>
      <BodyLong>
        Her registrerer du krav om stønad til briller til barn, slik at firmaet du jobber i, får riktig utbetaling. Du
        kan lese mer om støtte til briller til barn på <Link href="todo">nav.no</Link>
      </BodyLong>
      For å legge inn krav må firmaet du jobber i
      <ul>
        <li>ha inngått avtale om direkte oppgjør med NAV</li>
        <li>tilby briller til barn under 18 år</li>
        <li>tilby tilpasning av briller til barn under 18 år</li>
      </ul>
      <BodyLong spacing>
        Første gangen du skal sende inn et krav, inngår du en avtale med NAV om bruk av løsningen.
      </BodyLong>
      <form onSubmit={handleSubmit( async (data) => await onGodta())}>
        <Controller
          control={control}
          name="godtatt"
          rules={{
            validate(value) {
              return value || 'Du må godta brukervilkår for å gå videre'
            },
          }}
          render={({ field }) => (
            <ConfirmationPanel
              error={errors.godtatt?.message}
              label="Jeg har lest og forstått."
              checked={field.value}
              {...field}
            />
          )}
        />
        <Avstand marginBottom={5} />
        <Knapper>
          <Button type="submit">Godta</Button>
          <Button variant="tertiary">Avbryt</Button>
        </Knapper>
      </form>
    </SøknadSteg>
  )
}
