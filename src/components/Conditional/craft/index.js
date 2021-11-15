import React from 'react'
import { Element, useNode } from '@craftjs/core'

import Label from '../../Label'
import Conditional from '../index'
import Settings from './Settings'
import styles from './index.module.css'


const CraftConditional = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode()
  const { onlyRender, components } = props

  return (
    <div className={styles.root} ref={onlyRender ? undefined : ref => connect(drag(ref))}>
      <Label label="Display on value equal true" />
      <Element
        id="true"
        is={components.Container}
        className={styles.itemTrue}
        canvas
        custom={{ displayName: 'True Component' }}
      />
      <Label label="Display on value equal false" />
      <Element
        id="false"
        is={components.Container}
        className={styles.itemFalse}
        canvas
        custom={{ displayName: 'False Component' }}
      />
    </div>
  )
}

CraftConditional.craft = {
  displayName: 'Conditional',
  props: {
    ...Conditional.defaultProps,
  },
  custom: {
    ...Conditional.transformFunctions,
    getStyleSettings: () => false,
  },
  related: {
    settings: Settings,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftConditional
