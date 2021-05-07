import React from 'react'
import { formatEther } from '@ethersproject/units'
import { utils } from 'ethers'
import { useEtherBalance, useEthers, useContractCall, useContractFunction, useBlockMeta, useBlockNumber } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
//import { Button } from '../components/base/Button'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'
//import Alert from 'react-native'

import { NETWORK, NETWORKS } from "../constants";

import { Anchor, Avatar, Badge, Box, Button, Card, Divider, Heading, Text } from '@dracula/dracula-ui'

import { ethers } from "ethers";

import NOTARIZETH_ABI from '../abi/NotarizETH.json'

// TODO Metterle in un file
const NETWORK_ALLOWED_ID = 3
const NETWORK_ALLOWED_NAME = 'Ropsten'

const NOTARIZETH_ADDRESS = "0x908d02931EA40670EFe810E295936A5CA62050Bc"
const NOTARIZETH_ABI_INTERFACE = new utils.Interface(NOTARIZETH_ABI)

export function Home() {
  const { activateBrowserWallet, deactivate, account, library, chainId, active } = useEthers()

  const userBalance = useEtherBalance(account)
  const blockNumber = useBlockNumber()
  const { timestamp, difficulty } = useBlockMeta()

  /*
  if (typeof library !== 'undefined' && chainId == NETWORK_ALLOWED_ID) {
    var contractEther = new ethers.Contract( NOTARIZETH_ADDRESS , NOTARIZETH_ABI_INTERFACE , library )
    var result =  contractEther.verifyFile('0x0000000000000000000000000000000000000000000000000000000000000000').then(
      function(value) { console.log("ETHERS",value)},
    );
  }
  */

  // Right/Wrong Network Alert
  var networkDisplay = (<Box rounded="lg" color="animated" p="md"><Text color="black">{"X"}</Text></Box>)

  if (chainId == NETWORK_ALLOWED_ID && account != null) {
    networkDisplay = (<Box rounded="lg" color="animated" p="md"><Text color="black">{"MetaMask " + NETWORK_ALLOWED_NAME + " Network"}</Text></Box>)
  }
  else if (chainId == NETWORK_ALLOWED_ID && account == null) {
    networkDisplay = (<Box rounded="lg" color="animated" p="md"><Text color="black">{"Infura " + NETWORK_ALLOWED_NAME + " Network (read-only), connect with MetaMask!"}</Text></Box>)
  } else {
    networkDisplay = (<Box rounded="lg" color="red" p="md"><Text color="black">{"You need to be on " + NETWORK_ALLOWED_NAME + " Network, change the network!"}</Text></Box>)
  }

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Heading>Home</Heading>

            {account ? (
              <Text>{account}</Text>
            ) : (
              <Text></Text>
            )}

            <Avatar title="Count Dracula" src="https://ui.draculatheme.com/static/images/avatar.png" />
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
              <Text color="black">NotarizETH Contract Address:</Text> <Anchor href={"https://ropsten.etherscan.io/address/" + NOTARIZETH_ADDRESS} target="_blank" color="cyanGreen" hoverColor="yellowPink" mb="sm">{NOTARIZETH_ADDRESS}</Anchor>
            </ContentRow>
          </Card>

          <Box p="sm"></Box>

          <Card color="pinkPurple" p="sm" glowColor="purple">
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
