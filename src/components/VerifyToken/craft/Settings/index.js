/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import Typography from '../../index'
import { useNode } from '@craftjs/core'
import { TCheckbox, TSelect, TButton, TInput } from '$trood/components'

import { stringifyValue } from '../../../helpers'

import { fontList } from 'fonts'


const setStyle = (field, value) => props => {
  let val = value
  if (typeof val === 'string' && val.replace(/[\d\-.]/g, '').length === 0) {
    val = +val
  }

  props.style = {
    ...props.style,
    [field]: val,
  }
}

const Settings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <React.Fragment>
      <TInput.default {...{
        label: 'Endpoint',
        value: props.endpoint,
        onChange: val => setProp((props) => props.endpoint = val),
      }} />
    </React.Fragment>
  )
}

export default Settings
