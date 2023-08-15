import {BodyLong, BodyShort, Button, Heading, Label} from '@navikt/ds-react'
import {useTranslation} from "react-i18next";
import {organisasjonsnummer} from "../components/organisasjonsnummer";
import {DataPanelBedrift} from "../components/DataPanelBedrift";
import {Buldings2Icon} from "@navikt/aksel-icons";

export interface BedriftProps {
    orgnr?: string
    orgNavn?: string
    orgAdresse?: string

    onByttBedrift(): void
}

export function Bedrift(props: BedriftProps) {
    const {t} = useTranslation()
    const {orgnr, orgNavn, orgAdresse} = props
    return (
        <DataPanelBedrift>

            <div>
                <div style={{marginLeft: "1.25rem"}}>
                    <BodyShort size="medium" spacing>
                        {t('krav.overskrift_foretaket')}
                    </BodyShort>
                    <Label>{`${orgNavn}`}</Label>
                    <BodyLong>{`org. nr. ${organisasjonsnummer(orgnr)}`}</BodyLong>
                </div>
                <Button
                    variant="tertiary"
                    onClick={() => {
                        props.onByttBedrift()
                    }}
                >
                    {t('krav.knapp_velg_annen_virksomhet')}
                </Button>
            </div>
            <Buldings2Icon fontSize="4rem" style={{marginRight: "3rem"}}/>
        </DataPanelBedrift>
    )
}
