/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput, TSelect } from '$trood/components'


const Settings = ({
  emApplicationFragmentEntities,
  applicationCurrentFragment,
  currentApplicationId,
}) => {
  const {
    actions: { setProp, setCustom },
    props,
    custom,
  } = useNode((node) => ({
    props: node.data.props,
    custom: node.data.custom,
  }))

  const inputProps = ({ label, key }) => ({
    label,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  const checkboxProps = ({ label, key }) => ({
    label,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  const fragmentAlias = (custom.chunk || '').replace(/^fragments\//, '').replace(/\.json$/, '')
  const fragmentArray = emApplicationFragmentEntities.getArray({
    filter: {
      rql: `eq(application,${currentApplicationId}),not(eq(id,${applicationCurrentFragment}))`,
    },
  })

  return (
    <>
      <TInput.default {...{
        ...inputProps({
          label: 'Title',
          key: 'title',
        }),
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Path',
          key: 'path',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Exact',
          key: 'exact',
        }),
      }} />
      <TSelect.default {...{
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
    </>
  )
}

export default Settings
