/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox } from '$trood/components'

import styles from './index.module.css'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const checkboxProps = ({ label, key }) => ({
    className: styles.checkbox,
    label,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  return (
    <div>
      <TCheckbox.default {...{
        ...checkboxProps({ label: 'Fluid', key: 'fluid' }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({ label: 'Empty block styles', key: 'visualHelp' }),
      }} />
    </div>
  )
}

export default Settings
