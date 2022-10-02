import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'
import VerifyToken from '../index'
import styles from '../../Redirect/craft/index.module.css'


const CraftVerifyToken = (props) => {
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
          Endpoint: {props.endpoint}
        </>
      )}
    </div>
  )
}

CraftVerifyToken.craft = {
  displayName: 'VerifyToken',
  related: {
    settings: Settings,
  },
  props: {
    ...VerifyToken.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftVerifyToken
