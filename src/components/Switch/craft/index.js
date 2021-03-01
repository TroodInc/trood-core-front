import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import styles from './index.module.css'


const CraftSwitch = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, ...rest } = props

  return (
    <div {...rest} ref={ref => connect(drag(ref))} className={classNames({ [styles.visualHelp]: visualHelp })}>
      {props.children}
    </div>
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
