import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Input from '../index'

import { COMPONENT_GROUPS } from '../../../constants'


const CraftInput = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, onlyRender, ...rest } = props

  return (
    <Input {...{
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
      ...rest,
      disabled: onlyRender,
      value: typeof rest.value === 'object' ? '' : rest.value,
      errors: [],
      onChange: () => {},
      onValid: () => {},
      onInvalid: () => {},
      onEnter: () => {},
      onSearch: () => {},
      onFocus: () => {},
      onBlur: () => {},
    }} />
  )
}

CraftInput.craft = {
  custom: {
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
  group: COMPONENT_GROUPS.inputControls,
  displayName: 'Input',
  props: {
    ...Input.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: Settings,
  },
}

export default CraftInput
