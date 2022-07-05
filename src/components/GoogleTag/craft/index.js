import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'

import styles from './index.module.css'


const CraftGoogleTag = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, gtmId } = props

  return (
    <div
      ref={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames({ [styles.visualHelp]: visualHelp })}
    >
      Google Tag Id: {gtmId ? gtmId : 'Not Set'}
    </div>
  )
}

CraftGoogleTag.craft = {
  custom: {
    getStyleSettings: () => false,
  },
  displayName: 'Google Tag',
  related: {
    settings: Settings,
  },
}

export default CraftGoogleTag
