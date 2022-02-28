import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import styles from './index.module.css'

const getPathname = (path, basePath, location) => {
  const basePathArray = basePath.split('/').filter(v => v)
  const currentPathArray = /^\//.test(path) ? [] : location.pathname.split('/').filter(v => v)
  const nextPathArray = [...basePathArray, ...currentPathArray.slice(0, currentPathArray.length - 1)]
  nextPathArray.push(...path.split('/').filter(v => v))
  return `/${nextPathArray.join('/')}`
}

const Menu = ({
  innerRef,
  className,
  basePath = '',
  type = 'vertical',
  items = [],
  itemActiveStyle,
}) => {
  const location = useLocation()

  if (items.length <= 1) return null

  let redirectTo

  const menuItems = items.map((item, i) => {
    const nodes = []
    let to
    if (!item.path) {
      nodes.push(
        <div
          key={`item_${i}`}
          className={styles.link}
        >
          {item.children || item.title}
        </div>,
      )
    } else {
      to = getPathname(item.path, basePath, location)

      if (!redirectTo && item.redirectTo && item.path === location.pathname) {
        redirectTo = getPathname(item.redirectTo, basePath, location)
      }

      nodes.push(
        <NavLink
          key={`link_${i}`}
          to={to}
          className={styles.link}
          activeClassName={styles.activeLink}
          activeStyle={itemActiveStyle}
        >
          {item.children || item.title || item.path}
        </NavLink>,
      )
    }
    if (item.items) {
      nodes.push(
        <Menu
          key={`menu_${i}`}
          basePath={to}
          className={styles.subMenu}
          type={type}
          items={item.items}
          itemActiveStyle={itemActiveStyle}
        >
          {item.children || item.title || item.path}
        </Menu>,
      )
    }
    return (
      <div key={i} className={styles.menuItem}>
        {nodes}
      </div>
    )
  })

  return (
    <div ref={innerRef} className={classNames(className, styles.root, styles[type])}>
      {menuItems}
      {redirectTo && (
        <Redirect to={redirectTo} />
      )}
    </div>
  )
}

const maxItemsDepth = 3
let itemsDepth = 0

const getItemsPropType = () => {
  if (itemsDepth < maxItemsDepth) {
    itemsDepth += 1
    return PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
      title: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.object,
      ]),
      redirectTo: PropTypes.string,
      children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.object,
      ]),
      items: getItemsPropType(),
    }))
  }
  return PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
    redirectTo: PropTypes.string,
    children: PropTypes.node,
  }))
}

Menu.propTypes = {
  className: PropTypes.string,
  basePath: PropTypes.string,
  type: PropTypes.oneOf(['vertical', 'horizontal']),
  itemActiveStyle: PropTypes.object,
  items: getItemsPropType(),
}

export default Menu
