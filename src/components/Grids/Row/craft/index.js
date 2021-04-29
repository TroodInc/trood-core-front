import React from 'react'
import classNames from 'classnames'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Row from '../index'

import styles from './index.module.css'


const CraftRow = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    className,
    onlyRender,
    visualHelp,
    ...rest
  } = props

  return (
    <Row {...{
      ...rest,
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      className: classNames(className, visualHelp && styles.visualHelp),
    }}>
      {props.children}
    </Row>
  )
}

CraftRow.craft = {
  displayName: 'Row',
  props: {
    ...Row.defaultProps,
  },
  related: {
    settings: Settings,
  },
}

export default CraftRow
