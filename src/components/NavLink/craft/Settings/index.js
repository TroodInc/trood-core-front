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
      <TInput.default {...{
        ...inputProps({
          label: 'Active className',
          key: 'activeClassName',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Aria-current',
          key: 'aria-current',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Exact',
          key: 'exact',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Strict',
          key: 'strict',
        }),
      }} />
    </div>
  )
}

export default Settings
