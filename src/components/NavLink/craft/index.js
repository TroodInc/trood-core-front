import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import { COMPONENT_GROUPS } from '../../../constants'

import styles from './index.module.css'


const CraftNavLink = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, className, ...rest } = props

  return (
    <NavLink
      {...rest}
      ref={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames({ className, [styles.visualHelp]: visualHelp })}
      onClick={e => e.preventDefault()}
    >
      {props.children}
    </NavLink>
  )
}

CraftNavLink.craft = {
  custom: {
    getStyleSettings: () => ({
      textAlign: false,
    }),
  },
  group: COMPONENT_GROUPS.navControls,
  displayName: 'NavLink',
  related: {
    settings: Settings,
  },
  props: {
    to: '/',
  },
}

export default CraftNavLink
