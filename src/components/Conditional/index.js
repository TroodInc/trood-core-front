import { Component } from 'react'

import transform from './transform'


class Conditional extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
  }

  render() {
    const {
      value,
      trueComponent,
      falseComponent,
    } = this.props

    return value ? trueComponent : falseComponent
  }
}

Conditional.transformFunctions = transform

export default Conditional
