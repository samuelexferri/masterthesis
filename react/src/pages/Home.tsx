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

import NOTARIZETH_ABI from '../abi/NotarizETH.json'
import styled from 'styled-components'

import polyIMG from '../assets/images/poly.png'

// TODO Metterle in un file
const NETWORK_ALLOWED_ID = 3
const NETWORK_ALLOWED_NAME = 'Ropsten'

const NOTARIZETH_ADDRESS = '0x908d02931EA40670EFe810E295936A5CA62050Bc'
const NOTARIZETH_ABI_INTERFACE = new utils.Interface(NOTARIZETH_ABI)

export function Home() {
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
            <Heading>Home</Heading>

            {account ? <Text>{account}</Text> : <Text></Text>}

            <Avatar title="Samuele Ferri" src={polyIMG} />
          </SectionRow>

          {networkDisplay}

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            {account && (
              <ContentRow>
                <Text color="black">Account:</Text> <Text>{account}</Text>
              </ContentRow>
            )}
            {userBalance && (
              <ContentRow>
                <Text color="black">Ether Balance:</Text> <Text>{formatEther(userBalance)}</Text> <Text>ETH</Text>
              </ContentRow>
            )}

            <ContentRow>
              <Text color="black">NotarizETH Contract Address:</Text>{' '}
              <Anchor
                href={'https://ropsten.etherscan.io/address/' + NOTARIZETH_ADDRESS}
                target="_blank"
                color="cyanGreen"
                hoverColor="yellowPink"
                mb="sm"
              >
                <MyBreakText>{NOTARIZETH_ADDRESS}</MyBreakText>
              </Anchor>
            </ContentRow>
          </Card>

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm">
            <ContentRow>
              <Text color="black">Chain ID:</Text> <Text>{chainId}</Text>
            </ContentRow>
            <ContentRow>
              <Text color="black">Current Block:</Text> <Text>{blockNumber}</Text>
            </ContentRow>
            {difficulty && (
              <ContentRow>
                <Text color="black">Current Difficulty:</Text> <Text>{difficulty.toString()}</Text>
              </ContentRow>
            )}
            {timestamp && (
              <ContentRow>
                <Text color="black">Current Block Timestamp:</Text> <Text>{timestamp.toLocaleString()}</Text>
              </ContentRow>
            )}
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
