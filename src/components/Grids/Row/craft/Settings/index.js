/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput } from '$trood/components'

import styles from './index.module.css'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

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
      <TCheckbox.default {...{
        ...checkboxProps({ label: 'No Gutters', key: 'noGutters' }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({ label: 'Empty block styles', key: 'visualHelp' }),
      }} />
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
