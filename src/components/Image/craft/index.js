import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Image from '../index'


const CraftImage = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, ...rest } = props
  let { imageUrl } = props
  let alt
  if (typeof imageUrl === 'object') {
    alt = imageUrl.path
    imageUrl = undefined
  }

  return (
    <Image
      {...rest}
      innerRef={onlyRender ? undefined : ref => connect(drag(ref))}
      imageUrl={imageUrl}
      alt={alt}
    />
  )
}

CraftImage.craft = {
  displayName: 'Image',
  props: Image.defaultProps,
  related: {
    settings: Settings,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftImage
