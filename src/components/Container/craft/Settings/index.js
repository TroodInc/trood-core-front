import React from 'react'
import { useNode } from '@craftjs/core'
import { TSelect, TCheckbox } from '$trood/components'


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

const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  return (
    <React.Fragment>
      <TSelect.default {...{
        label: 'Direction',
        placeHolder: 'Not Set',
        items: [
          { label: 'Column', value: 'column' },
          { label: 'Row', value: 'row' },
        ],
        values: props.style?.flexDirection ? [props.style?.flexDirection] : [],
        onChange: (vals) => setProp(setStyle('flexDirection', vals[0])),
      }} />
      <TCheckbox.default {...{
        label: 'Wrap',
        value: props.style?.flexWrap === 'wrap',
        onChange: value => setProp(setStyle('flexWrap', value ? 'wrap' : 'nowrap')),
      }} />
      <TSelect.default {...{
        label: props.style?.flexDirection === 'column' ? 'Horizontal Align' : 'Vertical Align',
        placeHolder: 'Not Set',
        items: [
          { label: 'Start', value: 'flex-start' },
          { label: 'End', value: 'flex-end' },
          { label: 'Center', value: 'center' },
        ],
        values: props.style?.alignItems ? [props.style?.alignItems] : [],
        onChange: (vals) => setProp(setStyle('alignItems', vals[0])),
      }} />
      <TSelect.default {...{
        label: props.style?.flexDirection === 'column' ? 'Vertical Align' : 'Horizontal Align',
        placeHolder: 'Not Set',
        items: [
          { label: 'Start', value: 'flex-start' },
          { label: 'End', value: 'flex-end' },
          { label: 'Center', value: 'center' },
          { label: 'Space Around', value: 'space-around' },
          { label: 'Space Between', value: 'space-between' },
        ],
        values: props.style?.justifyContent ? [props.style?.justifyContent] : [],
        onChange: (vals) => setProp(setStyle('justifyContent', vals[0])),
      }} />
    </React.Fragment>
  )
}

export default Settings
