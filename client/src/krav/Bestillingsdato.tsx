import React, {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'

import {DatePicker, useDatepicker} from '@navikt/ds-react'
import {format, formatISO, isBefore} from "date-fns";
import {da} from "date-fns/locale";
import {dato} from "../dato";
import {DATO_FOR_LANSERING, validering} from "../validering";
import {t} from "i18next";

export function Bestillingsdato() {
    const {formState, setValue, setError, clearErrors, watch} = useFormContext<{ bestillingsdato?: Date }>()
    const {errors} = formState

    const valgtDato = watch('bestillingsdato')

    useEffect(() => {
        if (formState.isSubmitting && !valgtDato) {
            setError('bestillingsdato', {type: 'custom', message: 'Ingen bestillingsdato valgt'})
        } else if (formState.isSubmitting && !validering.ikkeDatoFørLansering(valgtDato!!)) {
            setError('bestillingsdato', {
                type: 'custom', message:
                    t('krav.validering_bestillingsdato_ikke_før_lansering', {
                        datoForLansering: format(DATO_FOR_LANSERING, "dd.MM.yyyy"),
                    })
            })
        } else if (formState.isSubmitting && !validering.ikkeIFremtiden(valgtDato!!, new Date())) {
            setError('bestillingsdato', {
                type: 'custom',
                message: t('krav.validering_bestillingsdato_ikke_i_fremtiden')
            })
        } else if (formState.isSubmitting && !validering.ikkeMerEnnSeksMånederSiden(valgtDato!!, new Date())) {
            setError('bestillingsdato', {
                type: 'custom',
                message: t('krav.validering_bestillingsdato_ikke_mer_enn_seks_måneder_siden')
            })
        } else if (formState.errors.bestillingsdato && valgtDato && validering.ikkeDatoFørLansering(valgtDato) && validering.ikkeIFremtiden(valgtDato, new Date()) && validering.ikkeMerEnnSeksMånederSiden(valgtDato, new Date())) {
            clearErrors('bestillingsdato')
        }
    }, [formState, valgtDato])

    const {datepickerProps, inputProps} = useDatepicker({
        fromDate: new Date('Jan 1 1970'),
        toDate: new Date(),
        onDateChange: (dato) => {
            setValue('bestillingsdato', dato, {shouldDirty: true, shouldTouch: true, shouldValidate: true})
        },
        onValidate: (val) => {
            if (!val.isValidDate) {
                setError('bestillingsdato', {type: 'custom', message: 'Ugyldig bestillingsdato'})
            }
        },
        required: true,
        defaultSelected: formState.defaultValues?.bestillingsdato,
    })

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                size="medium"
                label="Hvilken dato ble brillen bestilt?"
                id="bestillingsdato"
                value={inputProps.value}
                error={errors.bestillingsdato?.message}
                style={{maxWidth: '150px'}}
            />
        </DatePicker>
    )
}
