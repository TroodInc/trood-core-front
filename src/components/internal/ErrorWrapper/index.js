import React, { PureComponent } from 'react'

import styles from './index.module.css'


class ErrorWrapper extends PureComponent {
  state = {
    error: undefined,
    errorInfo: undefined,
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    const { children } = this.props

    if (this.state.error) {
      return (
        <div className={styles.error}>
          <h2>Something went wrong in {children.type.name}</h2>
        </div>
      )
    }

    return children
  }
}

export default ErrorWrapper
