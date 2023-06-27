import {Heading} from '@navikt/ds-react'
import {Data} from '../components/Data'
import {Datum} from '../components/Datum'
import {DataPanelBarn} from "../components/DataPanelBarn";
import {BrillebarnComponent} from "../resources/svg/BrillebarnComponent";
import {t} from "i18next";
import {DataResponsive} from "../components/DataResponsive";
import {DatumWithoutMargin} from "../components/DatumWithoutMargin";

export interface BarnProps {
    fnr: string
    navn: string
    alder?: number
}

export function Barn(props: BarnProps) {
    const {fnr, navn, alder} = props
    let alderTekst = typeof alder === 'number' ? ` (${alder} år)` : ''
    return (
        <DataPanelBarn>
            <BrillebarnComponent/>
            <div>
                <Heading level="3" size="xsmall">
                    {`${navn}${alderTekst}`}
                </Heading>
                <DataResponsive>
                    <DatumWithoutMargin label="krav.ledetekst_fnr">{fnr}</DatumWithoutMargin>
                </DataResponsive>
            </div>

        </DataPanelBarn>
    )
}
