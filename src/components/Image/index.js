import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.module.css'

import { IMAGE_FIT, cssMeasurementUnits } from './constants'


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
    ...other
  } = props

  return (
    <div
      {...other}
      ref={innerRef}
      className={classNames(styles.root, className)}
      style={{ width: `${width}${widthUnits}`, height: `${height}${heightUnits}` }}
    >
      <img src={imageUrl} alt={imageUrl || alt} style={{ objectFit: fit }} className={styles.image} />
    </div>
  )
}

Image.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  widthUnits: PropTypes.oneOf(cssMeasurementUnits),
  height: PropTypes.number,
  heightUnits: PropTypes.oneOf(cssMeasurementUnits),
  imageUrl: PropTypes.string,
  fit: PropTypes.oneOf(Object.values(IMAGE_FIT)),
}

Image.defaultProps = {
  width: 200,
  height: 200,
  fit: IMAGE_FIT.fill,
  widthUnits: cssMeasurementUnits[0],
  heightUnits: cssMeasurementUnits[0],
}

export default Image
