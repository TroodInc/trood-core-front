import React, { useEffect } from 'react'

import FormContext from 'core/FormContext'


const InlineForm = ({
  className,
  pk,
  innerRef,
  children,
  $data,
  form,
  baseFormContext,
  onClose,
  afterCreate,
}) => {
  useEffect(() => onClose, [])

  const { login } = $data?.$auth || {}

  const formContext = {
    ...baseFormContext,
    login: () => login(form.name, form.name),
    submit: () => form.submit({
      endpoint: form.name,
      method: pk ? 'PATCH' : 'POST',
    }, false)
      .then(res => {
        if (!pk) afterCreate()
        return res
      }),
    cancel: () => {
      form.remove()
    },
    remove: () => form.submit({
      endpoint: form.name,
      method: 'DELETE',
    }, false),
  }

  return (
    <div ref={innerRef} className={className}>
      <FormContext.Provider value={formContext}>
        {children}
      </FormContext.Provider>
    </div>
  )
}

export default InlineForm
