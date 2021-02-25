import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'

import styles from './index.module.css'


const CraftRoute = props => {
  const {
    connectors: { connect, drag },
    custom,
  } = useNode((node) => ({
    props: node.data.props,
    custom: node.data.custom,
  }))
  const { visualHelp, ...rest } = props

  return (
    <div {...rest} ref={ref => connect(drag(ref))} className={visualHelp && styles.visualHelp}>
      Title: {props.title}<br/>
      Path: {props.path}<br/>
      Exact: {props.exact ? 'yes' : 'no'}<br/>
      Chunk: {custom.chunk}
      {props.children}
    </div>
  )
}

CraftRoute.craft = {
  displayName: 'Route',
  related: {
    settings: Settings,
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
}

export default CraftRoute
