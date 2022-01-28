import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { fontDict } from 'fonts'

import styles from './index.module.css'

import VisualHtml from './components/VisualHtml'


const knownTypes = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'div',
  label: 'span',
  html: VisualHtml,
}

const Typography = ({
  innerRef,
  className,
  font,
  type,
  value,
  bold,
  children,
  style,
  ...other
}) => {
  const fontObj = fontDict[font]

  useEffect(() => {
    if (fontObj) {
      const fontStyleLink = fontObj.link
      const hasFont = Array.from(document.head.getElementsByTagName('link'))
        .reduce((memo, curr) => memo || curr.href === fontStyleLink, false)

      if (!hasFont) {
        const linkElement = document.createElement('link')
        linkElement.setAttribute('rel', 'stylesheet')
        linkElement.setAttribute('type', 'text/css')
        linkElement.setAttribute('href', fontStyleLink)
        document.head.appendChild(linkElement)
      }
    }
  }, [fontObj])

  const component = knownTypes[type]
  return React.createElement(component, {
    ...other,
    style: {
      ...style,
      fontFamily: fontObj?.fontFamily || font,
    },
    [typeof component === 'string' ? 'ref' : 'innerRef']: innerRef,
    className: classNames(className, styles[type], bold && styles.bold),
    children: children || value,
  })
}

Typography.defaultProps = {
  type: knownTypes.h1,
}

Typography.propTypes = {
  className: PropTypes.string,
  font: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(knownTypes)),
  value: PropTypes.node,
  children: PropTypes.node,
  bold: PropTypes.bool,
}

Typography.knownTypes = knownTypes

export default Typography
