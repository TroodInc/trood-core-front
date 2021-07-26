/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, JsonEditor, TInput, TButton } from '$trood/components'

import styles from './index.module.css'


const Settings = ({ openDataSelector, openEventConstructor }) => {
  const {
    id,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  const defaultType = Array.isArray(props.items) ? 'static' : 'data'
  const [type, setType] = useState(defaultType)

  return (
    <>
      <TButton.default
        type={TButton.BUTTON_TYPES.text}
        specialType={TButton.BUTTON_SPECIAL_TYPES.data}
        label="On Change"
        onClick={() => openEventConstructor(id, {
          values: props.onChange,
          onSubmit: value => {
            setProp((props) => {
              props.onChange = value
            })
          },
        })}
      />
      <div>
        <div className={styles.tabs}>
          <div
            className={type === 'static' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.items = [])
              setType('static')
            }}
          >
            Static Items
          </div>
          <div
            className={type === 'data' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.items = {})
              setType('data')
            }}
          >
            From Data
          </div>
        </div>
        {type === 'static' && (
          <JsonEditor.default {...{
            value: props.items,
            mode: JsonEditor.MODES.code,
            onChange: vals => setProp((props) => props.items = vals),
          }} />
        )}
        {type === 'data' && (
          <TButton.default
            type={TButton.BUTTON_TYPES.text}
            specialType={TButton.BUTTON_SPECIAL_TYPES.data}
            label="Select Items"
            onClick={() => openDataSelector(id, {
              id: props.items?.$data,
              values: props.items,
              onSubmit: value => {
                setProp((props) => {
                  props.items = value
                })
              },
            })}
          />
        )}
      </div>
      <TInput.default {...{
        label: 'Item Value Path',
        value: props.valuePath,
        onChange: value => setProp((props) => props.valuePath = value),
      }} />
      <TInput.default {...{
        label: 'Label',
        value: props.label,
        onChange: value => setProp((props) => props.label = value),
      }} />
      <TInput.default {...{
        label: 'Pace Holder',
        value: props.placeHolder,
        onChange: value => setProp((props) => props.placeHolder = value),
      }} />
      <div>
        <TButton.default
          type={TButton.BUTTON_TYPES.text}
          specialType={TButton.BUTTON_SPECIAL_TYPES.data}
          label="Select Value"
          onClick={() => openDataSelector(id, {
            id: props.value?.$data,
            value: props.value,
            onSubmit: value => {
              setProp((props) => {
                props.value = value
              })
            },
          })}
        />
      </div>
      <div>
        <TButton.default
          type={TButton.BUTTON_TYPES.text}
          specialType={TButton.BUTTON_SPECIAL_TYPES.data}
          label="Select Errors"
          onClick={() => openDataSelector(id, {
            id: props.errors?.$data,
            values: props.errors,
            onSubmit: value => {
              setProp((props) => {
                props.errors = value
              })
            },
          })}
        />
      </div>
      <TCheckbox.default {...{
        label: 'Multi Select',
        value: props.multi,
        onChange: value => {
          setProp((props) => {
            props.multi = value
          })
        },
      }} />
      {props.multi && (
        <>
          <TCheckbox.default {...{
            label: 'Clearable',
            value: props.clearable,
            onChange: value => {
              setProp((props) => {
                props.clearable = value
              })
            },
          }} />
          <TInput.default {...{
            label: 'Max Rows',
            value: props.maxRows,
            onChange: value => setProp((props) => props.maxRows = value),
          }} />
        </>
      )}
      <TCheckbox.default {...{
        label: 'Required',
        value: props.validate?.required,
        onChange: value => {
          setProp((props) => {
            props.validate = {
              ...props.validate,
              required: value,
            }
          })
        },
      }} />
      <TCheckbox.default {...{
        label: 'Check on blur',
        value: props.validate?.checkOnBlur,
        onChange: value => {
          setProp((props) => {
            props.validate = {
              ...props.validate,
              checkOnBlur: value,
            }
          })
        },
      }} />
    </>
  )
}

export default Settings
