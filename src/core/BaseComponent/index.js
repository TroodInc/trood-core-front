import React from 'react'
import moment from 'moment'
import StoreContext from 'core/StoreContext'
import PageStoreContext from 'core/PageStoreContext'
import AuthStoreContext from 'core/AuthStoreContext'
import ContextContext from 'core/ContextContext'
import FormContext from 'core/FormContext'
import { Component } from 'core/pageStore'
import { useObserver } from 'mobx-react-lite'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Parser } from 'expr-eval'

import LoadingIndicator from 'components/LoadingIndicator'
import { isDefAndNotNull } from 'helpers/def'

import loadable from '@loadable/component'


const ComponentsWrapper = loadable.lib(() => import('components'))

const getComponent = componentProp => {
  const componentStore = Component.create({ nodes: componentProp.$component })
  return <BaseComponent component={componentStore} />
}

const getData = (dataProp, data) => {
  const transformedDataProp = Object.keys(dataProp).reduce((memo, key) => {
    if (key === '$data') return memo
    return {
      ...memo,
      [key]: parseProp(dataProp[key], data),
    }
  }, {
    $data: dataProp.$data,
  })
  const $data = {
    ...transformedDataProp,
    ...data,
  }
  let value = dataProp.$data
  if (typeof value === 'object') {
    return Object.keys(value).reduce((memo, key) => ({
      ...memo,
      [key]: parseProp(value[key], $data),
    }), {})
  }
  const pathMatch = dataProp.$data.match(/{{(\$[^}]*)}}/g) || []
  const isTemplate = pathMatch.length > 1 || pathMatch[0] !== dataProp.$data.trim()
  const pathMatches = dataProp.$data.matchAll(/{{(\$[^}]*)}}/g)
  for (const [pathTemplate, path] of pathMatches) {
    const pathValue = path.split('.').reduce(
      (memo, key) => {
        if (/\[([^\]]*)]/g.test(key)) {
          const argsMatches = key.matchAll(/\[([^\]]*)]/g)
          for (const [, args] of argsMatches) {
            const argsArray = args.split(',').map(arg => $data[arg.trim()])
            const f = (memo || {})[key.replace(/\[([^\]]*)]/g, '')]
            if (typeof f !== 'function') return undefined
            return f.bind(memo)(...argsArray)
          }
        }
        return (memo || {})[key]
      },
      $data,
    )

    if (isTemplate) {
      value = value.replace(pathTemplate, pathValue)
    } else {
      value = pathValue
    }
  }
  return value === null ? undefined : value
}

const realOperators = {
  'endLike': 'like',
  'startLike': 'like',
  'isNull': 'is_null',
}

export const encodeSearchValue = (str = '') => {
  return str.replace(/[\x26\x28\x29\x2C\x2F\x3B\x3D\x3F\x40\x7C\\]/g, char => {
    return `\\${char}`
  })
}

const getInnerRql = rql => {
  return Object.keys(rql).reduce((memo, key) => {
    const match = key.match(/^\$([a-zA-Z]+)\d*$/) || []
    const rqlOperator = match[1]
    if (!rql[key]) throw new Error(`Error in ${rqlOperator} operator syntax`)
    const operator = realOperators[rqlOperator] || rqlOperator
    let k
    let v
    switch (rqlOperator) {
      case 'and':
      case 'or':
      case 'not':
        const inner = getInnerRql(rql[key])
        if (inner) return [memo, `${operator}(${inner})`].filter(Boolean).join(',')
        break
      case 'eq':
      case 'lt':
      case 'le':
      case 'gt':
      case 'ge':
      case 'like':
      case 'endLike':
      case 'startLike':
      case 'in':
        k = Object.keys(rql[key])[0]
        if (!k) throw new Error(`Error in ${rqlOperator} operator syntax`)

        v = rql[key][k]
        if (typeof v === 'boolean') v = +v
        if (isDefAndNotNull(v)) {
          switch (rqlOperator) {
            case 'like':
              v = `*${encodeSearchValue(v)}*`
              break
            case 'endLike':
              v = `*${encodeSearchValue(v)}`
              break
            case 'startLike':
              v = `${encodeSearchValue(v)}*`
              break
            case 'in':
              if (Array.isArray(v) && v.length) {
                v = `(${v.filter(Boolean).join(',')})`
              } else {
                v = undefined
              }
              break
            default:
          }
          if (isDefAndNotNull(v)) return [memo, `${operator}(${k},${v})`].filter(Boolean).join(',')
        }
        break
      case 'isNull':
        return [memo, `is_null(${rql[key]},true)`].filter(Boolean).join(',')
      case 'limit':
        v = rql[key]
        if (typeof v.from !== 'number' || typeof v.step !== 'number') {
          throw new Error(`Error in ${rqlOperator} operator syntax`)
        }
        return [memo, `${operator}(${v.from},${v.step})`].filter(Boolean).join(',')
      case 'sort':
        return [memo, `${operator}(${rql[key]})`].filter(Boolean).join(',')
      default:
        return memo
    }
    return memo
  }, '')
}

