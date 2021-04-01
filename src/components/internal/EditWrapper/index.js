import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'


const EditWrapper = ({
  children,

  innerRef,
  text,
  tagName,
  className,
  onChange,
}) => {
  const [{ isEditing, isEditingActive }, setState] = useState(false)

  return (
    <div {...{
      ref: innerRef,
      onMouseEnter: () => {
        setState({ isEditing: true })
      },
      onMouseLeave: () => {
        if (!isEditingActive) setState({ isEditing: false })
      },
      onBlur: () => setState({ isEditing: false, isEditingActive: false }),
    }}>
      {isEditing
        ? (
          <ContentEditable
            html={text}
            onChange={onChange}
            tagName={tagName}
            className={className}
            onFocus={() => setState({ isEditing: true, isEditingActive: true })}
          />
        )
        : children}
    </div>
  )
}

export default EditWrapper
