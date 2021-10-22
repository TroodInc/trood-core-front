import React, { useState } from 'react'
import { useNode } from '@craftjs/core'

import { TSelect, TInput, TCheckbox, TLabel, TButton, JsonEditor } from '$trood/components'

import { FORM_TYPES } from '../../constants'
import { MODAL_TYPES } from '../../../Modal/constants'
import { cssMeasurementUnits } from '../../../../constants'

import styles from './index.module.css'


const afterActions = [
  {
    label: 'Go to link',
    value: '$route.history.push[$arg0]',
    args: {
      $arg0: 'Link',
    },
  },
]

const Settings = ({ openDataSelector }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const defaultType = typeof props.pk === 'object' ? 'data' : 'static'
  const [pkType, setPkType] = useState(defaultType)

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

  const isModal = props.formType === FORM_TYPES.modal

  const afterCreateArgs = afterActions.find(a => a.value === props.afterCreate?.$action)?.args || {}

  return (
    <>
      <TSelect.default {...{
        ...selectProps({
          label: 'Type',
          key: 'formType',
          items: Object.values(FORM_TYPES).map(value => ({ value })),
        }),
        placeHolder: 'Not Set',
      }} />
      <TInput.default {...{
        ...inputProps({
          label: 'Base URL',
          key: 'baseUrl',
        }),
      }} />
      {!isModal && (
        <div>
          <TLabel.default label="Primary Key" />
          <div className={styles.tabs}>
            <div
              className={pkType === 'static' ? styles.activeTab : styles.tab}
              onClick={() => {
                setProp((props) => props.pk = undefined)
                setPkType('static')
              }}
            >
              Static
            </div>
            <div
              className={pkType === 'data' ? styles.activeTab : styles.tab}
              onClick={() => {
                setProp((props) => props.pk = undefined)
                setPkType('data')
              }}
            >
              From Data
            </div>
          </div>
          {pkType === 'static' && (
            <TInput.default {...{
              ...inputProps({
                key: 'pk',
              }),
            }} />
          )}
          {pkType === 'data' && (
            <TButton.default
              type={TButton.BUTTON_TYPES.text}
              specialType={TButton.BUTTON_SPECIAL_TYPES.data}
              label="Select PK"
              onClick={() => openDataSelector(id, {
                id: props.pk?.$data,
                values: props.pk,
                onSubmit: value => {
                  setProp((props) => {
                    props.pk = value
                  })
                },
              })}
            />
          )}
        </div>
      )}
      {!props.pk && (
        <>
          <TLabel.default label="After Create" />
          <TSelect.default {...{
            placeHolder: 'Not Set',
            label: 'Action',
            items: afterActions,
            values: props.afterCreate?.$action ? [props.afterCreate.$action] : [],
            onChange: vals => setProp((props) => {
              if (vals && vals[0]) {
                props.afterCreate = {
                  $action: vals[0],
                }
              } else {
                props.afterCreate = undefined
              }
            }),
            clearable: true,
          }} />
          {Object.keys(afterCreateArgs).map(key => (
            <TInput.default {...{
              key,
              label: afterCreateArgs[key],
              value: props.afterCreate[key],
              onChange: value => setProp((props) => props.afterCreate[key] = value),
            }} />
          ))}
        </>
      )}
      {!isModal && (
        <TButton.default
          type={TButton.BUTTON_TYPES.text}
          specialType={TButton.BUTTON_SPECIAL_TYPES.data}
          label="Select Edit Values"
          onClick={() => openDataSelector(id, {
            id: props.editValues?.$data,
            values: props.editValues,
            onSubmit: value => {
              setProp((props) => {
                props.editValues = value
              })
            },
          })}
        />
      )}
      <TLabel.default label="Default Values" />
      <JsonEditor.default {...{
        value: props.defaultValues,
        mode: JsonEditor.MODES.code,
        onChange: vals => setProp((props) => props.defaultValues = vals),
      }} />
      {isModal && (
        <>
          <TSelect.default {...{
            ...selectProps({
              label: 'Modal Type',
              key: 'modalType',
              items: Object.values(MODAL_TYPES).map(value => ({ value })),
            }),
          }} />
          {props.type !== MODAL_TYPES.full && (
            <div className={styles.fieldContainer}>
              <TInput.default {...{
                ...inputProps({
                  label: 'Modal Width',
                  key: 'modalWidth',
                  type: 'int',
                }),
              }} />
              <TSelect.default {...{
                ...selectProps({
                  key: 'modalWidthUnits',
                  items: cssMeasurementUnits.map(value => ({ value })),
                }),
              }} />
            </div>
          )}
          <TCheckbox.default {...{
            label: 'Modal close on overlay click',
            value: props.modalCloseOnOverlayClick,
            onChange: value => {
              setProp((props) => {
                props.modalCloseOnOverlayClick = value
              })
            },
          }} />
        </>
      )}
    </>
  )
}

export default Settings
