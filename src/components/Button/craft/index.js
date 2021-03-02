import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Button from '../index'


const CraftButton = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))

  return (
    <Button {...{
      innerRef: ref => connect(drag(ref)),
      ...props,
    }} />
  )
}

CraftButton.craft = {
  displayName: 'Button',
  related: {
    settings: Settings,
  },
  props: {
    ...Button.defaultProps,
    label: 'Button',
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftButton
