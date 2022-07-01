import React, { useContext } from 'react'
import styled from 'styled-components'

import EditorContext from '$trood/composerContext'

import 'styles/variables.css'

import ErrorWrapper from './internal/ErrorWrapper/index.craft'

import Switch from './Switch/craft'
import Route from './Route/craft'
import Link from './Link/craft'
import NavLink from './NavLink/craft'
import Redirect from './Redirect/craft'

import Context from './Context/craft'
import Container from './Container/craft'
import Block from './Block/craft'
import Modal from './Modal/craft'

import HtmlTags from './Tags/HtmlTags/craft'
import SvgTags from './Tags/SvgTags/craft'

import Button from './Button/craft'
import Typography from './Typography/craft'
import Currency from './Currency/craft'
import Image from './Image/craft'
import ImageGallery from './ImageGallery/craft'
import Select from './Select/craft'

import Table from './Table/craft'
import List from './List/craft'

import Input from './Input/craft'
import Checkbox from './Checkbox/craft'
import RadioButton from './RadioButton/craft'
import DateTimePicker from './DateTimePicker/craft'

import Fragment from './Fragment/craft'
import Form from './Form/craft'
import Remote from './Remote/craft'
import Conditional from './Conditional/craft'
import FileInput from './FileInput/craft'


const components = {
  Switch,
  Route,
  Redirect,
  Link,
  NavLink,
  Context,
  Container,
  Block,
  Modal,
  HtmlTags,
  SvgTags,
  Button,
  Typography,
  Currency,
  Image,
  ImageGallery,
  Table,
  List,
  Input,
  Checkbox,
  RadioButton,
  DateTimePicker,
  Fragment,
  Select,
  Form,
  Remote,
  Conditional,
  FileInput,
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
