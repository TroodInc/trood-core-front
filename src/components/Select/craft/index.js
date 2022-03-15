import React from 'react'
import { Element, useNode } from '@craftjs/core'
import memoizeOne from 'memoize-one'

import Settings from './Settings'
import SelectComponent, { getSelect } from '../index'

import { COMPONENT_GROUPS } from '../../../constants'


const getSelectRenderTmp = inner => getSelect({
  Node: inner || (
    <Element
      id="itemView"
      is="div"
      canvas
      custom={{ displayName: 'View' }}
      style={{ minHeight: 16 }}
    />
  ),
})

const getSelectRender = memoizeOne(getSelectRenderTmp)

const CraftSelect = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  const Select = getSelectRender(onlyRender && rest?.labelNodes?.$component)

  return (
    <Select {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
      disabled: onlyRender,
      labelNodes: <div/>,
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
    ...SelectComponent.transformFunctions,
    getStyleSettings: () => ({
      height: false,
      textAlign: false,
      color: false,
      bg: false,
      radius: false,
      shadow: false,
      padding: false,
    }),
  },
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: Settings,
  },
}

export default CraftSelect
