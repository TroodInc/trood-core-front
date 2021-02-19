import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.css'


export const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
export const SIZES_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Cell = (props) => {
  const {
    children,
    className,
    verticalPadding,
    topPadding,
    bottomPadding,
    innerRef,
    ...other
  } = props

  const { sizeClasses, hiddenClasses, autoClasses, offsetClasses } = SIZES.reduce((memo, size) => {
    const sizePrefix = size === 'xs' ? '' : '-' + size

    const sizeProp = props[size]
    delete other[size]
    const sizeHiddenProp = props[`${size}Hidden`]
    delete other[`${size}Hidden`]
    const sizeAutoProp = props[`${size}Auto`]
    delete other[`${size}Auto`]
    const sizeOffsetProp = props[`${size}Offset`]
    delete other[`${size}Offset`]

    let { sizeClasses, hiddenClasses, autoClasses, offsetClasses } = memo

    if (sizeProp) sizeClasses = [...sizeClasses, styles[`aa-Cell${sizePrefix}-${sizeProp}`]]
    if (sizeHiddenProp) hiddenClasses = [...hiddenClasses, styles[`aa-Cell-${size}-hidden`]]
    if (sizeAutoProp) autoClasses = [...autoClasses, styles[`aa-Cell${sizePrefix}-auto`]]
    if (sizeOffsetProp) offsetClasses = [...offsetClasses, styles[`aa-Cell-offset${sizePrefix}-${sizeOffsetProp}`]]

    return { sizeClasses, hiddenClasses, autoClasses, offsetClasses }
  }, {
    sizeClasses: [],
    hiddenClasses: [],
    autoClasses: [],
    offsetClasses: [],
  })

  const style = {
    paddingTop: `${verticalPadding || topPadding}px`,
    paddingBottom: `${verticalPadding || bottomPadding}px`,
  }

  return (
    <div
      {...other}
      ref={innerRef}
      style={style}
      className={classNames(
        className,
        styles['aa-Cell'],
        ...sizeClasses,
        ...hiddenClasses,
        ...autoClasses,
        ...offsetClasses,
      )}
    >
      {children}
    </div>
  )
}

Cell.defaultProps = {}

Cell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  xs: PropTypes.oneOf(SIZES_VALUES),
  sm: PropTypes.oneOf(SIZES_VALUES),
  md: PropTypes.oneOf(SIZES_VALUES),
  lg: PropTypes.oneOf(SIZES_VALUES),
  xl: PropTypes.oneOf(SIZES_VALUES),
  xsHidden: PropTypes.bool,
  smHidden: PropTypes.bool,
  mdHidden: PropTypes.bool,
  lgHidden: PropTypes.bool,
  xlHidden: PropTypes.bool,
  xsOffset: PropTypes.oneOf(SIZES_VALUES),
  smOffset: PropTypes.oneOf(SIZES_VALUES),
  mdOffset: PropTypes.oneOf(SIZES_VALUES),
  lgOffset: PropTypes.oneOf(SIZES_VALUES),
  xlOffset: PropTypes.oneOf(SIZES_VALUES),
  xsAuto: PropTypes.bool,
  smAuto: PropTypes.bool,
  mdAuto: PropTypes.bool,
  lgAuto: PropTypes.bool,
  xlAuto: PropTypes.bool,
  verticalPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottomPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Cell
