/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TButton } from '$trood/components'
import styles from './index.module.css'

import { stringifyValue } from '../../../helpers'


const Settings = ({ openDataSelector }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <>
      <div className={styles.info}>
        Equivalent of false is: <b>false, empty string, 0, null</b>. Other values is equivalent of true.
      </div>
      <TButton.default
        type={TButton.BUTTON_TYPES.text}
        specialType={TButton.BUTTON_SPECIAL_TYPES.data}
        label="Select Value"
        onClick={() => openDataSelector(id, {
          id: stringifyValue(props.value),
          title: 'Value property',
          values: props.value,
          onSubmit: value => {
            setProp((props) => {
              props.value = value
            })
          },
        })}
      />
    </>
  )
}

export default Settings
