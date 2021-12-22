import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import classNames from 'classnames'

import style from './index.module.css'

import { CURRENCIES, CURRENCY_CODES, CURRENCY_SIGN_TYPE } from './constants'

import { toNumber, toMoney } from 'helpers/format'
import { isNotNull } from 'helpers/def'

class Currency extends PureComponent {
  static propTypes = {
    value: (props, propName, componentName) => {
      const currentProp = props[propName]
      if (currentProp !== undefined && Number.isNaN(+currentProp)) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName} Expected number or number-like string.`)
      }
      return undefined
    },
    currency: PropTypes.oneOf(Object.values(CURRENCY_CODES)),
    currencySignType: PropTypes.oneOf(Object.values(CURRENCY_SIGN_TYPE)),
    short: PropTypes.bool,
    className: PropTypes.string,
    sign: PropTypes.node,
    showSign: PropTypes.bool,
    signClassName: PropTypes.string,
    trimCount: PropTypes.number,
    zeroIsValue: PropTypes.bool,
    defaultEmptyMessage: PropTypes.string,
  }

  static defaultProps = {
    currencySignType: CURRENCY_SIGN_TYPE.symbol,
    currency: CURRENCY_CODES.usd,
    short: false,
    showSign: true,
    trimCount: 0,
    zeroIsValue: true,
    defaultEmptyMessage: '-',
  }

  static currencyCodes = CURRENCY_CODES
  static currencySignTypes = CURRENCY_SIGN_TYPE

  constructor(props) {
    super(props)

    this.getFormatValue = this.getFormatValue.bind(this)
  }

  getFormatValue() {
    const {
      value,
      short,
      trimCount,
    } = this.props

    if (short) {
      const valueObj = toMoney(value)
      return (
        <span>
          {toNumber(valueObj.value.toString(), trimCount, trimCount)}
          {valueObj.postfix}
        </span>
      )
    }
    return toNumber(value.toString(), trimCount, trimCount)
  }

  render() {
    const {
      innerRef,
      className,
      currency,
      currencySignType,
      showSign,
      signClassName,
      value,
      defaultEmptyMessage,
      zeroIsValue,
    } = this.props

    let sign = this.props.sign
    if ((CURRENCIES[currency] || {})[currencySignType]) {
      sign = CURRENCIES[currency][currencySignType]
    }

    if ((isNaN(value) || !isNotNull(value)) || (value === 0 && !zeroIsValue)) {
      return defaultEmptyMessage
    }

    return (
      <span ref={innerRef} className={classNames(style.root, className)}>
        {this.getFormatValue()}
        {showSign &&
          <span className={classNames(style.currency, signClassName)}>
            {sign}
          </span>
        }
      </span>
    )
  }
}

export default Currency
