import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, Shadows, Sizes, Transitions } from '../global/styles'
import { HeaderContainer } from './base/base'
import { SectionRow } from '../components/base/base'
import { useEtherBalance, useEthers } from '@usedapp/core'
//import { Button } from '../components/base/Button'
import { TextInline } from '../typography/Text'

import { Avatar, Badge, Box, Button, Card, Divider, Heading, Text } from '@dracula/dracula-ui'

export function TopBar() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <Header>
      <HeaderContainer>
        <HeaderNav>
          <ToMain href="/">
            <Text size="lg">NotarizETH</Text>
            <ToMainBottom>
              <Text size="xs">by Samuele Ferri 🚀</Text>
            </ToMainBottom>
          </ToMain>
          <HeaderNavLinks>
            <HeaderLink activeClassName="active-page" to="/">
              {' '}
              <Text>Home</Text>{' '}
            </HeaderLink>
            <HeaderLink activeClassName="active-page" to="/transactions">
              {' '}
              <Text>Transactions</Text>{' '}
            </HeaderLink>
            <HeaderLink activeClassName="active-page" to="/tokens">
              {' '}
              <Text>Info (TODO)</Text>{' '}
            </HeaderLink>
          </HeaderNavLinks>
        </HeaderNav>
      </HeaderContainer>

      {account ? (
        <Button onClick={() => deactivate()}>Disconnect</Button>
      ) : (
        <Button onClick={() => activateBrowserWallet()}>Connect</Button>
      )}

      <Box p="sm"></Box>
    </Header>
  )
}

const Header = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  align-items: center;
  width: 100%;
  height: ${Sizes.headerHeight};
  background-color: ${Colors.Current};
  box-shadow: ${Shadows.main};
  z-index: 100;
`

const HeaderNav = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`

const ToMain = styled.a`
  display: flex;
  flex-direction: column;
  width: fit-content;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Green};
  }
`

const ToMainBottom = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
`

const Handshaking = styled.span`
  letter-spacing: -0.3em;
`

const HeaderNavLinks = styled.div`
  display: grid;
  position: absolute;
  left: 50%;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 20px;
  align-items: center;
  height: 100%;
  transform: translateX(-50%);
`

const HeaderLink = styled(NavLink)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
  font-size: 12px;
  line-height: 24px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: ${Transitions.all};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    height: 2px;
    background-color: ${Colors.Green};
    transform: scaleX(0);
    transform-origin: 50% 50%;
    transition: ${Transitions.all};
  }

  &:hover {
    color: ${Colors.Green};

    &:after {
      transform: scaleX(1);
    }
  }
  &.active-page {
    &:after {
      transform: scaleX(1);
    }
  }
`
