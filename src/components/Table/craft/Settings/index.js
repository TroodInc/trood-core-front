/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TLabel, JsonEditor, TSelect, TInput } from '$trood/components'

import styles from './index.module.css'
import { PAGINATION_TYPES } from '../../../internal/Paginator'


const Settings = () => {
  const { actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))
  const { 
    entity,
    queryOptions,
    pagination: {
      paginationType,
      defaultPageSize,
      pagesControlsCount,
    },
  } = props

  return (
    <div>
      <TLabel.default label="Data Selector" />
      <JsonEditor.default {...{
        className: styles.jsonEditor,
        value: entity,
        mode: JsonEditor.MODES.code,
        onChange: vals => setProp((props) => props.entity = vals),
      }} />
      <TLabel.default label="Query Options" />
      <JsonEditor.default {...{
        className: styles.jsonEditor,
        value: queryOptions,
        mode: JsonEditor.MODES.code,
        onChange: vals => setProp((props) => props.queryOptions = vals),
      }} />
      <TSelect.default {...{
        className: styles.select,
        label: 'Pagination Type',
        items: Object.values(PAGINATION_TYPES).map(value => ({ value })),
        values: paginationType ? [paginationType] : [],
        onChange: vals => setProp((props) => props.pagination.paginationType = vals[0]),
      }} />
      {paginationType && paginationType !== PAGINATION_TYPES.disabled && (
        <React.Fragment>
          <TInput.default {...{
            className: styles.select,
            label: 'Page Size',
            type: TInput.INPUT_TYPES.int,
            value: defaultPageSize,
            onChange: val => setProp((props) => props.pagination.defaultPageSize = val),
          }} />
          <TInput.default {...{
            className: styles.select,
            label: 'Page Controls Count',
            type: TInput.INPUT_TYPES.int,
            value: pagesControlsCount,
            onChange: val => setProp((props) => props.pagination.pagesControlsCount = val),
          }} />
        </React.Fragment>
      )}
    </div>
  )
}

export default Settings
