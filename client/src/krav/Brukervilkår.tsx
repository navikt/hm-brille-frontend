import {BodyLong, Button, ConfirmationPanel, Heading, Link, Loader} from '@navikt/ds-react'
import {Controller, useForm} from 'react-hook-form'
import {Avstand} from '../components/Avstand'
import {Knapper} from '../components/Knapper'
import {KravSteg} from './KravSteg'
import {LoaderContainer} from "../components/LoaderContainer";
import { LenkeMedLogging } from '../components/LenkeMedLogging'

export interface BrukervilkårProps {
    loading: boolean

    onGodta(): Promise<void>
}

export function Brukervilkår(props: BrukervilkårProps) {
    const {loading, onGodta} = props

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<{ godtatt: boolean }>({
        defaultValues: {
            godtatt: false,
        },
    })

    if (loading) {
        return (
            <LoaderContainer>
                <Avstand paddingBottom={5} paddingTop={5}>
                    <Loader/>
                </Avstand>
            </LoaderContainer>
        )
    }

    return (
        <KravSteg>
            <Heading level="2" size="medium">
                Brukervilkår
            </Heading>
            <BodyLong spacing>
                Her registrerer du krav om stønad til briller til barn, slik at firmaet du jobber i, får riktig
                utbetaling. Du
                kan lese mer om støtte til briller til barn på <LenkeMedLogging href="https://nav.no/barnebriller">nav.no</LenkeMedLogging>
            </BodyLong>
            Vilkår for å legge inn krav:
            <ul>
                <li>Firmaet du jobber må ha inngått avtale om direkte oppgjør med NAV.</li>
                <li>Brillen må være bestilt.</li>
                <li>Opplysningene du legger inn må være riktige.</li>
            </ul>
            <BodyLong spacing>
                Første gangen du skal sende inn et krav, inngår du en avtale med NAV om bruk av løsningen.
            </BodyLong>
            <form onSubmit={handleSubmit(async () => onGodta())}>
                <Controller
                    control={control}
                    name="godtatt"
                    rules={{
                        validate(value) {
                            return value || 'Du må godta brukervilkår for å gå videre'
                        },
                    }}
                    render={({field}) => (
                        <ConfirmationPanel
                            error={errors.godtatt?.message}
                            label="Jeg har lest og forstått vilkårene."
                            checked={field.value}
                            {...field}
                        />
                    )}
                />
                <Avstand marginBottom={5}/>
                <Knapper>
                    <Button type="submit" loading={isSubmitting}>
                        Godta
                    </Button>
                    <Button
                        variant="tertiary"
                        type="button"
                        onClick={() => {
                            window.location.href = 'https://nav.no/barnebriller'
                        }}
                    >
                        Avbryt
                    </Button>
                </Knapper>
            </form>
        </KravSteg>
    )
}
