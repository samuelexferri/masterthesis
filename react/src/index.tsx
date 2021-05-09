import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, Config, DAppProvider } from '@usedapp/core'
import { App } from './App'

const INFURA_ID = "773217385b694a6ea60c4cea1a430a09";

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
