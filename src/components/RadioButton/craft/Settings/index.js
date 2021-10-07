/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode, useEditor } from '@craftjs/core'
import { get, set } from 'lodash'
import { TCheckbox, TSelect, TInput, TButton } from '$trood/components'

import { RADIO_SIZES, RADIO_COLORS } from '../../constants'
import { LABEL_POSITION_TYPES } from '../../../internal/EnchancedSwitch'

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

  const selectProps = ({ label, key, items }) => ({
    label,
    items,
    values: props[key] ? [props[key]] : [],
    onChange: vals => setProp((props) => props[key] = vals[0]),
  })

  const checkboxProps = ({ label, key }) => ({
    label,
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
      <TInput.default {...{
        label: 'Value of Radio Button',
        value: props.radioButtonValue,
        onChange: value => setProp((props) => props.radioButtonValue = value),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Size',
          key: 'size',
          items: Object.values(RADIO_SIZES).map(value => ({ value })),
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Color',
          key: 'color',
          items: Object.values(RADIO_COLORS).map(value => ({ value })),
        }),
      }} />
      <TInput.default {...{
        label: 'Label',
        value: props.label,
        onChange: value => setProp((props) => props.label = value),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Label Position',
          key: 'labelPosition',
          items: Object.values(LABEL_POSITION_TYPES).map(value => ({ value })),
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Required',
          key: 'validate.required',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Check on blur',
          key: 'validate.checkOnBlur',
        }),
      }} />
    </>
  )
}

export default Settings
