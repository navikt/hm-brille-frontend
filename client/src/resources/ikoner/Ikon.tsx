import React from 'react'
import { DocPencilIcon, FilesIcon } from '@navikt/aksel-icons'

export interface IkonProps {
  bgSize?: number
  iconSize?: number
  className?: string
}

export interface IkonBakgrunnProps {
  size: number
  children: React.ReactNode
}

export const IkonBakgrunn: React.FC<IkonBakgrunnProps> = ({ size, children }) => (
  <div
    style={{
      background: '#99dead',
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${size}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
)

export const InnsendteKravIkon: React.FC<IkonProps> = ({ bgSize = 62, iconSize = 32 }) => (
  <IkonBakgrunn size={bgSize}>
    <FilesIcon aria-hidden width={iconSize} height={iconSize} />
  </IkonBakgrunn>
)

export const SendKravIkon: React.FC<IkonProps> = ({ bgSize = 62, iconSize = 32 }) => (
  <IkonBakgrunn size={bgSize}>
    <DocPencilIcon aria-hidden width={iconSize} height={iconSize} />
  </IkonBakgrunn>
)