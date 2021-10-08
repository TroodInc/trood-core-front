import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useObserver } from 'mobx-react-lite'

import FormContext from 'core/FormContext'
import { useForm, useData } from './useForm'
import { FORM_TYPES } from './constants'
import transform from './transform'

import modalStyles from '../Modal/index.module.css'
import { MODAL_TYPES } from '../Modal/constants'

import Block from '../Block'
import { cssMeasurementUnits } from '../../constants'


const Form = ({
  className,
  formType,
  baseUrl,
  pk,
  defaultValues,
  editValues,
  modalCloseOnOverlayClick,
  modalType,
  modalWidth,
  modalWidthUnits,
  innerRef,
  children,
}) => {
  const $data = useData()
  const form = useForm({
    baseUrl,
    pk,
    defaultValues,
    editValues,
  })
  const modalOverlay = useRef()

  return useObserver(() => {
    if (!form) return null

    const baseFormContext = {
      $apiName: form.$apiName,
      $modelName: form.$modelName,
      $pk: form.$pk,
      data: form.data,
      errors: form.errors,
      name: form.name,
      hasErrors: form.hasErrors,
      changeFields: form.changeFields,
      changeFieldsErrors: form.changeFieldsErrors,
    }

    const { login } = $data?.$auth || {}

    if (formType === FORM_TYPES.modal) {
      const isModalOpen = $data?.$page?.isModalOpen(baseUrl)
      const closeModalForm = () => $data?.$page?.closeModalForm(baseUrl)

      if (!isModalOpen) return null

      const cancel = () => {
        form?.remove && form.remove()
        closeModalForm()
      }

      const onOverlayClick = (event) => {
        if (modalCloseOnOverlayClick && event.target === modalOverlay.current) cancel()
      }

      const style = {
        width: modalType === MODAL_TYPES.full ? '100%' : `${modalWidth}${modalWidthUnits}`,
        height: modalType === MODAL_TYPES.full ? '100%' : undefined,
      }

      const formContext = {
        ...baseFormContext,
        login: () => login(form.name, form.name),
        submit: () => {
          form.submit({
            endpoint: form.name,
            method: pk ? 'PATCH' : 'POST',
          }, true).then(closeModalForm)
        },
        cancel,
        remove: () => {
          form.submit({
            endpoint: form.name,
            method: 'DELETE',
          }, true).then(closeModalForm)
        },
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

    const { goBack } = $data?.$route?.history
    const formContext = {
      ...baseFormContext,
      login: () => login(form.name, form.name),
      submit: () => {
        form.submit({
          endpoint: form.name,
          method: pk ? 'PATCH' : 'POST',
        }, true).then(goBack)
      },
      cancel: () => {
        form.remove()
        goBack()
      },
      remove: () => {
        form.submit({
          endpoint: form.name,
          method: 'DELETE',
        }, true).then(goBack)
      },
    }

    return (
      <div ref={innerRef} className={className}>
        <FormContext.Provider value={formContext}>
          {children}
        </FormContext.Provider>
      </div>
    )
  })
}

Form.propTypes = {
  className: PropTypes.string,
  formType: PropTypes.oneOf(Object.values(FORM_TYPES)),
  baseUrl: PropTypes.string,
  pk: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultValues: PropTypes.object,
  editValues: PropTypes.object,
  modalCloseOnOverlayClick: PropTypes.bool,
  modalType: PropTypes.oneOf(Object.values(MODAL_TYPES)),
  modalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  modalWidthUnits: PropTypes.oneOf(cssMeasurementUnits),
  children: PropTypes.node,
}

Form.defaultProps = {
  formType: FORM_TYPES.page,
  modalWidth: 320,
  modalWidthUnits: cssMeasurementUnits[0],
  modalType: MODAL_TYPES.center,
  modalCloseOnOverlayClick: true,
}

Form.transformFunctions = transform

export default Form
