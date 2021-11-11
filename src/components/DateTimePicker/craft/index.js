import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import DateTimePicker from '../index'

import { COMPONENT_GROUPS } from '../../../constants'


const CraftDateTimePicker = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <DateTimePicker {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
      onChange: () => {},
      onValid: () => {},
      onInvalid: () => {},
    }} />
  )
}

CraftDateTimePicker.craft = {
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
  group: COMPONENT_GROUPS.inputControls,
  displayName: 'DateTimePicker',
  related: {
    settings: Settings,
  },
  props: {
    ...DateTimePicker.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftDateTimePicker
