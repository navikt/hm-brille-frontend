import { Copy } from '@navikt/ds-icons'
import React from 'react'

import styled from 'styled-components'

export interface IkonProps {
    bgSize?: number
    iconSize?: number
    className?: string
}

export interface IkonBakgrunnProps {
    size: number
}

export const IkonBakgrunn = styled.div<IkonBakgrunnProps>`
    background: #99DEAD;
    width: ${props => props.size || "40"}px;
    height: ${props => props.size || "40"}px;
    border-radius: ${props => props.size || "40"}px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DokumentIkon: React.FC<IkonProps> = ({ bgSize = 42, iconSize = 24 }) => (
    <IkonBakgrunn size={bgSize}>
        <Copy width={iconSize} height={iconSize}/>
    </IkonBakgrunn>
)