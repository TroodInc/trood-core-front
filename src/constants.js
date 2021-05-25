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
