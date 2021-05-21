/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox } from '$trood/components'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <>
      <TCheckbox.default {...{
        label: 'Rounded',
        value: props.rounded,
        onChange: value => {
          setProp((props) => {
            props.rounded = value
          })
        },
      }} />
      <TCheckbox.default {...{
        label: 'Transparent',
        value: props.transparent,
        onChange: value => {
          setProp((props) => {
            props.transparent = value
          })
        },
      }} />
    </>
  )
}

export default Settings
