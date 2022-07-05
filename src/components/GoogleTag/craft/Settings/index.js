/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TInput } from '$trood/components'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <>
      <TInput.default {...{
        label: 'Google Tag Id',
        value: props.gtmId,
        onChange: value => {
          setProp((props) => {
            props.gtmId = value
          })
        },
      }} />
    </>
  )
}

export default Settings
