/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TSelect, TInput } from '$trood/components'

import styles from './index.module.css'

import { IMAGE_FIT, cssMeasurementUnits } from '../../constants'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const selectProps = ({ label, key, items }) => ({
    className: styles.field,
    label,
    items,
    values: props[key] ? [props[key]] : [],
    onChange: vals => setProp((props) => props[key] = vals[0]),
  })

  const inputProps = ({ label, key, type }) => ({
    className: styles.field,
    label,
    type,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  return (
    <div>
      <TInput.default {...{
        ...inputProps({
          label: 'Width',
          key: 'width',
          type: 'int',
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Width units',
          key: 'widthUnits',
          items: cssMeasurementUnits.map(value => ({ value })),
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Height',
          key: 'height',
          type: 'int',
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Height units',
          key: 'heightUnits',
          items: cssMeasurementUnits.map(value => ({ value })),
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Image Url',
          key: 'imageUrl',
        }),
      }} />
      <TSelect.default {...{
        ...selectProps({
          label: 'Image fit',
          key: 'fit',
          items: Object.values(IMAGE_FIT).map(value => ({ value })),
        }),
      }} />
    </div>
  )
}

export default Settings
