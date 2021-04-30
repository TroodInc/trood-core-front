/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput, TButton } from '$trood/components'

import styles from './index.module.css'


const Settings = ({ openDataSelector }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const defaultType = typeof props.to === 'object' ? 'data' : 'static'
  const [type, setType] = useState(defaultType)

  return (
    <div>
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
            className: styles.input,
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
            className={styles.dataSelectorButton}
            type={TButton.BUTTON_TYPES.text}
            label="Select Data"
            onClick={() => openDataSelector(id, {
              id: props.to?.path,
              values: {
                path: props.to?.path,
              },
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
    </div>
  )
}

export default Settings
