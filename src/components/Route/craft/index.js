import React from 'react'
import { useNode } from '@craftjs/core'

import Route from '../index'
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

  return (
    <Route {...props} innerRef={ref => connect(drag(ref))} className={props.visualHelp && styles.visualHelp}>
      Title: {props.title}<br/>
      Path: {props.path}<br/>
      Exact: {props.exact ? 'yes' : 'no'}<br/>
      Chunk: {custom.chunk}
      {props.children}
    </Route>
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
