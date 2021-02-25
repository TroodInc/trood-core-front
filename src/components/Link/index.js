import React from 'react'
import { Link } from 'react-router-dom'


const LinkWrapper = (props) => {
  const {
    children,
    className,
    innerRef,
    ...other
  } = props

  return (
    <div ref={innerRef} className={className}>
      <Link {...other}>
        {props.children}
      </Link>
    </div>
  )
}

export default LinkWrapper
