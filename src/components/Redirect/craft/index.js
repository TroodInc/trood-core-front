import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import { COMPONENT_GROUPS } from '../../../constants'

import styles from './index.module.css'


const CraftRedirect = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, className, ...rest } = props

  return (
    <div
      {...rest}
      ref={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames({ className, [styles.visualHelp]: visualHelp })}
      onClick={e => e.preventDefault()}
    >
      {visualHelp && (
        <>
          From: {props.from || '*'}<br/>
          To: {props.to}<br/>
          Exact: {props.exact ? 'yes' : 'no'}<br/>
        </>
      )}
    </div>
  )
}

CraftRedirect.craft = {
  custom: {
    getStyleSettings: () => false,
  },
  group: COMPONENT_GROUPS.navControls,
  displayName: 'Redirect',
  related: {
    settings: Settings,
  },
}

export default CraftRedirect
