const transformFunctions = {
  loadTransform: (node, nodes, standardTransform) => {
    const type = typeof node.type === 'string' ? node.type : (node.type || {}).resolvedName
    return {
      type,
      props: {
        ...node.props,
        trueComponent: [standardTransform(nodes[node.linkedNodes.true])],
        falseComponent: [standardTransform(nodes[node.linkedNodes.false])],
      },
      nodes: [],
    }
  },
}

export default transformFunctions
