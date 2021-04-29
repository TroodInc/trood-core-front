import React, { useContext } from 'react'
import styled from 'styled-components'

import EditorContext from '$trood/composerContext'

import 'styles/variables.css'

import ErrorWrapper from './internal/ErrorWrapper'

import Switch from './Switch/craft'
import Route from './Route/craft'
import Link from './Link/craft'
import NavLink from './NavLink/craft'

import Block from './Block/craft'

import GridContainer from './Grids/Container/craft'
import GridRow from './Grids/Row/craft'
import GridCell from './Grids/Cell/craft'

import HtmlTags from './Tags/HtmlTags/craft'
import SvgTags from './Tags/SvgTags/craft'

import Button from './Button/craft'
import Typography from './Typography/craft'
import Image from './Image/craft'

import Table from './Table/craft'
import List from './List/craft'

import Fragment from './Fragment/craft'


const components = {
  Switch,
  Route,
  Link,
  NavLink,
  Block,
  GridContainer,
  GridRow,
  GridCell,
  HtmlTags,
  SvgTags,
  Button,
  Typography,
  Image,
  Table,
  List,
  Fragment,
}

export default Object.keys(components).reduce((memo, key) => {
  const Component = components[key]
  const WrappedComponent = ({ onError, ...props }) => {
    const globalProps = useContext(EditorContext)
    return (
      <ErrorWrapper onError={onError} childrenProps={props}>
        <Component {...globalProps} {...props} />
      </ErrorWrapper>
    )
  }
  WrappedComponent.craft = Component.craft
  WrappedComponent.craft.related = Object.keys(WrappedComponent.craft.related || {}).reduce((memo, key) => {
    const RComponent = WrappedComponent.craft.related[key]
    return {
      ...memo,
      [key]: props => {
        const globalProps = useContext(EditorContext)
        return <RComponent {...globalProps} {...props} />
      },
    }
  }, {})

  return {
    ...memo,
    [key]: styled(WrappedComponent)`${(props = {}) => props.style || ''}`,
  }
}, {})
