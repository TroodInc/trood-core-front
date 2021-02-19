import styled from 'styled-components'

import 'styles/variables.css'

import Block from './Block/craft'

import GridContainer from './Grids/Container/craft'
import GridRow from './Grids/Row/craft'
import GridCell from './Grids/Cell/craft'

import HtmlTags from './Tags/HtmlTags/craft'
import SvgTags from './Tags/SvgTags/craft'

import Button from './Button/craft'
import Typography from './Typography/craft'

const components = {
  Block,
  GridContainer,
  GridRow,
  GridCell,
  HtmlTags,
  SvgTags,
  Button,
  Typography,
}

export default Object.keys(components).reduce((memo, key) => {
  const Component = components[key]
  return {
    ...memo,
    [key]: styled(Component)`${(props = {}) => props.style || ''}`,
  }
}, {})
