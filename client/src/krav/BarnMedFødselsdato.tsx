import {Heading, Label} from '@navikt/ds-react'
import {DataPanelBarn} from "../components/DataPanelBarn";
import {BrillebarnComponent} from "../resources/svg/BrillebarnComponent";
import {t} from "i18next";
import {DataResponsive} from "../components/DataResponsive";
import {DatumWithoutMargin} from "../components/DatumWithoutMargin";
import {Dato} from "../components/Dato";
import React from "react";

export interface BarnProps {
    fnr: string
    fødselsdato: string
    alder?: number
}

export function BarnMedFødselsdato(props: BarnProps) {
    const {fnr, fødselsdato, alder} = props
    let alderTekst = typeof alder === 'number' ? ` (${alder} år)` : ''
    return (
        <DataPanelBarn>
            <BrillebarnComponent/>
            <div role="alert">
                <div style={{display: "grid", gridTemplateColumns: "auto 1fr"}}>
                    <Label as="div">{`Fødselsdato`}</Label>
                    <div style={{paddingLeft: '0.5rem'}}> <Dato verdi={fødselsdato}></Dato>{alderTekst}</div>
                </div>
                <div style={{display: "grid", gridTemplateColumns: "auto 1fr"}}>
                    <Label as="div">{`${t("krav.ledetekst_fnr")}`}</Label>
                    <div style={{paddingLeft: '0.5rem'}}>{fnr}</div>
                </div>
            </div>

        </DataPanelBarn>
    )
}
