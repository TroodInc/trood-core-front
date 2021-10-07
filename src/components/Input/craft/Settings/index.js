/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode, useEditor } from '@craftjs/core'
import { set, get } from 'lodash'
import { TCheckbox, TSelect, TInput, TButton } from '$trood/components'

import { INPUT_TYPES } from '../../constants'

import { getIsNodeInNode } from '../../../helpers'


const getIsFormComponent = (id, helper) => getIsNodeInNode(id, helper, ['Form'])

const getValue = (objValue) => {
  if (typeof objValue === 'object') {
    const testStr = objValue?.$data || ''
    const matches = testStr.match(/{{\$form\.data\.(.*)}}/) || []
    return matches[1]
  }
  return objValue
}

const Settings = ({ openEventConstructor, openDataSelector }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))
  const { query: { node: helper } } = useEditor()

  const isFormComponent = getIsFormComponent(id, helper)

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
      {isFormComponent && (
        <TInput.default {...{
          label: 'Field Name',
          value: getValue(props.value),
          onChange: value => setProp((props) => {
            if (value !== undefined) {
              props.value = { $data: `{{$form.data.${value}}}` }
              props.errors = { $data: `{{$form.errors.${value}}}` }
              props.onChange = {
                $action: '$form.changeFields[$arg0]',
                $arg0: {
                  [value]: {
                    $data: '{{$event}}',
                  },
                },
              }
              props.onValid = {
                $action: '$form.changeFieldsErrors[$arg0]',
                $arg0: {
                  [value]: false,
                },
              }
              props.onInvalid = {
                $action: '$form.changeFieldsErrors[$arg0]',
                $arg0: {
                  [value]: {
                    $data: '{{$event}}',
                  },
                },
              }
            } else {
              props.value = undefined
              props.errors = undefined
              props.onChange = undefined
              props.onValid = undefined
              props.onInvalid = undefined
            }
          }),
        }} />
      )}
      {!isFormComponent && (
        <>
          <TButton.default
            type={TButton.BUTTON_TYPES.text}
            specialType={TButton.BUTTON_SPECIAL_TYPES.action}
            label="On Change"
            onClick={() => openEventConstructor(id, {
              values: props.onChange,
              onSubmit: value => {
                setProp((props) => {
                  props.onChange = value
                })
              },
            })}
          />
          <TButton.default
            type={TButton.BUTTON_TYPES.text}
            specialType={TButton.BUTTON_SPECIAL_TYPES.data}
            label="Select Value"
            onClick={() => openDataSelector(id, {
              id: props.value?.$data,
              value: props.value,
              onSubmit: value => {
                setProp((props) => {
                  props.value = value
                })
              },
            })}
          />
        </>
      )}
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
