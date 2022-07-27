import {Alert, BodyLong, Heading} from '@navikt/ds-react'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Avstand} from '../components/Avstand'
import {Beløp} from '../components/Beløp'
import {Data} from '../components/Data'
import {Dato} from '../components/Dato'
import {Datum} from '../components/Datum'
import {organisasjonsnummer} from '../components/organisasjonsnummer'
import ScrollToTop from '../components/ScrollToTop'
import {useApplicationContext} from '../state/ApplicationContext'
import {OpprettKravResponse} from '../types'
import {useLocationState} from '../useLocationState'
import {KravSteg} from './KravSteg'

export function KravKvittering() {
    const {resetAppState} = useApplicationContext()
    const state = useLocationState<OpprettKravResponse>()

    useEffect(() => {
        window.hj =
            window.hj ||
            function () {
                ;(window.hj.q = window.hj.q || []).push(arguments)
            }
        if (window.appSettings.MILJO !== 'labs-gcp') {
            window.hj('trigger', 'digihot_hm_brille_api_krav')
        }
    })

    useEffect(() => {
        resetAppState()
    }, [])

    if (!state) {
        return null
    }
    const {id, orgnr, bestillingsreferanse, beløp, opprettet} = state
    return (
        <KravSteg>
            <ScrollToTop/>
            <Alert variant="success">Kravet er registrert</Alert>
            <Avstand marginBottom={5}/>
            <BodyLong spacing>
                Kravet om direkte oppgjør er automatisk registrert. NAV utbetaler stønaden til firmaets kontonummer
                senest 30
                dager etter at kravet er registrert.
            </BodyLong>
            <Heading level="2" size="medium">
                Kvittering
            </Heading>
            <Data labelColumnWidth={150}>
                <Datum label="Org. nummer">{organisasjonsnummer(orgnr)}</Datum>
                <Datum label="Innsendt dato">
                    <Dato verdi={opprettet}></Dato>
                </Datum>
                <Datum label="Beløp til utbetaling">
                    <Beløp verdi={beløp}/>
                </Datum>
                <Datum label="Deres referansenr.">{bestillingsreferanse}</Datum>
                <Datum label="NAVs referansenr.">{id}</Datum>
            </Data>
            <Link to="/">Til forsiden</Link>
        </KravSteg>
    )
}
