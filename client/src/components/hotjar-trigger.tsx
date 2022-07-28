import {useEffect} from 'react'

declare global {
    interface Window {
        hj: any
    }
}

interface HotjarTriggerProps {
    timeout: number;
}

export const HotjarTrigger = ({timeout}: HotjarTriggerProps) => {

    useEffect(() => {
        setTimeout(() => {
            window.hj =
                window.hj ||
                function () {
                    ;(window.hj.q = window.hj.q || []).push(arguments)
                }
            if (window.appSettings.MILJO !== 'labs-gcp') {
                console.log(`HotJar trigger`)
                window.hj('trigger', 'digihot_hm_brille_api_krav')
            }
        }, timeout)
    }, [])
}
