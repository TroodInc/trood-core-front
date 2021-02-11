import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Row from '../index'

import styles from './index.module.css'


const CraftRow = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    visualHelp,
    ...rest
  } = props

  return (
    <div ref={ref => connect(drag(ref))}>
      <Row {...{
        ...rest,
        className: visualHelp ? styles.visualHelp : '',
      }}>
        {props.children}
      </Row>
    </div>
  )
}

CraftRow.craft = {
  displayName: 'Row',
  props: {
    visualHelp: true,
  },
  related: {
    settings: Settings,
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
}

export default CraftRow
