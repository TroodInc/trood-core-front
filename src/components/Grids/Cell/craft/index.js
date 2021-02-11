import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Cell from '../index'

import styles from './index.module.css'


const CraftCell = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    sizeType, // service props for settings
    visualHelp,
    ...rest
  } = props

  return (
    <div ref={ref => connect(drag(ref))}>
      <Cell {...{
        ...rest,
        className: visualHelp ? styles.visualHelp : '',
      }}>
        {props.children}
      </Cell>
    </div>
  )
}

CraftCell.craft = {
  displayName: 'Cell',
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

export default CraftCell
