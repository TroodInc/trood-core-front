/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { get, set } from 'lodash'
import { TCheckbox, TSelect, TInput, TDateTimePicker } from '$trood/components'

import { PICKER_TYPES, CALENDAR_POSITIONS } from '../../constants'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

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

  const datePickerProps = ({ label, key, type }) => ({
    calendarPosition: TDateTimePicker.CALENDAR_POSITIONS.right,
    label,
    type: TDateTimePicker.PICKER_TYPES.date,
    value: get(props, key),
    onChange: value => setProp((props) => set(props, key, value)),
  })

  return (
    <>
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
