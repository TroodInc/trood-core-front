import React from 'react'
import classNames from 'classnames'
import { useNode } from '@craftjs/core'

import SvgTags from '../index'
import Settings from './Settings'

import styles from './index.module.css'


const CraftSvgTags = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    className,
    visualHelp,
    ...rest
  } = props

  return (
    <SvgTags {...{
      ...rest,
      innerRef: ref => connect(drag(ref)),
      className: classNames(className, visualHelp && styles.visualHelp),
    }}>
      {props.children}
    </SvgTags>
  )
}

CraftSvgTags.craft = {
  displayName: 'SvgTags',
  props: {
    ...SvgTags.defaultProps,
  },
  related: {
    settings: Settings,
  },
}

export default CraftSvgTags
