import React from 'react';
import logo from './logo.svg';
import './App.css';

import '@dracula/dracula-ui/styles/dracula-ui.css'
import { Button, Paragraph } from '@dracula/dracula-ui'

import { useWeb3 } from '@openzeppelin/network/react';
const infuraProjectId = '773217385b694a6ea60c4cea1a430a09';

function App() {
  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
  const { networkId, networkName, providerName } = web3Context;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
		    <Paragraph color="black">Hello Vampire</Paragraph>
        <Button variant='ghost'>Button</Button>
      </header>
      <div>
        <h1>Infura/MetaMask/OpenZeppelin Dapp</h1>
        <div>
          Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
        </div>
        <div>
        Provider: {providerName}
        </div>
      </div>
    </div>
  );
}

export default App;