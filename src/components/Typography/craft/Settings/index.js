/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
import Typography from '../../index'
import { useNode } from '@craftjs/core'
import { TCheckbox, TSelect, TButton } from '$trood/components'

import styles from './index.module.css'

const Settings = () => {
  const {
    actions: { setProp },
    props,
    custom: { DataSelector },
  } = useNode((node) => ({ props: node.data.props, custom: node.data.custom }))
  const [isDataSelectorOpen, setIsDataSelectorOpen] = useState(false)
  return (
    <div>
      <TSelect.default
        {...{
          className: styles.select,
          label: 'Type',
          items: Object.keys(Typography.knownTypes).map((value) => ({ value })),
          values: props.type ? [props.type] : [],
          onChange: (vals) =>
            setProp((props) => {
              props.type = vals[0]
            }),
        }}
      />
      <TCheckbox.default
        {...{
          label: 'Bold',
          value: props.bold,
          onChange: (value) => {
            setProp((props) => {
              props.bold = value
            })
          },
        }}
      />
      <TButton.default
        className={styles.dataSelectorButton}
        type={TButton.BUTTON_TYPES.text}
        label="Insert Data"
        onClick={() => setIsDataSelectorOpen(true)}
      />
      {DataSelector?.$$typeof && (
        <DataSelector
          isOpen={isDataSelectorOpen}
          onClose={() => setIsDataSelectorOpen(false)}
          $context={props.$context}
          onDataSelect={(val) => {
            setProp((props) => {
              props.value = val
            })
          }

          }
        />
      )}
    </div>
  )
}

export default Settings
