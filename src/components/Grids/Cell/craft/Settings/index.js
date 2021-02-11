/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TSelect, TInput } from '$trood/components'

import { SIZES, SIZES_VALUES } from '../../index'

import styles from './index.module.css'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const selectProps = ({ label, key, items }) => ({
    className: styles.select,
    label,
    items,
    values: props[key] ? [props[key]] : [],
    onChange: vals => setProp((props) => props[key] = vals[0]),
  })

  const inputProps = ({ label, key }) => ({
    className: styles.input,
    label,
    type: 'number',
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  const checkboxProps = ({ label, key }) => ({
    className: styles.checkbox,
    label,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  return (
    <div>
      <TSelect.default {...{
        ...selectProps({
          label: 'Size type',
          key: 'sizeType',
          items: SIZES.map(value => ({ value })),
        }),
      }} />
      {props.sizeType && (
        <>
          <TSelect.default {...{
            ...selectProps({
              label: 'Size value',
              key: props.sizeType,
              items: SIZES_VALUES.map(value => ({ value })),
            }),
          }} />
          <TSelect.default {...{
            ...selectProps({
              label: 'Size offset',
              key: `${props.sizeType}Offset`,
              items: SIZES_VALUES.map(value => ({ value })),
            }),
          }} />
          <TCheckbox.default {...{
            ...checkboxProps({ label: 'Hidden', key: `${props.sizeType}Hidden` }),
          }} />
          <TCheckbox.default {...{
            ...checkboxProps({ label: 'Auto', key: `${props.sizeType}Auto` }),
          }} />
        </>
      )}
      <TInput.default {...{
        ...inputProps({
          label: 'Vertical Padding',
          key: 'verticalPadding',
          placeholder: 'Replace all other padding',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Top Padding',
          key: 'topPadding',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Bottom Padding',
          key: 'bottomPadding',
        }),
      }} />
    </div>
  )
}

export default Settings
