import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Image from '../index'


const CraftImage = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { visualHelp, ...rest } = props

  return (
    <Image {...rest} innerRef={ref => connect(drag(ref))} />
  )
}

CraftImage.craft = {
  displayName: 'Image',
  props: Image.defaultProps,
  related: {
    settings: Settings,
  },
}

export default CraftImage
