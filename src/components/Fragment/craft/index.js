import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { useNode } from '@craftjs/core'
import loadable from '@loadable/component'

import styles from './index.module.css'
import Settings from './Settings'


const ComponentsWrapper = loadable.lib(() => import('../../index.craft'))

const renderNode = (node, nodes, components, rootProps) => {
  if (!node) {
    return <div>No Fragment</div>
  }
  let type = node.type?.resolvedName || node.type
  type = components[type] || type
  if (typeof type?.craft?.custom?.loadTransform === 'function') {
    const tNode = type.craft.custom.loadTransform(node, nodes, n => renderNode(n, nodes, components, rootProps))
    const children = (tNode.nodes || []).length ?
      (tNode.nodes || []).map(n => renderNode(nodes[n], nodes, components, rootProps)) : undefined
    const realType = components[tNode.type] || tNode.type
    return React.createElement(
      realType,
      { ...tNode.props, onlyRender: true, visualHelp: rootProps.visualHelp },
      children,
    )
  }
  const children = (node.nodes || []).length ?
    (node.nodes || []).map(n => renderNode(nodes[n], nodes, components, rootProps)) : undefined
  return React.createElement(
    type,
    { ...node.props, onlyRender: true, visualHelp: rootProps.visualHelp },
    children,
  )
}

const CraftFragment = (props) => {
  const [config, setConfig] = useState({})

  const {
    connectors: { connect, drag },
    custom,
  } = useNode((node) => ({
    props: node.data.props,
    custom: node.data.custom,
  }))

  const {
    visualHelp,
    emApplicationFragmentEntities,
    applicationCurrentFragment,
    currentApplicationId,
  } = props

  const fragmentAlias = (custom.chunk || '').replace(/^fragments\//, '').replace(/\.json$/, '')

  useEffect(() => {
    if (fragmentAlias) {
      emApplicationFragmentEntities.asyncGetArray({
        filter: {
          rql: `eq(application,${currentApplicationId}),eq(alias,${fragmentAlias})`,
          // ,not(eq(id,${applicationCurrentFragment}))`,
        },
      })
        .then((res = []) => {
          if(res.length === 1) {
            setConfig(res[0].config || {})
          } else {
            setConfig({})
          }
        })
    }
  }, [currentApplicationId, applicationCurrentFragment, fragmentAlias])

  return (
    <div
      ref={ref => connect(drag(ref))}
      className={classNames({ [styles.visualHelp]: visualHelp })}
    >
      <ComponentsWrapper>
        {({ default: components }) => renderNode(config.ROOT, config, components, props)}
      </ComponentsWrapper>
    </div>
  )
}

CraftFragment.craft = {
  displayName: 'Fragment',
  related: {
    settings: Settings,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftFragment
