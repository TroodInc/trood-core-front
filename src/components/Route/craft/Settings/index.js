/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput } from '$trood/components'

import styles from './index.module.css'


const Settings = () => {
  const {
    actions: { setProp, setCustom },
    props,
    custom,
  } = useNode((node) => ({
    props: node.data.props,
    custom: node.data.custom,
  }))
  const customChunkConstant = 'custodian/data/page/'

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
          label: 'Title',
          key: 'title',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Path',
          key: 'path',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Exact',
          key: 'exact',
        }),
      }} />
      <TInput.default {...{
        className: styles.input,
        label: 'Chunk',
        value: (custom.chunk || '').replace(customChunkConstant, ''),
        onChange: value => setCustom(
          (custom) => (custom.chunk = `${customChunkConstant}${value}`),
          1000,
        ),
      }} />
    </div>
  )
}

export default Settings
