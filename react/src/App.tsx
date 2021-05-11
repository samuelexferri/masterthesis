import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { GlobalStyle } from './global/GlobalStyle'
import { Home } from './pages/Home'
import { Info } from './pages/Info'
import { Transactions } from './pages/Transactions'

// Dracula UI
import '@dracula/dracula-ui/styles/dracula-ui.css'
import {} from '@dracula/dracula-ui'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/info" component={Info} />
          <Redirect exact from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    </Page>
  )
}
