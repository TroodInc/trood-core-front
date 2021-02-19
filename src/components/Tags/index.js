import React from 'react'


const Tags = ({
  innerRef,
  tag,
  ...other
}) => {
  return React.createElement(tag, {
    ...other,
    ref: innerRef,
  })
}

export default Tags
