import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Input from '../index'


const CraftInput = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <Input {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
    }} />
  )
}

CraftInput.craft = {
  displayName: 'Input',
  props: {
    ...Input.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: Settings,
  },
}

export default CraftInput
