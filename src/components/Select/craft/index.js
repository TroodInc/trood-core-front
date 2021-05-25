import React from 'react'
import { Element, useNode } from '@craftjs/core'

import Settings from './Settings'
import SelectComponent, { getSelect } from '../index'


const Select = getSelect({
  Node: (
    <Element
      id="itemView"
      is="div"
      canvas
      custom={{ displayName: 'View' }}
      style={{ minHeight: 16 }}
    />
  ),
})

const CraftSelect = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, ...rest } = props

  return (
    <Select {...{
      innerRef: ref => connect(drag(ref)),
      ...rest,
      labelNodes: [{
        type: 'div',
        props: {
          children: {
            $type: '$data',
            path: '$context.label',
          },
        },
      }],
      items: [{ value: 1, label: 'Item' }],
      onValid: () => {},
      onInvalid: () => {},
      onChange: () => {},
      onBlur: () => {},
      onFocus: () => {},
      onSearch: () => {},
      onAdd: () => {},
      missingValueResolver: () => {},
      onScrollToEnd: () => {},
    }} />
  )
}

CraftSelect.craft = {
  displayName: 'Select',
  props: {
    ...SelectComponent.defaultProps,
  },
  custom: {
    ...Select.transformFunctions,
  },
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: Settings,
  },
}

export default CraftSelect
