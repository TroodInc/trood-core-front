import React from 'react'
import { Link as ReactLink } from 'react-router-dom'


const Link = ({
  to,
  children,
  innerRef,
  ...props
}) => {
  let isLink = /^\//.test(to)
  if (isLink) {
    isLink = !/^\/\//.test(to)
  }
  if (isLink) return <ReactLink {...props} ref={innerRef} to={to}>{children}</ReactLink>

  let href = to
  if (!/^http/.test(href) && !/^\/\//.test(href)) {
    href = '//' + to
  }
  return <a {...props} ref={innerRef} href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

export default Link
