import logo from './logo.svg';
import './App.css';

import '@dracula/dracula-ui/styles/dracula-ui.css'
import { Paragraph } from '@dracula/dracula-ui'

function App() {
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
      </header>
    </div>
  );
}

export default App;
