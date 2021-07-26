import React from 'react'
import { Element, useNode } from '@craftjs/core'

import Settings from './Settings'
import SelectComponent, { getSelect } from '../index'

import { COMPONENT_GROUPS } from '../../../constants'


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
            '$data': '{{$context.label}}',
          },
        },
      }],
      items: [{ value: 1, label: 'Item' }],
      value: [],
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
  group: COMPONENT_GROUPS.inputControls,
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
