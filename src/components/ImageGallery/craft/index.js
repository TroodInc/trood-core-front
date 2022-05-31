import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import ImageGallery from '../index'


const getImage = (name, height = 320, width = 480) => {
  const canvas = document.createElement('canvas')
  canvas.height = height
  canvas.width  = width

  const context = canvas.getContext('2d')

  context.fillStyle = 'gray'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'black'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = `${height / 8}px Arial`
  context.fillText(name, canvas.width / 2, canvas.height / 2)

  return canvas.toDataURL('image/jpeg')
}

const CraftImageGallery = props => {
  const {
    connectors: { connect, drag },
  } = useNode()
  const { visualHelp, onlyRender, ...rest } = props

  const images = Array(3).fill(0).map((_, i) => getImage(`Image ${i + 1}`))

  return (
    <ImageGallery {...{
      ...rest,
      images,
      innerRef: onlyRender ? undefined : ref => connect(drag(ref)),
    }} />
  )
}

CraftImageGallery.craft = {
  displayName: 'Image Gallery',
  props: {
    ...ImageGallery.defaultProps,
  },
  custom: {
    getStyleSettings: () => false,
  },
  rules: {
    canMoveIn: () => false,
  },
  related: {
    settings: Settings,
  },
}

export default CraftImageGallery
