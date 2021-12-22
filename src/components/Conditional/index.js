import React, { Component as ReactComponent } from 'react'
import BaseComponent from 'core/BaseComponent'
import { Component } from 'core/pageStore'

import transform from './transform'


class Conditional extends ReactComponent {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }

  render() {
    const {
      value,
      trueComponent,
      falseComponent,
    } = this.props

    const TrueNodes = Component.create({ nodes: trueComponent })
    const FalseNodes = Component.create({ nodes: falseComponent })

    return <BaseComponent component={value ? TrueNodes : FalseNodes } />
  }
}

Conditional.transformFunctions = transform

export default Conditional
