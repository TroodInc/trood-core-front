import React from 'react'
import PropTypes from 'prop-types'

import Tags from '../index'
import { SVG_TAGS } from '../constants'


const SvgTags = props => <Tags {...props} />

SvgTags.defaultProps = {
  tag: 'svg',
}

SvgTags.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.oneOf(SVG_TAGS),
}

SvgTags.knownTags = SVG_TAGS

export default SvgTags
