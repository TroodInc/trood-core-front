import React, { useState } from 'react'
import ContentEditable from 'react-contenteditable'

import ClickOutside from '../ClickOutside'
import Wysiwyg from 'components/internal/Wysiwyg'


const Input = ({
  type,
  value,
  tagName,
  className,
  style,
  onChange,
  onFocus,
}) => {
  if (type === 'wysiwyg') {
    return (
      <Wysiwyg
        value={value}
        className={className}
        style={style}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
      />
    )
  }

  return (
    <ContentEditable
      html={value}
      tagName={tagName}
      className={className}
      style={style}
      onChange={e => onChange(e.target.value.replace(/<\/?[^>]+(>|$)/g, ''))}
      onFocus={onFocus}
    />
  )
}

const EditWrapper = ({
  type,
  children,

  innerRef,
  text,
  tagName,
  className,
  style,
  onChange,
}) => {
  const [{ isEditing, isEditingActive }, setState] = useState(false)

  return (
    <ClickOutside onClick={() => setState({ isEditing: false, isEditingActive: false })}>
      <div {...{
        ref: innerRef,
        onMouseEnter: () => {
          setState({ isEditing: true, isEditingActive })
        },
        onMouseLeave: () => {
          if (!isEditingActive) setState({ isEditing: false })
        },
      }}>
        {isEditing
          ? (
            <Input
              type={type}
              value={text}
              tagName={tagName}
              className={className}
              style={style}
              onChange={onChange}
              onFocus={() => setState({ isEditing: true, isEditingActive: true })}
            />
          )
          : children}
      </div>
    </ClickOutside>
  )
}

export default EditWrapper
