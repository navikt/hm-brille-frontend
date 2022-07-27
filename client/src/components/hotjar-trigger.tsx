import { useEffect } from 'react'

declare global {
    interface Window {
        hj: any
    }
}

interface HotjarTriggerProps {
    children: any;
}

export const HotjarTrigger = ({ children }: HotjarTriggerProps) => {
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

    return children
}
