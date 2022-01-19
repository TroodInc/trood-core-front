import React from 'react'
import moment from 'moment'
import StoreContext from 'core/StoreContext'
import PageStoreContext from 'core/PageStoreContext'
import AuthStoreContext from 'core/AuthStoreContext'
import ContextContext from 'core/ContextContext'
import FormContext from 'core/FormContext'
import { useObserver } from 'mobx-react-lite'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Parser } from 'expr-eval'

import LoadingIndicator from 'components/LoadingIndicator'
import { isDefAndNotNull } from 'helpers/def'

import loadable from '@loadable/component'


const ComponentsWrapper = loadable.lib(() => import('components'))

const getData = (dataProp, $data) => {
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
            const argsArray = args.split(',').map(arg => (
              parseProp(dataProp[arg.trim()], $data, true)
            ))
            const f = (memo || {})[key.replace(/\[([^\]]*)]/g, '')]
            if (typeof f !== 'function') return undefined
            return f(...argsArray)
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
  return value
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
        result = result.catch($resultError => execAction(action.catch, actionProp, { ...$data, $event, $resultError }))
      }
      if (action.finally) {
        result = result.catch($result => execAction(action.catch, actionProp, { ...$data, $event, $result }))
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

const getDataFunc = (expressionProp, $data) => (path) => {
  const dataProp = {
    ...expressionProp,
    $data: `{{${path}}}`,
  }
  return getData(dataProp, $data)
}

const getExpression = (expressionProp, $data) => {
  parser.functions.data = getDataFunc(expressionProp, $data)
  return parser.evaluate(expressionProp.$expression)
}

const parseProp = (prop, $data, deep) => {
  if (!prop) return prop
  if (Array.isArray(prop)) {
    return prop.map(value => parseProp(value, $data))
  }
  if (typeof prop === 'object') {
    if (isDefAndNotNull(prop.$data)) return getData(prop, $data)
    if (isDefAndNotNull(prop.$action)) return getAction(prop, $data)
    if (isDefAndNotNull(prop.$expression)) return getExpression(prop, $data)
    if (deep) {
      return Object.entries(prop).reduce((memo, [key, value]) => ({
        ...memo,
        [key]: parseProp(value, $data, deep),
      }), prop)
    }
  }
  return prop
}

const connectProps = (props, $data, childBaseComponent) => {
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
        ? connectProps(childComponent.props, $data, childBaseComponent)
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
