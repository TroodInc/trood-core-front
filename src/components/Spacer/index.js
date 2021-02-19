import React from 'react'
const Spacer = ({ innerRef, size = 8, className = '', vertical = false }) => {
  return (
    <div
      ref={innerRef}
      style={{ [vertical ? 'width' : 'height']: size, display: vertical ? 'inline-block' : 'block' }}
      className={className}
    />
  )
}

export default Spacer
