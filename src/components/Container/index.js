import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './index.module.css'


const Container = ({
  children,
  className,
  innerRef,
  ...other
}) => (
  <div
    {...other}
    ref={innerRef}
    className={classNames(className, styles.root)}
  >
    {children}
  </div>
)

Container.defaultProps = {
  style: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  className: PropTypes.string,
}

export default Container
