import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import moment from 'moment'

import StoreContext from 'core/StoreContext'
import PageStoreContext from 'core/PageStoreContext'
import AuthStoreContext from 'core/AuthStoreContext'
import ContextContext from 'core/ContextContext'
import FormContext from 'core/FormContext'

export const useData = () => {
  // TODO move to core hooks
  const $store = React.useContext(StoreContext)
  const $page = React.useContext(PageStoreContext)
  const $auth = React.useContext(AuthStoreContext)
  const $context = React.useContext(ContextContext)
  const $form = React.useContext(FormContext)

  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const tmpSearchParams = new URLSearchParams(location.search)
  const searchParams = Array.from(tmpSearchParams.keys()).reduce((memo, key) => ({
    ...memo,
    [key]: tmpSearchParams.getAll(key),
  }), {})

  return {
    $store,
    $page,
    $auth,
    $route: { history, params, location, searchParams },
    $context,
    $form,
    $global: {
      window,
      moment,
    },
  }
}

export const useForm = ({
  baseUrl,
  pk,
  defaultValues,
  editValues,
}) => {
  const $data = useData()

  if (!baseUrl) return null

  const queryHashPart = (baseUrl.match(/[?#].*$/) || [])[0] || ''
  let url = baseUrl.replace(queryHashPart, '')
  if (pk) {
    if (baseUrl.lastIndexOf('/') === baseUrl.length - 1) {
      url += `${pk}/`
    } else {
      url += `/${pk}`
    }
  }
  url += queryHashPart

  const values = !pk ? defaultValues : {
    ...defaultValues,
    ...editValues,
  }

  if (!$data?.$store?.forms?.getForm) {
    return {}
  }

  return $data.$store.forms.getForm({
    formName: url,
    values,
  })
}