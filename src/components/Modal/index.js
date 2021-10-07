import React, { useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useObserver } from 'mobx-react-lite'

import PageStoreContext from 'core/PageStoreContext'
import Block from '../Block'
import { MODAL_TYPES } from './constants'

import styles from './index.module.css'
import { cssMeasurementUnits } from '../../constants'


const Modal = ({
  innerRef,
  className,
  width,
  widthUnits,
  type,
  modalName,
  closeOnOverlayClick,
  children,
  ...other
}) => {
  const context = useContext(PageStoreContext)
  const overlayRef = useRef()
  return useObserver(() => {
    const isOpen = other.isOpen === undefined ? context.isModalOpen(modalName) : other.isOpen
    const close = other.close === undefined ? () => context.closeModal(modalName) : other.close

    if (!isOpen) return null
    const onOverlayClick = (event) => {
      if (closeOnOverlayClick && event.target === overlayRef.current) close()
    }

    const style = {
      width: type === MODAL_TYPES.full ? '100%' : `${width}${widthUnits}`,
      height: type === MODAL_TYPES.full ? '100%' : undefined,
    }

    return (
      <div className={classNames(styles.overlay, styles[type])} onClick={onOverlayClick} ref={overlayRef}>
        <Block innerRef={innerRef} style={style} className={classNames(styles.modal, className, styles[type])}>
          {children}
        </Block>
      </div>
    )
  })
}

Modal.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  widthUnits: PropTypes.oneOf(cssMeasurementUnits),
  type: PropTypes.oneOf(Object.values(MODAL_TYPES)),
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  closeOnOverlayClick: PropTypes.bool,
  children: PropTypes.node,
}

Modal.defaultProps = {
  width: 320,
  widthUnits: cssMeasurementUnits[0],
  type: MODAL_TYPES.center,
  close: () => {},
  closeOnOverlayClick: true,
}

export default Modal
