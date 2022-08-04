import {Alert, BodyLong, Heading, Link as DsLink, Loader} from '@navikt/ds-react'
import {useEffect} from 'react'
import {beløp} from '../beløp'
import {Avstand} from '../components/Avstand'
import {Data} from '../components/Data'
import {Datum} from '../components/Datum'
import {organisasjonsnummer} from '../components/organisasjonsnummer'
import {dato} from '../dato'
import {useApplicationContext} from '../state/ApplicationContext'
import {SatsType, VilkårsgrunnlagRequest, VilkårsgrunnlagResponse, VilkårsgrunnlagResultat} from '../types'
import {usePost} from '../usePost'
import {FormatertStyrke} from './FormatertStyrke'
import {KravSteg} from './KravSteg'
import {SendInnKrav} from './SendInnKrav'
import styled from "styled-components";
import {LoaderContainer} from "../components/LoaderContainer";
import { LenkeMedLogging } from '../components/LenkeMedLogging'
import { digihot_customevents, logCustomEvent, logSkjemavalideringFeilet } from '../utils/amplitude'

export function KravOppsummering() {
    const {appState} = useApplicationContext()
    const {
        post: vurderVilkår,
        data: vilkårsvurdering,
        loading: vilkårsvurderingLoading,
    } = usePost<VilkårsgrunnlagRequest, VilkårsgrunnlagResponse>('/vilkarsgrunnlag')

    const vilkårsgrunnlag: VilkårsgrunnlagRequest = {
        orgnr: appState.orgnr,
        orgNavn: appState.orgNavn, // todo fjern
        fnrBarn: appState.barnFnr,
        brilleseddel: appState.brillestyrke,
        bestillingsdato: dato.tilISO(appState.bestillingsdato),
        brillepris: beløp.byttDesimaltegn(appState.brillepris),
        extras: {
            orgNavn: appState.orgNavn,
            bestillingsreferanse: appState.bestillingsreferanse
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'auto'})
        // noinspection JSIgnoredPromiseFromCall
        vurderVilkår(vilkårsgrunnlag)
    }, [])

    if (vilkårsvurderingLoading) {
        return (
            <LoaderContainer>
                <Avstand paddingBottom={5} paddingTop={5}>
                    <Loader/>
                </Avstand>
            </LoaderContainer>
        )
    }
    if (!vilkårsvurdering) {
        return null
    }

    const kanSøke = vilkårsvurdering.resultat === VilkårsgrunnlagResultat.JA || window.appSettings.MILJO === 'dev-gcp'

    logCustomEvent(digihot_customevents.VILKÅRSVURDERING_RESULTAT, { kanSøke: kanSøke })
    if (!kanSøke) {
        logSkjemavalideringFeilet(["Barnet oppfyller ikke vilkårene for å sende inn krav om direkte oppgjør."])
    }

    return (
        <KravSteg>
            <Heading level="2" size="medium">
                Barn
            </Heading>
            <Data>
                <Datum label="Fødselsnummer">{appState.barnFnr}</Datum>
                <Datum label="Navn">{appState.barnNavn}</Datum>
                <Datum label="Alder">{appState.barnAlder}</Datum>
            </Data>
            <Heading level="2" size="medium">
                Brillestyrke
            </Heading>
            <Data>
                <Datum label="Høyre sfære">
                    <FormatertStyrke verdi={appState.brillestyrke.høyreSfære} type="sfære"/>
                </Datum>
                <Datum label="Høyre sylinder">
                    <FormatertStyrke verdi={appState.brillestyrke.høyreSylinder} type="sylinder"/>
                </Datum>
                <Datum label="Venstre sfære">
                    <FormatertStyrke verdi={appState.brillestyrke.venstreSfære} type="sfære"/>
                </Datum>
                <Datum label="Venstre sylinder">
                    <FormatertStyrke verdi={appState.brillestyrke.venstreSylinder} type="sylinder"/>
                </Datum>
            </Data>
            <Heading level="2" size="medium">
                Annet
            </Heading>
            <Data>
                <Datum label="Organisasjonsnummer">{organisasjonsnummer(appState.orgnr)}</Datum>
                <Datum label="Organisasjonsnavn">{appState.orgNavn}</Datum>
                <Datum label="Bestillingsdato">{appState.bestillingsdato}</Datum>
                <Datum label="Pris på brille">{appState.brillepris}</Datum>
                <Datum label="Bestillingsreferanse">{appState.bestillingsreferanse}</Datum>
            </Data>
            <Avstand paddingBottom={5} paddingTop={5}>
                {vilkårsvurdering.sats === SatsType.INGEN ? (
                    <Alert variant="warning">
                        <BodyLong>
                            Barnet oppfyller ikke&nbsp;
                            <LenkeMedLogging href="https://nav.no/briller-til-barn#hvem" target="_blank">
                                vilkårene
                            </LenkeMedLogging>
                            &nbsp;for å sende inn krav om direkte oppgjør.
                        </BodyLong>
                        <BodyLong>Det er likevel mulig å søke om refusjon manuelt på nav.no</BodyLong>
                    </Alert>
                ) : (
                    <Alert variant="info">
                        <Heading level="2" spacing size="small">{`Brillestøtte på ${beløp.formater(
                            vilkårsvurdering.beløp
                        )}`}</Heading>
                        {Number(vilkårsvurdering.beløp) < vilkårsvurdering.satsBeløp ? (
                            <BodyLong>{'Barnet får støtte for hele kostnaden på brillen.'}</BodyLong>
                        ) : (
                            <BodyLong>{`Barnet kan få støtte fra sats ${vilkårsvurdering.sats.replace('SATS_', '')}: ${
                                vilkårsvurdering.satsBeskrivelse
                            }`}</BodyLong>
                        )}
                    </Alert>
                )}
            </Avstand>
            {kanSøke && <SendInnKrav vilkårsgrunnlag={vilkårsgrunnlag}/>}
        </KravSteg>
    )
}
