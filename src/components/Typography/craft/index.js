import React, { useEffect } from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import { fontDict } from 'fonts'

import { stringifyValue } from '../../helpers'

import Settings from './Settings'
import Typography from '../index'

import EditWrapper from '../../internal/EditWrapper'

import styles from '../index.module.css'


const CraftTypography = props => {
  const fontObj = fontDict[props.font]

  useEffect(() => {
    if (fontObj) {
      const fontStyleLink = fontObj.link
      const hasFont = Array.from(document.head.getElementsByTagName('link'))
        .reduce((memo, curr) => memo || curr.href === fontStyleLink, false)

      if (!hasFont) {
        const linkElement = document.createElement('link')
        linkElement.setAttribute('rel', 'stylesheet')
        linkElement.setAttribute('type', 'text/css')
        linkElement.setAttribute('href', fontStyleLink)
        document.head.appendChild(linkElement)
      }
    }
  }, [fontObj])

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
        value={isValueFromDataSelector ? stringifyValue(value) : value}
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
      style: {
        ...props.style,
        fontFamily: fontObj?.fontFamily || props.font,
      },
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
