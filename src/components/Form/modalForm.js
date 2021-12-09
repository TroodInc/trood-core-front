import React, { useEffect } from 'react'
import classNames from 'classnames'

import FormContext from 'core/FormContext'

import modalStyles from '../Modal/index.module.css'
import { MODAL_TYPES } from '../Modal/constants'

import Block from '../Block'


const ModalForm = ({
  className,
  baseUrl,
  pk,
  modalCloseOnOverlayClick,
  modalType,
  modalWidth,
  modalWidthUnits,
  innerRef,
  children,
  $data,
  form,
  modalOverlay,
  baseFormContext,
  onClose,
}) => {
  const isModalOpen = $data?.$page?.isModalOpen(baseUrl)
  const closeModalForm = () => $data?.$page?.closeModalForm(baseUrl)

  useEffect(() => {
    if (isModalOpen === false) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen])

  const { login, logout } = $data?.$auth || {}

  if (!isModalOpen) return null

  const onOverlayClick = (event) => {
    if (modalCloseOnOverlayClick && event.target === modalOverlay.current) closeModalForm()
  }

  const style = {
    width: modalType === MODAL_TYPES.full ? '100%' : `${modalWidth}${modalWidthUnits}`,
    height: modalType === MODAL_TYPES.full ? '100%' : undefined,
  }

  const formContext = {
    ...baseFormContext,
    login: () => login(form.name, form.name),
    logout: () => logout(form.name, form.name),
    submit: () => form.submit({
      endpoint: form.name,
      method: pk ? 'PATCH' : 'POST',
    }, false)
      .then(res => {
        closeModalForm()
        return res
      }),
    cancel: () => {
      closeModalForm()
      return Promise.resolve()
    },
    remove: () => form.submit({
      endpoint: form.name,
      method: 'DELETE',
    }, false)
      .then(res => {
        closeModalForm()
        return res
      }),
  }

  return (
    <div
      className={classNames(modalStyles.overlay, modalStyles[modalType])}
      onClick={onOverlayClick}
      ref={modalOverlay}
    >
      <FormContext.Provider value={formContext}>
        <Block
          innerRef={innerRef}
          style={style}
          className={classNames(modalStyles.modal, className, modalStyles[modalType])}
        >
          {children}
        </Block>
      </FormContext.Provider>
    </div>
  )
}

export default ModalForm
