import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Checkbox from '../index'


const CraftInput = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <Checkbox {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
    }} />
  )
}

CraftInput.craft = {
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

export default CraftInput
