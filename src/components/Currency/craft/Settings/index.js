/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import Currency from '../../index'
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
        label: 'Trim Value',
        items: [0, 1, 2].map(value => ({ value })),
        values: props.trimCount ? [props.trimCount] : [],
        onChange: vals => setProp((props) => {
          props.trimCount = vals[0]
        }),
      }} />
      <TSelect.default {...{
        type: TSelect.SELECT_TYPES.filterDropdown,
        label: 'Currency',
        items: Object.values(Currency.currencyCodes).map(value => ({ value })),
        values: props.currency ? [props.currency] : [],
        onChange: vals => setProp((props) => {
          props.currency = vals[0]
        }),
      }} />
      <TCheckbox.default {...{
        label: 'Show Sign',
        value: props.showSign,
        onChange: value => {
          setProp((props) => {
            props.showSign = value
          })
        },
      }} />
      {props.showSign && (
        <TSelect.default {...{
          label: 'Sign Type',
          items: Object.values(Currency.currencySignTypes).map(value => ({ value })),
          values: props.currencySignType ? [props.currencySignType] : [],
          onChange: vals => setProp((props) => {
            props.currencySignType = vals[0]
          }),
        }} />
      )}
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
    </React.Fragment>
  )
}

export default Settings
