import React from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import Settings from './Settings'
import Typography from '../index'

import EditWrapper from '../../internal/EditWrapper'

import styles from '../index.module.css'


const CraftTypography = props => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode((node) => ({ props: node.data.props }))

  const { onlyRender, visualHelp, ...rest } = props

  let { value } = props
  const isValueFromDataSelector = typeof value === 'object'

  if (isValueFromDataSelector || onlyRender) {
    return (
      <Typography
        { ...rest }
        value={isValueFromDataSelector ? value.path : value}
        innerRef={onlyRender ? undefined : ref => connect(drag(ref))}
      />
    )
  }

  return (
    <EditWrapper {...{
      type: rest.type === 'html' ? 'wysiwyg' : 'text',
      innerRef: ref => connect(drag(ref)),
      onChange: value => setProp(props => props.value = value),
      text: value,
      tagName: Typography.knownTypes[props.type],
      className: classNames(styles[props.type], props.bold && styles.bold, props.className),
      style: props.style,
    }}>
      <Typography { ...rest } />
    </EditWrapper>
  )
}

CraftTypography.craft = {
  displayName: 'Typography',
  related: {
    settings: Settings,
  },
  props: {
    ...Typography.defaultProps,
    value: 'Typography',
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftTypography
