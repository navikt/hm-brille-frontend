import type { CSSProperties, ReactNode } from 'react'

export interface AvstandProps {
  children?: ReactNode | undefined
  margin?: string
  marginTop?: number
  marginRight?: number
  marginBottom?: number
  marginLeft?: number
  padding?: string
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
  centered?: boolean
}

export function Avstand(props: AvstandProps) {
  const { children, centered, ...rest } = props
  const style = getSpacingStyle(rest, centered)

  return (
    <div aria-hidden={!children} style={style}>
      {children}
    </div>
  )
}

type MarginPadding = Omit<AvstandProps, 'centered' | 'children'>

function getSpacingStyle(props: MarginPadding, centered?: boolean): CSSProperties {
  return {
    margin: props.margin,
    marginTop: spacingVar(props.marginTop),
    marginRight: spacingVar(props.marginRight),
    marginBottom: spacingVar(props.marginBottom),
    marginLeft: spacingVar(props.marginLeft),
    padding: props.padding,
    paddingTop: spacingVar(props.paddingTop),
    paddingRight: spacingVar(props.paddingRight),
    paddingBottom: spacingVar(props.paddingBottom),
    paddingLeft: spacingVar(props.paddingLeft),
    textAlign: centered ? 'center' : 'unset',
  }
}

export function spacingVar(space?: number): string | undefined {
  return typeof space === 'number' ? `var(--a-spacing-${space})` : undefined
}