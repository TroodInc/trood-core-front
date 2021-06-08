import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import { COMPONENT_GROUPS } from '../../../constants'

import styles from './index.module.css'


const CraftSwitch = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, ...rest } = props

  return (
    <div
      {...rest}
      ref={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames({ [styles.visualHelp]: visualHelp })}
    >
      {props.children}
    </div>
  )
}

CraftSwitch.craft = {
  group: COMPONENT_GROUPS.navControls,
  displayName: 'Switch',
  custom: {
    getStyleSettings: () => false,
  },
}

export default CraftSwitch
