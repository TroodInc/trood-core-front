/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import SvgTags from '../../index'
import { useNode } from '@craftjs/core'
import { TSelect, JsonEditor } from '$trood/components'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))
  const { tag, ...other } = props

  return (
    <>
      <TSelect.default {...{
        label: 'Tag Name',
        items: SvgTags.knownTags.map(value => ({ value })),
        values: tag ? [tag] : [],
        onChange: vals => setProp((props) => {
          props.tag = vals[0]
        }),
      }} />
      <JsonEditor.default {...{
        value: other,
        mode: JsonEditor.MODES.code,
        onChange: vals => setProp((props) => {
          [...Object.keys(vals), ...Object.keys(props)].forEach(key => {
            if (key !== 'tag') {
              props[key] = vals[key]
            }
          })
        }),
      }} />
    </>
  )
}

export default Settings
