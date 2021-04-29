import React, { forwardRef } from 'react'
import styled from 'styled-components'

import Context from './Context'

import GridRow from './Grids/Row'
import GridCell from './Grids/Cell'
import GridContainer from './Grids/Container'
import Conditional from './Conditional'

import HtmlTags from './Tags/HtmlTags'
import SvgTags from './Tags/SvgTags'

import { Link, NavLink, Switch } from 'react-router-dom'

import Block from './Block'
import Button from './Button'
import Checkbox from './Checkbox'
import DateTimePicker from './DateTimePicker'
import Icon from './Icon'
import Input from './Input'
import Label from './Label'
import List from './List'
import LoadingIndicator from './LoadingIndicator'
import Menu from './Menu'
import Modal from './Modal'
import PeriodSelector from './PeriodSelector'
import Popup from './Popup'
import RadioButton from './RadioButton'
import Range from './Range'
import Remote from './Remote'
import Route from './Route'
import Spacer from './Spacer'
import Select from './Select'
import Table from './Table'
import Typography from './Typography'
import Image from './Image'
import Fragment from './Fragment'

const components = {
  Context,
  GridRow,
  GridCell,
  GridContainer,
  Conditional,
  HtmlTags,
  SvgTags,
  Link,
  NavLink,
  Switch,
  Block,
  Button,
  Checkbox,
  DateTimePicker,
  Icon,
  Input,
  Label,
  List,
  LoadingIndicator,
  Menu,
  Modal,
  PeriodSelector,
  Popup,
  RadioButton,
  Range,
  Remote,
  Route,
  Select,
  Spacer,
  Table,
  Typography,
  Image,
  Fragment,
}

export default Object.keys(components).reduce((memo, key) => {
  const Component = components[key]
  const refComponent = forwardRef((props, ref) => <Component {...props} innerRef={ref} />)
  const styledComponent = styled(refComponent)`${(props = {}) => props.style || ''}`
  styledComponent.defaultProps = Component.defaultProps
  styledComponent.displayName = Component.displayName
  styledComponent.transformFunctions = Component.transformFunctions

  return {
    ...memo,
    [key]: styledComponent,
  }
}, {})
