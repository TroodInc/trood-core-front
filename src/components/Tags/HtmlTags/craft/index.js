import React from 'react'
import classNames from 'classnames'
import { useNode } from '@craftjs/core'

import HtmlTags from '../index'
import Settings from './Settings'

import styles from './index.module.css'


const CraftHtmlTags = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    className,
    visualHelp,
    ...rest
  } = props

  return (
    <HtmlTags {...{
      ...rest,
      innerRef: ref => connect(drag(ref)),
      className: classNames(className, visualHelp && styles.visualHelp),
    }}>
      {props.children}
    </HtmlTags>
  )
}

CraftHtmlTags.craft = {
  displayName: 'HtmlTags',
  props: {
    ...HtmlTags.defaultProps,
  },
  related: {
    settings: Settings,
  },
}

export default CraftHtmlTags