const getRql = (rqlProp, $data) => {
  const rql = rqlProp.$rql
  const transformedRql = Object.keys(rql).reduce((memo, key) => {
    return {
      ...memo,
      [key]: parseProp(rql[key], $data),
    }
  }, {})
  return getInnerRql(transformedRql)
}

const execAction = (actionPath, actionProp, $data) => {
  return actionPath.split('.').reduce(
    (memo, key) => {
      if (/\[([^\]]*)]/g.test(key)) {
        const argsMatches = key.matchAll(/\[([^\]]*)]/g)
        for (const [, args] of argsMatches) {
          const argsArray = args.split(',').map(arg => {
            return (
              parseProp(actionProp[arg.trim()], $data, true)
            )
          })
          const f = memo[key.replace(/\[([^\]]*)]/g, '')]
          return f(...argsArray)
        }
      }
      return memo[key]
    },
    $data,
  )
}

const getAction = (actionProp, $data) => {
  const actions = (Array.isArray(actionProp.$action) ? actionProp.$action : [actionProp.$action])
    .map(action => typeof action === 'object' ? action : { action })
  return ($event) => {
    actions.reduce((promise, action) => {
      let result = promise.then($result => execAction(action.action, actionProp, { ...$data, $event, $result }))
      if (action.catch) {
        result = result.catch($resultError =>
          getAction({ ...actionProp, $action: action.catch }, { ...$data, $resultError })($event),
        )
      }
      if (action.finally) {
        result = result.finally($result =>
          getAction({ ...actionProp, $action: action.finally }, { ...$data, $result })($event),
        )
      }
      return result
    }, Promise.resolve())
  }
}

const parser = new Parser()

parser.functions.arrayPush = (arr = [], ...items) => {
  return [...arr, ...items]
}

parser.functions.arrayRemove = (arr = [], ...indexes) => {
  return arr.filter((_, i) => !indexes.includes(i))
}

parser.functions.arrayReplace = (arr = [], ...data) => {
  const indexes = data.filter((_, i) => i % 2 === 0)
  return arr.map((item, i) => {
    if (indexes.includes(i)) {
      const id = indexes.indexOf(i)
      return data[id + 1]
    }
    return item
  })
}

parser.functions.setKeyValue = (key, value, init = {}) => ({
  ...init,
  [key]: value,
})

const getDataFunc = (expressionProp, $data) => (path) => {
  const dataProp = {
    ...expressionProp,
    $data: `{{${path}}}`,
  }
  return getData(dataProp, $data)
}

const exprIndexRegexp = /^\$(\d*)\D+.*$/
const getExprIndex = exprKey => +((exprKey.match(exprIndexRegexp) || [])[1] || 0)
const exprOperatorRegexp = /^\$\d*(\D+.*)$/
const getExprOperator = exprKey => (exprKey.match(exprOperatorRegexp) || [])[1]

const getInnerExpression = (expr, evaluate) => {
  if (expr === undefined || expr === null) return null
  const innerGetInnerExpr = e => getInnerExpression(e, evaluate)
  if (Array.isArray(expr)) {
    return expr.map(item => innerGetInnerExpr(item))
  }
  if (typeof expr === 'object') {
    return Object.keys(expr)
      .sort((a, b) => {
        const indexA = getExprIndex(a)
        const indexB = getExprIndex(b)
        return indexA - indexB
      })
      .map(key => {
        const operator = getExprOperator(key)
        switch (operator) {
          case 'parsed':
            return expr[key]
          case '=':
            return `${expr[key].name}=${innerGetInnerExpr(expr[key].value)};`
          case '+':
          case '-':
          case '*':
          case '/':
          case '%':
          case '^':
          case 'and':
          case 'or':
          case '==':
          case '!=':
          case '>=':
          case '<=':
          case '>':
          case '<':
            return `(${innerGetInnerExpr(expr[key].x)} ${operator} ${innerGetInnerExpr(expr[key].y)})`
          case 'group':
            return `(${innerGetInnerExpr(expr[key])})`
          case '!':
            return `(${innerGetInnerExpr(expr[key])}!)`
          case 'concat':
            return `(${innerGetInnerExpr(expr[key].x)} || ${innerGetInnerExpr(expr[key].y)})`
          case 'in':
            return `(${innerGetInnerExpr(expr[key].x)} ${operator} [${innerGetInnerExpr(expr[key].y)}])`
          case 'ternary':
            return `(${
              innerGetInnerExpr(expr[key].value)
            }?${innerGetInnerExpr(expr[key].true)}:${innerGetInnerExpr(expr[key].false)})`
          case 'str':
            console.log(evaluate(innerGetInnerExpr(expr[key])))
            return `'${evaluate(innerGetInnerExpr(expr[key]))}'`
          case 'num':
            return +evaluate(innerGetInnerExpr(expr[key]))
          case 'bool':
            return !!evaluate(innerGetInnerExpr(expr[key]))
          case 'abs':
          case 'acos':
          case 'acosh':
          case 'asin':
          case 'asinh':
          case 'atan':
          case 'atanh':
          case 'cbrt':
          case 'ceil':
          case 'cos':
          case 'cosh':
          case 'exp':
          case 'expm1':
          case 'floor':
          case 'length':
          case 'ln':
          case 'log':
          case 'log10':
          case 'log2':
          case 'log1p':
          case 'not':
          case 'round':
          case 'sign':
          case 'sin':
          case 'sinh':
          case 'sqrt':
          case 'tan':
          case 'tanh':
          case 'trunc':
          case 'random':
          case 'fac':
          case 'data':
            return `${operator}(${innerGetInnerExpr(expr[key])})`
          case 'min':
          case 'max':
          case 'hypot':
          case 'pow':
          case 'atan2':
          case 'roundTo':
          case 'map':
          case 'filter':
          case 'join':
          case 'indexOf':
          case 'arrayPush':
          case 'arrayRemove':
            return `${operator}(${innerGetInnerExpr(expr[key].x)},${innerGetInnerExpr(expr[key].y)})`
          case 'fold':
          case 'if':
          case 'arrayReplace':
          case 'setKeyValue':
            return `${operator}(${
              innerGetInnerExpr(expr[key].x)},${innerGetInnerExpr(expr[key].y)},${innerGetInnerExpr(expr[key].z)})`
          default:
            return expr[key]
        }
      })
      .join(' ')
  }
  return expr
}

