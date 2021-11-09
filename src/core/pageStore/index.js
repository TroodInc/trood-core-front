import { types, flow } from 'mobx-state-tree'
import { nanoid } from 'nanoid'
import components from 'components'


const normalizeApiPath = (path) => {
  const host = process.env.REACT_APP_COMPONENTS_API_HOST || '/'
  return `${host}${host.endsWith('/') ? '' : '/'}${path.startsWith('/') ? path.slice(1) : path}`
}

const convertObject = (cur, data, skipTransform) => {
  let { type } = cur
  if (!type || (typeof type === 'object' && !components[type.resolvedName])) {
    const error = !type || (typeof type === 'object' && !type.resolvedName) ?
      'Empty component type' : `Unknown component type ${type.resolvedName || type}`
    return {
      type: 'HtmlTags',
      props: {
        type: 'div',
        children: `Error!\n${error}`,
        style: {
          backgroundColor: '#F009',
          color: '#FFF',
          fontSize: 24,
          padding: 5,
          whiteSpace: 'pre-wrap',
        },
      },
      displayName: `Error in ${cur.displayName}`,
      nodes: [],
      ...cur.custom,
    }
  }

  type = type.resolvedName || type

  if (!skipTransform && components[type]?.transformFunctions?.loadTransform) {
    return components[type].transformFunctions
      .loadTransform(cur, data, (node, skip) => convertObject(node, data, skip))
  }

  const component = {
    type,
    props: cur.props,
    nodes: cur.nodes || [],
    ...cur.custom,
  }
  if (component.chunk && !component.nodes.length) {
    component.nodes = [
      {
        type: 'LoadingIndicator',
      },
    ] // add standard loader component for async component
  }
  component.nodes = component.nodes.map(node => {
    if (node && node.type) return node
    return convertObject(data[node], data)
  })

  return component
}

export const Component = types
  .model('Component', {
    id: types.optional(types.string, () => nanoid()),
    type: types.optional(types.string, ''),
    nodes: types.array(types.union(
      types.string,
      types.number,
      types.null,
      types.undefined,
      types.late(() => Component),
    )),
    props: types.optional(types.frozen({}), {}),
    chunk: types.maybeNull(types.string),
    isLoading: types.optional(types.boolean, false),
  })
  .actions((model) => ({
    setComponents(data) {
      model.nodes = data.nodes
    },

    loadChunk: flow(function* ajax() {
      if (!model.chunk) return
      try {
        model.isLoading = true
        const nodes = yield fetch(normalizeApiPath(model.chunk)).then((res) => res.json())
        const converted = convertObject(nodes.ROOT, nodes)
        model.nodes = converted.nodes
      } catch (err) {
        console.error(err)
      } finally {
        model.isLoading = false
      }
    }),
  }))

const Modal = types
  .model('Modal', {
    isOpen: types.optional(types.boolean, false),
  })
  .volatile(() => ({
    context: null,
  }))
  .actions((model) => ({
    setContext(context) {
      model.context = context
    },
  }))

const Popup = types
  .model('Popup', {
    isOpen: types.optional(types.boolean, false),
  })
  .volatile(() => ({
    context: null,
  }))
  .actions((model) => ({
    setContext(context) {
      model.context = context
    },
  }))

const Context = types
  .model('Context', {
    isOpen: types.optional(types.boolean, false),
    context: types.optional(types.frozen({}), {}),
  })
  .actions(model => ({
    setContext(context) {
      model.context = context
    },
    modifyProp(prop, value) {
      model.context = { ...model.context, [prop]: value }
    },
  }))


export const Page = types
  .model('Page', {
    modals: types.map(Modal),
    popups: types.map(Popup),
    contexts: types.map(Context),
  })
  .views((model) => ({
    isModalOpen(name) {
      return model.modals.get(name)?.isOpen
    },
    isPopupOpen(name) {
      return model.popups.get(name)?.isOpen
    },
    getContext(name) {
      return model.contexts.get(name)?.context
    },
  }))
  .actions((model) => ({
    setContext(name, context) {
      model.contexts.set(name, {})
      model.contexts.get(name).setContext(context)
    },
    openModal(name, context) {
      model.modals.set(name, { isOpen: true })
      model.setContext(name, context)
    },
    openModalForm(baseUrl, pk, editValues) {
      model.openModal(baseUrl)
      model.setContext(baseUrl, { pk, editValues })
    },
    closeModal(name) {
      model.modals.set(name, { isOpen: false })
    },
    closeModalForm(name) {
      model.closeModal(name)
      model.setContext(name, {})
    },
    openPopup(name, timeout = 3000) {
      model.popups.set(name, { isOpen: true })
      setTimeout(() => model.closePopup(name), timeout)
    },
    closePopup(name) {
      model.popups.set(name, { isOpen: false })
    },
    modifyContext(name, prop, value) {
      model.contexts.get(name).modifyProp(prop, value)
    },
  }))
