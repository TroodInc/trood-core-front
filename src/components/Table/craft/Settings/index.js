/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TLabel, JsonEditor, TSelect, TInput, TButton } from '$trood/components'

import { PAGINATION_TYPES } from '../../../internal/Paginator'


const Settings = ({ openDataSelector }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  const {
    columns,
    queryOptions,
    pagination: {
      paginationType,
      defaultPageSize,
      pagesControlsCount,
    },
  } = props

  return (
    <>
      <TInput.default {...{
        label: 'Columns',
        type: TInput.INPUT_TYPES.int,
        value: columns,
        onChange: val => setProp((props) => props.columns = val),
      }} />
      <TButton.default
        type={TButton.BUTTON_TYPES.text}
        specialType={TButton.BUTTON_SPECIAL_TYPES.data}
        label="Select Data"
        onClick={() => openDataSelector(id, {
          id: props.entity?.$data,
          values: props.entity,
          onSubmit: value => {
            setProp((props) => {
              props.entity = value
            })
          },
        })}
      />
      <TSelect.default {...{
        label: 'Pagination Type',
        items: Object.values(PAGINATION_TYPES).map(value => ({ value })),
        values: paginationType ? [paginationType] : [],
        onChange: vals => setProp((props) => props.pagination.paginationType = vals[0]),
      }} />
      {paginationType === PAGINATION_TYPES.classic && (
        <React.Fragment>
          <TInput.default {...{
            label: 'Page Size',
            type: TInput.INPUT_TYPES.int,
            value: defaultPageSize,
            onChange: val => setProp((props) => props.pagination.defaultPageSize = val),
          }} />
          <TInput.default {...{
            label: 'Page Controls Count',
            type: TInput.INPUT_TYPES.int,
            value: pagesControlsCount,
            onChange: val => setProp((props) => props.pagination.pagesControlsCount = val),
          }} />
        </React.Fragment>
      )}
    </>
  )
}

export default Settings