const getExpression = (expressionProp, $data) => {
  parser.functions.data = getDataFunc(expressionProp, $data)

  const evaluate = e => {
    try {
      return parser.evaluate(e, { null: null, undefined: null })
    } catch {
      return e
    }
  }

  const expr = expressionProp.$expression
  if (typeof expr === 'string') {
    return evaluate(expr, { null: null })
  }

  const transformedExpr = Object.keys(expr).reduce((memo, key) => {
    return {
      ...memo,
      [key]: parseProp(expr[key], $data),
    }
  }, {})
  const innerExpr = getInnerExpression(transformedExpr, evaluate)
  return evaluate(innerExpr, { null: null })
}

const parseProp = (prop, $data) => {
  if (!prop) return prop
  if (Array.isArray(prop)) {
    return prop.map(value => parseProp(value, $data))
  }
  if (typeof prop === 'object') {
    if (isDefAndNotNull(prop.$component)) return getComponent(prop)
    if (isDefAndNotNull(prop.$data)) return getData(prop, $data)
    if (isDefAndNotNull(prop.$action)) return getAction(prop, $data)
    if (isDefAndNotNull(prop.$expression)) return getExpression(prop, $data)
    if (isDefAndNotNull(prop.$rql)) return getRql(prop, $data)
    return Object.entries(prop).reduce((memo, [key, value]) => ({
      ...memo,
      [key]: parseProp(value, $data),
    }), prop)
  }
  return prop
}

const connectProps = (props, $data) => {
  if (typeof props !== 'object') return props
  if (!props) return {}
  return Object.keys(props).reduce(
    (memo, key) => {
      const item = props[key]
      return {
        ...memo,
        [key]: parseProp(item, $data),
      }
    },
    {},
  )
}

const Wrapper = WrappedComponent => props => (
  <ComponentsWrapper
    fallback={
      <LoadingIndicator style={{ width: '100vw', height: '100vh' }} size={100} />
    }
  >
    {({ default: components }) => (<WrappedComponent {...props} coreComponents={components} />)}
  </ComponentsWrapper>
)

const BaseComponent = Wrapper(({ component, coreComponents }) => {
  const $store = React.useContext(StoreContext)
  const $page = React.useContext(PageStoreContext)
  const $auth = React.useContext(AuthStoreContext)
  const $context = React.useContext(ContextContext)
  const $form = React.useContext(FormContext)

  React.useEffect(() => {
    if (component) component.loadChunk()
  }, [component])
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const tmpSearchParams = new URLSearchParams(location.search)
  const searchParams = Array.from(tmpSearchParams.keys()).reduce((memo, key) => ({
    ...memo,
    [key]: tmpSearchParams.getAll(key),
  }), {})

  const $data = {
    $store,
    $route: { history, params, location, searchParams },
    $context,
    $form,
    $page,
    $auth,
    $global: {
      window,
      moment,
    },
  }

  return useObserver(() => {
    if (!component || !(component.nodes || component.staticNodes)) return null
    return [...component.nodes, ...component.staticNodes].map((childComponent) => {
      if (!childComponent) return null
      const Component = coreComponents[childComponent.type] || childComponent.type
      const childBaseComponent = <BaseComponent key="Base" component={childComponent} />
      const connectedProps = childComponent.props
        ? connectProps(childComponent.props, $data)
        : {}
      if (typeof childComponent !== 'object') {
        return childComponent
      } else if (!connectedProps.children && childComponent.nodes.length) {
        connectedProps.children = [childBaseComponent]
      }

      return <Component key={childComponent.id} {...connectedProps} />
    })
  })
})

export default BaseComponent
export { parseProp }
