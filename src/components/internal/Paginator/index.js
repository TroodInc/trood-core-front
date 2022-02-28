import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Observer } from 'mobx-react-lite'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import ContextContext from 'core/ContextContext'
import Context from '../../Context'

import Select from '../../Select'
import LoadingIndicator from '../../LoadingIndicator'
import { PAGINATION_TYPES, FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT } from './constants'

import styles from './index.module.css'


class Paginator extends PureComponent {
  static defaultProps = {
    defaultPageSize: 10,
    pagesControlsCount: 5,
    paginationType: PAGINATION_TYPES.classic,
    pageSizes: [10, 25, 50, 100],
    flexDirection: FLEX_DIRECTION.column,
    alignItems: ALIGN_ITEMS.stretch,
    justifyContent: JUSTIFY_CONTENT.flexStart,
  }

  constructor(props) {
    super(props)

    this.scrollContainerNode = null
    this.mount = false
    this.state = {
      page: 0,
      pageSize: props.defaultPageSize,
    }

    this.setScrollEvent = this.setScrollEvent.bind(this)
    this.handleScroll = debounce(this.handleScroll.bind(this), 200)
    this.goToPage = this.goToPage.bind(this)
    this.renderClassicControls = this.renderClassicControls.bind(this)
    this.renderInfinityControls = this.renderInfinityControls.bind(this)
  }

  componentDidMount() {
    this.mount = true
    this.setScrollEvent()
  }

  componentWillUnmount() {
    if (this.scrollContainerNode) {
      this.scrollContainerNode.removeEventListener('scroll', this.handleScroll)
    }
  }

  setScrollEvent() {
    const { paginationType, scrollContainerSelector } = this.props
    if (paginationType !== PAGINATION_TYPES.infinity) return

    this.scrollContainerNode = document.querySelector(scrollContainerSelector)
    if (!this.scrollContainerNode) return
    this.scrollContainerNode.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }

  handleScroll() {
    if (this.scrollContainerNode) {
      const { entity, queryOptions } = this.props
      const { page, pageSize } = this.paginator
      const scrollBottom = this.scrollContainerNode.scrollTop + this.scrollContainerNode.offsetHeight
      const scrollDelta = this.scrollContainerNode.scrollHeight - 100
      let loading
      let nextPage
      if (scrollBottom > scrollDelta) {
        if (!Array.isArray(entity)) {
          loading = entity.getInfinityPagesLoading(pageSize, queryOptions)
          nextPage = entity.getInfinityNextPageNumber(pageSize, queryOptions)
          if (nextPage && !loading) {
            entity.getInfinityNextPage(pageSize, queryOptions)
          }
        } else {
          nextPage = page + 1
          if (nextPage * pageSize > entity.length) {
            nextPage = undefined
          }
        }
        if (nextPage) {
          this.setState({ page: nextPage, pageSize: pageSize })
        }
      }
    }
  }

  get paginator() {
    const {
      paginationType,
      history,
      defaultPageSize,
    } = this.props

    if (paginationType === PAGINATION_TYPES.disabled) {
      return { page: 0, pageSize: 0 }
    }

    if (paginationType === PAGINATION_TYPES.infinity) {
      return {
        page: this.state.page,
        pageSize: this.state.pageSize,
      }
    }

    const searchParams = new URLSearchParams(history.location.search)
    const page = searchParams.get('page')
    const pageSize = searchParams.get('pageSize')

    return {
      page: page ? +page : 0,
      pageSize: pageSize ? +pageSize : defaultPageSize,
    }
  }

  renderClassicControls(bottom) {
    const {
      paginationType,
      entity,
      queryOptions,
      pagesControlsCount,
      pageSizes,
      topControls,
      bottomControls,
      controlsClassName,
    } = this.props

    if (
      !entity ||
      paginationType !== PAGINATION_TYPES.classic ||
      (topControls === false && !bottom) ||
      (bottomControls === false && bottom)
    ) return null

    const { page, pageSize } = this.paginator

    let pagesCount = 0
    if (Array.isArray(entity)) {
      pagesCount = Math.ceil(entity.length / pageSize)
    } else {
      pagesCount = entity.getPagesCount(pageSize, queryOptions)
    }

    const pages = Array(Math.min(pagesControlsCount, pagesCount))
      .fill(page)
      .map((item, i, arr) => item + i - Math.floor(arr.length / 2))
      .filter(item => item >= 0 && item < (pagesCount - 1))
    while (pages.length < pagesControlsCount && pages[pages.length - 1] < (pagesCount - 1)) {
      pages.push(pages[pages.length - 1] + 1)
    }
    while (pages.length < pagesControlsCount && pages[0] > 0) {
      pages.unshift(pages[0] - 1)
    }

    if ((topControls && !bottom) || (bottomControls && bottom)) {
      const controls = bottom ? bottomControls : topControls
      return (
        <Context context={{
          pagesCount,
          pageSize,
          currentPage: page,
          goToPage: this.goToPage,
        }}>
          {controls}
        </Context>
      )
    }

    return (
      <div className={classNames(styles.classicControls, controlsClassName)}>
        <div className={styles.pages}>
          {pages[0] > 0 && (
            <div
              className={styles.page}
              onClick={() => this.goToPage(0, pageSize)}
            >
              1
            </div>
          )}
          {pages[0] > 1 && (
            <div className={styles.pageSplitter}>...</div>
          )}
          {pages.map(item => (
            <div
              key={item}
              className={classNames(styles.page, item === page && styles.activePage)}
              onClick={() => this.goToPage(item, pageSize)}
            >
              {item + 1}
            </div>
          ))}
          {pages[pages.length - 1] < pagesCount - 2 && (
            <div className={styles.pageSplitter}>...</div>
          )}
          {pages[pages.length - 1] < pagesCount - 1 && (
            <div
              className={styles.page}
              onClick={() => this.goToPage(pagesCount - 1, pageSize)}
            >
              {pagesCount}
            </div>
          )}
        </div>
        <Select {...{
          className: styles.select,
          controlClassName: styles.selectControl,
          labelClassName: styles.selectLabel,
          label: 'per page',
          labelNodes: (
            <ContextContext.Consumer>
              {$context => <div>{$context.label}</div>}
            </ContextContext.Consumer>
          ),
          items: pageSizes.map(value => ({ value, label: value })),
          value: pageSize,
          openUp: bottom,
          onChange: value => this.goToPage(0, value),
        }} />
      </div>
    )
  }

