import escapeRegExp from 'lodash/escapeRegExp'


export const DEFAULT_MAX_ROWS = 5
export const PAGINATION_STEP = 10

export const defaultFilterFunction = (search, array) => {
  if (!search) return undefined
  const regExp = new RegExp(escapeRegExp(search), 'im')
  return array.filter(item => regExp.test(item.label || item.value))
}
