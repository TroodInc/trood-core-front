import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'
import Modal from '../index'

import { cssMeasurementUnits } from '../../../constants'

import styles from './index.module.css'


const CraftModal = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const {
    onlyRender,
    visualHelp,
    width,
    widthUnits,
    ...rest
  } = props

  return (
    <div {...{
      ref: onlyRender ? undefined : ref => connect(drag(ref)),
      className: visualHelp && styles.visualHelp,
    }}>
      <Modal {...{
        ...rest,
        width: `${width}${widthUnits}`,
        close: () => {},
      }}>
        {props.children}
      </Modal>
    </div>
  )
}

CraftModal.craft = {
  custom: {
    getStyleSettings: () => ({
      width: false,
      bg: false,
      shadow: false,
      padding: false,
      margin: false,
    }),
  },
  displayName: 'Modal',
  props: {
    ...Modal.defaultProps,
    widthUnits: cssMeasurementUnits[0],
  },
  related: {
    settings: Settings,
  },
}

export default CraftModal
