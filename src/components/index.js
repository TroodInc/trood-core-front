import React, { forwardRef } from 'react'
import { Link, NavLink, Switch } from 'react-router-dom'
import styled from 'styled-components'

import ErrorWrapper from './internal/ErrorWrapper'

import Context from './Context'

import Conditional from './Conditional'

import HtmlTags from './Tags/HtmlTags'
import SvgTags from './Tags/SvgTags'

import Container from './Container'
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
import Form from './Form'

const components = {
  Context,
  Conditional,
  HtmlTags,
  SvgTags,
  Link,
  NavLink,
  Switch,
  Container,
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
  Form,
}

export default Object.keys(components).reduce((memo, key) => {
  const Component = components[key]
  const HandledErrorComponent = (props) => (
    <ErrorWrapper>
      <Component {...props} />
    </ErrorWrapper>
  )
  const refComponent = forwardRef((props, ref) => <HandledErrorComponent {...props} innerRef={ref} />)
  const styledComponent = styled(refComponent)`${(props = {}) => props.style || ''}`
  styledComponent.defaultProps = Component.defaultProps
  styledComponent.displayName = Component.displayName
  styledComponent.transformFunctions = Component.transformFunctions

  return {
    ...memo,
    [key]: styledComponent,
  }
}, {})
