import React from 'react'
import { Link } from 'react-router-dom'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import { COMPONENT_GROUPS } from '../../../constants'

import styles from './index.module.css'


const CraftLink = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, className, ...rest } = props

  return (
    <Link
      {...rest}
      ref={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames({ className, [styles.visualHelp]: visualHelp })}
      onClick={e => e.preventDefault()}
    >
      {props.children}
    </Link>
  )
}

CraftLink.craft = {
  custom: {
    getStyleSettings: () => ({
      textAlign: false,
    }),
  },
  group: COMPONENT_GROUPS.navControls,
  displayName: 'Link',
  related: {
    settings: Settings,
  },
  props: {
    to: '/',
  },
}

export default CraftLink
