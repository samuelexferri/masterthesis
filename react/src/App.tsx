import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { GlobalStyle } from './global/GlobalStyle'
import { Balance } from './pages/Balance'
import { Block } from './pages/Block'
import { Home } from './pages/Home'
import { Tokens } from './pages/Tokens'
import { Transactions } from './pages/Transactions'

// Dracula UI
import '@dracula/dracula-ui/styles/dracula-ui.css'
import { Button, Paragraph } from '@dracula/dracula-ui'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/tokens" component={Tokens} />
          <Redirect exact from="/test" to="/" />
        </Switch>
      </BrowserRouter>
    </Page>
  )
}
