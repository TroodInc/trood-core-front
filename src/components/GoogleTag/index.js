import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TagManager from 'react-gtm-module'


class GoogleTag extends PureComponent {
  static propTypes = {
    gtmId: PropTypes.string.isRequired,
    dataLayer: PropTypes.object,
    dataLayerName: PropTypes.string,
    events: PropTypes.object,
    auth: PropTypes.string,
    preview: PropTypes.string,
  }

  componentDidMount() {
    if (this.props.gtmId) TagManager.initialize(this.props)
  }

  render() {
    return null
  }
}

export default GoogleTag
