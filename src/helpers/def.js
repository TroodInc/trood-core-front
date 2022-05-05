export const isDef = val => val !== undefined

export const isNotNull = val => val !== null

export const isDefAndNotNull = val => isDef(val) && isNotNull(val)

export const isDefNotNullNotEmpty = v => {
  return v !== '' && isDefAndNotNull(v)
}

export const isPureObject = val => {
  if (typeof val !== 'object' || val === null) return false
  return val.constructor === Object || val.constructor === Array
}
