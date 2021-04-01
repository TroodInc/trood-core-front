import React from 'react'
import { useNode } from '@craftjs/core'

import Input from '../index'


const CraftInput = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, ...rest } = props

  return (
    <Input {...{
      innerRef: ref => connect(drag(ref)),
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
}

export default CraftInput
