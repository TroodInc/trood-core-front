import React from 'react'
import PropTypes from 'prop-types'
import Context from '../Context'

import Paginator, { PAGINATION_TYPES } from '../internal/Paginator'
import transform from './transform'

const List = ({
  innerRef,
  className,
  entity,
  queryOptions,
  nodes,
  pagination = {},
}) => (
  <Paginator innerRef={innerRef} {...pagination} className={className} entity={entity} queryOptions={queryOptions}>
    {({ items }) => items.map((item, i) => (
      <Context key={i} context={{ ...item, $index: i }}>
        {nodes}
      </Context>
    ))}
  </Paginator>
)

List.propTypes = {
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
  nodes: PropTypes.object,
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
}

List.defaultProps = {
  pagination: Paginator.defaultProps,
}

List.transformFunctions = transform

export default List
