import React from 'react'

import sanitizeHtml from 'sanitize-html'

const VisualHtml = ({
  innerRef,
  children,
  ...other
}) => {
  const html = sanitizeHtml(children, {
    allowedAttributes: false,
  })
  return <div {...other} ref={innerRef} dangerouslySetInnerHTML={{ __html: html }} />
}

export default VisualHtml
