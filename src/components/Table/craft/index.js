import React from 'react'
import classNames from 'classnames'
import { Element, useNode } from '@craftjs/core'

import Table from '../index'
import Paginator from '../../internal/Paginator'
import Settings from './Settings'
// import Context from '../../Context'

import baseStyles from '../index.module.css'
import styles from './index.module.css'


const entity = {
  getPage: () => [],
  getPageLoading: () => false,
  getPagesCount: () => 10,
  getInfinityPages: () => [],
  getInfinityPagesLoading: () => false,
  getInfinityNextPage: () => {},
  getInfinityNextPageNumber: () => 0,
}

const CraftTable = (props) => {
  const {
    connectors: { connect, drag },
    columns,
  } = useNode((node) => ({
    columns: node.data.props.columns,
  }))
  const { className, visualHelp, pagination, ...rest } = props
  
  return (
    <Paginator
      {...pagination}
      innerRef={(dom) => connect(drag(dom))}
      className={classNames(className, visualHelp && styles.visualHelp)}
      entity={entity}
      {...rest}
    >
      {() => (
        <table className={baseStyles.table}>
          <thead>
            <tr>
              {Array(columns).fill(0).map((item, i) => (
                <Element key={i} id={`th${i}`} is="th" canvas custom={{ displayName: 'Cell Header' }}>
                </Element>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* TODO <Context> after dataSelector */}
            <tr>
              {Array(columns).fill(0).map((item, i) => (
                <Element key={i} id={`td${i}`} is="td" canvas custom={{ displayName: 'Cell Value' }}>
                </Element>
              ))}
            </tr>
            <tr>
              {Array(columns).fill(0).map((item, i) => <td key={i}>...</td>)}
            </tr>
          </tbody>
        </table>
      )}
    </Paginator>
  )
}

CraftTable.craft = {
  displayName: 'Table',
  props: {
    ...Table.defaultProps,
    columns: 1,
  },
  custom: {
    ...Table.transformFunctions,
  },
  related: {
    settings: Settings,
  },
  rules: {
    canDrag: () => true,
  },
}

export default CraftTable
