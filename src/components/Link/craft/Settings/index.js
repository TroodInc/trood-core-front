/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput } from '$trood/components'

import styles from './index.module.css'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <div>
      <TInput.default {...{
        className: styles.input,
        label: 'To',
        value: props.to,
        onChange: value => {
          setProp((props) => {
            props.to = value
          })
        },
      }} />
      <TCheckbox.default {...{
        label: 'Replace',
        value: props.replace,
        onChange: value => {
          setProp((props) => {
            props.replace = value
          })
        },
      }} />
    </div>
  )
}

export default Settings