  renderInfinityControls() {
    const {
      entity,
      queryOptions,
      paginationType,
      infinityControls,
      controlsClassName,
    } = this.props

    const { page, pageSize } = this.paginator

    if (!entity || paginationType !== PAGINATION_TYPES.infinity ||
      infinityControls === false || !this.mount || this.scrollContainerNode) return null

    let nextPage
    if (!Array.isArray(entity)) {
      nextPage = entity.getInfinityNextPageNumber(pageSize, queryOptions)
    } else {
      nextPage = page + 1
      if (nextPage * pageSize > entity.length) {
        nextPage = undefined
      }
    }

    if (nextPage === undefined) return null

    if (infinityControls) {
      return (
        <Context context={{
          loadNextPage: () => {
            if (!Array.isArray(entity)) {
              entity.getInfinityNextPage(pageSize, queryOptions)
            }
            this.setState({ page: nextPage, pageSize: pageSize })
          },
        }}>
          {infinityControls}
        </Context>
      )
    }

    return (
      <div className={classNames(styles.loadMore, controlsClassName)} onClick={() => {
        if (!Array.isArray(entity)) {
          entity.getInfinityNextPage(pageSize, queryOptions)
        }
        this.setState({ page: nextPage, pageSize: pageSize })
      }}>
        Load More...
      </div>
    )
  }

  goToPage(p, ps) {
    const { history } = this.props

    const page = p === undefined ? this.paginator.page : p
    const pageSize = ps === undefined ? this.paginator.pageSize : ps

    const searchParams = new URLSearchParams(history.location.search)

    searchParams.set('page', page.toString())
    searchParams.set('pageSize', pageSize.toString())
    history.replace({
      ...history.location,
      search: searchParams.toString(),
    })
  }

  render() {
    const {
      innerRef,
      className,
      paginationType,
      entity,
      queryOptions,
      children,
      flexDirection,
      alignItems,
      justifyContent,
    } = this.props

    const { page, pageSize } = this.paginator

    return (
      <Observer>
        {() => {
          let items = []
          let loading = false
          if (entity) {
            if (Array.isArray(entity)) {
              loading = false
              if (paginationType === PAGINATION_TYPES.infinity) {
                items = entity.slice(0, (page + 1) * pageSize)
                this.handleScroll()
              } else if (paginationType === PAGINATION_TYPES.classic) {
                items = entity.slice(page * pageSize, (page + 1) * pageSize)
              } else {
                items = entity
              }
            } else if (paginationType === PAGINATION_TYPES.infinity) {
              items = entity.getInfinityPages(pageSize, queryOptions)
              loading = entity.getInfinityPagesLoading(pageSize, queryOptions)
              this.handleScroll()
            } else {
              items = entity.getPage(page, pageSize, queryOptions)
              loading = entity.getPageLoading(page, pageSize, queryOptions)
            }
          }

          return (
            <div ref={innerRef} className={classNames(styles.root, className)}>
              {this.renderClassicControls()}
              <div className={styles.childContainer} style={{ flexDirection, alignItems, justifyContent }}>
                {children({ items })}
              </div>
              {loading && (
                <LoadingIndicator />
              )}
              {this.renderClassicControls(true)}
              {this.renderInfinityControls()}
            </div>
          )
        }}
      </Observer>
    )
  }
}

export { PAGINATION_TYPES, FLEX_DIRECTION, ALIGN_ITEMS, JUSTIFY_CONTENT }

const wrappedPaginator = withRouter(Paginator)
wrappedPaginator.defaultProps = Paginator.defaultProps

export default wrappedPaginator
