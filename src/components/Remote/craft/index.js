import React from 'react'
import { useNode } from '@craftjs/core'

import Settings from './Settings'

import { COMPONENT_GROUPS } from '../../../constants'

import Remote from '../index'


const CraftRemote = props => {
  const {
    connectors: { connect, drag },
  } = useNode((node) => ({ props: node.data.props }))
  const { onlyRender, visualHelp, url, ...rest } = props

  const ref = onlyRender ? undefined : ref => connect(drag(ref))

  if (!url) {
    return (
      <div style={{ height: 24, wigth: 64, background: '#aaa9' }} ref={ref}>
        Empty component url
      </div>
    )
  }

  return (
    <div ref={ref}>
      <Remote
        {...rest}
        url={url}
      />
    </div>
  )
}

CraftRemote.craft = {
  displayName: 'Remote',
  related: {
    settings: Settings,
  },
}

export default CraftRemote
