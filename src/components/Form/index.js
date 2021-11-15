import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useObserver } from 'mobx-react-lite'

import { useForm, useData } from './useForm'
import { FORM_TYPES } from './constants'
import transform from './transform'

import ModalForm from './modalForm'
import InlineForm from './inlineForm'

import { MODAL_TYPES } from '../Modal/constants'

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
  afterCreate = () => {},
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

    if (formType === FORM_TYPES.modal) {
      return (
        <ModalForm {...{
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
          onClose: form.remove,
          afterCreate,
        }} />
      )
    }

    return (
      <InlineForm {...{
        className,
        pk,
        innerRef,
        children,
        $data,
        form,
        baseFormContext,
        onClose: form.remove,
        afterCreate,
      }} />
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
