/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TButton } from '$trood/components'

import { stringifyValue } from '../../../helpers'


const Settings = ({ openDataSelector }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <TButton.default
      type={TButton.BUTTON_TYPES.text}
      specialType={TButton.BUTTON_SPECIAL_TYPES.data}
      label="Select Data"
      onClick={() => openDataSelector(id, {
        id: stringifyValue(props.context),
        title: 'Context property',
        values: props.context,
        onSubmit: value => {
          setProp((props) => {
            props.context = value
          })
        },
      })}
    />
  )
}

export default Settings
