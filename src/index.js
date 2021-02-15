import React from 'react'
import ReactDOM from 'react-dom'
import './styles/reset.css'
import './styles/global.css'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { getStore } from 'trood-restify'
import { BrowserRouter as Router } from 'react-router-dom'
import StoreContext from 'core/StoreContext'
import PageStoreContext from 'core/PageStoreContext'
import { Page } from 'core/pageStore'
import AuthStoreContext from 'core/AuthStoreContext'
import { getAuthStore, getToken } from 'core/authStore'

import useStoreConfig from './useStoreConfig'


const Main = () => {
  const [loading, err, storeConfig] = useStoreConfig(
    window.coreConfig.storeConfigUrl,
    getToken,
  )

  if (loading) return 'Loading config...'
  if (err) return `Failed to load config... ${err}`

  const pageStore = Page.create({})
  const store = getStore(storeConfig, getToken)
  const authStore = getAuthStore(store)

  return (
    <StoreContext.Provider value={store}>
      <PageStoreContext.Provider value={pageStore}>
        <AuthStoreContext.Provider value={authStore}>
          <Router>
            <App />
          </Router>
        </AuthStoreContext.Provider>
      </PageStoreContext.Provider>
    </StoreContext.Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
)

registerServiceWorker()
