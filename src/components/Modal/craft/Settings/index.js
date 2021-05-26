import React from 'react'
import { useNode } from '@craftjs/core'

import { TSelect, TInput, TCheckbox } from '$trood/components'

import { MODAL_TYPES } from '../../constants'
import { cssMeasurementUnits } from '../../../../constants'

import styles from './index.module.css'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const selectProps = ({ label, key, items }) => ({
    label,
    items,
    values: props[key] ? [props[key]] : [],
    onChange: vals => setProp((props) => props[key] = vals[0]),
  })

  const inputProps = ({ label, key, type }) => ({
    label,
    type,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  return (
    <>
      <TSelect.default {...{
        ...selectProps({
          label: 'Type',
          key: 'type',
          items: Object.values(MODAL_TYPES).map(value => ({ value })),
        }),
      }} />
      {props.type !== MODAL_TYPES.full && (
        <div className={styles.fieldContainer}>
          <TInput.default {...{
            ...inputProps({
              label: 'Width',
              key: 'width',
              type: 'int',
            }),
          }} />
          <TSelect.default {...{
            ...selectProps({
              key: 'widthUnits',
              items: cssMeasurementUnits.map(value => ({ value })),
            }),
          }} />
        </div>
      )}
      <TCheckbox.default {...{
        label: 'Close on overlay click',
        value: props.closeOnOverlayClick,
        onChange: value => {
          setProp((props) => {
            props.closeOnOverlayClick = value
          })
        },
      }} />
    </>
  )
}

export default Settings
