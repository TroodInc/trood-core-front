const deleteNodes = (delNodes = [], nodes) => {
  delNodes.forEach(n => {
    const { nodes: subNodes } = nodes[n]
    if (subNodes && subNodes.length) {
      deleteNodes(subNodes, nodes)
    }
    delete nodes[n]
  })
}

const transformFunctions = {
  saveTransform: (nodes = {}) => {
    Object.keys(nodes)
      .filter(key => nodes[key].type === 'Table' || nodes[key].type.resolvedName === 'Table')
      .forEach(key => {
        const t = nodes[key]
        const { columns } = t.props
        Object.keys(t.linkedNodes)
          .filter(delKey => +delKey.replace(/\D*/, '') >= columns)
          .forEach(delKey => {
            const delNodeId = t.linkedNodes[delKey]
            delete nodes[key].linkedNodes[delKey]
            deleteNodes([delNodeId], nodes)
          })
      })
    return nodes
  },
  loadTransform: (node, nodes, standardTransform) => {
    const type = typeof node.type === 'string' ? node.type : (node.type || {}).resolvedName
    const columnComponentsLength = Object.keys(node.linkedNodes).length / 2
    const columnComponents = Array(columnComponentsLength).fill(0).map((_, i) => ({
      headerCell: standardTransform(nodes[node.linkedNodes[`th${i}`]]),
      bodyCell: standardTransform(nodes[node.linkedNodes[`td${i}`]]),
    }))
    return {
      type,
      props: {
        ...node.props,
        columnComponents,
      },
      nodes: [],
    }
  },
}

export default transformFunctions
