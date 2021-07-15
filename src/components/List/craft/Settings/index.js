/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode } from '@craftjs/core'
import { TLabel, JsonEditor, TSelect, TInput, TButton } from '$trood/components'

import { PAGINATION_TYPES, FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT } from '../../../internal/Paginator'


const Settings = ({ openDataSelector }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  const {
    entity,
    queryOptions,
    pagination: {
      paginationType,
      defaultPageSize,
      pagesControlsCount,
      flexDirection,
      alignItems,
      justifyContent,
    },
  } = props
  const isRow = flexDirection === FLEX_DIRECTION.row
  const alignmentItems = isRow => (isRow ? JUSTIFY_CONTENT : ALIGN_ITEMS)
  const alignmentKey = isRow => (isRow ? 'justifyContent': 'alignItems')
  const alignmentValue = isRow => (isRow ? justifyContent: alignItems)

  let entityIsApi
  if (entity && entity.path) {
    const entityApiMatch = entity.path.match(/\$store\.apis\.([a-z0-9\-_]+)\.([a-z0-9\-_]+)$/)
    if (entityApiMatch) {
      entityIsApi = entityApiMatch[1] !== 'default' && entityApiMatch[2] !== 'default'
    }
  }

  return (
    <>
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
        label: 'Direction',
        items: Object.values(FLEX_DIRECTION).map(value => ({ value })),
        values: flexDirection ? [flexDirection] : [],
        onChange: vals => setProp((props) => props.pagination.flexDirection = vals[0]),
      }} />
      <TSelect.default {...{
        label: 'Vertical Align',
        items: Object.values(alignmentItems(isRow)).map(value => ({ value })),
        values: alignmentValue(isRow) ? [alignmentValue(isRow)] : [],
        onChange: vals => setProp((props) => props.pagination[alignmentKey(isRow)] = vals[0]),
      }} />
      <TSelect.default {...{
        label: 'Horizontal Align',
        items: Object.values(alignmentItems(!isRow)).map(value => ({ value })),
        values: alignmentValue(!isRow) ? [alignmentValue(!isRow)] : [],
        onChange: vals => setProp((props) => props.pagination[alignmentKey(!isRow)] = vals[0]),
      }} />
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
