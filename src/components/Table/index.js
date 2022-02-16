import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import deepEqual from 'deep-equal'
import get from 'lodash/get'
import Context from '../Context'

import Paginator, { PAGINATION_TYPES } from '../internal/Paginator'
import Checkbox from '../Checkbox'

import transform from './transform'
import styles from './index.module.css'


class Table extends PureComponent {
  static defaultProps = {
    pagination: Paginator.defaultProps,
    checkedValuePath: 'id',
    onCheck: () => {},
  }

  static propTypes = {
    className: PropTypes.string,
    entity: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({
        getPage: PropTypes.func,
        getPageLoading: PropTypes.func,
        getPagesCount: PropTypes.func,
        getInfinityPages: PropTypes.func,
        getInfinityPagesLoading: PropTypes.func,
        getInfinityNextPage: PropTypes.func,
        getInfinityNextPageNumber: PropTypes.func,
      }),
    ]),
    queryOptions: PropTypes.shape({
      headers: PropTypes.object,
      hash: PropTypes.string,
      cacheMaxAgeMs: PropTypes.number,
      filters: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }),
    headerCell: PropTypes.object,
    bodyCell: PropTypes.object,
    pagination: PropTypes.shape({
      paginationType: PropTypes.oneOf(Object.values(PAGINATION_TYPES)),
      defaultPageSize: PropTypes.number,
      pagesControlsCount: PropTypes.number,
      pageSizes: PropTypes.arrayOf(PropTypes.number),
      scrollContainerSelector: PropTypes.string,
      topControls: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object)]),
      bottomControls: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object)]),
      infinityControls: PropTypes.oneOfType([PropTypes.bool, PropTypes.arrayOf(PropTypes.object)]),
    }),
    checked: PropTypes.bool,
    checkedValuePath: PropTypes.string,
    checkedValues: PropTypes.array,
    onCheck: PropTypes.func,
  }

  static transformFunctions = transform

  constructor(props) {
    super(props)

    this.getAllValues = this.getAllValues.bind(this)
    this.getAllChecked = this.getAllChecked.bind(this)
    this.toggleAllValues = this.toggleAllValues.bind(this)
    this.toggleChecked = this.toggleChecked.bind(this)
  }

  getAllValues(items) {
    return items.map(item => get(item, this.props.checkedValuePath)).sort()
  }

  getAllChecked(items) {
    if (!items || !items.length) return false
    const allValues = this.getAllValues(items)
    return deepEqual(allValues, (this.props.checkedValues || []).sort())
  }

  toggleAllValues(items) {
    const { onCheck } = this.props
    const allChecked = this.getAllChecked(items)
    if (allChecked) {
      return () => onCheck([])
    }
    return () => onCheck(this.getAllValues(items))
  }

  toggleChecked(value) {
    const { checkedValues = [], onCheck } = this.props
    if (checkedValues.includes(value)) {
      return () => onCheck(checkedValues.filter(v => v !== value))
    }
    return () => onCheck([...checkedValues, value])
  }

  render() {
    const {
      innerRef,
      className,
      entity,
      queryOptions,
      headerCells,
      bodyCells,
      pagination,

      checked,
      checkedValuePath,
      checkedValues = [],
    } = this.props

    return (
      <Paginator {...pagination} innerRef={innerRef} className={className} entity={entity} queryOptions={queryOptions}>
        {({ items }) => {
          const allChecked = this.getAllChecked(items)
          return (
            <table className={styles.table}>
              <thead>
                <tr>
                  {checked && (
                    <th className={styles.checkbox}>
                      <Checkbox
                        value={allChecked}
                        onChange={this.toggleAllValues(items)}
                      />
                    </th>
                  )}
                  {headerCells}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  const thisValue = get(item, checkedValuePath)
                  const thisChecked = checkedValues.includes(thisValue)
                  return (
                    <Context key={i} context={{ ...item, $index: i }}>
                      <tr>
                        {checked && (
                          <td className={styles.checkbox}>
                            <Checkbox
                              value={thisChecked}
                              onChange={this.toggleChecked(thisValue)}
                            />
                          </td>
                        )}
                        {bodyCells}
                      </tr>
                    </Context>
                  )
                })}
              </tbody>
            </table>
          )
        }}
      </Paginator>
    )
  }
}

export default Table
