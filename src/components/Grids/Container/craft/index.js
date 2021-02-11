import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Container from '../index'

import styles from './index.module.css'


const CraftContainer = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    visualHelp,
    ...rest
  } = props

  return (
    <div ref={ref => connect(drag(ref))}>
      <Container {...{
        ...rest,
        className: visualHelp ? styles.visualHelp : '',
      }}>
        {props.children}
      </Container>
    </div>
  )
}

CraftContainer.craft = {
  displayName: 'Container',
  props: {
    visualHelp: true,
  },
  related: {
    settings: Settings,
  },
  rules: {
    canDrag: () => true,
    canMoveIn: () => true,
  },
}

export default CraftContainer
