/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import HtmlTags from '../../index'
import { useNode } from '@craftjs/core'
import { TSelect, JsonEditor } from '$trood/components'

import styles from './index.module.css'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))
  const { tag, ...other } = props

  return (
    <div>
      <TSelect.default {...{
        className: styles.select,
        label: 'Tag Name',
        items: HtmlTags.knownTags.map(value => ({ value })),
        values: tag ? [tag] : [],
        onChange: vals => setProp((props) => {
          props.tag = vals[0]
        }),
      }} />
      <JsonEditor.default {...{
        className: styles.jsonEditor,
        value: other,
        mode: JsonEditor.MODES.code,
        onChange: vals => setProp((props) => {
          Object.keys(vals).forEach(key => {
            if (key !== 'tag') {
              props[key] = vals[key]
            }
          })
        }),
      }} />
    </div>
  )
}

export default Settings
