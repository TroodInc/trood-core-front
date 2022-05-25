/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode, useEditor } from '@craftjs/core'
import { TSelect, TInput, TButton, TCheckbox } from '$trood/components'

import { getIsNodeInNode, stringifyValue } from '../../../helpers'

import { PAGINATION_TYPES } from '../../../internal/Paginator'


const getIsFormComponent = (id, helper) => getIsNodeInNode(id, helper, ['Form'])

const getValue = (objValue) => {
  if (typeof objValue === 'object') {
    const testStr = objValue?.$data || ''
    const matches = testStr.match(/{{\$form\.data\.(.*)}}/) || []
    return matches[1]
  }
  return objValue
}

const Settings = ({ openDataSelector, openEventConstructor }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))
  const { query: { node: helper } } = useEditor()

  const isFormComponent = getIsFormComponent(id, helper)

  const {
    checked,
    checkedValuePath,
    columns,
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
          id: stringifyValue(props.entity),
          title: 'Items property',
          values: props.entity,
          onSubmit: value => {
            setProp((props) => {
              props.entity = value
            })
          },
        })}
      />
      <TCheckbox.default {...{
        label: 'checked',
        value: checked,
        onChange: val => setProp((props) => props.checked = val),
      }} />
      {checked && (
        <>
          <TInput.default {...{
            label: 'Checked Value Path',
            value: checkedValuePath,
            onChange: val => setProp((props) => props.checkedValuePath = val),
          }} />
          {isFormComponent && (
            <TInput.default {...{
              label: 'Field Name',
              value: getValue(props.checkedValues),
              onChange: value => setProp((props) => {
                if (value !== undefined) {
                  props.checkedValues = { $data: `{{$form.data.${value}}}` }
                  props.onCheck = {
                    $action: '$form.changeFields[$arg0]',
                    $arg0: {
                      [value]: {
                        $data: '{{$event}}',
                      },
                    },
                  }
                } else {
                  props.checkedValues = undefined
                  props.onCheck = undefined
                }
              }),
            }} />
          )}
          {!isFormComponent && (
            <>
              <TButton.default
                type={TButton.BUTTON_TYPES.text}
                specialType={TButton.BUTTON_SPECIAL_TYPES.action}
                label="On Check"
                onClick={() => openEventConstructor(id, {
                  title: 'On Check Event',
                  values: props.onCheck,
                  onSubmit: value => {
                    setProp((props) => {
                      props.onCheck = value
                    })
                  },
                })}
              />
              <TButton.default
                type={TButton.BUTTON_TYPES.text}
                specialType={TButton.BUTTON_SPECIAL_TYPES.data}
                label="Checked Values"
                onClick={() => openDataSelector(id, {
                  id: stringifyValue(props.checkedValues),
                  title: 'Checked Values property',
                  values: props.checkedValues,
                  onSubmit: value => {
                    setProp((props) => {
                      props.checkedValues = value
                    })
                  },
                })}
              />
            </>
          )}
        </>
      )}
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
