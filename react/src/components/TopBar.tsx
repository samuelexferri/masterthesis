import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, Shadows, Sizes, Transitions } from '../global/styles'
import { HeaderContainer } from './base/base'
import { useEthers } from '@usedapp/core'

import { Anchor, Avatar, Box, Button, Text } from '@dracula/dracula-ui'

import { slide as Menu } from 'react-burger-menu'

import notarizethIMG from '../assets/images/notarizeth.png'

export function TopBar() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  console.log(window.innerWidth)
  if (window.innerWidth > 1000) {
    return (
      <Header>
        <HeaderContainer>
          <HeaderNav>
            <ToMain href="/">
              <img
                title="NotarizETH"
                src={notarizethIMG}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
            </ToMain>
            <span>&nbsp;</span>
            <ToMain>
              <Text size="lg">NotarizETH</Text>
              <ToMainBottom>
                <Text size="xs">by Samuele Ferri</Text>
              </ToMainBottom>
            </ToMain>
            <HeaderNavLinks>
              <HeaderLink activeClassName="active-page" to="/home">
                {' '}
                <Text>Home</Text>{' '}
              </HeaderLink>
              <HeaderLink activeClassName="active-page" to="/transactions">
                {' '}
                <Text>Transactions</Text>{' '}
              </HeaderLink>
              <HeaderLink activeClassName="active-page" to="/info">
                {' '}
                <Text>Info</Text>{' '}
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
  } else {
    return (
      <Header>
        <Menu styles={burgerMenuStyle}>
          <br></br>
          <br></br>
          <Anchor href="/home" size="lg" weight="bold" color="cyanGreen">
            Home
          </Anchor>
          <br></br>
          <br></br>
          <Anchor href="/transactions" size="lg" weight="bold" color="cyanGreen">
            Transactions
          </Anchor>
          <br></br>
          <br></br>
          <Anchor href="/info" size="lg" weight="bold" color="cyanGreen">
            Info
          </Anchor>
        </Menu>

        <Text size="lg" style={{ marginLeft: '75px' }}>
          NotarizETH
        </Text>

        {account ? (
          <Button style={{ marginLeft: 'auto', marginRight: '16px' }} onClick={() => deactivate()}>
            Disconnect
          </Button>
        ) : (
          <Button style={{ marginLeft: 'auto', marginRight: '16px' }} onClick={() => activateBrowserWallet()}>
            Connect
          </Button>
        )}
      </Header>
    )
  }
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

var burgerMenuStyle = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '18px',
    top: '18px',
  },
  bmBurgerBars: {
    background: Colors.Background,
  },
  bmBurgerBarsHover: {
    background: Colors.Foreground,
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: Colors.Foreground,
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: Colors.Current,
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
    margin: '-30px 0 0 0',
  },
  bmMorphShape: {
    fill: Colors.Foreground,
  },
  bmItemList: {
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0)',
  },
}
