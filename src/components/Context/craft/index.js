import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import styles from './index.module.css'


const CraftContext = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp } = props

  return (
    <div
      ref={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames({ [styles.visualHelp]: visualHelp })}
    >
      {props.children}
    </div>
  )
}

CraftContext.craft = {
  displayName: 'Context',
  related: {
    settings: Settings,
  },
}

export default CraftContext
