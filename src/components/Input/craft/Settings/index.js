/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { set, get } from 'lodash'
import { TCheckbox, TSelect, TInput } from '$trood/components'

import { INPUT_TYPES } from '../../constants'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const checkboxProps = ({ label, key }) => ({
    label,
    value: get(props, key),
    onChange: value => setProp((props) => set(props, key, value)),
  })

  const inputProps = ({ label, key, type }) => ({
    label,
    type,
    value: get(props, key),
    onChange: value => setProp((props) => set(props, key, value)),
  })

  return (
    <>
      <TSelect.default {...{
        label: 'Input type',
        items: Object.values(INPUT_TYPES).map(value => ({ value })),
        values: props.type ? [props.type] : [],
        onChange: vals => setProp((props) => props.type = vals[0]),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Label',
          key: 'label',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Placeholder',
          key: 'placeholder',
        }),
      }} />
      <TCheckbox.default {...{
        ...inputProps({
          label: 'Required',
          key: 'validate.required',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Maximum value length',
          key: 'validate.maxLen',
          type: INPUT_TYPES.int,
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Minimum value length',
          key: 'validate.minLen',
          type: INPUT_TYPES.int,
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Check on blur',
          key: 'validate.checkOnBlur',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Autofocus',
          key: 'autofocus',
        }),
      }} />
    </>
  )
}

export default Settings
