import React from 'react'

import { formatEther } from '@ethersproject/units'
import { utils } from 'ethers'
import {
  useEtherBalance,
  useEthers,
  useContractCall,
  useContractFunction,
  useBlockMeta,
  useBlockNumber,
} from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'

import { Anchor, Avatar, Badge, Box, Button, Card, Divider, Heading, Text } from '@dracula/dracula-ui'

import { ethers } from 'ethers'

import polyIMG from '../assets/images/poly.png'

import NOTARIZETH_ABI from '../abi/NotarizETH.json'
import styled from 'styled-components'

// TODO Metterle in un file
const NETWORK_ALLOWED_ID = 3
const NETWORK_ALLOWED_NAME = 'Ropsten'

const NOTARIZETH_ADDRESS = '0x908d02931EA40670EFe810E295936A5CA62050Bc'
const NOTARIZETH_ABI_INTERFACE = new utils.Interface(NOTARIZETH_ABI)

export function Info() {
  const { activateBrowserWallet, deactivate, account, library, chainId, active } = useEthers()

  const userBalance = useEtherBalance(account)
  const blockNumber = useBlockNumber()
  const { timestamp, difficulty } = useBlockMeta()

  // Right/Wrong Network Alert
  let networkDisplay = (
    <Box rounded="lg" color="animated" p="md">
      <Text color="black">{'X'}</Text>
    </Box>
  )

  if (chainId == NETWORK_ALLOWED_ID && account != null) {
    networkDisplay = (
      <Box rounded="lg" color="animated" p="md">
        <Text color="black">{'MetaMask ' + NETWORK_ALLOWED_NAME + ' Network'}</Text>
      </Box>
    )
  } else if (chainId == NETWORK_ALLOWED_ID && account == null) {
    networkDisplay = (
      <Box rounded="lg" color="animated" p="md">
        <Text color="black">{'Infura ' + NETWORK_ALLOWED_NAME + ' Network (read-only), connect with MetaMask!'}</Text>
      </Box>
    )
  } else {
    networkDisplay = (
      <Box rounded="lg" color="red" p="md">
        <Text color="black">{'You need to be on ' + NETWORK_ALLOWED_NAME + ' Network, change the network!'}</Text>
      </Box>
    )
  }

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Heading>Info</Heading>

            {account ? <Text>{account}</Text> : <Text></Text>}

            <Avatar title="Samuele Ferri" src={polyIMG} />
          </SectionRow>

          {networkDisplay}

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            TODO
          </Card>

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            TODO
          </Card>
        </Section>
      </Container>
    </MainContent>
  )
}

const MyBreakText = styled.text`
  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`
