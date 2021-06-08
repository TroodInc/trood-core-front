const {
  publicUrl = '',
  pageEntryUrl = '',
  storeConfigUrl = '',
} = window.coreConfig || {}

const getFullUrl = (url = '') => {
  const formattedUrl = url.replace(/^\/|\/$/g, '')
  if (!formattedUrl) return undefined

  const formattedPublicUrl = publicUrl.replace(/^\/|\/$/g, '')
  return !formattedPublicUrl ? `/${formattedUrl}` : `/${formattedPublicUrl}/${formattedUrl}`
}

export const pageEntryFullUrl = getFullUrl(pageEntryUrl)
export const storeConfigFullUrl = getFullUrl(storeConfigUrl)

export const cssMeasurementUnits = [
  'px',
  '%',
  'cm',
  'em',
  'ex',
  'in',
  'mm',
  'pc',
  'pt',
  'vw',
  'vh',
  'vmin',
]

const COMPONENT_GROUP_INPUT_CONTROLS = {
  id: 'inputControls',
  title: 'Input Controls',
}
const COMPONENT_GROUP_NAV_CONTROLS = {
  id: 'navControls',
  title: 'Navigation Controls',
}

export const COMPONENT_GROUPS = {
  [COMPONENT_GROUP_INPUT_CONTROLS.id]: COMPONENT_GROUP_INPUT_CONTROLS,
  [COMPONENT_GROUP_NAV_CONTROLS.id]: COMPONENT_GROUP_NAV_CONTROLS,
}
