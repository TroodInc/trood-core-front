/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'

import { TInput } from '$trood/components'


const Settings = ({ openDataSelector }) => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <>
      <TInput.default {...{
        label: 'Component Url',
        value: props.url,
        onChange: value => setProp((props) => { props.url = value }),
      }} />
    </>
  )
}

export default Settings
