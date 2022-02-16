const transformFunctions = {
  loadTransform: (node, nodes, standardTransform) => {
    const type = typeof node.type === 'string' ? node.type : (node.type || {}).resolvedName
    const innerNodes = nodes[node.linkedNodes['listRow']]?.nodes || []
    return {
      type,
      props: {
        ...node.props,
        nodes: {
          $component: innerNodes.map(n => standardTransform(nodes[n])),
        },
      },
      nodes: [],
    }
  },
}

export default transformFunctions
