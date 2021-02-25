import React from 'react'
import { useNode } from '@craftjs/core'

import SwitchWrapper from '../index'

import styles from './index.module.css'


const CraftSwitch = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))

  return (
    <SwitchWrapper {...props} innerRef={ref => connect(drag(ref))} className={props.visualHelp && styles.visualHelp}>
      {props.children}
    </SwitchWrapper>
  )
}

CraftSwitch.craft = {
  displayName: 'Switch',
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
}

export default CraftSwitch
