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
  onError,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onClose, [])

  const { login, logout } = $data?.$auth || {}

  const formContext = {
    ...baseFormContext,
    login: () => login(form.name, form.name)
      .catch(onError),
    logout: () => logout(form.name, form.name)
      .catch(onError),
    submit: () => form.submit({
      endpoint: form.name,
      method: pk ? 'PATCH' : 'POST',
    }, false)
      .then(res => {
        form.clearForm()
        return res
      })
      .catch(onError),
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
      })
      .catch(onError),
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
