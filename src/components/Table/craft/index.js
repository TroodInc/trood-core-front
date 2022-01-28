import React from 'react'
import classNames from 'classnames'
import { Element, useNode } from '@craftjs/core'

import Table from '../index'
import Checkbox from '../../Checkbox'
import Paginator from '../../internal/Paginator'
import Settings from './Settings'
// import Context from '../../Context'

import baseStyles from '../index.module.css'
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

const CraftTable = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode()
  const { className, onlyRender, visualHelp, columns, pagination, entity, checked, ...rest } = props

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
      {() => {
        if (onlyRender) {
          return (
            <table className={baseStyles.table}>
              <thead>
                <tr>
                  {checked && (
                    <th className={baseStyles.checkbox}>
                      <Checkbox/>
                    </th>
                  )}
                  {rest.columnComponents.map(item => item.headerCell)}
                </tr>
              </thead>
              <tbody>
                {/* TODO <Context> after dataSelector */}
                <tr>
                  {checked && (
                    <td className={baseStyles.checkbox}>
                      <Checkbox/>
                    </td>
                  )}
                  {rest.columnComponents.map(item => item.bodyCell)}
                </tr>
                <tr>
                  {checked && (
                    <td className={baseStyles.checkbox}>
                      <Checkbox/>
                    </td>
                  )}
                  {rest.columnComponents.map((_, i) => <td key={i}>...</td>)}
                </tr>
              </tbody>
            </table>
          )
        }
        return (
          <table className={baseStyles.table}>
            <thead>
              <tr>
                {checked && (
                  <th className={baseStyles.checkbox}>
                    <Checkbox/>
                  </th>
                )}
                {Array(columns).fill(0).map((item, i) => (
                  <Element key={i} id={`th${i}`} is="th" canvas custom={{ displayName: 'Cell Header' }}>
                  </Element>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* TODO <Context> after dataSelector */}
              <tr>
                {checked && (
                  <td className={baseStyles.checkbox}>
                    <Checkbox/>
                  </td>
                )}
                {Array(columns).fill(0).map((item, i) => (
                  <Element key={i} id={`td${i}`} is="td" canvas custom={{ displayName: 'Cell Value' }}>
                  </Element>
                ))}
              </tr>
              <tr>
                {checked && (
                  <td className={baseStyles.checkbox}>
                    <Checkbox/>
                  </td>
                )}
                {Array(columns).fill(0).map((item, i) => <td key={i}>...</td>)}
              </tr>
            </tbody>
          </table>
        )
      }}
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
    getStyleSettings: () => ({
      textAlign: false,
    }),
  },
  related: {
    settings: Settings,
  },
  rules: {
    canMoveIn: () => false,
  },
}

export default CraftTable
