import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Button from '../index'


const CraftButton = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, ...rest } = props

  return (
    <Button {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
      onClick: () => {},
    }} />
  )
}

CraftButton.craft = {
  custom: {
    getStyleSettings: () => ({
      size: false,
      textAlign: false,
      color: false,
      bg: false,
      radius: false,
      shadow: false,
    }),
  },
  displayName: 'Button',
  related: {
    settings: Settings,
  },
  props: {
    ...Button.defaultProps,
    label: 'Button',
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftButton
