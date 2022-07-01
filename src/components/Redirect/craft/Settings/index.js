/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput } from '$trood/components'

const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <>
      <TInput.default {...{
        label: 'From',
        value: props.from,
        onChange: value => {
          setProp((props) => {
            props.from = value
          })
        },
      }} />
      <TInput.default {...{
        label: 'To',
        value: props.to,
        onChange: value => {
          setProp((props) => {
            props.to = value
          })
        },
      }} />
      <TCheckbox.default {...{
        label: 'Exact',
        value: props.exact,
        onChange: value => setProp((props) => props.exact = value),
      }} />
    </>
  )
}

export default Settings
