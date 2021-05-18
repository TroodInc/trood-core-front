import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import RadioButton from '../index'


const CraftRadioButton = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <RadioButton {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
    }} />
  )
}

CraftRadioButton.craft = {
  displayName: 'Radio Button',
  related: {
    settings: Settings,
  },
  props: {
    ...RadioButton.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftRadioButton
