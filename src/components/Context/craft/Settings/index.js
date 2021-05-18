/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TButton } from '$trood/components'


const Settings = ({ openDataSelector }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <TButton.default
      type={TButton.BUTTON_TYPES.text}
      label="Select Data"
      onClick={() => openDataSelector(id, {
        id: props.context?.path,
        values: {
          path: props.context?.path,
        },
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
