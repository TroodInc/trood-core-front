import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import DateTimePicker from '../index'


const CraftDateTimePicker = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <DateTimePicker {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
    }} />
  )
}

CraftDateTimePicker.craft = {
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
