/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { get, set } from 'lodash'
import { TCheckbox, TSelect, TInput } from '$trood/components'

import { CHECK_VIEW_TYPES, CHECK_COLORS } from '../../constants'
import { LABEL_POSITION_TYPES } from '../../../internal/EnchancedSwitch'

import styles from './index.module.css'


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

  return (
    <div className={styles.root}>
      <TSelect.default {...{
        ...selectProps({
          label: 'View Type',
          key: 'viewType',
          items: Object.values(CHECK_VIEW_TYPES).map(value => ({ value })),
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Color',
          key: 'color',
          items: Object.values(CHECK_COLORS).map(value => ({ value })),
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
    </div>
  )
}

export default Settings