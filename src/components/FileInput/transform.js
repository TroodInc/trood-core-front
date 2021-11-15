const transformFunctions = {
  loadTransform: (node, nodes, standardTransform) => {
    const type = typeof node.type === 'string' ? node.type : (node.type || {}).resolvedName
    return {
      type,
      props: {
        ...node.props,
        labelComponent: standardTransform(nodes[node.linkedNodes.label]),
        valueComponent: standardTransform(nodes[node.linkedNodes.value]),
      },
      nodes: [],
    }
  },
}

export default transformFunctions
