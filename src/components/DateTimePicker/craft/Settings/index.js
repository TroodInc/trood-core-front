/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode, useEditor } from '@craftjs/core'
import { get, set } from 'lodash'
import { TCheckbox, TSelect, TInput, TDateTimePicker, TButton } from '$trood/components'

import { PICKER_TYPES, CALENDAR_POSITIONS } from '../../constants'

import { getIsNodeInNode, stringifyValue } from '../../../helpers'


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

  const inputProps = ({ label, key, type }) => ({
    label,
    type,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  const datePickerProps = ({ label, key }) => ({
    calendarPosition: TDateTimePicker.CALENDAR_POSITIONS.right,
    label,
    type: TDateTimePicker.PICKER_TYPES.date,
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
              title: 'On Change Event',
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
              id: stringifyValue(props.value),
              title: 'Value property',
              values: props.value,
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
        ...selectProps({
          label: 'Picker type',
          key: 'type',
          items: Object.values(PICKER_TYPES).map(value => ({ value })),
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Calendar position',
          key: 'calendarPosition',
          items: Object.values(CALENDAR_POSITIONS).map(value => ({ value })),
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Label',
          key: 'label',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Time label',
          key: 'timeLabel',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Placeholder',
          key: 'placeholder',
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
          label: 'Date required',
          key: 'validate.dateRequired',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Time required',
          key: 'validate.timeRequired',
        }),
      }} />
      <TDateTimePicker.default {...{
        ...datePickerProps({
          label: 'Min date',
          key: 'validate.minDate',
        }),
      }} />
      <TDateTimePicker.default {...{
        ...datePickerProps({
          label: 'Max date',
          key: 'validate.maxDate',
        }),
      }} />
    </>
  )
}

export default Settings
