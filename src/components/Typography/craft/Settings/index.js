/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import Typography from '../../index'
import { useNode } from '@craftjs/core'
import { TCheckbox, TSelect, TButton } from '$trood/components'

import styles from './index.module.css'


const Settings = () => {
  const {
    id,
    actions: { setProp },
    props,
    custom,
  } = useNode((node) => ({
    props: node.data.props,
    custom: node.data.custom,
  }))

  return (
    <div>
      <TButton.default
        className={styles.dataSelectorButton}
        type={TButton.BUTTON_TYPES.text}
        label="Select Data"
        onClick={() => custom.openDataSelector(id, {
          id: props.value?.path,
          values: {
            path: props.value?.path,
          },
          onSubmit: value => {
            setProp((props) => {
              props.value = value
            })
          },
        })}
      />
      <TSelect.default {...{
        className: styles.select,
        label: 'Type',
        items: Object.keys(Typography.knownTypes).map(value => ({ value })),
        values: props.type ? [props.type] : [],
        onChange: vals => setProp((props) => {
          props.type = vals[0]
        }),
      }} />
      <TCheckbox.default {...{
        label: 'Bold',
        value: props.bold,
        onChange: value => {
          setProp((props) => {
            props.bold = value
          })
        },
      }} />
    </div>
  )
}

export default Settings
