/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { TSelect, TInput, TButton } from '$trood/components'

import styles from './index.module.css'

import { IMAGE_FIT } from '../../constants'

import { stringifyValue } from '../../../helpers'


const Settings = ({ openDataSelector }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  const defaultType = typeof props.imageUrl === 'object' ? 'data' : 'static'
  const [type, setType] = useState(defaultType)

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
      <div>
        <div className={styles.tabs}>
          <div
            className={type === 'static' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.imageUrl = undefined)
              setType('static')
            }}
          >
            Static
          </div>
          <div
            className={type === 'data' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.imageUrl = undefined)
              setType('data')
            }}
          >
            From Data
          </div>
        </div>
        {type === 'static' && (
          <TInput.default {...{
            ...inputProps({
              label: 'Image Url',
              key: 'imageUrl',
            }),
          }} />
        )}
        {type === 'data' && (
          <TButton.default
            type={TButton.BUTTON_TYPES.text}
            specialType={TButton.BUTTON_SPECIAL_TYPES.data}
            label="Select Data"
            onClick={() => openDataSelector(id, {
              id: stringifyValue(props.imageUrl),
              title: 'Image URL property',
              values: props.imageUrl,
              onSubmit: value => {
                setProp((props) => {
                  props.imageUrl = value
                })
              },
            })}
          />
        )}
      </div>
      <TSelect.default {...{
        ...selectProps({
          label: 'Image fit',
          key: 'fit',
          items: Object.values(IMAGE_FIT).map(value => ({ value })),
        }),
      }} />
    </>
  )
}

export default Settings
