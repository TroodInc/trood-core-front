import React, { useEffect } from 'react'
import { useNode } from '@craftjs/core'
import classNames from 'classnames'

import { fontDict } from 'fonts'

import Settings from './Settings'
import Currency from '../index'


const CraftCurrency = props => {
  const fontObj = fontDict[props.font]

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

  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))

  const { onlyRender, visualHelp, ...rest } = props

  return (
    <Currency
      { ...rest }
      value={12345.12}
      innerRef={onlyRender ? undefined : ref => connect(drag(ref))}
    />
  )
}

CraftCurrency.craft = {
  displayName: 'Currency',
  related: {
    settings: Settings,
  },
  props: {
    ...Currency.defaultProps,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftCurrency
