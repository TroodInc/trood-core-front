import React from 'react'
import classNames from 'classnames'
import { Element, useNode } from '@craftjs/core'

import List from '../index'
import Paginator from '../../internal/Paginator'
import Settings from './Settings'
// import Context from '../../Context'

import styles from './index.module.css'


const apiEntity = {
  getPage: () => [],
  getPageLoading: () => false,
  getPagesCount: () => 10,
  getInfinityPages: () => [],
  getInfinityPagesLoading: () => false,
  getInfinityNextPage: () => {},
  getInfinityNextPageNumber: () => 0,
}

const CraftList = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode()
  const { className, onlyRender, visualHelp, pagination, entity, ...rest } = props

  let entityIsApi
  if (entity && entity.path) {
    const entityApiMatch = entity.path.match(/\$store\.apis\.([a-z0-9\-_]+)\.([a-z0-9\-_]+)$/)
    if (entityApiMatch) {
      entityIsApi = entityApiMatch[1] !== 'default' && entityApiMatch[2] !== 'default'
    }
  }
  
  return (
    <Paginator
      {...pagination}
      {...rest}
      innerRef={onlyRender ? undefined : ref => connect(drag(ref))}
      className={classNames(className, visualHelp && styles.visualHelp)}
      controlsClassName={styles.disableEvents}
      entity={entityIsApi ? apiEntity : Array(100)}
    >
      {/* TODO <Context> after dataSelector */}
      {() => {
        if (onlyRender) return rest.nodes
        return (
          <Element
            id="listRow"
            is="div"
            className={visualHelp && styles.itemVisualHelp}
            canvas
            custom={{ displayName: 'List Item' }}
          />
        )
      }}
    </Paginator>
  )
}

CraftList.craft = {
  displayName: 'List',
  props: {
    ...List.defaultProps,
  },
  custom: {
    ...List.transformFunctions,
  },
  related: {
    settings: Settings,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftList
