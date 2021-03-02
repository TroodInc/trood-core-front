import React from 'react'
import classNames from 'classnames'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Cell from '../index'

import styles from './index.module.css'


const CraftCell = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    className,
    sizeType, // service props for settings
    visualHelp,
    ...rest
  } = props

  return (
    <Cell {...{
      ...rest,
      innerRef: ref => connect(drag(ref)),
      className: classNames(className, visualHelp && styles.visualHelp),
    }}>
      {props.children}
    </Cell>
  )
}

CraftCell.craft = {
  displayName: 'Cell',
  props: {
    ...Cell.defaultProps,
  },
  related: {
    settings: Settings,
  },
}

export default CraftCell
