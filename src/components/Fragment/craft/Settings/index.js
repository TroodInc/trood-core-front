/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TSelect } from '$trood/components'

import styles from './index.module.css'


const Settings = ({
  emApplicationFragmentEntities,
  applicationCurrentFragment,
  currentApplicationId,
}) => {
  const {
    actions: { setCustom },
    custom,
  } = useNode((node) => ({
    props: node.data.props,
    custom: node.data.custom,
  }))

  const fragmentAlias = (custom.chunk || '').replace(/^fragments\//, '').replace(/\.json$/, '')
  const fragmentArray = emApplicationFragmentEntities.getArray({
    filter: {
      rql: `eq(application,${currentApplicationId})`,
      // ,not(eq(id,${applicationCurrentFragment}))`,
    },
  })

  return (
    <div>
      <TSelect.default {...{
        className: styles.input,
        label: 'Fragment',
        placeHolder: 'Not Set',
        items: fragmentArray.map(item => ({ value: item.alias })),
        values: fragmentAlias ? [fragmentAlias] : [],
        onChange: values => {
          const val = values[0]
          if (val) {
            setCustom((custom) => (custom.chunk = `fragments/${val}.json`))
          } else {
            setCustom((custom) => (custom.chunk = undefined))
          }
        },
      }} />
    </div>
  )
}

export default Settings
