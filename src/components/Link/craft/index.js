import React from 'react'
import { Link } from 'react-router-dom'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import styles from './index.module.css'


const CraftLink = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, className, ...rest } = props

  return (
    <Link
      {...rest}
      innerRef={ref => connect(drag(ref))}
      className={classNames({ className, [styles.visualHelp]: visualHelp })}
      onClick={e => e.preventDefault()}
    >
      {props.children}
    </Link>
  )
}

CraftLink.craft = {
  displayName: 'Link',
  related: {
    settings: Settings,
  },
  props: {
    to: '/',
    children: 'Link',
  },
}

export default CraftLink
