import React from 'react'
import classNames from 'classnames'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Container from '../index'

import styles from './index.module.css'


const CraftContainer = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    onlyRender,
    className,
    visualHelp,
    ...rest
  } = props

  return (
    <Container {...{
      ...rest,
      ref: onlyRender ? undefined : ref => connect(drag(ref)),
      className: classNames(className, visualHelp && styles.visualHelp),
    }}>
      {props.children}
    </Container>
  )
}

CraftContainer.craft = {
  displayName: 'Container',
  props: {
    ...Container.defaultProps,
  },
  related: {
    settings: Settings,
  },
}

export default CraftContainer
