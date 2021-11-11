import React from 'react'
import { useObserver } from 'mobx-react-lite'
import BaseComponent from 'core/BaseComponent'
import { Component } from 'core/pageStore'

import transform from './transform'

// TODO conditional is loosing context
const Conditional = ({
  value,
  trueComponent,
  falseComponent,
}) => {
  const TrueNodes = Component.create({ nodes: trueComponent })
  const FalseNodes = Component.create({ nodes: falseComponent })
  
  return useObserver(() => <BaseComponent component={value ? TrueNodes : FalseNodes } />)
}

Conditional.transformFunctions = transform

export default Conditional
