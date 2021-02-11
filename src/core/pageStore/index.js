import { types, flow } from 'mobx-state-tree'
import { nanoid } from 'nanoid'
const normalizeApiPath = (path) => {
  const host = process.env.REACT_APP_COMPONENTS_API_HOST || '/'
  return `${host}${host.endsWith('/') ? '' : '/'}${path.startsWith('/') ? path.slice(1) : path}`
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
        const { nodes } = yield fetch(normalizeApiPath(model.chunk)).then((res) => res.json())
        model.nodes = nodes
      } catch (err) {
        console.error(err)
      }
      model.isLoading = false
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
    setContext(context){
      model.context = context
    },
    modifyProp(prop, value){
      model.context = { ...model.context, [prop]:value }
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
      model.contexts.set(name, {  })
      model.contexts.get(name).setContext(context)
    },
    openModal(name, context) {
      model.modals.set(name, { isOpen: true  })
      model.setContext(name, context)
    },
    closeModal(name) {
      model.modals.set(name, { isOpen: false })
    },
    openPopup(name, timeout = 3000) {
      model.popups.set(name, { isOpen: true  })
      setTimeout(() => model.closePopup(name), timeout)
    },
    closePopup(name) {
      model.popups.set(name, { isOpen: false })
    },
    modifyContext(name, prop, value){
      model.contexts.get(name).modifyProp(prop, value)
    },
  }))
