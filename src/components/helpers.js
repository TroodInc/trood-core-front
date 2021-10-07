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