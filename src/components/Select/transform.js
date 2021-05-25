const transformFunctions = {
  loadTransform: (node, nodes, standardTransform) => {
    const type = typeof node.type === 'string' ? node.type : (node.type || {}).resolvedName
    const labelNodes = nodes[node.linkedNodes.itemView].nodes.map(node => standardTransform(nodes[node]))
    return {
      type,
      props: {
        ...node.props,
        labelNodes,
      },
      nodes: [],
    }
  },
}

export default transformFunctions
