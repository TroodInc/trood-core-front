import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.module.css'

import { IMAGE_FIT } from './constants'


const Image = (props) => {
  const {
    className,
    width,
    widthUnits,
    height,
    heightUnits,
    imageUrl,
    alt,
    fit,
    innerRef,
    style,
    ...other
  } = props

  return (
    <div
      {...other}
      ref={innerRef}
      className={classNames(styles.root, className)}
      style={style}
    >
      <img src={imageUrl} alt={imageUrl || alt} style={{ objectFit: fit }} className={styles.image} />
    </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  fit: PropTypes.oneOf(Object.values(IMAGE_FIT)),
}

Image.defaultProps = {
  style: {
    width: 200,
    height: 200,
  },
  fit: IMAGE_FIT.fill,
}

export default Image
