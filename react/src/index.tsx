import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

import { ChainId, Config, DAppProvider } from '@usedapp/core'

import { INFURA_ID } from './Constants'

const config: Config = {
  readOnlyChainId: ChainId.Ropsten,
  readOnlyUrls: {
    [ChainId.Ropsten]: 'https://ropsten.infura.io/v3/' + INFURA_ID,
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
