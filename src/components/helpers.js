export const getIsNodeInNode = (id, helper, parentNodeTypes = []) => {
  let node = helper(id).toSerializedNode()
  let type = node.type.resolvedName || node.type
  let parent = node.parent
  while (parent && !parentNodeTypes.includes(type)) {
    node = helper(parent).toSerializedNode()
    type = node.type.resolvedName || node.type
    parent = node.parent
  }
  return parentNodeTypes.includes(type)
}

export const stringifyValue = value => {
  if (!value) return ''
  if (['string', 'number'].includes(typeof value)) return value.toString()
  if (Array.isArray(value)) return 'Array[]'
  if (typeof value === 'object') {
    if (value?.$data) return `$data: ${value.$data}`
    if (value?.$rql) return '$rql'
    if (value?.$expression) return '$expression'
  }
  return ''
}
