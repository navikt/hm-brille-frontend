import amplitude from 'amplitude-js'
import { v4 as uuidv4 } from 'uuid'

export enum amplitude_taxonomy {
    SKJEMA_START = 'skjema startet',
    SKJEMA_ÅPEN = 'skjema åpnet',
    SKJEMASTEG_FULLFØRT = 'skjemasteg fullført',
    SKJEMAVALIDERING_FEILET = 'skjemavalidering feilet',
    SKJEMAINNSENDING_FEILET = 'skjemainnsending feilet',
    SKJEMA_FULLFØRT = 'skjema fullført',
    NAVIGERE = 'navigere',
}

//Events som ikke er i NAV sin taxonomi
export enum digihot_customevents {
    BESTILLINGSSJEKK_OPPSUMMERINGSSIDE = 'oppsummeringsside viser bestilling',
}


export enum SkjemaSteg {
    KRAV = 10,
}

const SKJEMANAVN = 'hm-brille-frontend'

let skjemaId = uuidv4()

export const initAmplitude = () => {
    if (amplitude) {
        amplitude.getInstance().init('default', '', {
            apiEndpoint: 'amplitude.nav.no/collect-auto',
            saveEvents: false,
            includeUtm: true,
            includeReferrer: true,
            platform: window.location.toString(),
        })
    }
}

export function logAmplitudeEvent(eventName: string, data?: any) {
    console.log('amplitude skjemaId:', skjemaId)
    console.log('amplitude eventName:', eventName)
    setTimeout(() => {
        data = {
            app: SKJEMANAVN,
            team: 'teamdigihot',
            ...data,
        }
        try {
            if (amplitude) {
                amplitude.getInstance().logEvent(eventName, data)
            }
        } catch (error) {
            console.error(error)
        }
    })
}

export function logCustomEvent(event: digihot_customevents, data?: any) {
    logAmplitudeEvent(event, {
        skjemanavn: SKJEMANAVN,
        ...data,
    })
}

export function logNavigeringLenke(destinasjon: string): void {
    logAmplitudeEvent(amplitude_taxonomy.NAVIGERE, {
        skjemanavn: SKJEMANAVN,
        destinasjon: destinasjon,
    })
}


export function logSkjemaStartet() {
    skjemaId = uuidv4()
    logAmplitudeEvent(amplitude_taxonomy.SKJEMA_START, {
        skjemanavn: SKJEMANAVN,
        skjemaId: skjemaId,
        steg: 0,
    })
}

export function logSkjemastegFullfoert(steg: SkjemaSteg) {
    logAmplitudeEvent(amplitude_taxonomy.SKJEMASTEG_FULLFØRT, {
        skjemanavn: SKJEMANAVN,
        skjemaId: skjemaId,
        steg: steg,
    })
}


export function logSkjemaFullfoert() {
    logAmplitudeEvent(amplitude_taxonomy.SKJEMA_FULLFØRT, {
        skjemanavn: SKJEMANAVN,
        skjemaId: skjemaId,
    })
}