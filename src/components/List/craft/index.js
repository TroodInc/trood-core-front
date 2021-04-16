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
  const { className, visualHelp, pagination, entity, ...rest } = props

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
      innerRef={(dom) => connect(drag(dom))}
      className={classNames(className, visualHelp && styles.visualHelp)}
      entity={entityIsApi ? apiEntity : []}
    >
      {/* TODO <Context> after dataSelector */}
      {() => (
        <Element id="listRow" is="div" canvas custom={{ displayName: 'List Item' }}>
        </Element>
      )}
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
