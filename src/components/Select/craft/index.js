import React from 'react'
import { useNode } from '@craftjs/core'

import Select from '../index'


const CraftSelect = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, ...rest } = props

  return (
    <Select {...{
      innerRef: ref => connect(drag(ref)),
      ...rest,
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
    ...Select.defaultProps,
    items: [{ value: 1 }],
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftSelect
