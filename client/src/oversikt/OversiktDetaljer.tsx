import {useNavigate, useParams} from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Button, Panel, Heading } from "@navikt/ds-react"
import { Back } from "@navikt/ds-icons"
import React from "react"

export function OversiktDetaljer() {
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
                        navigate('/oversikt')
                    }}
                >
                    <Back aria-hidden /> Tilbake til oversikten
                </Button>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ display: 'inline-block', marginRight: '1rem', margin: '0.1em 0' }}>Krav for {vedtakId}</h1>
                    <Button
                        variant="secondary"
                        size="medium"
                        onClick={() => {
                            window.print()
                        }}
                    >
                        Skriv ut krav
                    </Button>
                </div>
                <Panel border={true} style={{ marginTop: '1rem' }}>
                    <div style={{ marginTop: '2rem' }}>
                        <Heading level="1" size="medium">
                            Foretaket som skal ha direkte oppgjør
                        </Heading>
                        <Line />
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <Heading level="1" size="medium">
                            Barn
                        </Heading>
                        <Line />
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <Heading level="1" size="medium">
                            Brillestyrke
                        </Heading>
                        <Line />
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <Heading level="1" size="medium">
                            Om brillen
                        </Heading>
                        <Line />
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <Heading level="1" size="medium">
                            Om kravet
                        </Heading>
                        <Line />
                    </div>
                </Panel>
            </main>
        </>
    )
}

const Line = () => {
    return (
        <hr style={{ borderTop: '1px solid #707070' }} />
    )
}
