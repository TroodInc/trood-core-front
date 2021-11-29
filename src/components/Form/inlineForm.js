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
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        form.clearForm()
        return res
      }),
    cancel: () => {
      form.clearForm()
      return Promise.resolve()
    },
    remove: () => form.submit({
      endpoint: form.name,
      method: 'DELETE',
    }, false)
      .then(res => {
        form.clearForm()
        return res
      }),
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
