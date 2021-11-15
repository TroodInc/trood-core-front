import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Checkbox from '../index'

import { COMPONENT_GROUPS } from '../../../constants'


const CraftCheckbox = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <Checkbox {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
      onChange: () => {},
      onValid: () => {},
      onInvalid: () => {},
    }} />
  )
}

CraftCheckbox.craft = {
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
  displayName: 'Checkbox',
  related: {
    settings: Settings,
  },
  props: {
    ...Checkbox.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftCheckbox
