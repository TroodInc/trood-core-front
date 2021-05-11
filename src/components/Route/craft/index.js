import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import { customChunkConstant } from '../constants'

import styles from './index.module.css'


const CraftRoute = props => {
  const {
    connectors: { connect, drag },
    custom,
  } = useNode((node) => ({
    props: node.data.props,
    custom: node.data.custom,
  }))
  const { onlyRender, visualHelp, ...rest } = props

  return (
    <div
      {...rest}
      ref={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames({ [styles.visualHelp]: visualHelp })}
    >
      {visualHelp && (
        <>
          Title: {props.title}<br/>
          Path: {props.path}<br/>
          Exact: {props.exact ? 'yes' : 'no'}<br/>
        </>
      )}
      {(custom.chunk || '').replace(customChunkConstant, '') && (
        <>
          Chunk: {custom.chunk}
        </>
      )}
      {props.children}
    </div>
  )
}

CraftRoute.craft = {
  displayName: 'Route',
  related: {
    settings: Settings,
  },
  custom: {
    getStyleSettings: () => false,
  },
}

export default CraftRoute
