import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import RadioButton from '../index'

import { COMPONENT_GROUPS } from '../../../constants'


const CraftRadioButton = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <RadioButton {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
      radioButtonValue: true,
      value: true,
      errors: [],
      onChange: () => {},
      onValid: () => {},
      onInvalid: () => {},
    }} />
  )
}

CraftRadioButton.craft = {
  custom: {
    getStyleSettings: () => ({
      size: false,
      textAlign: false,
      bg: false,
      radius: false,
      padding: false,
    }),
  },
  group: COMPONENT_GROUPS.inputControls,
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
