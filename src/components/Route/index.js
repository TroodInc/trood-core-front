import React, { useEffect } from 'react'
import { Route as RouterRoute } from 'react-router-dom'

const Page = ({ children, title }) => {
  useEffect(() => {
    document.title = title || 'Trood'
  }, [title])
  return children
}

const Route = ({ innerRef, title, children, className, ...rest }) => {
  return (
    <div ref={innerRef} className={className}>
      <RouterRoute {...rest}>
        <Page title={title}>{children}</Page>
      </RouterRoute>
    </div>
  )
}
export default Route
