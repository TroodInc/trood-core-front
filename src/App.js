import React from 'react'
import BaseComponent from './core/BaseComponent'
import { Component } from 'core/pageStore/index.js'
import { useObserver } from 'mobx-react-lite'
import 'styles/variables.css'

import { pageEntryFullUrl } from './constants'


const componentsStore = Component.create({ chunk: pageEntryFullUrl })


function App() {
  return useObserver(() => {
    return <BaseComponent component={componentsStore}/>
  })
}

export default App
