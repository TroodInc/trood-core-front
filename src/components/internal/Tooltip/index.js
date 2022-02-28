import React from 'react'
import ReactTooltip from 'react-tooltip'
import { nanoid } from 'nanoid'

import { groupDataAndAriaAttributes } from 'helpers/react'

import styles from './index.module.css'


const withTooltip = WrappedComponent => {
  const Component = ({
    tooltip,
    ...other
  }) => {
    React.useEffect(() => ReactTooltip.rebuild())

    if (!tooltip) return <WrappedComponent {...other} />

    const Comp = groupDataAndAriaAttributes(WrappedComponent)
    const id = nanoid()

    return (
      <React.Fragment>
        <Comp {...other } data-tip data-for={id} />
        <ReactTooltip
          id={id}
          className={styles.root}
          delayShow={100}
          delayUpdate={100}
          delayHide={100}
          border
          borderColor="#e8e8e8" // var(--trood-border)
          backgroundColor="#f8f8f8" // var(--trood-background-light)
          textColor="#7d7d7d" // var(--trood-text-gray)
        >
          {tooltip}
        </ReactTooltip>
      </React.Fragment>
    )
  }

  Component.defaultProps = WrappedComponent.defaultProps
  Component.transformFunctions = WrappedComponent.transformFunctions

  return Component
}

export default withTooltip
