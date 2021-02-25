import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNode } from '@craftjs/core'

import Settings from './Settings'


const CraftBlock = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))

  return (
    <NavLink {...props} innerRef={ref => connect(drag(ref))}>
      {props.children}
    </NavLink>
  )
}

CraftBlock.craft = {
  displayName: 'NavLink',
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
