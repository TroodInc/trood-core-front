import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Button from '../index'

import { stringifyValue } from '../../helpers'


const CraftButton = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, label, ...rest } = props

  return (
    <Button {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
      label: stringifyValue(label),
      disabled: undefined,
      onClick: () => {},
    }} />
  )
}

CraftButton.craft = {
  custom: {
    getStyleSettings: () => ({
      textAlign: false,
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
