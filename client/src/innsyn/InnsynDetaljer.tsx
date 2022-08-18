import {useNavigate, useParams} from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import {Button} from "@navikt/ds-react"
import {Back} from "@navikt/ds-icons"
import React from "react"

export function InnsynDetaljer() {
    let { vedtakId } = useParams()
    const navigate = useNavigate()
    return (
        <>
            <ScrollToTop />
            <main>
                <Button
                    variant="tertiary"
                    size="medium"
                    onClick={() => {
                        navigate('/innsyn')
                    }}
                >
                    <Back aria-hidden /> Tilbake til oversikten
                </Button>
                <h1>Krav for {vedtakId}</h1>
            </main>
        </>
    )
}
