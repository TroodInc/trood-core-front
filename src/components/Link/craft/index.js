import React from 'react'
import { Link } from 'react-router-dom'
import { useNode } from '@craftjs/core'

import Settings from './Settings'


const CraftLink = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))

  return (
    <Link {...props} innerRef={ref => connect(drag(ref))}>
      {props.children}
    </Link>
  )
}

CraftLink.craft = {
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

export default CraftLink
