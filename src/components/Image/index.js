import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.module.css'

import { IMAGE_FIT } from './constants'


const Image = (props) => {
  const {
    className,
    width,
    height,
    imageUrl,
    fit,
    innerRef,
    ...other
  } = props

  return (
    <div
      {...other}
      ref={innerRef}
      className={classNames(styles.root, className)}
      style={{ width, height }}
    >
      <img src={imageUrl} alt="" style={{ objectFit: fit }} className={styles.image} />
    </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  imageUrl: PropTypes.string,
  fit: PropTypes.oneOf(Object.values(IMAGE_FIT)),
}

Image.defaultProps = {
  width: 200,
  height: 200,
  fit: IMAGE_FIT.fill,
}

export default Image
