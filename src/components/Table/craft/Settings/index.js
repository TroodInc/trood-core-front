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
    entity,
    queryOptions,
    pagination: {
      paginationType,
      defaultPageSize,
      pagesControlsCount,
    },
  } = props

  let entityIsApi
  if (entity && entity.path) {
    const entityApiMatch = entity.path.match(/\$store\.apis\.([a-z0-9\-_]+)\.([a-z0-9\-_]+)$/)
    if (entityApiMatch) {
      entityIsApi = entityApiMatch[1] !== 'default' && entityApiMatch[2] !== 'default'
    }
  }

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
        label="Select Data"
        onClick={() => openDataSelector(id, {
          id: props.entity?.path,
          values: {
            path: props.entity?.path,
          },
          onSubmit: value => {
            setProp((props) => {
              props.entity = value
            })
          },
        })}
      />
      {entityIsApi && (
        <React.Fragment>
          <TLabel.default label="Query Options" />
          <JsonEditor.default {...{
            value: queryOptions,
            mode: JsonEditor.MODES.code,
            onChange: vals => setProp((props) => props.queryOptions = vals),
          }} />
          <TSelect.default {...{
            label: 'Pagination Type',
            items: Object.values(PAGINATION_TYPES).map(value => ({ value })),
            values: paginationType ? [paginationType] : [],
            onChange: vals => setProp((props) => props.pagination.paginationType = vals[0]),
          }} />
          {paginationType && paginationType !== PAGINATION_TYPES.disabled && (
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
        </React.Fragment>
      )}
    </>
  )
}

export default Settings
