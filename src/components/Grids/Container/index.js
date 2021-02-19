import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.module.css'


const Container = ({
  children,
  className,
  fluid,
  innerRef,
  ...other
}) => (
  <div
    {...other}
    ref={innerRef}
    className={classNames(
      className,
      styles['aa-Container'],
      !fluid && styles['aa-Container_withMaxWidth'],
    )}
  >
    {children}
  </div>
)

Container.defaultProps = {
  fluid: false,
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
  fluid: PropTypes.bool,
}

export default Container
