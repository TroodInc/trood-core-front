import React from 'react'
import PropTypes from 'prop-types'

import Tags from '../index'
import { HTML_TAGS } from '../constants'


const HtmlTags = props => <Tags {...props} />

HtmlTags.defaultProps = {
  tag: 'div',
}

HtmlTags.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.oneOf(HTML_TAGS),
}

HtmlTags.knownTags = HTML_TAGS

export default HtmlTags
