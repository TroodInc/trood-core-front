/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import Typography from '../../index'
import { useNode } from '@craftjs/core'
import { TCheckbox, TSelect, TButton, TInput } from '$trood/components'

import { fontList } from 'fonts'


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
        specialType={TButton.BUTTON_SPECIAL_TYPES.data}
        label="Select Data"
        onClick={() => openDataSelector(id, {
          id: props.value?.$data,
          values: props.value,
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
      <TSelect.default {...{
        type: TSelect.SELECT_TYPES.filterDropdown,
        label: 'Font',
        items: fontList.map(value => ({ value })),
        values: props.font ? [props.font] : [],
        placeHolder: 'inherit',
        onChange: vals => setProp((props) => {
          props.font = vals[0]
        }),
      }} />
      <TInput.default {...{
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
