/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
import { useNode } from '@craftjs/core'
import { TCheckbox, TInput, TSelect, TButton } from '$trood/components'

import styles from './index.module.css'


const ariaCurrentItems = ['page', 'step', 'location', 'date', 'time', 'true', 'false']

const Settings = ({ openDataSelector }) => {
  const { id, actions: { setProp }, props } = useNode((node) => ({ props: node.data.props }))

  const defaultType = typeof props.to === 'object' ? 'data' : 'static'
  const [type, setType] = useState(defaultType)

  const inputProps = ({ label, key }) => ({
    className: styles.input,
    label,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  const checkboxProps = ({ label, key }) => ({
    className: styles.checkbox,
    label,
    value: props[key],
    onChange: value => setProp((props) => props[key] = value),
  })

  return (
    <div>
      <div>
        <div className={styles.tabs}>
          <div
            className={type === 'static' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.to = '/')
              setType('static')
            }}
          >
            Static Link
          </div>
          <div
            className={type === 'data' ? styles.activeTab : styles.tab}
            onClick={() => {
              setProp((props) => props.to = {})
              setType('data')
            }}
          >
            From Data
          </div>
        </div>
        {type === 'static' && (
          <TInput.default {...{
            className: styles.input,
            label: 'To',
            value: props.to,
            onChange: value => {
              setProp((props) => {
                props.to = value
              })
            },
          }} />
        )}
        {type === 'data' && (
          <TButton.default
            className={styles.dataSelectorButton}
            type={TButton.BUTTON_TYPES.text}
            label="Select Data"
            onClick={() => openDataSelector(id, {
              id: props.to?.path,
              values: {
                path: props.to?.path,
              },
              onSubmit: value => {
                setProp((props) => {
                  props.to = value
                })
              },
            })}
          />
        )}
      </div>
      <TInput.default {...{
        ...inputProps({
          label: 'Active className',
          key: 'activeClassName',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Exact',
          key: 'exact',
        }),
      }} />
      <TCheckbox.default {...{
        ...checkboxProps({
          label: 'Strict',
          key: 'strict',
        }),
      }} />
      <TSelect.default {...{
        className: styles.select,
        label: 'Aria-current',
        values: props['aria-current'] ? [props['aria-current']] : [],
        items: ariaCurrentItems.map(value => ({ value })),
        onChange: vals => setProp((props) => props['aria-current'] = vals[0]),
        clearable: true,
        placeHolder: 'Not Set',
      }} />
    </div>
  )
}

export default Settings
