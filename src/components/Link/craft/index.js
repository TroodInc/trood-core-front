import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import LinkWrapper from '../index'


const CraftBlock = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))

  return (
    <LinkWrapper {...props} innerRef={ref => connect(drag(ref))}>
      {props.children}
    </LinkWrapper>
  )
}

CraftBlock.craft = {
  displayName: 'Link',
  related: {
    settings: Settings,
  },
  props: {
    to: '/',
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
}

export default CraftBlock
