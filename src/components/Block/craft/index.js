import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Block from '../index'


const CraftBlock = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))

  return (
    <Block {...props} innerRef={ref => connect(drag(ref))}>
      {props.children}
    </Block>
  )
}

CraftBlock.craft = {
  displayName: 'Block',
  props: Block.defaultProps,
  related: {
    settings: Settings,
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
}

export default CraftBlock
