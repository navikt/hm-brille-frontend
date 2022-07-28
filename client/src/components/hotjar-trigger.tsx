import { useEffect } from 'react'
import {useLocation} from "react-router-dom";

declare global {
    interface Window {
        hj: any
    }
}

interface HotjarTriggerProps {
    children: any;
}

export const HotjarTrigger = ({ children }: HotjarTriggerProps) => {

    const location = useLocation()

    useEffect(() => {
        console.log(`location: ${location.pathname}`)
        if(location.pathname === "/krav/kvittering"){
            window.hj =
                window.hj ||
                function () {
                    ;(window.hj.q = window.hj.q || []).push(arguments)
                }
            if (window.appSettings.MILJO !== 'labs-gcp') {
                window.hj('trigger', 'digihot_hm_brille_api_krav')
            }
        }

    })

    return children
}
