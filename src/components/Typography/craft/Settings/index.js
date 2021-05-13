/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import Typography from '../../index'
import { useNode } from '@craftjs/core'
import { TCheckbox, TSelect, TButton, TInput } from '$trood/components'
import styles from '../../../List/craft/Settings/index.module.css'


const setStyle = (field, value) => props => {
  let val = value
  if (typeof val === 'string' && val.replace(/[\d\-.]/g, '').length === 0) {
    val = +val
  }

  props.style = {
    ...props.style,
    [field]: val,
  }
}

const Settings = ({ openDataSelector }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <React.Fragment>
      <TButton.default
        type={TButton.BUTTON_TYPES.text}
        label="Select Data"
        onClick={() => openDataSelector(id, {
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
        label: 'Type',
        items: Object.keys(Typography.knownTypes).map(value => ({ value })),
        values: props.type ? [props.type] : [],
        onChange: vals => setProp((props) => {
          props.type = vals[0]
        }),
      }} />
      <TInput.default {...{
        className: styles.select,
        label: 'Font Size',
        value: props.style?.fontSize,
        onChange: val => setProp(setStyle('fontSize', val)),
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
    </React.Fragment>
  )
}

export default Settings
