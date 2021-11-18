import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import PageStoreContext from 'core/PageStoreContext'
import Context from '../Context'

import styles from './index.module.css'
import { useObserver } from 'mobx-react-lite'


const Popup = ({
  popupName,
  innerRef,
  className,
  style,
  ...props
}) => {
  const pageContext = useContext(PageStoreContext)
  return useObserver(() => {
    const context = pageContext.getContext(popupName)
    const isOpen = pageContext.isPopupOpen(popupName)

    if (!isOpen) return null

    const type = context?.type || props.type
    const children = context?.message || props.children

    return (
      <div className={styles.wrapper}>
        <Context context={context}>
          <div ref={innerRef} style={style} className={classNames(styles.popup, styles[type], className)}>
            {children}
          </div>
        </Context>
      </div>
    )
  })
}

Popup.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  isOpen: PropTypes.bool,
  children: PropTypes.node,
}

Popup.defaultProps = {
  style: {
    width: 320,
    top: 80,
  },
  type: 'info',
}

export default Popup
