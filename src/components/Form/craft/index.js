import React from 'react'
import classNames from 'classnames'
import { useNode } from '@craftjs/core'

import { cssMeasurementUnits } from '../../../constants'

import Form from '../index'
import { FORM_TYPES } from '../constants'
import Settings from './Settings'
import styles from './index.module.css'


const CraftForm = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode()
  const {
    onlyRender,
    visualHelp,
    className,
    modalWidth,
    modalWidthUnits,
    ...rest
  } = props

  if (props.formType === FORM_TYPES.modal) {
    return (
      <div {...{
        ref: onlyRender ? undefined : ref => connect(drag(ref)),
        className: visualHelp && styles.modalVisualHelp,
      }}>
        <Form {...{
          ...rest,
          baseUrl: 'test',
          width: `${modalWidth}${modalWidthUnits}`,
          close: () => {},
        }} />
      </div>
    )
  }

  return (
    <Form {...{
      ...rest,
      baseUrl: 'test',
      className: classNames(className, visualHelp && styles.visualHelp),
      innerRef: ref => onlyRender ? undefined : connect(drag(ref)),
      width: `${modalWidth}${modalWidthUnits}`,
      close: () => {},
    }} />
  )
}

CraftForm.craft = {
  displayName: 'Form',
  props: {
    ...Form.defaultProps,
    widthUnits: cssMeasurementUnits[0],
  },
  related: {
    settings: Settings,
  },
}

export default CraftForm
