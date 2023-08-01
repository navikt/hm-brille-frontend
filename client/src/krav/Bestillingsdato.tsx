import React, {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'

import {DatePicker, useDatepicker} from '@navikt/ds-react'
import {formatISO} from "date-fns";
import {da} from "date-fns/locale";

export function Bestillingsdato() {
    const {formState, setValue, setError, clearErrors, watch} = useFormContext<{ bestillingsdato?: Date }>()
    const {errors} = formState

    const valgtDato = watch('bestillingsdato')

    useEffect(() => {
        if (formState.isSubmitting && !valgtDato) {
            setError('bestillingsdato', {type: 'custom', message: 'Ingen bestillingsdato valgt'})
        } else if (formState.errors.bestillingsdato && valgtDato) {
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
        defaultSelected: undefined,
    })

    return (
        <DatePicker dropdownCaption {...datepickerProps}>
            <DatePicker.Input
                {...inputProps}
                size="small"
                label="Hvilken dato ble brillen bestilt?"
                id="bestillingsdato"
                value={inputProps.value}
                error={errors.bestillingsdato?.message}
            />
        </DatePicker>
    )
}
