/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import { useNode, useEditor } from '@craftjs/core'
import { TSelect, TInput, TButton } from '$trood/components'

import { getIsNodeInNode } from '../../../helpers'

import { ACCEPT_TYPES } from '../../constants'


const getIsFormComponent = (id, helper) => getIsNodeInNode(id, helper, ['Form'])

const getValue = (objValue) => {
  if (typeof objValue === 'object') {
    const testStr = objValue?.$data || ''
    const matches = testStr.match(/{{\$form\.data\.(.*)}}/) || []
    return matches[1]
  }
  return objValue
}

const getRespFieldName = (arg = {}) => {
  const val = JSON.stringify(arg)
  const matches = val.match(/{{\$event\.([^}]*)}}/) || []
  return matches[1]
}

const Settings = ({ openEventConstructor }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))
  const { query: { node: helper } } = useEditor()

  const isFormComponent = getIsFormComponent(id, helper)

  const selectProps = ({ label, key, items }) => ({
    label,
    items,
    values: props[key] ? [props[key]] : [],
    onChange: vals => setProp((props) => props[key] = vals[0]),
  })

  const inputProps = ({ label, key, type }) => ({
    label,
    type,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  const fieldName = getValue(props.value)
  const respFieldName = getRespFieldName(props.onUpload?.$arg0)

  return (
    <>
      <TInput.default {...{
        ...inputProps({
          label: 'Endpoint',
          key: 'endpoint',
        }),
      }} />
      {isFormComponent && (
        <>
          <TInput.default {...{
            label: 'Field Name',
            value: getValue(props.value),
            onChange: value => setProp((props) => {
              if (value !== undefined) {
                props.value = { $data: `{{$form.data.${value}}}` }
                props.errors = { $data: `{{$form.errors.${value}}}` }
                props.onUpload = {
                  $action: '$form.changeFields[$arg0]',
                  $arg0: {
                    [value]: {
                      $data: respFieldName ? '{{$event.' + respFieldName + '}}' : '{{$event}}',
                    },
                  },
                }
              } else {
                props.value = undefined
                props.errors = undefined
                props.onUpload = undefined
              }
            }),
          }} />
          {props.onUpload?.$arg0 && (
            <TInput.default {...{
              label: 'Response Field Name',
              value: respFieldName,
              onChange: value => setProp((props) => {
                if (value !== undefined) {
                  props.onUpload = {
                    $action: '$form.changeFields[$arg0]',
                    $arg0: {
                      [fieldName]: {
                        $data: '{{$event.' + value + '}}',
                      },
                    },
                  }
                } else {
                  props.onUpload = {
                    $action: '$form.changeFields[$arg0]',
                    $arg0: {
                      [fieldName]: {
                        $data: '{{$event}}',
                      },
                    },
                  }
                }
              }),
            }} />
          )}
        </>
      )}
      {!isFormComponent && (
        <TButton.default
          type={TButton.BUTTON_TYPES.text}
          specialType={TButton.BUTTON_SPECIAL_TYPES.action}
          label="On Upload"
          onClick={() => openEventConstructor(id, {
            title: 'On File Upload Event',
            values: props.onUpload,
            onSubmit: value => {
              setProp((props) => {
                props.onUpload = value
              })
            },
          })}
        />
      )}
      <TSelect.default {...{
        ...selectProps({
          label: 'Accept Types',
          key: 'accept',
          items: ACCEPT_TYPES,
        }),
      }} />
    </>
  )
}

export default Settings
