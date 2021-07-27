/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TSelect, TInput, TButton } from '$trood/components'

import { BUTTON_TYPES, BUTTON_SPECIAL_TYPES, BUTTON_COLORS } from '../../constants'


const Settings = ({ openEventConstructor }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const selectProps = ({ label, key, items }) => ({
    label,
    items,
    values: props[key] ? [props[key]] : [],
    onChange: vals => setProp((props) => props[key] = vals[0]),
  })

  const checkboxProps = ({ label, key }) => ({
    label,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  const inputProps = ({ label, key, type }) => ({
    label,
    type,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  return (
    <>
      <TButton.default
        type={TButton.BUTTON_TYPES.text}
        specialType={TButton.BUTTON_SPECIAL_TYPES.action}
        label="On Click"
        onClick={() => openEventConstructor(id, {
          values: props.onClick,
          onSubmit: value => {
            setProp((props) => {
              props.onClick = value
            })
          },
        })}
      />
      <TInput.default {...{
        ...inputProps({
          label: 'Label',
          key: 'label',
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Type',
          key: 'type',
          items: Object.values(BUTTON_TYPES).map(value => ({ value })),
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Special Type',
          key: 'specialType',
          items: Object.values(BUTTON_SPECIAL_TYPES).map(value => ({ value })),
        }),
        clearable: true,
        placeHolder: 'Not Set',
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Color',
          key: 'color',
          items: Object.values(BUTTON_COLORS).map(value => ({ value })),
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Thin',
          key: 'thin',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Disabled',
          key: 'disabled',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Tab Index',
          type: 'int',
          key: 'tabIndex',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Link address',
          type: 'url',
          key: 'link',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Tooltip',
          key: 'tooltip',
        }),
      }} />
    </>
  )
}

export default Settings
