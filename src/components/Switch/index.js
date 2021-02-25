import React from 'react'
import { Switch } from 'react-router-dom'


const SwitchWrapper = (props) => {
  const {
    children,
    className,
    innerRef,
    ...other
  } = props

  return (
    <div ref={innerRef} className={className}>
      <Switch {...other}>
        {props.children}
      </Switch>
    </div>
  )
}

export default SwitchWrapper
