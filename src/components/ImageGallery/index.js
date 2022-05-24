import React from 'react'
import get from 'lodash/get'

import Gallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import './index.css'

import { thumbnailPositions } from './constants'


const getImage = (img, path, altPath) => {
  if (typeof img === 'string') return img
  const image = get(img, path)
  if (image) return image
  return get(img, altPath)
}

const ImageGallery = ({
  innerRef,
  className,
  images = [],
  imageOriginalPath,
  imageThumbnailPath,
  imageFullscreenPath,
  height,
  ...other
}) => {
  const items = images.map(item => ({
    original: getImage(item, imageOriginalPath),
    originalHeight: height,
    thumbnail: getImage(item, imageThumbnailPath, imageOriginalPath),
    fullscreen: getImage(item, imageFullscreenPath, imageOriginalPath),
  })).filter(item => item.original)

  if (!items.length) return null

  return (
    <Gallery
      {...other}
      ref={r => innerRef(r?.imageGallery?.current)}
      additionalClass={className}
      items={items}
    />
  )
}

ImageGallery.defaultProps = {
  infinite: true,
  showNav: true,
  showThumbnails: true,
  thumbnailPosition: 'bottom',
  showFullscreenButton: true,
  showPlayButton: true,
  showIndex: true,
}

ImageGallery.thumbnailPositions = thumbnailPositions

export default ImageGallery
