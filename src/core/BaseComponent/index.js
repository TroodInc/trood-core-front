import React from 'react'
import moment from 'moment'
import StoreContext from 'core/StoreContext'
import PageStoreContext from 'core/PageStoreContext'
import AuthStoreContext from 'core/AuthStoreContext'
import ContextContext from 'core/ContextContext'
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
    let $result
    actions.map(async action => {
      try {
        $result = await execAction(action.action, actionProp, { ...$data, $event, $result })
        if (action.then) {
          const thens = Array.isArray(action.then) ? action.then : [action.then]
          thens.forEach(async then => {
            $result = await execAction(then, actionProp, { ...$data, $event, $result })
          })
        }
      } catch ($resultError) {
        console.error($resultError)
        if (action.catch) $result = await execAction(action.catch, actionProp, { ...$data, $event, $resultError })
      } finally {
        if (action.finally) $result = await execAction(action.catch, actionProp, { ...$data, $event, $result })
      }
      return $result
    })
  }
}

const getExpression = (expressionProp, $data) => {
  const parser = new Parser()
  parser.functions.data = function (path) {
    const dataProp = {
      $data: `{{${path}}}`,
    }
    return getData(dataProp, $data)
  }
  return parser.evaluate(expressionProp.$expression)
}

const parseProp = (prop, $data, deep) => {
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
    $page,
    $auth,
    $global: {
      window,
      moment,
    },
  }

  return useObserver(() => {
    if (!component || !component.nodes) return null
    return component.nodes.map((childComponent) => {
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
