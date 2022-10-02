import { types } from 'mobx-state-tree'

export const setToken = token => window.localStorage.setItem('trood-token', token)
export const clearToken = () => window.localStorage.removeItem('trood-token')
export const getToken = () => window.localStorage.getItem('trood-token')

export const getAuthStore = apiStore => {
  const Model = types
    .model('Auth', {
      token: types.maybeNull(types.string),
      account: types.optional(types.frozen({}), {}),
      abac: types.optional(types.frozen({}), {}),
      error: types.optional(types.frozen({}), {}),
    })
    .views(() => ({
      getLoginForm(formName = 'LoginForm') {
        return apiStore.forms.getForm({ formName })
      },
      getVerifyForm(formName = 'VerifyForm') {
        return apiStore.forms.getForm({ formName })
      },
      getLogoutForm(formName = 'LogoutForm') {
        return apiStore.forms.getForm({ formName })
      },
    }))
    .actions(self => ({
      login(endpoint, formName, tokenPrefix = 'Token '){
        const options = { method: 'post', endpoint }
        return self.getLoginForm(formName).submit(options, true)
          .then(res => {
            self.setAuthData(res, tokenPrefix)
            return res
          })
          .catch(res => {
            self.setAuthData(res, tokenPrefix)
            return Promise.reject(res)
          })
      },
      verifyToken(endpoint, formName, tokenPrefix = 'Token ') {
        if (getToken()) {
          const options = { method: 'post', endpoint }
          return self.getVerifyForm(formName).submit(options, true)
            .then(res => {
              self.setAuthData(res, tokenPrefix, true)
              return res
            })
            .catch(res => {
              if (res.status === 401) {
                self.clearAuthData()
              }
            })
        }
      },
      logout(endpoint, formName) {
        if (endpoint && getToken()) {
          const options = { method: 'post', endpoint }
          return self.getLogoutForm(formName).submit(options, true)
            .finally(self.clearAuthData)
        } else {
          return self.clearAuthData()
        }
      },
      clearAuthData() {
        clearToken()
        self.token = null
        self.account = {}
        self.abac = {}
        self.error = {}
        return Promise.resolve()
      },
      setAuthData({ data: { data = {} } = {}, error }, tokenPrefix, verify = false) {
        if (error) {
          clearToken()
          self.token = null
          self.account = {}
          self.abac = {}
          self.error = error
        } else {
          const { token, abac, ...account } = data
          if (!verify && token) {
            const formattedToken = token ? `${tokenPrefix}${token}` : null
            setToken(formattedToken)
            self.token = formattedToken
          }
          self.account = account
          self.abac = abac
          self.error = {}
        }
      },
    }))
  return Model.create({
    token: getToken() || null,
  })
}
