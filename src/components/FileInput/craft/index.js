import React from 'react'
import { Element, useNode } from '@craftjs/core'

import Settings from './Settings'
import FileInput from '../index'

import styles from './index.module.css'


const CraftFileInput = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, components } = props

  if (onlyRender) {
    return (
      <div className={styles.root}>
        {props?.labelComponent?.$component}
        {props?.valueComponent?.$component}
      </div>
    )
  }

  return (
    <div className={styles.root} ref={ref => connect(drag(ref))}>
      <Element
        id="label"
        is={components.Container}
        className={styles.label}
        canvas
        custom={{ displayName: 'Label Component' }}
      />
      <Element
        id="value"
        is={components.Container}
        className={styles.value}
        canvas
        custom={{ displayName: 'Value Component' }}
      />
    </div>
  )
}

CraftFileInput.craft = {
  displayName: 'FileInput',
  related: {
    settings: Settings,
  },
  props: {
    ...FileInput.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
  custom: {
    ...FileInput.transformFunctions,
    getStyleSettings: () => false,
  },
}

export default CraftFileInput
