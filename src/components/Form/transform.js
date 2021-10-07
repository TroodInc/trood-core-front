import { FORM_TYPES } from './constants'

const transformFunctions = {
  loadTransform: (node, nodes, standardTransform) => {
    const { props } = node

    if (props.formType === FORM_TYPES.modal) {
      return standardTransform({
        ...node,
        props: {
          ...props,
          pk: {
            $data: '{{$page.getContext[$arg0].pk}}',
            $arg0: props.baseUrl,
          },
          editValues: {
            $data: '{{$page.getContext[$arg0].editValues}}',
            $arg0: props.baseUrl,
          },
        },
      }, true)
    }

    return standardTransform(node, true)
  },
}

export default transformFunctions
