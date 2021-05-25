import React, { PureComponent } from 'react'
import objectHash from 'object-hash'
import { useNode } from '@craftjs/core'

import styles from './index.module.css'


const Error = ({ compType, onlyRender }) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <div className={styles.error} ref={onlyRender ? undefined : (dom) => connect(drag(dom))}>
      <h2>Something went wrong in "{compType}"</h2>
    </div>
  )
}

Error.craft = {
  displayName: 'Error',
}


class ErrorWrapper extends PureComponent {
  state = {
    error: undefined,
    errorInfo: undefined,
  }

  static getDerivedStateFromProps(props, state) {
    const propsHash = objectHash(
      props.childrenProps,
      {
        excludeKeys: key => {
          return (
            key === '__proto__' ||
            !props.childrenProps[key] ||
            props.childrenProps[key].$$typeof
          )
        },
      },
    )

    if (state.propsHash !== propsHash) {
      return {
        error: undefined,
        errorInfo: undefined,
        propsHash,
      }
    }

    return {
      ...state,
      propsHash,
    }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    const { children, childrenProps: { onlyRender } } = this.props

    if (this.state.error) {
      return (
        <Error compType={children.type.craft.displayName} onlyRender={onlyRender} />
      )
    }

    return children
  }
}

export default ErrorWrapper
