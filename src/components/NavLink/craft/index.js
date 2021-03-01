import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import styles from './index.module.css'


const CraftNavLink = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, ...rest } = props

  return (
    <NavLink {...rest} innerRef={ref => connect(drag(ref))} className={classNames({ [styles.visualHelp]: visualHelp })}>
      {props.children}
    </NavLink>
  )
}

CraftNavLink.craft = {
  displayName: 'NavLink',
  related: {
    settings: Settings,
  },
  props: {
    to: '/',
    children: 'NavLink',
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
}

export default CraftNavLink
