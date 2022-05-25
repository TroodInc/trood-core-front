/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput, TButton } from '$trood/components'

import { stringifyValue } from '../../../helpers'

import styles from './index.module.css'


const Settings = ({ openDataSelector }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const defaultType = typeof props.to === 'object' ? 'data' : 'static'
  const [type, setType] = useState(defaultType)

  return (
    <>
      <div>
        <div className={styles.tabs}>
          <div
            className={type === 'static' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.to = '/')
              setType('static')
            }}
          >
            Static Link
          </div>
          <div
            className={type === 'data' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.to = {})
              setType('data')
            }}
          >
            From Data
          </div>
        </div>
        {type === 'static' && (
          <TInput.default {...{
            label: 'To',
            value: props.to,
            onChange: value => {
              setProp((props) => {
                props.to = value
              })
            },
          }} />
        )}
        {type === 'data' && (
          <TButton.default
            type={TButton.BUTTON_TYPES.text}
            specialType={TButton.BUTTON_SPECIAL_TYPES.data}
            label="Select Data"
            onClick={() => openDataSelector(id, {
              id: stringifyValue(props.to),
              title: 'Link To property',
              values: props.to,
              onSubmit: value => {
                setProp((props) => {
                  props.to = value
                })
              },
            })}
          />
        )}
      </div>
      <TCheckbox.default {...{
        label: 'Replace',
        value: props.replace,
        onChange: value => {
          setProp((props) => {
            props.replace = value
          })
        },
      }} />
    </>
  )
}

export default Settings
